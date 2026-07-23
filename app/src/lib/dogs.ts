// Server-side queries only. For helpers (pct, money, etc.), use lib/helpers.ts

import { Dog } from "./types";
import { createClient } from "./supabase/server";

export async function getDogs(filter?: string) {
  const supabase = await createClient();

  const query = supabase
    .from("dogs")
    .select("id, name, edad, estado, tamano, vacunado, esterilizado, historia, ahora, recaudado, meta, created_at")
    .order("created_at", { ascending: false });

  const filteredQuery = filter && filter !== "todos" ? query.eq("estado", filter) : query;

  const { data, error } = await filteredQuery;

  if (error) {
    console.error("Error fetching dogs:", error);
    return [];
  }

  return (data || []) as Dog[];
}

export async function getDogById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("dogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching dog:", error);
    return null;
  }

  return data as Dog;
}
