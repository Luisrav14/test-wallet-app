"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faSpotify, faAmazon } from "@fortawesome/free-brands-svg-icons";
import { faMoneyCheckAlt, faCoffee, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

interface Transaction {
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
}

interface Props {
  transaction: Transaction;
}

// Mapea string de icono a ícono real de FontAwesome
const iconMap: Record<string, any> = {
  apple: faApple,
  spotify: faSpotify,
  amazon: faAmazon,
  "money-check-alt": faMoneyCheckAlt,
  coffee: faCoffee,
};

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const router = useRouter();

  const icon = iconMap[transaction.icon] || faQuestionCircle;

  return (
    <div
      className="flex justify-between items-center py-3 px-4 border-b bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition"
      onClick={() => router.push(`/detail/${transaction.id}`)}
    >
      <div className="flex items-center gap-3">
        <div className="bg-gray-800 text-white rounded-md p-3">
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        </div>
        <div>
          <div className="font-semibold text-black">{transaction.name}</div>
          <div className="text-xs text-gray-400">
            {transaction.pending ? "Pending - " : ""}
            {transaction.description}
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className={`text-sm font-semibold ${transaction.type === "Payment" ? "text-green-600" : "text-black"}`}>
          {transaction.type === "Payment" ? "+" : "-"}${transaction.amount.toFixed(2)}
        </div>
        <div className="text-xs text-gray-500">
          {transaction.authorizedUser ? `${transaction.authorizedUser} - ` : ""}
          {new Date(transaction.date).toLocaleDateString("en-US", {
            weekday: "short",
          })}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
