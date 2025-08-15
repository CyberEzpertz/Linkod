"use client";

import BackNavBar from "@/components/back-nav-bar";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: Date;
  status: string;
}

export default function PaymentsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("all");

  // Generate transactions with appropriate gaps
  const currentDate = new Date();
  const transactions: Transaction[] = [
    {
      id: "BUS-2025-0823",
      type: "Business Clearance",
      amount: 500.0,
      date: new Date(2025, 6, 15), // July 15, 2025
      status: "Completed",
    },
    {
      id: "IND-2025-0412",
      type: "Individual Clearance",
      amount: 150.0,
      date: new Date(2025, 3, 12), // April 12, 2025
      status: "Completed",
    },
    {
      id: "RES-2025-0201",
      type: "Certificate of No Objection",
      amount: 100.0,
      date: new Date(2025, 1, 1), // February 1, 2025
      status: "Completed",
    },
    {
      id: "BUS-2024-1105",
      type: "Business Clearance",
      amount: 500.0,
      date: new Date(2024, 10, 5), // November 5, 2024
      status: "Completed",
    },
    {
      id: "IND-2024-0820",
      type: "Individual Clearance",
      amount: 150.0,
      date: new Date(2024, 7, 20), // August 20, 2024
      status: "Completed",
    },
    {
      id: "RES-2024-0515",
      type: "Certificate of Residency",
      amount: 100.0,
      date: new Date(2024, 4, 15), // May 15, 2024
      status: "Completed",
    },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      <BackNavBar title="Payment History" />
      <div className="w-full max-w-3xl space-y-6 p-4 sm:space-y-8">
        <Card className="rounded-xl bg-white p-6 shadow-lg sm:p-6">
          <div className="mb-4 border-b pb-4 sm:mb-6 sm:pb-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Transactions</p>
                <p className="text-foreground text-2xl font-bold">
                  {transactions.length}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-foreground text-2xl font-bold">
                  {formatAmount(
                    transactions.reduce((sum, t) => sum + t.amount, 0)
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Latest Transaction</p>
                <p className="text-foreground text-2xl font-bold">
                  {formatDate(transactions[0].date)}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-col items-start justify-between space-y-3 sm:flex-row sm:items-center sm:space-y-0">
            <h2 className="text-foreground text-lg font-semibold sm:text-xl">
              Recent Transactions
            </h2>
            <select
              className="w-full rounded-lg border px-3 py-2 text-sm text-gray-600 sm:w-auto"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="business">Business Clearance</option>
              <option value="individual">Individual Clearance</option>
              <option value="objection">Certificate of No Objection</option>
              <option value="residency">Certificate of Residency</option>
            </select>
          </div>

          <div className="">
            {transactions
              .filter((transaction) => {
                if (filter === "all") return true;
                if (filter === "business")
                  return transaction.type.includes("Business");
                if (filter === "individual")
                  return transaction.type.includes("Individual");
                if (filter === "objection")
                  return transaction.type.includes("No Objection");
                if (filter === "residency")
                  return transaction.type.includes("Residency");
                return true;
              })
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col rounded-lg border-b px-2 py-4 transition-colors last:border-0 hover:bg-gray-50"
                >
                  <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-y-0">
                    <div className="space-y-1">
                      <div className="inline-flex w-full items-center justify-between">
                        <p className="text-foreground text-base font-semibold tracking-tight sm:text-lg">
                          {transaction.type}
                        </p>
                        <p className="order-2 text-base font-bold sm:order-1 sm:text-lg">
                          {formatAmount(transaction.amount)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 sm:text-sm">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                    <div className="flex justify-between sm:flex-col sm:text-right">
                      <p
                        className={`order-1 text-xs font-semibold sm:order-2 sm:text-sm ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
