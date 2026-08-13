"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  Printer,
  Mail,
  FileText,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Calendar,
  User,
  Building2,
  Phone,
  Mail as MailIcon,
  Globe,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  CreditCard,
  Banknote,
  QrCode,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// Types
interface Invoice {
  id: string;
  customer: string;
  customerId: string;
  issueDate: string;
  dueDate: string;
  total: number;
  subtotal: number;
  vat: number;
  status: "paid" | "partial" | "pending" | "cancelled";
  items: InvoiceItem[];
  paidAmount: number;
  balanceDue: number;
}

interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
  total: number;
}

// Mock Data
const mockInvoices: Invoice[] = [
  {
    id: "INV-2024-0089",
    customer: "Fatima Malik",
    customerId: "CUS-0012",
    issueDate: "2024-07-28",
    dueDate: "2024-08-04",
    total: 3825,
    subtotal: 3633.75,
    vat: 191.25,
    status: "paid",
    paidAmount: 3825,
    balanceDue: 0,
    items: [
      { id: "1", description: "UK Visa", qty: 1, unitPrice: 85, total: 85 },
      {
        id: "2",
        description: "Emirates Flight MCT–LHR",
        qty: 1,
        unitPrice: 1240,
        total: 1240,
      },
      {
        id: "3",
        description: "Hilton Paddington 7N",
        qty: 1,
        unitPrice: 1960,
        total: 1960,
      },
      {
        id: "4",
        description: "Airport Transfer",
        qty: 1,
        unitPrice: 45,
        total: 45,
      },
    ],
  },
  {
    id: "INV-2024-0088",
    customer: "Ahmed Al-Farsi",
    customerId: "CUS-0005",
    issueDate: "2024-07-25",
    dueDate: "2024-08-01",
    total: 2450,
    subtotal: 2333.33,
    vat: 116.67,
    status: "partial",
    paidAmount: 1500,
    balanceDue: 950,
    items: [
      {
        id: "1",
        description: "Oman Air Flight MCT–DXB",
        qty: 1,
        unitPrice: 890,
        total: 890,
      },
      {
        id: "2",
        description: "JW Marriott Dubai 3N",
        qty: 1,
        unitPrice: 1100,
        total: 1100,
      },
      {
        id: "3",
        description: "Airport Transfer",
        qty: 1,
        unitPrice: 80,
        total: 80,
      },
    ],
  },
  {
    id: "INV-2024-0087",
    customer: "Mohammed Qasim",
    customerId: "CUS-0018",
    issueDate: "2024-07-20",
    dueDate: "2024-07-27",
    total: 3100,
    subtotal: 2952.38,
    vat: 147.62,
    status: "paid",
    paidAmount: 3100,
    balanceDue: 0,
    items: [
      {
        id: "1",
        description: "Qatar Airways Flight RUH–CDG",
        qty: 1,
        unitPrice: 1680,
        total: 1680,
      },
      {
        id: "2",
        description: "Pullman Paris 7N",
        qty: 1,
        unitPrice: 1330,
        total: 1330,
      },
    ],
  },
  {
    id: "INV-2024-0086",
    customer: "Khalid Al-Rashid",
    customerId: "CUS-0023",
    issueDate: "2024-07-18",
    dueDate: "2024-07-25",
    total: 12840,
    subtotal: 12228.57,
    vat: 611.43,
    status: "cancelled",
    paidAmount: 0,
    balanceDue: 12840,
    items: [
      {
        id: "1",
        description: "Etihad Flight AUH–SYD",
        qty: 1,
        unitPrice: 8400,
        total: 8400,
      },
      {
        id: "2",
        description: "Park Hyatt Sydney 7N",
        qty: 1,
        unitPrice: 4340,
        total: 4340,
      },
    ],
  },
  {
    id: "INV-2024-0085",
    customer: "Zainab Ibrahim",
    customerId: "CUS-0015",
    issueDate: "2024-07-15",
    dueDate: "2024-07-22",
    total: 2020,
    subtotal: 1923.81,
    vat: 96.19,
    status: "paid",
    paidAmount: 2020,
    balanceDue: 0,
    items: [
      {
        id: "1",
        description: "EgyptAir Flight CAI–JFK",
        qty: 1,
        unitPrice: 1920,
        total: 1920,
      },
      {
        id: "2",
        description: "Airport Transfer",
        qty: 1,
        unitPrice: 45,
        total: 45,
      },
    ],
  },
];

