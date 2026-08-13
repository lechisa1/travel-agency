"use client";

import React, { useState } from "react";
import {
  DollarSign,
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
  Users,
  TrendingUp,
  TrendingDown,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X,
  Save,
  Calendar,
  Building2,
  Clock,
} from "lucide-react";

interface CommissionRule {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  appliesTo: "agent" | "supplier" | "both";
  service: "flight" | "hotel" | "visa" | "transport" | "package" | "all";
  minAmount?: number;
  maxAmount?: number;
  effectiveFrom: string;
  effectiveTo: string;
  status: "active" | "inactive";
}

interface CommissionLedger {
  id: string;
  date: string;
  agent: string;
  bookingId: string;
  customer: string;
  service: string;
  bookingAmount: number;
  commissionRate: number;
  commissionAmount: number;
  status: "pending" | "approved" | "paid" | "cancelled";
  paidDate?: string;
}

interface SupplierCommission {
  id: string;
  supplier: string;
  period: string;
  totalBookings: number;
  totalRevenue: number;
  commissionRate: number;
  commissionAmount: number;
  paidAmount: number;
  balance: number;
  status: "paid" | "pending" | "overdue";
}

const mockCommissionRules: CommissionRule[] = [
  { id: "RUL-001", name: "Standard Agent Commission", type: "percentage", value: 10, appliesTo: "agent", service: "all", effectiveFrom: "2024-01-01", effectiveTo: "2024-12-31", status: "active" },
  { id: "RUL-002", name: "Flight Booking Commission", type: "percentage", value: 8, appliesTo: "agent", service: "flight", effectiveFrom: "2024-01-01", effectiveTo: "2024-12-31", status: "active" },
  { id: "RUL-003", name: "Hotel Commission", type: "percentage", value: 12, appliesTo: "both", service: "hotel", effectiveFrom: "2024-01-01", effectiveTo: "2024-06-30", status: "active" },
  { id: "RUL-004", name: "Visa Service Fee", type: "fixed", value: 15, appliesTo: "agent", service: "visa", effectiveFrom: "2024-01-01", effectiveTo: "2024-12-31", status: "active" },
  { id: "RUL-005", name: "Package Incentive", type: "percentage", value: 15, appliesTo: "agent", service: "package", effectiveFrom: "2024-07-01", effectiveTo: "2024-12-31", status: "inactive" },
];

const mockLedger: CommissionLedger[] = [
  { id: "LED-001", date: "2026-08-12", agent: "Mariam Salim", bookingId: "BOOK-2024-089", customer: "Ahmed Al-Farsi", service: "Package", bookingAmount: 2100, commissionRate: 10, commissionAmount: 210, status: "pending" },
  { id: "LED-002", date: "2026-08-11", agent: "Sara Ahmed", bookingId: "BOOK-2024-092", customer: "Fatima Malik", service: "Visa", bookingAmount: 850, commissionRate: 15, commissionAmount: 127.5, status: "approved" },
  { id: "LED-003", date: "2026-08-10", agent: "Mariam Salim", bookingId: "BOOK-2024-085", customer: "Mohammed Qasim", service: "Flight", bookingAmount: 1200, commissionRate: 8, commissionAmount: 96, status: "paid", paidDate: "2026-08-10" },
  { id: "LED-004", date: "2026-08-09", agent: "Ali Hassan", bookingId: "BOOK-2024-078", customer: "Khalid Al-Rashid", service: "Hotel", bookingAmount: 3200, commissionRate: 12, commissionAmount: 384, status: "approved" },
  { id: "LED-005", date: "2026-08-08", agent: "Rashid Nasser", bookingId: "BOOK-2024-075", customer: "Aisha Hassan", service: "Flight", bookingAmount: 650, commissionRate: 8, commissionAmount: 52, status: "cancelled" },
];

const mockSupplierCommissions: SupplierCommission[] = [
  { id: "SUP-COM-001", supplier: "Emirates Airlines", period: "July 2026", totalBookings: 45, totalRevenue: 48500, commissionRate: 8, commissionAmount: 3880, paidAmount: 3000, balance: 880, status: "pending" },
  { id: "SUP-COM-002", supplier: "Hilton Hotels", period: "July 2026", totalBookings: 32, totalRevenue: 28900, commissionRate: 12, commissionAmount: 3468, paidAmount: 3468, balance: 0, status: "paid" },
  { id: "SUP-COM-003", supplier: "VFS Global", period: "July 2026", totalBookings: 68, totalRevenue: 15300, commissionRate: 5, commissionAmount: 765, paidAmount: 500, balance: 265, status: "overdue" },
];

