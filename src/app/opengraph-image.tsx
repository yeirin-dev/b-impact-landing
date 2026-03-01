import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "B-IMPACT Alliance - 부산 아동·청소년 심리지원 네트워크";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7317cf 0%, #5a0fa6 50%, #3a0870 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            borderRadius: 24,
            background: "rgba(255,255,255,0.15)",
            fontSize: 48,
            marginBottom: 32,
          }}
        >
          B
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          B-IMPACT Alliance
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.85,
            marginBottom: 40,
          }}
        >
          부산 아동·청소년 심리지원 네트워크
        </div>
        <div
          style={{
            display: "flex",
            gap: 48,
            fontSize: 20,
            opacity: 0.7,
          }}
        >
          <span>22개 참여기관</span>
          <span>10개 자치구</span>
          <span>전문가 네트워크</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
