import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";

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
    default: "KynguyenAI - Cập nhật tin tức AI & công cụ AI tiếng Việt",
    template: "%s | KynguyenAI",
  },
  description:
    "Cập nhật tin tức AI, công cụ AI, và hướng dẫn AI mới nhất bằng tiếng Việt. Nguồn tin tổng hợp từ các newsletter AI hàng đầu thế giới, được biên dịch và chọn lọc.",
  keywords: ["AI", "trí tuệ nhân tạo", "machine learning", "GPT", "LLM", "công cụ AI", "tin tức AI"],
  authors: [{ name: "KynguyenAI" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://kynguyenai.vn",
    siteName: "KynguyenAI",
    title: "KynguyenAI - Cập nhật tin tức AI & công cụ AI tiếng Việt",
    description: "Cập nhật tin tức AI, công cụ AI, và hướng dẫn AI mới nhất bằng tiếng Việt. Nguồn tin tổng hợp từ các newsletter AI hàng đầu thế giới, được biên dịch và chọn lọc.",
    images: [
      {
        url: "https://kynguyenai.vn/og-img.webp",
        width: 1200,
        height: 630,
        alt: "KynguyenAI - Tin tức AI tiếng Việt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KynguyenAI - Cập nhật tin tức AI & công cụ AI tiếng Việt",
    description: "Cập nhật tin tức AI, công cụ AI, và hướng dẫn AI mới nhất bằng tiếng Việt. Nguồn tin tổng hợp từ các newsletter AI hàng đầu thế giới, được biên dịch và chọn lọc.",
    images: ["https://kynguyenai.vn/og-img.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
