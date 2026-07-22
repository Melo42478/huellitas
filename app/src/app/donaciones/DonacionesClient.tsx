"use client";

import Image from "next/image";
import { useDonateModal } from "@/components/donate/DonateModalContext";
import type { Dog } from "@/lib/types";
import { showDonate } from "@/lib/helpers";

interface DonacionesClientProps {
  sponsorDogs: Dog[];
  money: (n: number) => string;
  pct: (dog: { meta: number; recaudado: number }) => string;
}

export default function DonacionesClient({
  sponsorDogs,
  money,
  pct,
}: DonacionesClientProps) {
  const { openDonate } = useDonateModal();

  return (
    <>
      {/* General donation banner */}
      <div className="bg-gradient-to-br from-teal to-teal-dark text-white rounded-card p-7.5 mb-8 flex flex-col md2:flex-row gap-6 md2:gap-8 md2:items-center md2:justify-between">
        <div>
          <div className="font-display font-extrabold text-2xl mb-1">Donación general</div>
          <div className="text-sm opacity-90 max-w-sm">
            Apoya a todos los rescates. Tú eliges el monto y el método.
          </div>
        </div>
        <button
          onClick={() => openDonate("__general__", 200)}
          className="flex-shrink-0 bg-white text-teal font-display font-extrabold text-base px-8 py-3.5 rounded-pill hover:opacity-90 transition-opacity cursor-pointer"
        >
          Donar ahora ♥
        </button>
      </div>

      {/* Sponsor a dog section */}
      <h2 className="font-display font-extrabold text-2xl mb-4.5">Apadrina a un perrito</h2>

      {sponsorDogs.length > 0 ? (
        <div className="grid grid-cols-1 md2:grid-cols-2 lg:grid-cols-3 gap-5">
          {sponsorDogs.map((dog) => {
            const percentage = pct(dog);
            return (
              <div key={dog.id} className="bg-surface border border-border rounded-row p-4 flex gap-3.5 items-stretch">
                {/* Photo */}
                {dog.ahora && (
                  <Image
                    src={dog.ahora}
                    alt={dog.name}
                    width={82}
                    height={82}
                    className="w-[82px] h-[82px] rounded-row object-cover flex-shrink-0"
                  />
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="font-display font-extrabold text-base text-teal leading-tight mb-auto">
                    {dog.name} · {dog.edad}
                  </div>

                  {/* Progress bar */}
                  <div className="bg-border h-2.5 rounded-pill overflow-hidden my-2">
                    <div
                      className="h-full bg-green rounded-pill transition-all"
                      style={{ width: percentage }}
                    />
                  </div>

                  <div className="text-xs font-display font-bold text-text-muted mb-2.5">
                    {money(dog.recaudado)} de {money(dog.meta)} recaudados
                  </div>

                  <button
                    onClick={() => openDonate(dog.id, 200)}
                    className="self-start bg-teal text-white font-display font-extrabold text-xs px-4.5 py-2 rounded-pill hover:bg-teal-dark transition-colors cursor-pointer"
                  >
                    Donar a {dog.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 px-5 text-text-muted bg-surface border-2 border-dashed border-border rounded-card">
          <div className="text-4xl mb-2">🐾</div>
          <p className="font-display font-extrabold text-base">
            No hay perritos disponibles para apadrinamiento en este momento.
          </p>
        </div>
      )}
    </>
  );
}
