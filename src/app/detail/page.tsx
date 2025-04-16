"use client";

import { notFound } from "next/navigation";
import { useTransaction } from "@/context/Transaction";

export default function DetailPage() {
  const { selectedTransaction } = useTransaction();

  if (!selectedTransaction) return notFound();

  return (
    <div className="p-6 flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="text-4xl font-semibold mt-6 text-black">${selectedTransaction.amount.toFixed(2)}</div>
      <div className="text-sm text-gray-500">{selectedTransaction.name}</div>
      <div className="text-sm text-gray-400 mt-1">
        {selectedTransaction.date} {selectedTransaction.time}
      </div>

      <div className="bg-white rounded-xl shadow-md mt-6 w-full max-w-md">
        <div className="p-4 border-b">
          <div className="text-sm font-semibold text-black">Status: {selectedTransaction.status}</div>
          <div className="text-xs text-gray-500">{selectedTransaction.card}</div>
        </div>
        <div className="p-4 flex justify-between text-black">
          <span className="text-sm">Total</span>
          <span className="text-sm font-semibold">${selectedTransaction.amount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