// Status Configuration
const statusConfig = {
  paid: {
    label: "Paid",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  partial: {
    label: "Partial",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  pending: {
    label: "Pending",
    color: "bg-blue-100 text-blue-700",
    icon: AlertCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(
    mockInvoices[0],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter invoices
  const filteredInvoices = mockInvoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(
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
    return `OMR ${amount.toFixed(2).toLocaleString()}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Invoice List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-36 lg:w-48"
                  />
                </div>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <Filter className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {paginatedInvoices.map((invoice) => {
              const StatusIcon = statusConfig[invoice.status].icon;
              const statusInfo = statusConfig[invoice.status];

              return (
                <div
                  key={invoice.id}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedInvoice?.id === invoice.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {invoice.id}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {invoice.customer}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(invoice.issueDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(invoice.total)}
                      </p>
                      {invoice.status === "partial" && (
                        <p className="text-xs text-yellow-600">
                          Balance: {formatCurrency(invoice.balanceDue)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, filteredInvoices.length)}{" "}
                of {filteredInvoices.length}
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

        {/* Invoice Details */}
        {selectedInvoice && (
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Invoice Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                    {getInitials(selectedInvoice.customer)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedInvoice.id}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedInvoice.customer}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <Printer className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <Mail className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <Download className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Company Info */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Your Company Name
                    </h3>
                    <p className="text-sm text-gray-600">
                      Travel & Tourism Agency
                    </p>
                    <p className="text-sm text-gray-500">
                      P.O. Box 1234, Muscat, Sultanate of Oman
                    </p>
                    <p className="text-sm text-gray-500">+968 2412 3456</p>
                    <p className="text-sm text-gray-500">info@youagency.com</p>
                    <p className="text-sm text-blue-600">www.youagency.com</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-2xl font-bold text-gray-900">
                      INVOICE
                    </h4>
                    <p className="text-sm text-gray-500">
                      {selectedInvoice.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Issue Date: {formatDate(selectedInvoice.issueDate)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Due Date: {formatDate(selectedInvoice.dueDate)}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[selectedInvoice.status].color} mt-1`}
                    >
                      {statusConfig[selectedInvoice.status].label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bill To */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  BILL TO
                </h4>
                <p className="text-sm text-gray-900 font-medium">
                  {selectedInvoice.customer}
                </p>
                <p className="text-sm text-gray-500">
                  Customer ID: {selectedInvoice.customerId} - Muscat, Oman
                </p>
              </div>

              {/* Invoice Items */}
              <div className="mb-6 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service Description
                      </th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit (OMR)
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total (OMR)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedInvoice.items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {item.description}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 text-center">
                          {item.qty}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 text-right">
                          {item.unitPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-sm font-semibold text-gray-900 text-right">
                          {item.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-6">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(selectedInvoice.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">VAT (5%)</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(selectedInvoice.vat)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                    <span className="text-gray-900">TOTAL</span>
                    <span className="text-blue-700">
                      {formatCurrency(selectedInvoice.total)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                    <span className="text-gray-600">Paid</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(selectedInvoice.paidAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t border-gray-200 pt-2">
                    <span className="text-gray-700">Balance Due</span>
                    <span
                      className={
                        selectedInvoice.balanceDue === 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {formatCurrency(selectedInvoice.balanceDue)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bank Transfer Details */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <QrCode className="w-10 h-10 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">
                      Bank Transfer Details
                    </h4>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                      <span className="text-gray-500">Bank:</span>
                      <span className="text-gray-900 font-medium">
                        Bank Muscat
                      </span>
                      <span className="text-gray-500">Account Name:</span>
                      <span className="text-gray-900 font-medium">
                        Your Company Name
                      </span>
                      <span className="text-gray-500">Account No:</span>
                      <span className="text-gray-900 font-mono">
                        0123456789
                      </span>
                      <span className="text-gray-500">IBAN:</span>
                      <span className="text-gray-900 font-mono">
                        OM12 3456 7890 1234 5678
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  Thank you for choosing our services. For enquiries, please
                  contact us at info@youagency.com
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
