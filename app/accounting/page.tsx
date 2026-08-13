"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Building2,
  Users,
  Plane,
  Hotel,
  Truck,
  FileText,
  CreditCard,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Printer,
  Eye,
  MoreVertical,
} from "lucide-react";

// Types
interface CashEntry {
  id: string;
  date: string;
  description: string;
  category: string;
  debit: number | null;
  credit: number | null;
  balance: number;
}

interface IncomeItem {
  label: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
}

interface ExpenseItem {
  label: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
}

// Mock Data
const mockCashEntries: CashEntry[] = [
  {
    id: "1",
    date: "2024-07-28",
    description: "Invoice INV-2024-0089 — Fatima Malik",
    category: "Bookings",
    debit: 3825,
    credit: null,
    balance: 48320,
  },
  {
    id: "2",
    date: "2024-07-27",
    description: "Office Rent — July 2024",
    category: "Operations",
    debit: null,
    credit: 1200,
    balance: 44495,
  },
  {
    id: "3",
    date: "2024-07-26",
    description: "Invoice INV-2024-0086 — Khalid Al-Rashid",
    category: "Bookings",
    debit: 12840,
    credit: null,
    balance: 45695,
  },
  {
    id: "4",
    date: "2024-07-25",
    description: "Staff Salaries — July",
    category: "Staff",
    debit: null,
    credit: 8500,
    balance: 32855,
  },
  {
    id: "5",
    date: "2024-07-24",
    description: "Emirates Ticket Cost — FLT-0289",
    category: "Suppliers",
    debit: null,
    credit: 980,
    balance: 41355,
  },
  {
    id: "6",
    date: "2024-07-23",
    description: "Partial Payment — Mohammed Qasim",
    category: "Bookings",
    debit: 1550,
    credit: null,
    balance: 42335,
  },
  {
    id: "7",
    date: "2024-07-22",
    description: "Marketing — Social Media Ads",
    category: "Marketing",
    debit: null,
    credit: 350,
    balance: 40785,
  },
  {
    id: "8",
    date: "2024-07-20",
    description: "Invoice INV-2024-0087 (partial) — M. Qasim",
    category: "Bookings",
    debit: 1550,
    credit: null,
    balance: 41135,
  },
];

const incomeData: IncomeItem[] = [
  {
    label: "Flight bookings",
    amount: 48200,
    icon: <Plane className="w-4 h-4" />,
    color: "text-blue-600",
  },
  {
    label: "Visa services",
    amount: 12800,
    icon: <FileText className="w-4 h-4" />,
    color: "text-purple-600",
  },
  {
    label: "Hotel bookings",
    amount: 9600,
    icon: <Hotel className="w-4 h-4" />,
    color: "text-green-600",
  },
  {
    label: "Transport",
    amount: 5800,
    icon: <Truck className="w-4 h-4" />,
    color: "text-orange-600",
  },
];

const expenseData: ExpenseItem[] = [
  {
    label: "Staff salaries",
    amount: 8500,
    icon: <Users className="w-4 h-4" />,
    color: "text-red-600",
  },
  {
    label: "Supplier costs",
    amount: 28200,
    icon: <Building2 className="w-4 h-4" />,
    color: "text-yellow-600",
  },
  {
    label: "Rent & utilities",
    amount: 1800,
    icon: <Building2 className="w-4 h-4" />,
    color: "text-gray-600",
  },
  {
    label: "Marketing",
    amount: 2400,
    icon: <TrendingUp className="w-4 h-4" />,
    color: "text-pink-600",
  },
  {
    label: "Other",
    amount: 2300,
    icon: <DollarSign className="w-4 h-4" />,
    color: "text-gray-400",
  },
];

const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
const netProfit = totalIncome - totalExpenses;

// Quarterly trend data
const quarterlyData = [
  { month: "May", income: 52000, expenses: 32000 },
  { month: "Jun", income: 68000, expenses: 38000 },
  { month: "Jul", income: 76400, expenses: 43200 },
];

