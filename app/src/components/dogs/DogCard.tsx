import Link from "next/link";
import Image from "next/image";
import { excerpt, metaLine } from "@/lib/helpers";
import type { Dog } from "@/lib/types";
import type { CSSProperties } from "react";
import { getImageUrl } from "@/lib/dogAssets";
import { components, cardStyles } from "@/lib/styles";
import StatusBadge from "./StatusBadge";
import DogPlaceholder from "./DogPlaceholder";

export default function DogCard({ dog }: { dog: Dog }) {
  const imageUrl = dog.ahora || getImageUrl(dog.id);

  return (
    <Link
      href={`/perrito/${dog.id}`}
      style={components.card}
    >
      {/* Image with status badge */}
      <div className="relative aspect-square overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={dog.name}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <DogPlaceholder name={dog.name} />
        )}
        <div className="absolute top-3 left-3">
          <StatusBadge estado={dog.estado} />
        </div>
      </div>

      {/* Body */}
      <div style={cardStyles.body}>
        <div style={cardStyles.name}>{dog.name}</div>
        <div style={cardStyles.meta}>{metaLine(dog)}</div>
        <div style={cardStyles.excerpt}>
          {excerpt(dog.historia)}
        </div>
      </div>
    </Link>
  );
}
