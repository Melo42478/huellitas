import Image from "next/image";

export default function DogGallery({ images, name }: { images: string[]; name: string }) {
  if (images.length === 0) return null;

  return (
    <div className="mt-9 md2:mt-12">
      <h2 className="font-display font-bold text-xl text-text mb-3.5">Más fotos</h2>
      <div className="grid grid-cols-2 md2:grid-cols-4 gap-3">
        {images.map((url, i) => (
          <div key={i} className="relative rounded-row overflow-hidden border border-border" style={{ aspectRatio: "1" }}>
            <Image src={url} alt={`Foto de ${name}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
