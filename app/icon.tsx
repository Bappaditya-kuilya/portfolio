import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Sakura-pink "B" monogram on the site's near-black background.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#030303",
          borderRadius: "6px",
          color: "#ff7eb6",
          fontSize: 24,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        B
      </div>
    ),
    { ...size }
  );
}
