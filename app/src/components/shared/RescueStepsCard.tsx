import { RESCUE_STEPS } from "@/lib/content";

export default function RescueStepsCard() {
  return (
    <div className="bg-green-soft border border-border rounded-row p-6">
      <h3 className="font-display font-extrabold text-lg text-green mb-4">
        ¿Qué hacemos con cada rescate?
      </h3>
      <div className="flex flex-col gap-3">
        {RESCUE_STEPS.map((step) => (
          <div key={step.label} className="flex items-center gap-3.5">
            <div
              className="flex-shrink-0 w-11 h-11 rounded-pill flex items-center justify-center font-display font-bold text-lg"
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
  );
}
