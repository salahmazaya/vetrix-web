import type { Metadata } from "next";
import { Poppins, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const poppins = Poppins({
  variable: "--font-poppins-raw",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Vetrix | The Core of Smart Digital Transformation",
  description:
    "Vetrix builds reliable websites, CRM systems, automation tools, and intelligent software solutions that help businesses operate smarter, scale faster, and innovate with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
