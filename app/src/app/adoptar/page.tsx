import Link from "next/link";
import { ADOPT_STEPS } from "@/lib/content";
import { whatsappLink } from "@/lib/constants";

export default function Page() {
  return (
    <section className="max-w-content mx-auto px-5 py-11 md2:py-14">
      <h1 className="font-display font-extrabold text-4xl mb-1">Cómo adoptar</h1>
      <p className="text-text-muted text-lg mb-8">
        La adopción es responsable, gratuita y con seguimiento. Estos son los pasos:
      </p>

      <div className="flex flex-col gap-4 mb-8">
        {ADOPT_STEPS.map((step) => (
          <div
            key={step.n}
            className="flex gap-4.5 items-flex-start bg-surface border border-border rounded-row p-5"
          >
            <div
              className="flex-shrink-0 w-12 h-12 rounded-pill text-white font-display font-extrabold text-lg flex items-center justify-center"
              style={{ backgroundColor: step.color }}
            >
              {step.n}
            </div>
            <div>
              <div className="font-display font-extrabold text-lg text-text mb-0.5">{step.title}</div>
              <div className="text-text-secondary text-sm leading-relaxed">{step.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-teal text-white font-display font-extrabold text-lg px-9 py-4 rounded-pill hover:bg-teal-dark transition-colors"
        >
          Iniciar mi adopción por WhatsApp
        </a>
      </div>
    </section>
  );
}
