"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import DogForm from "./DogForm";
import DogList from "./DogList";
import FinancePanel from "./FinancePanel";
import type { Dog } from "@/lib/types";
import type { Movimiento } from "@/lib/types";

interface AdminDashboardProps {
  initialDogs: Dog[];
  initialMovimientos: Movimiento[];
}

export default function AdminDashboard({
  initialDogs,
  initialMovimientos,
}: AdminDashboardProps) {
  const [dogs, setDogs] = useState(initialDogs);
  const [movimientos, setMovimientos] = useState(initialMovimientos);
  const [tab, setTab] = useState<"dogs" | "finance">("dogs");

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-full px-5 py-4 flex items-center justify-between">
          <h1 className="font-display font-extrabold text-2xl text-text">
            🐾 Huellitas Admin
          </h1>
          <button
            onClick={handleLogout}
            className="font-bold text-sm px-4 py-2 rounded-pill border border-border hover:bg-surface transition-colors cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-full px-5 py-4 border-b border-border bg-white">
        <div className="flex gap-6">
          <button
            onClick={() => setTab("dogs")}
            className={`font-bold text-sm pb-2 border-b-2 transition-colors cursor-pointer ${
              tab === "dogs"
                ? "border-teal text-teal"
                : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            Perritos
          </button>
          <button
            onClick={() => setTab("finance")}
            className={`font-bold text-sm pb-2 border-b-2 transition-colors cursor-pointer ${
              tab === "finance"
                ? "border-teal text-teal"
                : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            Finanzas
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-full px-5 py-8">
        {tab === "dogs" && (
          <div className="space-y-8">
            <DogForm onDogAdded={(newDog) => setDogs([...dogs, newDog])} />
            <DogList
              dogs={dogs}
              onDogDeleted={(deletedId) =>
                setDogs(dogs.filter((d) => d.id !== deletedId))
              }
              onDogUpdated={(updated) =>
                setDogs(dogs.map((d) => (d.id === updated.id ? updated : d)))
              }
            />
          </div>
        )}

        {tab === "finance" && (
          <FinancePanel
            dogs={dogs}
            movimientos={movimientos}
            onMovimientoAdded={(newMov) =>
              setMovimientos([...movimientos, newMov])
            }
            onMovimientoDeleted={(deletedId) =>
              setMovimientos(
                movimientos.filter((m) => m.id !== deletedId)
              )
            }
          />
        )}
      </div>
    </div>
  );
}
