"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle,
  XCircle,
  X,
  Save,
  Send,
  Copy,
  ShoppingCart,
} from "lucide-react";

interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Quotation {
  id: string;
  customer: string;
  customerEmail: string;
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: "draft" | "sent" | "approved" | "rejected" | "converted";
  validUntil: string;
  createdAt: string;
  sentAt?: string;
  approvedAt?: string;
  convertedToBooking?: string;
  notes?: string;
  terms: string;
}

const mockQuotations: Quotation[] = [
  {
    id: "QUO-2024-001",
    customer: "Ahmed Al-Farsi",
    customerEmail: "ahmed@email.com",
    items: [
      { id: "1", description: "Bali Honeymoon Package (5D/4N)", quantity: 1, unitPrice: 1850, total: 1850 },
      { id: "2", description: "Travel Insurance", quantity: 1, unitPrice: 85, total: 85 },
      { id: "3", description: "Airport Transfer", quantity: 2, unitPrice: 25, total: 50 },
    ],
    subtotal: 1985,
    tax: 99.25,
    total: 2084.25,
    currency: "USD",
    status: "approved",
    validUntil: "2026-08-20",
    createdAt: "2026-08-10",
    sentAt: "2026-08-11",
    approvedAt: "2026-08-12",
    notes: "Client requested early check-in",
    terms: "50% advance required to confirm booking",
  },
  {
    id: "QUO-2024-002",
    customer: "Fatima Malik",
    customerEmail: "fatima@email.com",
    items: [
      { id: "1", description: "Umrah Express — Ramadan (10D/9N)", quantity: 1, unitPrice: 2400, total: 2400 },
    ],
    subtotal: 2400,
    tax: 120,
    total: 2520,
    currency: "USD",
    status: "sent",
    validUntil: "2026-08-25",
    createdAt: "2026-08-12",
    sentAt: "2026-08-13",
    notes: "VIP package requested",
    terms: "Full payment 30 days before departure",
  },
  {
    id: "QUO-2024-003",
    customer: "Mohammed Qasim",
    customerEmail: "mohammed@email.com",
    items: [
      { id: "1", description: "DXB Return Flight (Economy)", quantity: 2, unitPrice: 350, total: 700 },
      { id: "2", description: "Hotel Booking (3 nights)", quantity: 1, unitPrice: 450, total: 450 },
    ],
    subtotal: 1150,
    tax: 57.5,
    total: 1207.5,
    currency: "USD",
    status: "draft",
    validUntil: "2026-08-18",
    createdAt: "2026-08-13",
    notes: "Pending final pricing",
    terms: "Standard terms apply",
  },
  {
    id: "QUO-2024-004",
    customer: "Khalid Al-Rashid",
    customerEmail: "khalid@email.com",
    items: [
      { id: "1", description: "Swiss Alps Adventure (7D/6N)", quantity: 1, unitPrice: 3200, total: 3200 },
    ],
    subtotal: 3200,
    tax: 160,
    total: 3360,
    currency: "USD",
    status: "converted",
    validUntil: "2026-08-15",
    createdAt: "2026-08-05",
    sentAt: "2026-08-06",
    approvedAt: "2026-08-07",
    convertedToBooking: "BOOK-2024-089",
    notes: "Converted to booking",
    terms: "Payment plan: 40% advance, 60% before travel",
  },
  {
    id: "QUO-2024-005",
    customer: "Aisha Hassan",
    customerEmail: "aisha@email.com",
    items: [
      { id: "1", description: "Dubai Family Fun (4D/3N)", quantity: 1, unitPrice: 1200, total: 1200 },
    ],
    subtotal: 1200,
    tax: 60,
    total: 1260,
    currency: "USD",
    status: "rejected",
    validUntil: "2026-08-10",
    createdAt: "2026-08-01",
    sentAt: "2026-08-02",
    notes: "Client found better price elsewhere",
    terms: "Price valid for 7 days",
  },
];

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-600", icon: FileText },
  sent: { label: "Sent", color: "bg-blue-100 text-blue-700", icon: Send },
  approved: { label: "Approved", color: "bg-green-100 text-green-700", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-600", icon: XCircle },
  converted: { label: "Converted", color: "bg-purple-100 text-purple-700", icon: ShoppingCart },
};

