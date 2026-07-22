export const dogAssetMap: Record<string, { before: string; after: string; gallery: string[] }> = {
  rocky: {
    before: "/assets/rocky-antes.jpeg",
    after: "/assets/rocky-ahora.jpeg",
    gallery: [],
  },
  victoria: {
    before: "/assets/victoria-antes.png",
    after: "/assets/victoria-ahora.png",
    gallery: ["/assets/victoria-extra.png"],
  },
  caramelo: {
    before: "/assets/caramelo-head.png",
    after: "/assets/caramelo-ahora.png",
    gallery: [],
  },
};

export function getImageUrl(dogId: string): string | null {
  return dogAssetMap[dogId]?.after || null;
}

export function getBeforeAfter(dogId: string): { before: string | null; after: string | null } {
  const assets = dogAssetMap[dogId];
  if (!assets) return { before: null, after: null };
  return { before: assets.before, after: assets.after };
}

export function getGallery(dogId: string): string[] {
  return dogAssetMap[dogId]?.gallery || [];
}
