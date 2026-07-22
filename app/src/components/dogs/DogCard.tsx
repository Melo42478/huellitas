import Link from "next/link";
import Image from "next/image";
import { excerpt, metaLine } from "@/lib/helpers";
import type { Dog } from "@/lib/types";
import StatusBadge from "./StatusBadge";

export default function DogCard({ dog }: { dog: Dog }) {
  return (
    <Link
      href={`/perrito/${dog.id}`}
      className="bg-surface border border-border rounded-card overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all"
    >
      {/* Image with status badge */}
      <div className="relative aspect-square overflow-hidden bg-text-muted/5">
        <Image
          src={dog.ahora || ""}
          alt={dog.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <StatusBadge estado={dog.estado} />
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-display font-extrabold text-2xl text-teal mb-1">{dog.name}</h3>
        <p className="text-xs text-text-muted font-bold mb-2.5">{metaLine(dog)}</p>
        <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">
          {excerpt(dog.historia)}
        </p>
      </div>
    </Link>
  );
}