export default function QuotationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [viewingQuotation, setViewingQuotation] = useState<Quotation | null>(null);
  const itemsPerPage = 5;

  const filteredQuotations = mockQuotations.filter((quo) => {
    const matchesSearch = quo.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quo.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || quo.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredQuotations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuotations = filteredQuotations.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", OMR: "﷼", SAR: "﷼", AED: "د.إ" };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };

  const stats = {
    total: mockQuotations.length,
    draft: mockQuotations.filter((q) => q.status === "draft").length,
    sent: mockQuotations.filter((q) => q.status === "sent").length,
    approved: mockQuotations.filter((q) => q.status === "approved").length,
    converted: mockQuotations.filter((q) => q.status === "converted").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quotations & Proformas</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button
          onClick={() => setShowQuotationModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Quotation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Draft</p>
              <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sent</p>
              <p className="text-2xl font-bold text-blue-600">{stats.sent}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Converted</p>
              <p className="text-2xl font-bold text-purple-600">{stats.converted}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Quotations</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search quotations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="converted">Converted</option>
              </select>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quotation ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedQuotations.map((quo) => {
                const statusInfo = statusConfig[quo.status];
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={quo.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{quo.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{quo.customer}</p>
                        <p className="text-xs text-gray-500">{quo.customerEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(quo.total, quo.currency)}</p>
                      <p className="text-xs text-gray-500">{quo.items.length} item{quo.items.length !== 1 ? "s" : ""}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{quo.validUntil}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{quo.createdAt}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingQuotation(quo)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <Edit2 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <Copy className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredQuotations.length)} of {filteredQuotations.length} quotations
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-600"}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Quotation Modal */}
      {showQuotationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">New Quotation</h2>
              <button onClick={() => setShowQuotationModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Customer</label>
                  <input type="text" placeholder="Customer name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Customer Email</label>
                  <input type="email" placeholder="customer@email.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Valid Until</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="OMR">OMR</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Item Description</label>
                  <input type="text" placeholder="e.g. Bali Honeymoon Package" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity</label>
                  <input type="number" placeholder="1" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Unit Price</label>
                  <input type="number" placeholder="0.00" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Terms & Conditions</label>
                  <textarea rows={3} placeholder="Payment terms, cancellation policy..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                  <textarea rows={2} placeholder="Additional notes..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowQuotationModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={() => setShowQuotationModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button onClick={() => setShowQuotationModal(false)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm">
                <Send className="w-4 h-4" />
                Send Quotation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Quotation Modal */}
      {viewingQuotation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Quotation Details</h2>
                <p className="text-sm text-gray-500">{viewingQuotation.id}</p>
              </div>
              <button onClick={() => setViewingQuotation(null)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Customer</p>
                    <p className="text-sm text-gray-900 font-medium">{viewingQuotation.customer}</p>
                    <p className="text-xs text-gray-500">{viewingQuotation.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Status</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[viewingQuotation.status].color}`}>
                      {statusConfig[viewingQuotation.status].label}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Created</p>
                    <p className="text-sm text-gray-900">{viewingQuotation.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Valid Until</p>
                    <p className="text-sm text-gray-900">{viewingQuotation.validUntil}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Items</h4>
                  <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Qty</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {viewingQuotation.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-2 text-sm text-gray-900">{item.description}</td>
                            <td className="px-4 py-2 text-sm text-gray-600 text-center">{item.quantity}</td>
                            <td className="px-4 py-2 text-sm text-gray-600 text-right">{formatCurrency(item.unitPrice, viewingQuotation.currency)}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">{formatCurrency(item.total, viewingQuotation.currency)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50 border-t border-gray-200">
                        <tr>
                          <td colSpan={3} className="px-4 py-2 text-sm font-medium text-gray-900 text-right">Subtotal</td>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">{formatCurrency(viewingQuotation.subtotal, viewingQuotation.currency)}</td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-4 py-2 text-sm font-medium text-gray-900 text-right">Tax (5%)</td>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">{formatCurrency(viewingQuotation.tax, viewingQuotation.currency)}</td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-4 py-2 text-base font-bold text-gray-900 text-right">Total</td>
                          <td className="px-4 py-2 text-base font-bold text-blue-700 text-right">{formatCurrency(viewingQuotation.total, viewingQuotation.currency)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {viewingQuotation.notes && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Notes</h4>
                    <p className="text-sm text-gray-600">{viewingQuotation.notes}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Terms & Conditions</h4>
                  <p className="text-sm text-gray-600">{viewingQuotation.terms}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setViewingQuotation(null)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Close
              </button>
              {viewingQuotation.status === "approved" && (
                <button onClick={() => setViewingQuotation(null)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm">
                  <ShoppingCart className="w-4 h-4" />
                  Convert to Booking
                </button>
              )}
              {viewingQuotation.status === "draft" && (
                <button onClick={() => setViewingQuotation(null)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                  <Send className="w-4 h-4" />
                  Send Quotation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
