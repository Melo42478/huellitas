/**
 * Seed script: upload assets to Supabase Storage and insert seed dogs + finance data.
 * Run with: npm run seed
 */

import { createAdminClient } from "../src/lib/supabase/admin";
import { generatePlaceholderSvg } from "../src/lib/placeholder";
import * as fs from "fs";
import * as path from "path";

const SEED_DATA = [
  {
    id: "rocky",
    name: "Rocky",
    estado: "adopcion" as const,
    sexo: "Macho" as const,
    edad: "3 años aprox.",
    tamano: "Mediano" as const,
    ubicacion: "Querétaro",
    vacunado: true,
    esterilizado: true,
    historia: `Rocky fue rescatado de los baldíos de Zákia junto a su manada. Al principio, él y sus compañeros fueron vacunados y esterilizados, pero por falta de espacio y adoptantes tuvieron que ser liberados dentro de Zákia.

Días después, una de las perritas apareció sin vida y decidimos rescatar de nuevo a Rocky y Victoria para ponerlos a salvo.

Desde entonces, Rocky ha recibido guardería y entrenamiento para aprender a caminar con correa y socializar. Es un perrito tímido, pero poco a poco ha logrado grandes avances.

Hoy está listo para encontrar una familia paciente y amorosa.`,
    meta: 6000,
    recaudado: 2400,
    assetBefore: "rocky-antes.jpeg",
    assetAfter: "rocky-ahora.jpeg",
    gallery: ["rocky-ahora.jpeg", "rocky-antes.jpeg"],
  },
  {
    id: "victoria",
    name: "Victoria",
    estado: "adopcion" as const,
    sexo: "Hembra" as const,
    edad: "4 años aprox.",
    tamano: "Mediano" as const,
    ubicacion: "Querétaro",
    vacunado: true,
    esterilizado: true,
    historia: `Victoria fue rescatada de los baldíos de Zákia junto a su manada. Nuestro principal objetivo era ayudarla, porque tenía su piel muy lastimada por un hongo que al principio creímos que eran quemaduras. Ella y sus compañeros fueron vacunados y esterilizados, pero al no tener espacio ni adoptantes, tuvieron que ser liberados dentro de Zákia.

Días después, una de las perritas apareció sin vida y decidimos rescatar de nuevo a Victoria y Rocky para ponerlos a salvo.

Desde entonces, Victoria recibió tratamiento para su piel, guardería y entrenamiento para aprender a caminar con correa y socializar. Poco a poco ha logrado grandes avances.

Hoy está recuperada y lista para encontrar una familia que la ame.`,
    meta: 7000,
    recaudado: 3200,
    assetBefore: "victoria-antes.png",
    assetAfter: "victoria-ahora.png",
    gallery: ["victoria-extra.png"],
  },
  {
    id: "caramelo",
    name: "Caramelo",
    estado: "adopcion" as const,
    sexo: "Macho" as const,
    edad: "2 años",
    tamano: "Mediano" as const,
    ubicacion: "Querétaro",
    vacunado: true,
    esterilizado: true,
    historia: `Caramelo fue rescatado junto con su amigo Negrito en el Walmart de Zákia. Negrito fue baleado y la vida de los dos corría mucho peligro en la calle. (Negrito ya tiene familia.)

Hoy Caramelo está listo para encontrar una familia. Es juguetón, amoroso y convive muy bien con otros perros y con niños.

¡Dale la oportunidad de ser parte de tu vida!`,
    meta: 5500,
    recaudado: 1500,
    assetBefore: "caramelo-head.png",
    assetAfter: "caramelo-ahora.png",
    gallery: ["caramelo-head.png"],
  },
  {
    id: "manchas",
    name: "Manchas",
    estado: "adopcion" as const,
    sexo: "Macho" as const,
    edad: "1 año",
    tamano: "Mediano" as const,
    ubicacion: "Querétaro",
    vacunado: true,
    esterilizado: true,
    historia: `Manchas llegó a nosotros muy pequeño y asustado. Poco a poco ha aprendido a confiar en las personas y ahora es un perrito juguetón y cariñoso.

Está sano, vacunado y esterilizado, buscando su hogar definitivo. Tu donación cubre su guardería y alimento mientras encuentra familia.`,
    meta: 6400,
    recaudado: 4100,
    assetBefore: null,
    assetAfter: null,
    gallery: [],
  },
  {
    id: "luna",
    name: "Luna",
    estado: "adoptado" as const,
    sexo: "Hembra" as const,
    edad: "2 años",
    tamano: "Pequeño" as const,
    ubicacion: "Querétaro",
    vacunado: true,
    esterilizado: true,
    historia: `Luna vivía en situación de calle y fue rescatada con desnutrición. Tras meses de cuidados, vacunas y mucho amor, se recuperó por completo.

¡Hoy vive feliz con su nueva familia! Gracias a todas las personas que hicieron posible su historia de arcoíris.`,
    meta: 0,
    recaudado: 0,
    assetBefore: null,
    assetAfter: null,
    gallery: [],
  },
];

