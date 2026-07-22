// Pure helpers (can be used in client and server components)

import type { Dog, Estado } from "./types";

export const STATUS: Record<Estado, { label: string; color: string }> = {
  adopcion: { label: "En adopción", color: "#16808A" },
  tratamiento: { label: "En tratamiento", color: "#E39A4E" },
  adoptado: { label: "Adoptado ♥", color: "#6FA84E" },
};

export function money(n: number): string {
  return "$" + (Number(n) || 0).toLocaleString("es-MX");
}

export function pct(dog: Pick<Dog, "meta" | "recaudado">): string {
  const m = Number(dog.meta) || 0;
  if (m <= 0) return "0%";
  return Math.min(100, Math.round((Number(dog.recaudado) || 0) / m * 100)) + "%";
}

export function paras(s: string): string[] {
  return String(s || "")
    .split(/\n{2,}/)
    .map((x) => x.trim())
    .filter(Boolean);
}

export function excerpt(s: string): string {
  const t = String(s || "").replace(/\n+/g, " ").trim();
  return t.length > 120 ? t.slice(0, 120) + "…" : t;
}

interface Fact {
  label: string;
  color: string;
}

export function facts(dog: Dog): Fact[] {
  const F: Fact[] = [];
  if (dog.sexo) F.push({ label: dog.sexo, color: "#EF9BB4" });
  if (dog.edad) F.push({ label: dog.edad, color: "#F0A95C" });
  if (dog.tamano) F.push({ label: "Tamaño " + dog.tamano.toLowerCase(), color: "#9FC26B" });
  if (dog.vacunado) F.push({ label: "Vacunado", color: "#7FA6D6" });
  if (dog.esterilizado) F.push({ label: "Esterilizado", color: "#B394D4" });
  if (dog.ubicacion) F.push({ label: dog.ubicacion, color: "#16808A" });
  return F;
}

export function metaLine(dog: Dog): string {
  return [dog.sexo, dog.edad, dog.tamano].filter(Boolean).join(" · ");
}

export function showDonate(dog: Dog): boolean {
  return dog.meta > 0 && dog.estado !== "adoptado";
}
