import Link from "next/link";
import Image from "next/image";
import { excerpt } from "@/lib/helpers";
import type { Dog } from "@/lib/types";
import { getBeforeAfter } from "@/lib/dogAssets";
import DogPlaceholder from "./DogPlaceholder";

export default function HistoriaCard({ dog }: { dog: Dog }) {
  const images = getBeforeAfter(dog.id);

  return (
    <Link
      href={`/perrito/${dog.id}`}
      className="bg-surface border border-border rounded-card overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all"
    >
      {/* Before/After side by side */}
      <div className="grid grid-cols-2 gap-0">
        {/* Before */}
        <div className="relative aspect-square overflow-hidden bg-text-muted/5">
          {images.before ? (
            <Image src={images.before} alt="Antes" fill loading="lazy" className="object-cover" />
          ) : (
            <DogPlaceholder name={dog.name} />
          )}
        </div>

        {/* After */}
        <div className="relative aspect-square overflow-hidden bg-text-muted/5">
          {images.after ? (
            <Image src={images.after} alt="Ahora" fill loading="lazy" className="object-cover" />
          ) : (
            <DogPlaceholder name={dog.name} />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-display font-extrabold text-lg text-green mb-1.5">
          {dog.name} · Adoptado ♥
        </h3>
        <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">
          {excerpt(dog.historia)}
        </p>
      </div>
    </Link>
  );
}
