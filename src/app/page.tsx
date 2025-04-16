"use client";

import React from "react";
import transactionsRaw from "../data/transactions.json";
import TransactionItem from "../components/TransactionItem";

import { useRouter } from "next/navigation";
import { useTransaction } from "@/context/Transaction";

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

export default function Home() {
  const transactions = transactionsRaw.map((tx) => ({
    ...tx,
    type: tx.type as "Payment" | "Credit",
    status: tx.status as "Approved" | "Pending" | "Declined",
  })) as Transaction[];

  const { setSelectedTransaction } = useTransaction();
  const router = useRouter();

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    router.push("/detail");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex-col">
          <div className="bg-white rounded-xl p-4 shadow mb-3">
            <div className="text-sm text-gray-600">Daily Points</div>
            <div className="text-2xl font-semibold text-black">456K</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-sm text-gray-600">Card Balance</div>
            <div className="text-2xl font-semibold text-black">$17.30</div>
            <div className="text-sm text-gray-400">$1,482.70 Available</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow flex flex-col justify-between">
          <div>
            <div className="text-md text-gray-600">No Payment Due</div>
            <div className="text-sm text-gray-400">You’ve paid your September balance.</div>
          </div>
          <div className="flex justify-end mt-2">
            <div className="bg-gray-200 border-1 border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-black">✓</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-md mb-3 text-black">Latest Transactions</h2>
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              onClick={() => handleTransactionClick(tx)} // Manejar clic en la transacción
              className="cursor-pointer"
            >
              <TransactionItem transaction={tx} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
