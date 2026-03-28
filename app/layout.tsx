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
      <body className="min-h-screen bg-brand-50 font-sans antialiased">
        <div className="max-w-3xl mx-auto px-6 py-12">{children}</div>
      </body>
    </html>
  );
}