const maxValue = Math.max(
  ...quarterlyData.flatMap((d) => [d.income, d.expenses]),
);

export default function AccountingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter entries
  const filteredEntries = mockCashEntries.filter(
    (entry) =>
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEntries = filteredEntries.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return `OMR ${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounting</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cash Balance</p>
              <p className="text-2xl font-bold text-gray-900">OMR 48,320</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12.5% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Income</p>
              <p className="text-2xl font-bold text-blue-600">OMR 76,400</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +6.1% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Expenses</p>
              <p className="text-2xl font-bold text-red-600">OMR 43,200</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            -2.3% from last month
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-100">Net Profit (Jul)</p>
              <p className="text-2xl font-bold">OMR 33,200</p>
            </div>
            <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-xs text-blue-200 mt-2">
            {((netProfit / totalIncome) * 100).toFixed(1)}% profit margin
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Cash Book */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Cash Book — July 2024
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 lg:w-56"
                  />
                </div>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <Filter className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Debit (In)
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credit (Out)
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(entry.date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 max-w-[200px] truncate">
                      {entry.description}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {entry.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 text-right font-medium">
                      {entry.debit ? formatCurrency(entry.debit) : "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-red-600 text-right font-medium">
                      {entry.credit ? formatCurrency(entry.credit) : "—"}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                      {formatCurrency(entry.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t border-gray-200">
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-3 text-sm font-semibold text-gray-900"
                  >
                    Month Total
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-green-600 text-right">
                    {formatCurrency(totalIncome)}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-red-600 text-right">
                    {formatCurrency(totalExpenses)}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                    {formatCurrency(48320)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredEntries.length)} of{" "}
                {filteredEntries.length} entries
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* P&L Summary */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              P&L — July 2024
            </h2>
          </div>

          <div className="p-4">
            {/* Income */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                INCOME
              </h3>
              <div className="space-y-2">
                {incomeData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2 text-gray-600">
                      <span className={item.color}>{item.icon}</span>
                      {item.label}
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between font-semibold text-gray-900">
                  <span>Total Income</span>
                  <span className="text-green-600">
                    {formatCurrency(totalIncome)}
                  </span>
                </div>
              </div>
            </div>

            {/* Expenses */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <ArrowDownRight className="w-4 h-4 text-red-600" />
                EXPENSES
              </h3>
              <div className="space-y-2">
                {expenseData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2 text-gray-600">
                      <span className={item.color}>{item.icon}</span>
                      {item.label}
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between font-semibold text-gray-900">
                  <span>Total Expenses</span>
                  <span className="text-red-600">
                    {formatCurrency(totalExpenses)}
                  </span>
                </div>
              </div>
            </div>

            {/* Net Profit */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  NET PROFIT
                </span>
                <span className="text-xl font-bold text-blue-700">
                  {formatCurrency(netProfit)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quarterly Trend */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Quarterly Trend
            </h2>
            <span className="text-sm text-gray-500">May - Jul 2024</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-end gap-8 h-48">
            {quarterlyData.map((data, index) => {
              const incomeHeight = (data.income / maxValue) * 100;
              const expensesHeight = (data.expenses / maxValue) * 100;

              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-end gap-2 h-40">
                    <div className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-blue-500 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{ height: `${incomeHeight}%`, minHeight: "4px" }}
                      />
                      <span className="text-xs text-gray-500 mt-1">Income</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-red-400 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{
                          height: `${expensesHeight}%`,
                          minHeight: "4px",
                        }}
                      />
                      <span className="text-xs text-gray-500 mt-1">
                        Expenses
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 mt-3">
                    {data.month}
                  </span>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>{formatCurrency(data.income)}</span>
                    <span className="text-gray-300">|</span>
                    <span>{formatCurrency(data.expenses)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span className="text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded" />
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span className="text-sm text-gray-600">Net Profit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
