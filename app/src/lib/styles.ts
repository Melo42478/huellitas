import type { CSSProperties } from "react";

// Colores exactos de referencia-inicio.html
export const colors = {
  bg: "#FBF4E8",
  surface: "#FFFDF8",
  text: "#4A3B33",
  textSecondary: "#6f5f52",
  textSecondary2: "#5f5045",
  textMuted: "#8A7A6E",
  border: "#ece0cb",
  borderStrong: "#e0d3bf",
  teal: "#16808A",
  tealDark: "#0F6068",
  tealSoft: "#E4F2F1",
  pink: "#EF9BB4",
  green: "#6FA84E",
  greenSoft: "#EDF5F0",
  orange: "#E39A4E",
  orangeLight: "#F0A95C",
  purple: "#B394D4",
  purpleSoft: "#efe7f6",
  red: "#c9463f",
};

// Estilos globales base
export const globalStyles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: '"Nunito", sans-serif',
    color: colors.text,
    backgroundColor: colors.bg,
  } as CSSProperties,
  html: {
    boxSizing: "border-box" as const,
  } as CSSProperties,
  a: {
    color: colors.teal,
    textDecoration: "none",
  } as CSSProperties,
};

// Componentes reutilizables
export const components = {
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
    fontFamily: '"Baloo 2", cursive',
  } as CSSProperties,

  btnPrimary: {
    background: colors.teal,
    color: "#fff",
  } as CSSProperties,

  btnOutline: {
    background: "#fff",
    color: colors.teal,
    border: `2px solid ${colors.teal}`,
  } as CSSProperties,

  card: {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: "22px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 6px 18px rgba(74,59,51,.06)",
    transition: "transform 0.2s, box-shadow 0.2s",
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
  } as CSSProperties,

  cardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 14px 30px rgba(74,59,51,.12)",
  } as CSSProperties,
};

// Hero
export const heroStyles = {
  section: {
    position: "relative" as const,
    overflow: "hidden" as const,
    background: "linear-gradient(180deg, #FFFDF8 0%, #FBF4E8 100%)",
    borderBottom: "1px solid #ece0cb",
  } as CSSProperties,

  blob: {
    position: "absolute" as const,
    borderRadius: "50%",
  } as CSSProperties,

  herogrid: {
    position: "relative" as const,
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "64px 20px",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "40px",
    alignItems: "center",
  } as CSSProperties,

  h1: {
    fontFamily: '"Baloo 2", cursive',
    fontWeight: "800",
    fontSize: "clamp(38px, 6vw, 62px)",
    lineHeight: 1.02,
    margin: "0 0 16px",
    color: colors.text,
  } as CSSProperties,

  lead: {
    fontSize: "19px",
    lineHeight: 1.6,
    color: colors.textSecondary,
    maxWidth: "520px",
    margin: "0 0 26px",
  } as CSSProperties,

  heroLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as CSSProperties,
};

// Cards
export const cardStyles = {
  imgbox: {
    position: "relative" as const,
    aspectRatio: "1 / 1",
    overflow: "hidden" as const,
  } as CSSProperties,

  body: {
    padding: "16px 18px 18px",
  } as CSSProperties,

  name: {
    fontFamily: '"Baloo 2", cursive',
    fontWeight: "800",
    fontSize: "24px",
    color: colors.teal,
  } as CSSProperties,

  meta: {
    color: colors.textMuted,
    fontSize: "14px",
    fontWeight: "700",
    margin: "2px 0 10px",
  } as CSSProperties,

  excerpt: {
    color: colors.textSecondary,
    fontSize: "15px",
    lineHeight: 1.5,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  } as CSSProperties,
};
