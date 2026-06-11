import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LegalHelp – Professional Agreement Drafting",
  description: "Create professional legal agreements in minutes. NDA, Employment, Freelance, and Lease agreements with state-specific legal provisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
