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
      <div style={cardStyles.imgbox}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={dog.name}
            fill
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" } as CSSProperties}
          />
        ) : (
          <DogPlaceholder name={dog.name} />
        )}
        <div style={{ position: "absolute", top: "12px", left: "12px" } as CSSProperties}>
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
