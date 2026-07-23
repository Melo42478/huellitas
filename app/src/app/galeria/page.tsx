import { getDogs } from "@/lib/dogs";
import FilterPills from "@/components/gallery/FilterPills";
import GaleriaClient from "@/components/gallery/GaleriaClient";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GaleriaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filter = (params.estado as string) || "todos";

  let dogs = await getDogs();
  if (filter !== "todos") {
    dogs = dogs.filter((d) => d.estado === filter);
  }

  return (
    <section className="max-w-content mx-auto px-5 py-11 md2:py-14">
      <h1 className="font-display font-extrabold text-4xl mb-1">Nuestros perritos</h1>
      <p className="text-text-muted text-lg mb-6 md2:mb-8">
        Filtra por estado y conoce a cada uno.
      </p>

      <div className="mb-6 md2:mb-8">
        <FilterPills />
      </div>

      <GaleriaClient dogs={dogs} />
    </section>
  );
}

export const revalidate = 60;
