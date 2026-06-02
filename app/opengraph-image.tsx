import { readFileSync } from "fs";
import path from "path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "YENTEC — Développeur web fullstack";

export default function OpengraphImage() {
  const logoData = readFileSync(path.join(process.cwd(), "public/logo/long_white.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#011627",
        color: "#eaf1f7",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Barre accent gauche */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 8,
          height: "100%",
          background: "#d68800",
        }}
      />

      {/* Contenu */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 72px 96px",
          width: "100%",
        }}
      >
        {/* Haut : label gauche + logo droit */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 22,
              color: "#d68800",
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            yentec.fr
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={220} height={52} style={{ objectFit: "contain" }} alt="" />
        </div>

        {/* Milieu : titre principal */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            <div>Développeur web</div>
            <div style={{ color: "#d68800" }}>fullstack</div>
          </div>
          <div style={{ fontSize: 28, color: "rgba(234,241,247,0.6)", fontWeight: 400 }}>
            Next.js · React · Node.js · TypeScript
          </div>
        </div>

        {/* Bas : disponibilité + localisation */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(214,136,0,0.15)",
              border: "1px solid rgba(214,136,0,0.35)",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 20,
              color: "#d68800",
              fontWeight: 500,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#18c07a",
              }}
            />
            Disponible pour vos projets
          </div>
          <div style={{ fontSize: 20, color: "rgba(234,241,247,0.45)" }}>Fréjus · à distance</div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
