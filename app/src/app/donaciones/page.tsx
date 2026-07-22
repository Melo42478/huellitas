import { getDogs } from "@/lib/dogs";
import { money, pct, showDonate } from "@/lib/helpers";
import DonacionesClient from "./DonacionesClient";

export default async function Page() {
  const allDogs = await getDogs();
  const sponsorDogs = allDogs.filter(showDonate);

  return (
    <section className="max-w-content mx-auto px-5 py-11 md2:py-14">
      <h1 className="font-display font-extrabold text-4xl mb-1">Haz una donación</h1>
      <p className="text-text-muted text-lg mb-8 max-w-2xl">
        Cada aporte cubre veterinario, esterilización, alimento y guardería. Puedes donar de forma
        general o elegir un perrito en específico.
      </p>

      <DonacionesClient sponsorDogs={sponsorDogs} money={money} pct={pct} />
    </section>
  );
}

export const revalidate = 60;
