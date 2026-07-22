// Server-side queries only. For helpers (pct, money, etc.), use lib/helpers.ts

import { Dog } from "./types";
import { createClient } from "./supabase/server";

// Re-export helpers for convenience (they're pure functions, safe everywhere)
export * from "./helpers";

export async function getDogs(filter?: string) {
  const supabase = await createClient();

  let query = supabase.from("dogs").select("*").order("created_at", { ascending: false });

  if (filter && filter !== "todos") {
    query = query.eq("estado", filter);
  }

  const { data, error } = await query;

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
