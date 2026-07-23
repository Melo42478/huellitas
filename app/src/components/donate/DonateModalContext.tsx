"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DonateModalContextType {
  isOpen: boolean;
  donateId: string | null;
  donateName: string | null;
  amount: number;
  openDonate: (id: string, name?: string, initialAmount?: number) => void;
  closeDonate: () => void;
  setAmount: (amount: number) => void;
}

const DonateModalContext = createContext<DonateModalContextType | undefined>(undefined);

export function DonateModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [donateId, setDonateId] = useState<string | null>(null);
  const [donateName, setDonateName] = useState<string | null>(null);
  const [amount, setAmount] = useState(200);

  const openDonate = (id: string, name = "", initialAmount = 200) => {
    setDonateId(id);
    setDonateName(name || null);
    setAmount(initialAmount);
    setIsOpen(true);
  };

  const closeDonate = () => {
    setIsOpen(false);
    setDonateId(null);
    setDonateName(null);
  };

  return (
    <DonateModalContext.Provider value={{ isOpen, donateId, donateName, amount, openDonate, closeDonate, setAmount }}>
      {children}
    </DonateModalContext.Provider>
  );
}

export function useDonateModal() {
  const context = useContext(DonateModalContext);
  if (!context) {
    throw new Error("useDonateModal must be used within DonateModalProvider");
  }
  return context;
}
