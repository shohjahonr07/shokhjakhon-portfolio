import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shokhjakhon Rustamov",
    template: "%s | Shokhjakhon Rustamov",
  },
  description:
    "Future Software Engineer and Innovator. Portfolio with projects, academic highlights, and a live Telegram bridge.",
  keywords: [
    "software engineer",
    "ML intern",
    "reinforcement learning",
    "embedded systems",
    "Next.js",
    "Supabase",
    "Telegram",
  ],
  metadataBase: undefined,
  openGraph: {
    type: "website",
    title: "Shokhjakhon Rustamov",
    description:
      "Future Software Engineer and Innovator. Portfolio with projects, academic highlights, and a live Telegram bridge.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shokhjakhon Rustamov",
    description:
      "Future Software Engineer and Innovator. Portfolio with projects, academic highlights, and a live Telegram bridge.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
