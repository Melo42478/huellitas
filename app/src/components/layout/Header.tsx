"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import NavLinks from "./NavLinks";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/92 backdrop-blur-sm border-b border-border">
      <div className="max-w-content mx-auto px-5 h-[74px] flex items-center gap-3">
        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Huellitas Arcoíris"
            width={54}
            height={54}
            className="w-[54px] h-[54px] object-contain"
            priority
          />
          <span className="font-display font-extrabold text-[22px] leading-none">
            Huellitas <span className="text-pink">Arcoíris</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="ml-auto hidden md2:flex">
          <NavLinks className="flex gap-0.5 flex-wrap" />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto md2:hidden flex items-center justify-center w-11 h-11 rounded-lg bg-teal-soft text-teal font-display font-extrabold text-lg cursor-pointer hover:bg-teal hover:text-white transition-colors"
          aria-label="Menú"
        >
          ☰
        </button>

        {/* Mobile nav panel */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-bg border-b border-border md2:hidden">
            <NavLinks className="flex flex-col gap-0 p-3" onNavigate={() => setMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}
