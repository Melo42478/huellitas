import Link from "next/link";
import Image from "next/image";
import { heroStyles, components, colors } from "@/lib/styles";
import type { CSSProperties } from "react";

export default function HeroSection() {
  return (
    <section style={heroStyles.section}>
      {/* Decorative blobs */}
      <span style={{ ...heroStyles.blob, top: "-40px", right: "-30px", width: "180px", height: "180px", background: "#f4dfe6", opacity: 0.5 } as CSSProperties} />
      <span style={{ ...heroStyles.blob, bottom: "-50px", left: "-30px", width: "160px", height: "160px", background: "#e2eee0", opacity: 0.6 } as CSSProperties} />

      {/* Hero grid */}
      <div style={heroStyles.herogrid} className="heroInner">
        {/* Left: Text */}
        <div className="heroCopy">
          <span className="heroBadge" style={{ display: "inline-block", background: colors.tealSoft, color: colors.tealDark, fontWeight: "800", fontSize: "14px", padding: "7px 14px", borderRadius: "999px", marginBottom: "18px" } as CSSProperties}>
            Adopción responsable · Querétaro
          </span>

          <h1 style={heroStyles.h1} className="heroTitle">
            Cada huella merece
            <br />
            <span style={{ color: colors.teal }}>un hogar de arcoíris</span>
          </h1>

          <p style={heroStyles.lead} className="heroLead">
            Rescatamos, curamos y preparamos a perritos en situación de calle para encontrarles una
            familia paciente y amorosa. Conoce sus historias y su increíble transformación.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" } as CSSProperties} className="heroBtns">
            <Link href="/galeria" style={{ ...components.btn, ...components.btnPrimary }}>
              Conoce a los perritos
            </Link>
            <Link href="/donaciones" style={{ ...components.btn, ...components.btnOutline }}>
              Quiero ayudar ♥
            </Link>
          </div>
        </div>

        {/* Right: Logo */}
        <div style={heroStyles.heroLogo} className="heroLogo">
          <Image
            src="/assets/logo.png"
            alt="Huellitas Arcoíris"
            width={380}
            height={380}
            style={{ width: "min(380px, 82%)", height: "auto", animation: "floaty 5s ease-in-out infinite", filter: "drop-shadow(0 20px 30px rgba(74,59,51,.12))" } as CSSProperties}
            priority
          />
        </div>
      </div>
    </section>
  );
}