const FIN_DATA = [
  { dogId: "rocky", tipo: "ingreso" as const, concepto: "Donación general", monto: 2400, fecha: "2026-05-10" },
  { dogId: "rocky", tipo: "gasto" as const, concepto: "Guardería (mes)", monto: 1800, fecha: "2026-05-15" },
  { dogId: "rocky", tipo: "gasto" as const, concepto: "Vacunas y desparasitación", monto: 650, fecha: "2026-04-28" },
  { dogId: "victoria", tipo: "ingreso" as const, concepto: "Donación apadrinamiento", monto: 3200, fecha: "2026-05-12" },
  { dogId: "victoria", tipo: "gasto" as const, concepto: "Tratamiento dermatológico", monto: 2100, fecha: "2026-05-18" },
  { dogId: "manchas", tipo: "ingreso" as const, concepto: "Donaciones varias", monto: 4100, fecha: "2026-05-20" },
  { dogId: "manchas", tipo: "gasto" as const, concepto: "Esterilización", monto: 900, fecha: "2026-05-02" },
  { dogId: null, tipo: "gasto" as const, concepto: "Alimento (bulto)", monto: 1200, fecha: "2026-05-22" },
];

async function seed() {
  const supabase = createAdminClient();

  console.log("🐾 Starting Huellitas Arcoíris seed...\n");

  // Upload assets to Storage
  console.log("📤 Uploading assets to Storage...");
  const assetDir = path.join(__dirname, "../../../design_handoff_huellitas_arcoiris/assets");

  for (const dog of SEED_DATA) {
    if (dog.assetBefore) {
      const beforePath = path.join(assetDir, dog.assetBefore);
      if (fs.existsSync(beforePath)) {
        const buffer = fs.readFileSync(beforePath);
        await supabase.storage
          .from("dog-photos")
          .upload(`${dog.id}/antes`, buffer, { upsert: true });
      }
    } else {
      // Generate placeholder
      const placeholder = generatePlaceholderSvg(`foto ANTES · ${dog.name}`, "#e6d3cf");
      const buffer = Buffer.from(placeholder.split(",")[1], "base64");
      await supabase.storage
        .from("dog-photos")
        .upload(`${dog.id}/antes.svg`, buffer, { upsert: true });
    }

    if (dog.assetAfter) {
      const afterPath = path.join(assetDir, dog.assetAfter);
      if (fs.existsSync(afterPath)) {
        const buffer = fs.readFileSync(afterPath);
        await supabase.storage
          .from("dog-photos")
          .upload(`${dog.id}/ahora`, buffer, { upsert: true });
      }
    } else {
      const placeholder = generatePlaceholderSvg(`foto AHORA · ${dog.name}`, "#d9e3cf");
      const buffer = Buffer.from(placeholder.split(",")[1], "base64");
      await supabase.storage
        .from("dog-photos")
        .upload(`${dog.id}/ahora.svg`, buffer, { upsert: true });
    }

    for (const galleryAsset of dog.gallery) {
      const galleryPath = path.join(assetDir, galleryAsset);
      if (fs.existsSync(galleryPath)) {
        const buffer = fs.readFileSync(galleryPath);
        const ext = path.extname(galleryAsset);
        await supabase.storage
          .from("dog-photos")
          .upload(`${dog.id}/gallery-${Date.now()}${ext}`, buffer, { upsert: true });
      }
    }
  }

  console.log("✓ Assets uploaded\n");

  // Get public URLs and insert dogs
  console.log("🐕 Inserting dogs...");

  const dogsToInsert = await Promise.all(
    SEED_DATA.map(async (dog) => {
      const before = dog.assetBefore
        ? supabase.storage.from("dog-photos").getPublicUrl(`${dog.id}/antes`).data.publicUrl
        : supabase.storage.from("dog-photos").getPublicUrl(`${dog.id}/antes.svg`).data.publicUrl;

      const after = dog.assetAfter
        ? supabase.storage.from("dog-photos").getPublicUrl(`${dog.id}/ahora`).data.publicUrl
        : supabase.storage.from("dog-photos").getPublicUrl(`${dog.id}/ahora.svg`).data.publicUrl;

      const gallery = await Promise.all(
        dog.gallery.map(async (asset) => {
          const files = await supabase.storage.from("dog-photos").list(`${dog.id}`);
          const file = files.data?.find((f) => f.name.includes(asset.split(".")[0]));
          if (file) {
            return supabase.storage
              .from("dog-photos")
              .getPublicUrl(`${dog.id}/${file.name}`).data.publicUrl;
          }
          return null;
        })
      );

      return {
        id: dog.id,
        name: dog.name,
        estado: dog.estado,
        sexo: dog.sexo,
        edad: dog.edad,
        tamano: dog.tamano,
        ubicacion: dog.ubicacion,
        vacunado: dog.vacunado,
        esterilizado: dog.esterilizado,
        historia: dog.historia,
        meta: dog.meta,
        recaudado: dog.recaudado,
        antes: before,
        ahora: after,
        gallery: gallery.filter(Boolean),
      };
    })
  );

  const { error: dogsError } = await supabase.from("dogs").upsert(dogsToInsert);
  if (dogsError) {
    console.error("❌ Error inserting dogs:", dogsError);
  } else {
    console.log("✓ Dogs inserted\n");
  }

  // Insert finance data
  console.log("💰 Inserting finance data...");
  const movimientosToInsert = FIN_DATA.map((m) => ({
    dog_id: m.dogId,
    tipo: m.tipo,
    concepto: m.concepto,
    monto: m.monto,
    fecha: m.fecha,
  }));

  const { error: finError } = await supabase.from("movimientos").insert(movimientosToInsert);
  if (finError) {
    console.error("❌ Error inserting finance data:", finError);
  } else {
    console.log("✓ Finance data inserted\n");
  }

  console.log("🎉 Seed complete!");
}

seed().catch(console.error);
