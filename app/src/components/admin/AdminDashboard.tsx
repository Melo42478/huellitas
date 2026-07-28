"use client";

import { createClient } from "@/lib/supabase/browser";
import DogForm from "./DogForm";
import DogList from "./DogList";
import { useState } from "react";
import type { Dog } from "@/lib/types";

interface AdminDashboardProps {
  initialDogs: Dog[];
}

export default function AdminDashboard({
  initialDogs,
}: AdminDashboardProps) {
  const [dogs, setDogs] = useState(initialDogs);

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

      {/* Content */}
      <div className="max-w-full px-5 py-8">
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
      </div>
    </div>
  );
}
