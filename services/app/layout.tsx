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
    default: "KynguyenAI - Tin tức AI tiếng Việt",
    template: "%s | KynguyenAI",
  },
  description:
    "Cập nhật tin tức AI, công cụ AI, và hướng dẫn AI mới nhất bằng tiếng Việt. Nguồn tin tổng hợp từ các newsletter AI hàng đầu thế giới.",
  keywords: [
    "AI",
    "trí tuệ nhân tạo",
    "machine learning",
    "GPT",
    "LLM",
    "công cụ AI",
    "tin tức AI",
  ],
  authors: [{ name: "KynguyenAI" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://kynguyenai.vn",
    siteName: "KynguyenAI",
    title: "KynguyenAI - Tin tức AI tiếng Việt",
    description:
      "Cập nhật tin tức AI, công cụ AI, và hướng dẫn AI mới nhất bằng tiếng Việt.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KynguyenAI - Tin tức AI tiếng Việt",
    description:
      "Cập nhật tin tức AI, công cụ AI, và hướng dẫn AI mới nhất bằng tiếng Việt.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
