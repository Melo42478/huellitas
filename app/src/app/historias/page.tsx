import { getDogs } from "@/lib/dogs";
import HistoriasClient from "@/components/stories/HistoriasClient";

export default async function Page() {
  const dogs = await getDogs("adoptado");

  return (
    <section className="max-w-content mx-auto px-5 py-11 md2:py-14">
      <h1 className="font-display font-extrabold text-4xl mb-1">Historias felices</h1>
      <p className="text-text-muted text-lg mb-8">
        Perritos que ya encontraron su hogar de arcoíris. ♥
      </p>

      <HistoriasClient dogs={dogs} />
    </section>
  );
}

export const revalidate = 60;
