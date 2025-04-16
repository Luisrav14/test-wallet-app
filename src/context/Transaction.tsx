"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Transaction = {
  id: string;
  type: "Payment" | "Credit";
  name: string;
  description: string;
  amount: number;
  date: string;
  time: string;
  authorizedUser: string | null;
  pending: boolean;
  icon: string;
  status: "Approved" | "Pending" | "Declined";
  card: string;
};

type TransactionContextType = {
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (transaction: Transaction | null) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  return <TransactionContext.Provider value={{ selectedTransaction, setSelectedTransaction }}>{children}</TransactionContext.Provider>;
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
