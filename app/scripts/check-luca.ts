import { createAdminClient } from "../src/lib/supabase/admin";

async function checkLuca() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("dogs")
    .select("id, name, ahora, antes")
    .eq("id", "luca")
    .single();

  if (error) {
    console.error("Error fetching Luca:", error);
    return;
  }

  console.log("Luca data:");
  console.log(JSON.stringify(data, null, 2));
}

checkLuca().catch(console.error);
