"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DonateModalContextType {
  isOpen: boolean;
  donateId: string | null;
  amount: number;
  openDonate: (id: string, initialAmount?: number) => void;
  closeDonate: () => void;
  setAmount: (amount: number) => void;
}

const DonateModalContext = createContext<DonateModalContextType | undefined>(undefined);

export function DonateModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [donateId, setDonateId] = useState<string | null>(null);
  const [amount, setAmount] = useState(200);

  const openDonate = (id: string, initialAmount = 200) => {
    setDonateId(id);
    setAmount(initialAmount);
    setIsOpen(true);
  };

  const closeDonate = () => {
    setIsOpen(false);
    setDonateId(null);
  };

  return (
    <DonateModalContext.Provider value={{ isOpen, donateId, amount, openDonate, closeDonate, setAmount }}>
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
