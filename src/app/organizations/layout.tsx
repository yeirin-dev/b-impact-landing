import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "참여기관 | 부산 아동·청소년 심리지원 전문기관 22곳",
  description:
    "B-IMPACT Alliance 참여기관 목록. 부산 10개 자치구 22개 심리지원 전문기관 — 심리상담, 언어치료, 발달재활, 미술치료, 놀이치료 센터 정보를 확인하세요.",
  keywords: [
    "부산 심리상담센터 목록",
    "부산 아동 심리치료 센터",
    "부산 언어치료센터",
    "부산 발달재활센터",
    "부산 미술치료센터",
    "부산 청소년 상담센터",
    "사상구 심리상담",
    "해운대구 심리상담",
    "동래구 심리상담",
    "부산진구 심리상담",
    "연제구 심리상담",
    "금정구 심리상담",
    "북구 심리상담",
    "강서구 심리상담",
    "기장군 심리상담",
    "사하구 심리상담",
  ],
  openGraph: {
    title: "참여기관 22곳 | B-IMPACT Alliance",
    description:
      "부산 10개 자치구에서 아동·청소년 심리지원에 참여하는 22개 전문기관을 만나보세요.",
    url: "https://b-impact.yeirin.com/organizations",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "B-IMPACT Alliance 참여기관",
      },
    ],
  },
  twitter: {
    title: "참여기관 22곳 | B-IMPACT Alliance",
    description:
      "부산 10개 자치구에서 아동·청소년 심리지원에 참여하는 22개 전문기관을 만나보세요.",
  },
  alternates: {
    canonical: "https://b-impact.yeirin.com/organizations",
  },
};

export default function OrganizationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
