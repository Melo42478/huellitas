import Image from "next/image";

export default function BeforeAfter({
  antes,
  ahora,
}: {
  antes: string | null;
  ahora: string | null;
}) {
  return (
    <div className="grid grid-cols-1 md2:grid-cols-2 gap-3.5 mb-7">
      {/* ANTES */}
      <div className="relative rounded-card overflow-hidden border-4 border-teal" style={{ aspectRatio: "4/3" }}>
        {antes && (
          <>
            {/* Blurred background */}
            <Image
              src={antes}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover blur-lg brightness-90 scale-125"
              aria-hidden
            />
            {/* Sharp image on top */}
            <Image
              src={antes}
              alt="Antes"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain relative z-10"
            />
          </>
        )}
        <div className="absolute top-3 left-3 bg-teal text-white px-4 py-1 rounded-pill font-display font-extrabold text-xs">
          ANTES
        </div>
      </div>

      {/* AHORA */}
      <div className="relative rounded-card overflow-hidden border-4 border-green" style={{ aspectRatio: "4/3" }}>
        {ahora && (
          <Image
            src={ahora}
            alt="Ahora"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        )}
        <div className="absolute top-3 left-3 bg-green text-white px-4 py-1 rounded-pill font-display font-extrabold text-xs">
          AHORA
        </div>
      </div>
    </div>
  );
}
