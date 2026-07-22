import { getDogs } from "@/lib/dogs";
import HistoriaCard from "@/components/dogs/HistoriaCard";
import EmptyState from "@/components/ui/EmptyState";

export default async function Page() {
  const dogs = await getDogs("adoptado");

  return (
    <section className="max-w-content mx-auto px-5 py-11 md2:py-14">
      <h1 className="font-display font-extrabold text-4xl mb-1">Historias felices</h1>
      <p className="text-text-muted text-lg mb-8">
        Perritos que ya encontraron su hogar de arcoíris. ♥
      </p>

      {dogs.length > 0 ? (
        <div className="grid grid-cols-1 md2:grid-cols-2 lg:grid-cols-3 gap-5 md2:gap-6">
          {dogs.map((dog) => (
            <HistoriaCard key={dog.id} dog={dog} />
          ))}
        </div>
      ) : (
        <EmptyState icon="🌈" message="Pronto compartiremos las primeras historias felices." />
      )}
    </section>
  );
}

export const revalidate = 60;
