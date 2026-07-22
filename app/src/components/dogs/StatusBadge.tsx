import { STATUS } from "@/lib/dogs";
import type { Estado } from "@/lib/types";

export default function StatusBadge({ estado }: { estado: Estado }) {
  const { label, color } = STATUS[estado];
  return (
    <span
      className="px-3 py-1 rounded-pill text-white text-xs font-display font-extrabold"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}
