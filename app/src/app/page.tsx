import Link from "next/link";
import { getDogs } from "@/lib/dogs";
import HeroSection from "@/components/home/HeroSection";
import RescueStepsCard from "@/components/shared/RescueStepsCard";
import StatsBar from "@/components/home/StatsBar";
import DogCard from "@/components/dogs/DogCard";

export default async function Home() {
  const allDogs = await getDogs();
  const adoptionDogs = allDogs.filter((d) => d.estado === "adopcion").slice(0, 3);
  const adoptedCount = allDogs.filter((d) => d.estado === "adoptado").length;
  const totalRescued = allDogs.length;

  const stats = [
    { label: "perritos rescatados", value: totalRescued.toString(), color: "#16808A" },
    { label: "con familia nueva", value: adoptedCount.toString(), color: "#6FA84E" },
    { label: "vacunados y esterilizados", value: "100%", color: "#EF9BB4" },
    { label: "ánimo de lucro", value: "0", color: "#B394D4" },
  ];

  return (
    <>
      <HeroSection />

      {/* Featured dogs */}
      <section className="max-w-content mx-auto px-5 py-12 md2:py-16">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-extrabold text-3xl text-text">
              Perritos buscando familia
            </h2>
            <p className="text-text-muted text-base mt-1">Ellos ya están listos. ¿Y tú?</p>
          </div>
          <Link href="/galeria" className="font-display font-extrabold text-teal hover:text-teal-dark text-sm">
            Ver todos →
          </Link>
        </div>

        {adoptionDogs.length > 0 ? (
          <div className="grid grid-cols-1 md2:grid-cols-2 lg:grid-cols-3 gap-5 md2:gap-6">
            {adoptionDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted">
            <p>No hay perritos disponibles para adopción en este momento.</p>
          </div>
        )}
      </section>

      {/* About teaser */}
      <section className="max-w-content mx-auto px-5 py-12 md2:py-16">
        <div className="bg-surface border border-border rounded-card p-8 md2:p-10 grid grid-cols-1 md2:grid-cols-2 gap-8 md2:gap-10 items-center">
          {/* Text */}
          <div>
            <div className="inline-block bg-purple-soft text-purple-dark font-display font-extrabold text-xs px-3.5 py-1.5 rounded-pill mb-3.5">
              Quiénes somos
            </div>
            <h2 className="font-display font-extrabold text-3xl text-text mb-3.5">
              Vecinos y vecinas con una misión de arcoíris
            </h2>
            <p className="text-text-secondary2 text-base leading-relaxed mb-3">
              Somos un grupo <b>sin ánimo de lucro</b> que ayuda a animalitos en situación de calle,
              maltrato, abandono, sin comida, sin hogar o con enfermedades.
            </p>
            <p className="text-text-secondary2 text-base leading-relaxed">
              Nuestro objetivo es prepararlos para encontrar{" "}
              <b style={{ color: "#EF9BB4" }}>una familia amorosa y responsable.</b>
            </p>
          </div>

          {/* Steps card */}
          <RescueStepsCard />
        </div>
      </section>

      {/* Stats */}
      <StatsBar stats={stats} />
    </>
  );
}

export const revalidate = 60;
