import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_DISPLAY, INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappLink } from "@/lib/constants";

const navLinks = [
  { href: "/galeria", label: "Perritos" },
  { href: "/quienes", label: "Quiénes somos" },
  { href: "/adoptar", label: "Cómo adoptar" },
  { href: "/donaciones", label: "Donaciones" },
];

const contactLinks = [
  { href: whatsappLink(), target: "_blank", label: `WhatsApp: ${WHATSAPP_DISPLAY}` },
  { href: INSTAGRAM_URL, target: "_blank", label: `Instagram: @${INSTAGRAM_HANDLE}` },
];

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-white mt-auto">
      <div className="max-w-content mx-auto px-5 py-10 grid grid-cols-1 md2:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span style={{ flex: "none", width: "60px", height: "60px", borderRadius: "16px", background: "#FFFDF8", display: "flex", alignItems: "center", justifyContent: "center", padding: "7px", boxShadow: "0 4px 12px rgba(0,0,0,.12)" }}>
              <Image
                src="/logo.png"
                alt=""
                width={50}
                height={50}
                className="w-[100%] h-[100%] object-contain"
              />
            </span>
            <span className="font-display font-extrabold text-[22px]">Huellitas Arcoíris</span>
          </div>
          <p className="opacity-90 text-sm leading-relaxed max-w-xs">
            Grupo de rescate sin ánimo de lucro. Rescatamos, curamos y buscamos familias de arcoíris para cada huella.
          </p>
        </div>

        {/* Explora */}
        <div>
          <h3 className="font-display font-extrabold text-lg mb-2">Explora</h3>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-footer-link hover:text-white transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="font-display font-extrabold text-lg mb-2">Contacto</h3>
          <div className="flex flex-col gap-2">
            {contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.target as "_blank" | undefined}
                rel={link.target ? "noopener noreferrer" : undefined}
                className="text-footer-link hover:text-white transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
            <span className="text-footer-link text-sm">Querétaro, México</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 px-5 py-4 flex flex-col md2:flex-row flex-wrap gap-2 items-center justify-center md2:justify-center text-center text-xs opacity-75">
        <span>© {new Date().getFullYear()} Huellitas Arcoíris · Hecho con ♥ para los que no tienen voz</span>
        <Link
          href="/admin"
          className="opacity-90 hover:opacity-100 border border-white/35 px-3 py-1 rounded-pill font-display font-extrabold text-xs"
        >
          Acceso administrador
        </Link>
      </div>
    </footer>
  );
}
