import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/galeria", label: "Perritos" },
  { href: "/adoptar", label: "Cómo adoptar" },
  { href: "/donaciones", label: "Donar" },
  { href: "/historias", label: "Historias" },
  { href: "/contacto", label: "Contacto" },
];

export default function NavLinks({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <nav className={className}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className="font-display font-extrabold text-sm text-text-secondary2 px-3 py-2 rounded-lg hover:bg-teal-soft transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
