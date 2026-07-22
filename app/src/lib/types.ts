export type Estado = "adopcion" | "tratamiento" | "adoptado";
export type Sexo = "Macho" | "Hembra";
export type Tamano = "Pequeño" | "Mediano" | "Grande";

export interface Dog {
  id: string;
  name: string;
  estado: Estado;
  sexo: Sexo;
  edad: string;
  tamano: Tamano;
  ubicacion: string;
  vacunado: boolean;
  esterilizado: boolean;
  historia: string;
  meta: number;
  recaudado: number;
  antes: string | null;
  ahora: string | null;
  gallery: string[];
  created_at: string;
  updated_at: string;
}

export interface Movimiento {
  id: string;
  dog_id: string | null;
  tipo: "ingreso" | "gasto";
  concepto: string;
  monto: number;
  fecha: string;
  created_at: string;
}
