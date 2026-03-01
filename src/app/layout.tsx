import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = "https://b-impact.kr";
const SITE_NAME = "B-IMPACT Alliance";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "B-IMPACT Alliance | 부산 아동·청소년 심리지원 네트워크",
    template: "%s | B-IMPACT Alliance",
  },
  description:
    "부산 지역 22개 심리지원 전문기관이 연대하는 B-IMPACT Alliance. 아동·청소년 심리상담, 언어치료, 발달재활, 미술치료 등 전문 서비스를 제공합니다.",
  keywords: [
    "부산 아동 심리상담",
    "부산 청소년 심리상담",
    "부산 심리지원",
    "아동 심리치료 부산",
    "청소년 상담 부산",
    "부산 언어치료",
    "부산 발달재활",
    "부산 미술치료",
    "B-IMPACT Alliance",
    "비임팩트 얼라이언스",
    "부산 심리상담센터",
    "아동청소년 발달센터 부산",
    "부산 사회서비스",
    "심리지원 네트워크",
    "비영리 심리상담",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "B-IMPACT Alliance | 부산 아동·청소년 심리지원 네트워크",
    description:
      "부산 지역 22개 심리지원 전문기관이 연대하는 협력 네트워크. 아동·청소년의 건강한 성장을 위한 심리상담, 언어치료, 발달재활 서비스.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "B-IMPACT Alliance - 부산 아동·청소년 심리지원 네트워크",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "B-IMPACT Alliance | 부산 아동·청소년 심리지원 네트워크",
    description:
      "부산 지역 22개 심리지원 전문기관이 연대하는 협력 네트워크. 아동·청소년의 건강한 성장을 위한 심리상담, 언어치료, 발달재활 서비스.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // google: "구글서치콘솔_인증코드",
    // other: { "naver-site-verification": "네이버_인증코드" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
