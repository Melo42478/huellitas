import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_DISPLAY, INSTAGRAM_HANDLE, INSTAGRAM_URL, UBICACION, whatsappLink } from "@/lib/constants";

export default function Page() {
  return (
    <section className="max-w-content mx-auto px-5 py-11 md2:py-14">
      <h1 className="font-display font-extrabold text-4xl mb-1">Contacto</h1>
      <p className="text-text-muted text-lg mb-8">
        Escríbenos para adoptar, donar o sumarte como voluntario.
      </p>

      <div className="grid grid-cols-1 md2:grid-cols-2 gap-6">
        {/* Left: Contact cards */}
        <div className="flex flex-col gap-3.5">
          {/* WhatsApp */}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 bg-surface border border-border hover:border-green rounded-row p-4.5 transition-colors"
          >
            <span className="w-11 h-11 rounded-pill bg-green text-white flex items-center justify-center text-xl flex-shrink-0">
              💬
            </span>
            <div>
              <div className="font-display font-extrabold text-text text-sm">WhatsApp</div>
              <div className="text-text-secondary2 text-sm">{WHATSAPP_DISPLAY}</div>
            </div>
          </a>

          {/* Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 bg-surface border border-border hover:border-pink rounded-row p-4.5 transition-colors"
          >
            <span className="w-11 h-11 rounded-pill bg-pink text-white flex items-center justify-center text-xl flex-shrink-0">
              📷
            </span>
            <div>
              <div className="font-display font-extrabold text-text text-sm">Instagram</div>
              <div className="text-text-secondary2 text-sm">@{INSTAGRAM_HANDLE}</div>
            </div>
          </a>

          {/* Ubicación */}
          <div className="flex items-center gap-3.5 bg-surface border border-border rounded-row p-4.5">
            <span className="w-11 h-11 rounded-pill bg-orange text-white flex items-center justify-center text-xl flex-shrink-0">
              📍
            </span>
            <div>
              <div className="font-display font-extrabold text-text text-sm">Ubicación</div>
              <div className="text-text-secondary2 text-sm">{UBICACION}</div>
            </div>
          </div>
        </div>

        {/* Right: Instagram QR */}
        <div className="bg-surface border border-border rounded-card p-6 text-center">
          <div className="font-display font-extrabold text-lg text-teal mb-3.5">Síguenos en Instagram</div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="block mb-3">
            <Image
              src="/assets/instagram-qr.jpeg"
              alt="QR de Instagram"
              width={280}
              height={280}
              className="w-full max-w-xs mx-auto rounded-row"
              priority
            />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-text-muted font-display font-extrabold text-sm hover:text-teal transition-colors"
          >
            @{INSTAGRAM_HANDLE} →
          </a>
        </div>
      </div>
    </section>
  );
}
