import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

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
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
