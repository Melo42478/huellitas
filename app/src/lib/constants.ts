export const WHATSAPP_DIGITS = "5526591490";
export const WHATSAPP_BASE = `https://wa.me/52${WHATSAPP_DIGITS}`;
export const WHATSAPP_DISPLAY = "55 2659 1490";
export const INSTAGRAM_HANDLE = "huellitas_arcoiris";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
export const UBICACION = "Querétaro, México";

export function whatsappAdoptLink(dogName: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(`Hola, me interesa adoptar a ${dogName} 🐾`)}`;
}

export function whatsappLink(): string {
  return WHATSAPP_BASE;
}
