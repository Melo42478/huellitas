import { createAdminClient } from "../src/lib/supabase/admin";

async function checkStorage() {
  const supabase = createAdminClient();
  const dogs = ["luca", "rocky", "victoria", "caramelo"];

  for (const dog of dogs) {
    console.log(`\n📁 ${dog}:`);
    const { data, error } = await supabase.storage.from("dog-photos").list(dog);

    if (error) {
      console.log(`  ❌ Error: ${error.message}`);
      continue;
    }

    if (data && data.length > 0) {
      for (const file of data) {
        console.log(`  - ${file.name}`);
      }
    } else {
      console.log("  (empty)");
    }
  }
}

checkStorage().catch(console.error);
