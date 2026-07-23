import { createAdminClient } from "../src/lib/supabase/admin";
import * as fs from "fs";
import * as path from "path";

const assetDir = path.join(__dirname, "../../../design_handoff_huellitas_arcoiris/assets");

async function debug() {
  console.log("Asset directory:", assetDir);
  console.log("Assets that exist:\n");

  const files = fs.readdirSync(assetDir);
  const lucaFiles = files.filter((f) => f.includes("luca"));

  lucaFiles.forEach((file) => {
    const fullPath = path.join(assetDir, file);
    const exists = fs.existsSync(fullPath);
    console.log(`  ${file}: ${exists ? "✓" : "✗"}`);
  });

  // Now try uploading
  console.log("\nTrying to upload luca-ahora.jpeg...");
  const supabase = createAdminClient();

  const lucaAhoraPath = path.join(assetDir, "luca-ahora.jpeg");
  if (fs.existsSync(lucaAhoraPath)) {
    const buffer = fs.readFileSync(lucaAhoraPath);
    console.log(`File size: ${buffer.length} bytes`);

    const { data, error } = await supabase.storage
      .from("dog-photos")
      .upload("luca/ahora", buffer, { upsert: true });

    if (error) {
      console.log("❌ Upload error:", error);
    } else {
      console.log("✓ Upload successful:", data);
    }
  } else {
    console.log("❌ File not found:", lucaAhoraPath);
  }
}

debug().catch(console.error);
