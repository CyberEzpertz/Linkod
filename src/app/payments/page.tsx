"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: Date;
  status: string;
}

export default function PaymentsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<string>("all")
  
  // Generate transactions with appropriate gaps
  const currentDate = new Date()
  const transactions: Transaction[] = [
    {
      id: "BUS-2025-0823",
      type: "Business Clearance",
      amount: 500.00,
      date: new Date(2025, 6, 15), // July 15, 2025
      status: "Completed"
    },
    {
      id: "IND-2025-0412",
      type: "Individual Clearance",
      amount: 150.00,
      date: new Date(2025, 3, 12), // April 12, 2025
      status: "Completed"
    },
    {
      id: "RES-2025-0201",
      type: "Certificate of No Objection",
      amount: 100.00,
      date: new Date(2025, 1, 1), // February 1, 2025
      status: "Completed"
    },
    {
      id: "BUS-2024-1105",
      type: "Business Clearance",
      amount: 500.00,
      date: new Date(2024, 10, 5), // November 5, 2024
      status: "Completed"
    },
    {
      id: "IND-2024-0820",
      type: "Individual Clearance",
      amount: 150.00,
      date: new Date(2024, 7, 20), // August 20, 2024
      status: "Completed"
    },
    {
      id: "RES-2024-0515",
      type: "Certificate of Residency",
      amount: 100.00,
      date: new Date(2024, 4, 15), // May 15, 2024
      status: "Completed"
    }
  ]

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-3xl space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment History</h1>
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border-2 border-black hover:bg-gray-100"
          >
            Back to Home
          </Button>
        </div>

        <Card className="p-4 sm:p-6 bg-white shadow-lg rounded-xl">
          <div className="border-b pb-4 sm:pb-6 mb-4 sm:mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatAmount(transactions.reduce((sum, t) => sum + t.amount, 0))}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Latest Transaction</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatDate(transactions[0].date)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <select
              className="w-full sm:w-auto px-3 py-2 border rounded-lg text-gray-600 text-sm"
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

          <div className="space-y-6">
            {transactions
              .filter(transaction => {
                if (filter === "all") return true;
                if (filter === "business") return transaction.type.includes("Business");
                if (filter === "individual") return transaction.type.includes("Individual");
                if (filter === "objection") return transaction.type.includes("No Objection");
                if (filter === "residency") return transaction.type.includes("Residency");
                return true;
              })
              .map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex flex-col space-y-4 p-4 border-b last:border-0 hover:bg-gray-50 transition-colors rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1">
                      <p className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
                        {transaction.type}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                    <div className="flex sm:flex-col justify-between sm:text-right">
                      <p className="text-base sm:text-lg font-bold order-2 sm:order-1">
                        {formatAmount(transaction.amount)}
                      </p>
                      <p className={`text-xs sm:text-sm font-semibold order-1 sm:order-2 ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Transaction ID: {transaction.id}
                  </p>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </main>
  )
}