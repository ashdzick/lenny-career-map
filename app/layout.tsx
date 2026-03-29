import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lenny's Career Transition Map",
  description:
    "Discover your career transition path grounded in insights from Lenny Rachitsky's podcast interviews.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Do not add <head> here — Next injects stylesheets into the generated head; a manual
          <head> replaces it and drops linked CSS (Tailwind), leaving only inline body styles. */}
      <body
        className="min-h-screen bg-brand-50 font-sans antialiased"
        style={{
          minHeight: "100vh",
          backgroundColor: "#fdf8f0",
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <div
          className="max-w-3xl mx-auto px-6 py-12"
          style={{
            maxWidth: "48rem",
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: "3rem",
            paddingBottom: "3rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
