"use client";

import { useState } from "react";
import type { Dog } from "@/lib/types";
import DogCard from "@/components/dogs/DogCard";
import EmptyState from "@/components/ui/EmptyState";
import PaginationControls from "./PaginationControls";

const ITEMS_PER_PAGE = 12;

interface GaleriaClientProps {
  dogs: Dog[];
}

export default function GaleriaClient({ dogs }: GaleriaClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dogs.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentDogs = dogs.slice(startIdx, endIdx);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {currentDogs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md2:grid-cols-2 lg:grid-cols-3 gap-5 md2:gap-6">
            {currentDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <EmptyState icon="🐾" message="No hay perritos en esta categoría por ahora." />
      )}
    </>
  );
}
