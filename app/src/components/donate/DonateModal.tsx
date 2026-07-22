"use client";

import Link from "next/link";
import { useDonateModal } from "./DonateModalContext";
import { DONATE_AMOUNTS, DONATE_METHODS } from "@/lib/content";

interface DonateModalProps {
  dogName?: string;
}

export default function DonateModal({ dogName }: DonateModalProps) {
  const { isOpen, donateId, amount, closeDonate, setAmount } = useDonateModal();

  if (!isOpen) return null;

  const title = donateId === "__general__" ? "Donación general" : `Donar a ${dogName}`;

  return (
    <div
      onClick={closeDonate}
      className="fixed inset-0 z-60 bg-black/55 flex items-center justify-center px-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg rounded-card max-w-[460px] w-full max-h-[90vh] overflow-auto p-7"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <h2 className="font-display font-extrabold text-2xl text-teal">{title}</h2>
          <button
            onClick={closeDonate}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-text-muted/10 hover:bg-text-muted/20 flex items-center justify-center cursor-pointer transition-colors font-display font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <p className="text-text-secondary2 text-sm mb-4.5">
          Elige un monto y tu método preferido. Te llevaremos al pago seguro.
        </p>

        {/* Amount buttons */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          {DONATE_AMOUNTS.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className={`font-display font-extrabold text-sm px-4.5 py-2.5 rounded-input transition-colors ${
                amount === amt
                  ? "bg-teal-soft text-teal-dark border-2 border-teal"
                  : "bg-surface text-text-secondary2 border-2 border-border hover:border-teal"
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Payment methods */}
        <div className="flex flex-col gap-3">
          {DONATE_METHODS.map((method) => (
            <a
              key={method.name}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 bg-surface border-2 border-border hover:border-teal rounded-row p-3.5 transition-colors"
            >
              <span
                className="w-11 h-11 rounded-row flex items-center justify-center text-white font-display font-extrabold text-lg flex-shrink-0"
                style={{ backgroundColor: method.color }}
              >
                {method.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-extrabold text-text text-sm">{method.name}</div>
                <div className="text-text-muted text-xs">{method.desc}</div>
              </div>
              <span className="text-teal font-display font-extrabold text-sm flex-shrink-0">→</span>
            </a>
          ))}
        </div>

        {/* Note */}
        <p className="text-text-muted text-xs text-center mt-4.5">
          Los enlaces de pago se conectan al activar tu cuenta (Mercado Pago, PayPal o Stripe).
        </p>
      </div>
    </div>
  );
}
