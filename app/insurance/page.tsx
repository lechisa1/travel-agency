"use client";

import React, { useState } from "react";
import {
  Shield,
  Plus,
  Search,
  Filter,
  Download,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  X,
  Save,
  DollarSign,
  Calendar,
  Users,
  Building2,
} from "lucide-react";

interface InsurancePolicy {
  id: string;
  policyNumber: string;
  customer: string;
  provider: string;
  type: "trip_cancellation" | "medical" | "baggage" | "flight_accident" | "comprehensive";
  premium: number;
  coverage: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "cancelled" | "pending";
  bookingReference?: string;
  claimStatus?: "none" | "filed" | "approved" | "rejected";
  notes?: string;
}

const mockPolicies: InsurancePolicy[] = [
  { id: "INS-001", policyNumber: "POL-2024-1001", customer: "Ahmed Al-Farsi", provider: "Oman Insurance", type: "comprehensive", premium: 85, coverage: 50000, currency: "USD", startDate: "2026-08-15", endDate: "2026-08-20", status: "active", bookingReference: "BOOK-2024-089", claimStatus: "none", notes: "Comprehensive coverage for Bali trip" },
  { id: "INS-002", policyNumber: "POL-2024-1002", customer: "Fatima Malik", provider: "AXA Insurance", type: "medical", premium: 45, coverage: 25000, currency: "USD", startDate: "2026-08-20", endDate: "2026-08-25", status: "active", bookingReference: "BOOK-2024-092", claimStatus: "none", notes: "Medical coverage for Turkey trip" },
  { id: "INS-003", policyNumber: "POL-2024-1003", customer: "Mohammed Qasim", provider: "Oman Insurance", type: "trip_cancellation", premium: 35, coverage: 3000, currency: "USD", startDate: "2026-08-10", endDate: "2026-08-13", status: "expired", bookingReference: "BOOK-2024-085", claimStatus: "none" },
  { id: "INS-004", policyNumber: "POL-2024-1004", customer: "Khalid Al-Rashid", provider: "Allianz", type: "baggage", premium: 25, coverage: 5000, currency: "USD", startDate: "2026-09-01", endDate: "2026-09-10", status: "pending", bookingReference: "BOOK-2024-095", claimStatus: "none", notes: "Waiting for premium payment" },
  { id: "INS-005", policyNumber: "POL-2024-1005", customer: "Aisha Hassan", provider: "AXA Insurance", type: "comprehensive", premium: 120, coverage: 75000, currency: "USD", startDate: "2026-07-28", endDate: "2026-08-05", status: "cancelled", bookingReference: "BOOK-2024-078", claimStatus: "rejected", notes: "Trip cancelled, policy voided" },
];

const typeConfig = {
  trip_cancellation: { label: "Trip Cancellation", color: "bg-blue-100 text-blue-700" },
  medical: { label: "Medical", color: "bg-red-100 text-red-700" },
  baggage: { label: "Baggage", color: "bg-yellow-100 text-yellow-700" },
  flight_accident: { label: "Flight Accident", color: "bg-purple-100 text-purple-700" },
  comprehensive: { label: "Comprehensive", color: "bg-green-100 text-green-700" },
};

const statusConfig = {
  active: { label: "Active", color: "bg-green-100 text-green-700", icon: CheckCircle },
  expired: { label: "Expired", color: "bg-gray-100 text-gray-600", icon: Clock },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-600", icon: XCircle },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: AlertTriangle },
};

const claimStatusConfig = {
  none: { label: "No Claim", color: "bg-gray-100 text-gray-600" },
  filed: { label: "Claim Filed", color: "bg-yellow-100 text-yellow-700" },
  approved: { label: "Approved", color: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-600" },
};

export default function InsurancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const itemsPerPage = 5;

  const filteredPolicies = mockPolicies.filter((policy) => {
    const matchesSearch = policy.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || policy.type === selectedType;
    const matchesStatus = selectedStatus === "all" || policy.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPolicies = filteredPolicies.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", OMR: "﷼", SAR: "﷼", AED: "د.إ" };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };

  const stats = {
    total: mockPolicies.length,
    active: mockPolicies.filter((p) => p.status === "active").length,
    pending: mockPolicies.filter((p) => p.status === "pending").length,
    claims: mockPolicies.filter((p) => p.claimStatus === "filed" || p.claimStatus === "approved").length,
    premium: mockPolicies.reduce((sum, p) => sum + p.premium, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Travel Insurance</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button
          onClick={() => setShowPolicyModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Policy
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Policies</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Claims</p>
              <p className="text-2xl font-bold text-purple-600">{stats.claims}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Premium</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.premium, "USD")}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Insurance Policies</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="trip_cancellation">Trip Cancellation</option>
                <option value="medical">Medical</option>
                <option value="baggage">Baggage</option>
                <option value="flight_accident">Flight Accident</option>
                <option value="comprehensive">Comprehensive</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
                <option value="pending">Pending</option>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedPolicies.map((policy) => {
                const typeInfo = typeConfig[policy.type];
                const statusInfo = statusConfig[policy.status];
                const claimInfo = claimStatusConfig[policy.claimStatus || "none"];
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={policy.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{policy.policyNumber}</p>
                        <p className="text-xs text-gray-500">{policy.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{policy.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{policy.provider}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{formatCurrency(policy.premium, policy.currency)}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-600">{formatCurrency(policy.coverage, policy.currency)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${claimInfo.color}`}>
                          Claim: {claimInfo.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <Edit2 className="w-4 h-4 text-gray-400" />
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPolicies.length)} of {filteredPolicies.length} policies
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

      {/* Policy Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">New Insurance Policy</h2>
              <button onClick={() => setShowPolicyModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Insurance Provider</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Oman Insurance">Oman Insurance</option>
                    <option value="AXA Insurance">AXA Insurance</option>
                    <option value="Allianz">Allianz</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Policy Type</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="trip_cancellation">Trip Cancellation</option>
                    <option value="medical">Medical</option>
                    <option value="baggage">Baggage</option>
                    <option value="flight_accident">Flight Accident</option>
                    <option value="comprehensive">Comprehensive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Booking Reference</label>
                  <input type="text" placeholder="e.g. BOOK-2024-089" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Premium</label>
                  <input type="number" placeholder="0.00" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Coverage Amount</label>
                  <input type="number" placeholder="0.00" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                  <textarea rows={3} placeholder="Additional details..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowPolicyModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={() => setShowPolicyModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                Issue Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
