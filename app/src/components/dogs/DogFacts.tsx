import { facts } from "@/lib/helpers";
import type { Dog } from "@/lib/types";

export default function DogFacts({ dog }: { dog: Dog }) {
  const factsList = facts(dog);

  return (
    <div className="bg-surface border border-border rounded-row p-5">
      <div className="font-display font-extrabold text-lg text-teal mb-3">Datos de {dog.name}</div>
      <div className="flex flex-col gap-2.5">
        {factsList.map((fact, i) => (
          <div key={i} className="flex items-center gap-2.5 font-bold text-text-secondary2 text-sm">
            <span style={{ color: fact.color }}>🐾</span>
            <span>{fact.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
