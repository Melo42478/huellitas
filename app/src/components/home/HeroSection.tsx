import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-surface to-bg border-b border-border">
      {/* Decorative circles */}
      <div className="absolute top-[-40px] right-[-30px] w-[180px] h-[180px] rounded-full bg-pink/20 blur-3xl" />
      <div className="absolute bottom-[-50px] left-[-30px] w-[160px] h-[160px] rounded-full bg-green-soft/30 blur-3xl" />

      {/* Content */}
      <div className="relative max-w-content mx-auto px-5 py-16 md2:py-20 grid grid-cols-1 md2:grid-cols-[1.1fr_.9fr] gap-10 md2:gap-10 items-center">
        {/* Left: Text */}
        <div>
          <div className="inline-block bg-teal-soft text-teal-dark font-display font-extrabold text-sm px-3.5 py-1.5 rounded-pill mb-4.5">
            Adopción responsable · Querétaro
          </div>

          <h1 className="font-display font-extrabold text-[clamp(38px,6vw,62px)] leading-tight mb-4 text-text">
            Cada huella merece
            <br />
            <span className="text-teal">un hogar de arcoíris</span>
          </h1>

          <p className="text-text-secondary2 text-lg leading-relaxed mb-7 max-w-xl">
            Rescatamos, curamos y preparamos a perritos en situación de calle para encontrarles una
            familia paciente y amorosa. Conoce sus historias y su increíble transformación.
          </p>

          <div className="flex flex-wrap gap-3.5">
            <Link
              href="/galeria"
              className="inline-block bg-teal text-white font-display font-extrabold px-7 py-3.5 rounded-pill hover:bg-teal-dark transition-colors"
            >
              Conoce a los perritos
            </Link>
            <Link
              href="/donaciones"
              className="inline-block bg-transparent text-teal border-2 border-teal font-display font-extrabold px-7 py-3.5 rounded-pill hover:bg-teal-soft transition-colors"
            >
              Quiero ayudar ♥
            </Link>
          </div>
        </div>

        {/* Right: Logo */}
        <div className="hidden md2:flex justify-center items-center">
          <Image
            src="/assets/logo.png"
            alt="Huellitas Arcoíris"
            width={380}
            height={380}
            className="w-full max-w-xs animate-floaty drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
}
