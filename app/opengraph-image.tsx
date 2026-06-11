import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bappaditya Kuilya — AI Systems Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(120% 120% at 80% 10%, rgba(255,126,182,0.18) 0%, transparent 45%), linear-gradient(135deg, #030303 0%, #0d0b12 100%)",
          color: "#f5f5f5",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#ff7eb6",
            fontSize: 26,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 60, height: 1, background: "rgba(255,126,182,0.5)" }} />
          AI Systems Engineer
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "28px",
            fontSize: 92,
            lineHeight: 1.02,
            fontWeight: 700,
          }}
        >
          <span>Elegance In</span>
          <span
            style={{
              background: "linear-gradient(135deg, #ff7eb6 0%, #f4b6d2 50%, #d48ac0 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Every Line.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            fontSize: 34,
          }}
        >
          <span style={{ color: "#d8d8d8" }}>Bappaditya Kuilya</span>
          <span style={{ color: "rgba(255,126,182,0.7)", fontSize: 28 }}>
            心は静かに、技は美しく
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
