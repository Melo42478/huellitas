import Link from "next/link";
import Image from "next/image";
import { excerpt, metaLine } from "@/lib/helpers";
import type { Dog } from "@/lib/types";
import type { CSSProperties } from "react";
import { getImageUrl } from "@/lib/dogAssets";
import StatusBadge from "./StatusBadge";
import DogPlaceholder from "./DogPlaceholder";

export default function DogCard({ dog }: { dog: Dog }) {
  const imageUrl = getImageUrl(dog.id);

  return (
    <Link
      href={`/perrito/${dog.id}`}
      style={cardStyle.card}
    >
      {/* Image with status badge */}
      <div style={cardStyle.imgbox}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={dog.name}
            fill
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <DogPlaceholder name={dog.name} />
        )}
        <div style={cardStyle.status}>
          <StatusBadge estado={dog.estado} />
        </div>
      </div>

      {/* Body */}
      <div style={cardStyle.body}>
        <div style={cardStyle.name}>{dog.name}</div>
        <div style={cardStyle.meta}>{metaLine(dog)}</div>
        <div style={cardStyle.excerpt}>
          {excerpt(dog.historia)}
        </div>
      </div>
    </Link>
  );
}

const cardStyle: Record<string, CSSProperties> = {
  card: {
    background: "#FFFDF8",
    border: "1px solid #ece0cb",
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
  imgbox: {
    position: "relative",
    aspectRatio: "1 / 1",
    overflow: "hidden",
  } as CSSProperties,
  status: {
    position: "absolute",
    top: "12px",
    left: "12px",
  } as CSSProperties,
  body: {
    padding: "16px 18px 18px",
  } as CSSProperties,
  name: {
    fontFamily: '"Baloo 2", cursive',
    fontWeight: "800",
    fontSize: "24px",
    color: "#16808A",
  } as CSSProperties,
  meta: {
    color: "#8A7A6E",
    fontSize: "14px",
    fontWeight: "700",
    margin: "2px 0 10px",
  } as CSSProperties,
  excerpt: {
    color: "#6f5f52",
    fontSize: "15px",
    lineHeight: 1.5,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  } as CSSProperties,
};
