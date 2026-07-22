"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const filters = [
  { value: "todos", label: "Todos" },
  { value: "adopcion", label: "En adopción" },
  { value: "tratamiento", label: "En tratamiento" },
  { value: "adoptado", label: "Adoptados" },
];

export default function FilterPills() {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("estado") || "todos";

  return (
    <div className="flex flex-wrap gap-2.5">
      {filters.map((filter) => (
        <Link
          key={filter.value}
          href={filter.value === "todos" ? "/galeria" : `/galeria?estado=${filter.value}`}
          className={`font-display font-extrabold text-sm px-4 py-2 rounded-pill border-2 transition-colors ${
            currentFilter === filter.value
              ? "bg-teal text-white border-teal"
              : "bg-surface text-text-secondary2 border-border hover:border-teal"
          }`}
        >
          {filter.label}
        </Link>
      ))}
    </div>
  );
}
