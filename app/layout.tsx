import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteTitle = "Lenny's Career Transition Map";
const siteDescription =
  "Discover your career transition path grounded in insights from Lenny Rachitsky's podcast interviews.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lenny-career-map.vercel.app"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: siteTitle,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
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
        <a
          href="#main-content"
          className="fixed left-4 top-0 z-[100] -translate-y-full px-4 py-2 text-sm font-medium rounded-lg bg-brand-900 text-white outline-none ring-2 ring-transparent ring-offset-2 focus:translate-y-4 focus:ring-brand-400"
        >
          Skip to main content
        </a>
        <div
          className="max-w-7xl mx-auto px-6 py-12"
          style={{
            maxWidth: "80rem",
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