const statusConfig = {
  active: { label: "Active", color: "bg-green-100 text-green-700", icon: CheckCircle },
  inactive: { label: "Inactive", color: "bg-gray-100 text-gray-600", icon: XCircle },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  approved: { label: "Approved", color: "bg-green-100 text-green-700", icon: CheckCircle },
  paid: { label: "Paid", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-600", icon: XCircle },
  overdue: { label: "Overdue", color: "bg-red-100 text-red-600", icon: AlertTriangle },
};

export default function CommissionPage() {
  const [activeTab, setActiveTab] = useState("rules");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRuleModal, setShowRuleModal] = useState(false);

  const tabs = [
    { id: "rules", label: "Commission Rules", icon: FileText },
    { id: "ledger", label: "Agent Ledger", icon: Users },
    { id: "suppliers", label: "Supplier Reconciliation", icon: Building2 },
  ];

  const formatCurrency = (amount: number) => {
    return `OMR ${amount.toLocaleString()}`;
  };

  const stats = {
    rules: mockCommissionRules.length,
    activeRules: mockCommissionRules.filter((r) => r.status === "active").length,
    pendingPayouts: mockLedger.filter((l) => l.status === "pending").length,
    totalCommission: mockLedger.reduce((sum, l) => sum + l.commissionAmount, 0),
    paidCommission: mockLedger.filter((l) => l.status === "paid").reduce((sum, l) => sum + l.commissionAmount, 0),
    supplierBalance: mockSupplierCommissions.reduce((sum, s) => sum + s.balance, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Commission & Incentives</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button
          onClick={() => setShowRuleModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Rule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Rules</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeRules}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Payouts</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayouts}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Commission</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalCommission)}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Supplier Balance</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(stats.supplierBalance)}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Commission Rules */}
          {activeTab === "rules" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applies To</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Period</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockCommissionRules.map((rule) => {
                    const statusInfo = statusConfig[rule.status];
                    const StatusIcon = statusInfo.icon;
                    return (
                      <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{rule.name}</p>
                            <p className="text-xs text-gray-500">{rule.id}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${rule.type === "percentage" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                            {rule.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{rule.value}{rule.type === "percentage" ? "%" : " OMR"}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 capitalize">{rule.appliesTo}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 capitalize">{rule.service}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{rule.effectiveFrom} — {rule.effectiveTo}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
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
          )}

          {/* Agent Ledger */}
          {activeTab === "ledger" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockLedger.map((entry) => {
                    const statusInfo = statusConfig[entry.status];
                    const StatusIcon = statusInfo.icon;
                    return (
                      <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-600">{entry.date}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{entry.agent}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{entry.bookingId}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{entry.customer}</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-900">{formatCurrency(entry.bookingAmount)}</td>
                        <td className="px-4 py-3 text-right text-sm font-semibold text-green-600">{formatCurrency(entry.commissionAmount)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                              <Eye className="w-4 h-4 text-gray-400" />
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
          )}

          {/* Supplier Reconciliation */}
          {activeTab === "suppliers" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockSupplierCommissions.map((sup) => {
                    const statusInfo = statusConfig[sup.status];
                    const StatusIcon = statusInfo.icon;
                    return (
                      <tr key={sup.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{sup.supplier}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{sup.period}</td>
                        <td className="px-4 py-3 text-center text-sm text-gray-900">{sup.totalBookings}</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-900">{formatCurrency(sup.totalRevenue)}</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-900">{formatCurrency(sup.commissionAmount)}</td>
                        <td className="px-4 py-3 text-right text-sm text-green-600">{formatCurrency(sup.paidAmount)}</td>
                        <td className="px-4 py-3 text-right text-sm font-semibold text-red-600">{formatCurrency(sup.balance)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                              <Eye className="w-4 h-4 text-gray-400" />
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
          )}
        </div>
      </div>

      {/* Rule Modal */}
      {showRuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">New Commission Rule</h2>
              <button onClick={() => setShowRuleModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Rule Name</label>
                  <input type="text" placeholder="e.g. Standard Agent Commission" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Value</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Applies To</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="agent">Agent</option>
                    <option value="supplier">Supplier</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Service</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">All Services</option>
                    <option value="flight">Flight</option>
                    <option value="hotel">Hotel</option>
                    <option value="visa">Visa</option>
                    <option value="transport">Transport</option>
                    <option value="package">Package</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Effective From</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Effective To</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowRuleModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={() => setShowRuleModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                Save Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
