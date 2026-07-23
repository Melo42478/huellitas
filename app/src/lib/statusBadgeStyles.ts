// Status badge colors and styles
// Used in StatusBadge component, filtered pills, and throughout the app

export const STATUS_COLORS = {
  adopcion: {
    label: "Para Adopción",
    badge: "#16808A", // Teal
    bg: "#c9eff1", // Light teal
    text: "#16808A",
  },
  adoptado: {
    label: "Adoptado",
    badge: "#6FA84E", // Green
    bg: "#e8f5de", // Light green
    text: "#6FA84E",
  },
  tratamiento: {
    label: "En Tratamiento",
    badge: "#F0A95C", // Orange
    bg: "#fde8d1", // Light orange
    text: "#F0A95C",
  },
  hospederia: {
    label: "En Hospedería",
    badge: "#B394D4", // Purple
    bg: "#ede6f7", // Light purple
    text: "#B394D4",
  },
  default: {
    label: "Desconocido",
    badge: "#94a3b8", // Muted
    bg: "#f1f5f9", // Light gray
    text: "#94a3b8",
  },
} as const;

export type EstadoPerro = keyof typeof STATUS_COLORS;

export function getStatusStyle(estado?: string) {
  const key = (estado?.toLowerCase() || "default") as EstadoPerro;
  return STATUS_COLORS[key] || STATUS_COLORS.default;
}
