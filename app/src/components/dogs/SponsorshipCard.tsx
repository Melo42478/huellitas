"use client";

import { useDonateModal } from "@/components/donate/DonateModalContext";
import type { Dog } from "@/lib/types";

export default function SponsorshipCard({ dog }: { dog: Dog }) {
  const { openDonate } = useDonateModal();

  return (
    <div className="bg-gradient-to-br from-teal to-teal-dark text-white rounded-row p-5.5">
      <div className="font-display font-extrabold text-lg mb-1">Apadrina a {dog.name}</div>
      <div className="text-xs opacity-90 mb-3.5">
        Ayúdanos a cubrir su guardería, alimento y tratamiento.
      </div>

      <button
        onClick={() => openDonate(dog.id, dog.name, 200)}
        className="w-full bg-white text-teal font-display font-extrabold py-2.5 rounded-pill hover:opacity-90 transition-opacity cursor-pointer"
      >
        Donar a {dog.name} ♥
      </button>
    </div>
  );
}
