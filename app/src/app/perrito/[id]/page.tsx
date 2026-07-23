import Link from "next/link";
import { getDogById } from "@/lib/dogs";
import { paras, showDonate } from "@/lib/helpers";
import { whatsappAdoptLink } from "@/lib/constants";
import { getBeforeAfter, getGallery } from "@/lib/dogAssets";
import BeforeAfter from "@/components/dogs/BeforeAfter";
import DogFacts from "@/components/dogs/DogFacts";
import SponsorshipCard from "@/components/dogs/SponsorshipCard";
import DogGallery from "@/components/dogs/DogGallery";
import StatusBadge from "@/components/dogs/StatusBadge";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PerritoPage({ params }: PageProps) {
  const { id } = await params;
  const dog = await getDogById(id);

  if (!dog) {
    return (
      <section className="max-w-content mx-auto px-5 py-20 text-center">
        <p className="font-display font-bold text-lg text-text-muted mb-3">
          No encontramos a ese perrito.
        </p>
        <Link href="/galeria" className="font-display font-extrabold text-teal hover:text-teal-dark">
          Ver todos los perritos →
        </Link>
      </section>
    );
  }

  const paragraphs = paras(dog.historia);
  const canDonate = showDonate(dog);
  const { before: localBefore, after: localAfter } = getBeforeAfter(dog.id);
  const before = dog.antes || localBefore;
  const after = dog.ahora || localAfter;
  const gallery = getGallery(dog.id);

  return (
    <section className="max-w-5xl mx-auto px-5 py-11 md2:py-14">
      {/* Back link */}
      <Link href="/galeria" className="font-display font-extrabold text-sm text-teal hover:text-teal-dark mb-5 inline-block">
        ← Volver a los perritos
      </Link>

      {/* Before/After */}
      <BeforeAfter antes={before} ahora={after} />

      {/* Main content grid */}
      <div className="grid grid-cols-1 md2:grid-cols-3 gap-8 md2:gap-7">
        {/* Left: name + story */}
        <div className="md2:col-span-2">
          <div className="flex items-start gap-3.5 mb-2">
            <h1 className="font-display font-extrabold text-5xl md2:text-6xl text-teal leading-tight">
              {dog.name}
            </h1>
            <div className="flex-shrink-0 mt-1">
              <StatusBadge estado={dog.estado} />
            </div>
          </div>

          <h2 className="font-display font-bold text-xl text-text mt-6 md2:mt-8 mb-3.5">
            Su historia
          </h2>
          <div className="space-y-3.5">
            {paragraphs.map((para) => (
              <p key={para} className="flex gap-3 text-text-secondary2 text-base leading-relaxed">
                <span className="text-teal flex-shrink-0">🐾</span>
                <span>{para}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Right: aside */}
        <aside className="flex flex-col gap-5">
          <DogFacts dog={dog} />
          {canDonate && <SponsorshipCard dog={dog} />}
          <a
            href={whatsappAdoptLink(dog.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center bg-green text-white font-display font-extrabold py-3.5 rounded-pill hover:opacity-90 transition-opacity"
          >
            Quiero adoptar a {dog.name}
          </a>
        </aside>
      </div>

      {/* Gallery */}
      {gallery.length > 0 && <DogGallery images={gallery} name={dog.name} />}
    </section>
  );
}

export const revalidate = 30;
