import { RESCUE_STEPS } from "@/lib/content";

export default function Page() {
  return (
    <section className="max-w-content mx-auto px-5 py-11 md2:py-14">
      <h1 className="font-display font-extrabold text-4xl mb-1">¿Quiénes somos?</h1>
      <p className="text-text-muted text-lg mb-8">
        Vecinas y vecinos con una misión de arcoíris.
      </p>

      <div className="grid grid-cols-1 md2:grid-cols-2 gap-6">
        {/* Left: Text cards */}
        <div className="flex flex-col gap-4">
          {/* Misión */}
          <div className="bg-surface border border-border rounded-row p-5.5">
            <p className="text-text-secondary2 text-base leading-relaxed">
              Somos un grupo de vecinos y vecinas que ayudamos a animalitos en situación de calle,
              maltrato, abandono, sin comida, sin hogar o con enfermedades.
            </p>
          </div>

          {/* Sin ánimo de lucro */}
          <div className="bg-purple-soft border border-border rounded-row p-5.5 flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">🐾</span>
            <p className="font-display font-extrabold text-text text-base">
              Somos un grupo sin ánimo de lucro.
            </p>
          </div>

          {/* Objetivo */}
          <div className="bg-yellow-100 border border-border rounded-row p-5.5">
            <p className="text-text-secondary2 text-base leading-relaxed">
              Nuestro objetivo es prepararlos para encontrar{" "}
              <b style={{ color: "#EF9BB4" }}>una familia amorosa y responsable.</b>
            </p>
          </div>
        </div>

        {/* Right: Rescue steps */}
        <div className="bg-green-soft border border-border rounded-row p-6">
          <h2 className="font-display font-extrabold text-xl text-green mb-4">
            ¿Qué hacemos con cada rescate?
          </h2>
          <div className="flex flex-col gap-3.5">
            {RESCUE_STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-pill flex items-center justify-center text-lg"
                  style={{ backgroundColor: step.color }}
                >
                  {step.icon}
                </div>
                <div className="font-display font-extrabold text-text-secondary2 text-sm">
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
