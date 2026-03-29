"use client";

import { RefObject, useState } from "react";

interface Props {
  outputRef: RefObject<HTMLDivElement | null>;
  currentRole: string;
  targetRole: string;
  /** `link`: quiet text-style control (secondary to reading). */
  variant?: "button" | "link";
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export default function PDFDownloader({
  outputRef,
  currentRole,
  targetRole,
  variant = "button",
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleDownload() {
    if (!outputRef.current) return;
    setErrorMessage(null);
    setIsGenerating(true);

    try {
      // Dynamic imports — these are browser-only
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = outputRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        // Add padding so box shadows aren't clipped
        x: -20,
        y: -20,
        width: element.scrollWidth + 40,
        height: element.scrollHeight + 40,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
      const footerHeight = 12; // mm reserved for footer
      const usableHeight = pdfHeight - footerHeight;

      // Calculate image dimensions in mm
      const imgWidthMM = pdfWidth;
      const imgHeightMM = (canvas.height * pdfWidth) / canvas.width;

      // Multi-page split
      const pageHeightPx = (usableHeight / imgWidthMM) * canvas.width;
      let yOffsetPx = 0;
      let pageIndex = 0;

      while (yOffsetPx < canvas.height) {
        if (pageIndex > 0) pdf.addPage();

        const sliceHeightPx = Math.min(pageHeightPx, canvas.height - yOffsetPx);
        const sliceHeightMM = (sliceHeightPx / canvas.width) * imgWidthMM;

        // Create a slice of the canvas
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceHeightPx;
        const ctx = sliceCanvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
          ctx.drawImage(canvas, 0, -yOffsetPx);
        }

        const sliceImgData = sliceCanvas.toDataURL("image/jpeg", 0.92);
        pdf.addImage(sliceImgData, "JPEG", 0, 0, imgWidthMM, sliceHeightMM);

        // Footer on each page
        pdf.setFontSize(7.5);
        pdf.setTextColor(160, 160, 160);
        pdf.text(
          "Generated from Lenny's Newsletter podcast transcripts.",
          pdfWidth / 2,
          pdfHeight - 5,
          { align: "center" }
        );

        yOffsetPx += pageHeightPx;
        pageIndex++;
      }

      // If the whole document fits on one page (common), we used addImage once already.
      // The multi-page logic above handles both cases correctly.

      const fileName = `career-transition-${slugify(currentRole)}-to-${slugify(targetRole)}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setErrorMessage("PDF generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  const linkClasses =
    "inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-700 underline-offset-2 hover:underline " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 rounded " +
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline";

  const buttonClasses =
    "flex items-center gap-2 px-6 py-2.5 rounded-xl border border-brand-300 bg-white text-brand-700 font-medium text-sm " +
    "hover:bg-brand-50 hover:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm";

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        aria-busy={isGenerating}
        aria-label={
          isGenerating
            ? "Generating PDF, please wait"
            : `Download career path from ${currentRole} to ${targetRole} as PDF`
        }
        className={variant === "link" ? linkClasses : buttonClasses}
      >
        {isGenerating ? (
          <>
            <svg
              className="animate-spin h-4 w-4 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Generating PDF…
          </>
        ) : (
          <>
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download as PDF
          </>
        )}
      </button>
      {errorMessage && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
