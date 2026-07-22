import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section style={heroStyle.section}>
      {/* Decorative blobs */}
      <span style={{ ...heroStyle.blob, ...heroStyle.blobA }} />
      <span style={{ ...heroStyle.blob, ...heroStyle.blobB }} />

      {/* Hero grid */}
      <div style={heroStyle.herogrid}>
        {/* Left: Text */}
        <div>
          <span style={heroStyle.pillBadge}>Adopción responsable · Querétaro</span>

          <h1 style={heroStyle.h1}>
            Cada huella merece
            <br />
            <span style={{ color: "#16808A" }}>un hogar de arcoíris</span>
          </h1>

          <p style={heroStyle.lead}>
            Rescatamos, curamos y preparamos a perritos en situación de calle para encontrarles una
            familia paciente y amorosa. Conoce sus historias y su increíble transformación.
          </p>

          <div style={heroStyle.ctaRow}>
            <Link href="/galeria" style={{ ...heroStyle.btn, ...heroStyle.btnPrimary }}>
              Conoce a los perritos
            </Link>
            <Link href="/donaciones" style={{ ...heroStyle.btn, ...heroStyle.btnOutline }}>
              Quiero ayudar ♥
            </Link>
          </div>
        </div>

        {/* Right: Logo */}
        <div style={heroStyle.heroLogo}>
          <Image
            src="/assets/logo.png"
            alt="Huellitas Arcoíris"
            width={380}
            height={380}
            style={heroStyle.logoImg}
            priority
          />
        </div>
      </div>
    </section>
  );
}

const heroStyle = {
  section: {
    position: "relative" as const,
    overflow: "hidden" as const,
    background: "linear-gradient(180deg, #FFFDF8 0%, #FBF4E8 100%)",
    borderBottom: "1px solid #ece0cb",
  },
  blob: {
    position: "absolute" as const,
    borderRadius: "50%",
  },
  blobA: {
    top: "-40px",
    right: "-30px",
    width: "180px",
    height: "180px",
    background: "#f4dfe6",
    opacity: 0.5,
  },
  blobB: {
    bottom: "-50px",
    left: "-30px",
    width: "160px",
    height: "160px",
    background: "#e2eee0",
    opacity: 0.6,
  },
  herogrid: {
    position: "relative" as const,
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "64px 20px",
    display: "grid",
    gridTemplateColumns: "1.1fr .9fr",
    gap: "40px",
    alignItems: "center",
  },
  pillBadge: {
    display: "inline-block",
    background: "#E4F2F1",
    color: "#0F6068",
    fontWeight: "800",
    fontSize: "14px",
    padding: "7px 14px",
    borderRadius: "999px",
    marginBottom: "18px",
  },
  h1: {
    fontFamily: '"Baloo 2", cursive',
    fontWeight: "800",
    fontSize: "clamp(38px, 6vw, 62px)",
    lineHeight: 1.02,
    margin: "0 0 16px",
    color: "#4A3B33",
  },
  lead: {
    fontSize: "19px",
    lineHeight: 1.6,
    color: "#6f5f52",
    maxWidth: "520px",
    margin: "0 0 26px",
  },
  ctaRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "12px",
  },
  btn: {
    fontWeight: "800",
    fontSize: "17px",
    padding: "14px 26px",
    borderRadius: "999px",
    display: "inline-block",
    textDecoration: "none",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s ease",
  },
  btnPrimary: {
    background: "#16808A",
    color: "#fff",
  },
  btnOutline: {
    background: "#fff",
    color: "#16808A",
    border: "2px solid #16808A",
  },
  heroLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImg: {
    width: "min(380px, 82%)",
    animation: "floaty 5s ease-in-out infinite",
    filter: "drop-shadow(0 20px 30px rgba(74,59,51,.12))",
  },
};
