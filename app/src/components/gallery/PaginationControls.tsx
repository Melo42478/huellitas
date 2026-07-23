"use client";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex justify-center gap-3 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-pill border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
      >
        ← Anterior
      </button>

      <div className="flex items-center gap-2 px-4">
        <span className="text-text-muted text-sm font-bold">
          Página {currentPage} de {totalPages}
        </span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-pill border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
      >
        Siguiente →
      </button>
    </div>
  );
}
