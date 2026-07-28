"use client";

import { useDonateModal } from "./DonateModalContext";
import { BANK_ACCOUNTS, AMAZON_WISHLIST_URL } from "@/lib/content";

interface DonateModalProps {
  dogName?: string;
}

export default function DonateModal({ dogName }: DonateModalProps) {
  const { isOpen, donateId, donateName, amount, closeDonate, setAmount } = useDonateModal();

  if (!isOpen) return null;

  const displayName = donateName || dogName;
  const title = donateId === "__general__" ? "Donación general" : `Donar a ${displayName}`;

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
          Elige tu método preferido de transferencia o compra un producto en Amazon.
        </p>

        {/* Payment methods */}
        <div className="flex flex-col gap-3">
          {/* Bank Transfers */}
          {BANK_ACCOUNTS.map((account) => (
            <div key={account.valor} className="flex flex-col bg-surface border-2 border-border rounded-row p-3.5">
              <div className="flex items-center gap-3.5 mb-3">
                <span className="w-11 h-11 rounded-row flex items-center justify-center text-white font-display font-extrabold text-lg flex-shrink-0" style={{ backgroundColor: "#6FA84E" }}>
                  🏦
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-extrabold text-text text-sm">{account.titular}</div>
                  <div className="text-text-muted text-xs">{account.banco}</div>
                </div>
              </div>

              <div className="bg-bg rounded-row p-3 space-y-2.5 mb-3">
                <div>
                  <div className="text-xs text-text-muted mb-0.5">{account.tipo}</div>
                  <div className="font-mono text-sm text-text font-bold break-all">{account.valor}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(account.valor);
                  alert(`${account.tipo} copiada al portapapeles`);
                }}
                className="w-full bg-teal text-white font-display font-extrabold text-sm px-3 py-2 rounded-pill hover:bg-teal-dark transition-colors cursor-pointer"
              >
                Copiar {account.tipo}
              </button>
            </div>
          ))}

          {/* Amazon Wishlist */}
          <a
            href={AMAZON_WISHLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 bg-surface border-2 border-border hover:border-teal rounded-row p-3.5 transition-colors cursor-pointer"
          >
            <span className="w-11 h-11 rounded-row flex items-center justify-center text-white font-display font-extrabold text-lg flex-shrink-0" style={{ backgroundColor: "#FF9900" }}>
              🎁
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-display font-extrabold text-text text-sm">Dona un producto</div>
              <div className="text-text-muted text-xs">Compra de nuestra lista en Amazon</div>
            </div>
            <span className="text-teal font-display font-extrabold text-sm flex-shrink-0">→</span>
          </a>
        </div>

        {/* Note */}
        <p className="text-text-muted text-xs text-center mt-4.5">
          Al transferir, escríbenos por WhatsApp para confirmar tu donativo.
        </p>
      </div>
    </div>
  );
}
