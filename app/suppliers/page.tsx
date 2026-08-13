"use client";

import React, { useState } from "react";
import {
  Building2,
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
  Phone,
  Mail,
  Globe,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X,
  Save,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Truck,
  Plane,
  Hotel,
  Shield,
} from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  type: "airline" | "hotel" | "ground_handler" | "visa_provider" | "insurance" | "other";
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  commissionRate: number;
  paymentTerms: string;
  contractStart: string;
  contractEnd: string;
  status: "active" | "inactive" | "pending";
  rating: number;
  totalBookings: number;
  notes?: string;
}

const mockSuppliers: Supplier[] = [
  { id: "SUP-001", name: "Emirates Airlines", type: "airline", contactName: "Ahmed Al-Mansoori", email: "ahmed@emirates.com", phone: "+971 4 123 4567", country: "UAE", city: "Dubai", commissionRate: 8, paymentTerms: "Net 30", contractStart: "2024-01-01", contractEnd: "2025-12-31", status: "active", rating: 4.8, totalBookings: 245, notes: "Preferred airline for Middle East routes" },
  { id: "SUP-002", name: "Hilton Hotels", type: "hotel", contactName: "Sarah Johnson", email: "sarah@hilton.com", phone: "+1 703 123 4567", country: "USA", city: "Dubai", commissionRate: 12, paymentTerms: "Net 45", contractStart: "2024-06-01", contractEnd: "2025-05-31", status: "active", rating: 4.6, totalBookings: 189, notes: "5-star hotel chain partner" },
  { id: "SUP-003", name: "Al-Moayed Transport", type: "ground_handler", contactName: "Khalid Al-Moayed", email: "khalid@almoayed.com", phone: "+968 24 123 456", country: "Oman", city: "Muscat", commissionRate: 10, paymentTerms: "Net 15", contractStart: "2024-03-01", contractEnd: "2025-02-28", status: "active", rating: 4.4, totalBookings: 156, notes: "Local ground transportation specialist" },
  { id: "SUP-004", name: "VFS Global", type: "visa_provider", contactName: "Fatima Hassan", email: "fatima@vfsglobal.com", phone: "+968 24 987 654", country: "Oman", city: "Muscat", commissionRate: 5, paymentTerms: "Net 30", contractStart: "2024-01-01", contractEnd: "2024-12-31", status: "pending", rating: 4.2, totalBookings: 320, notes: "UK and Schengen visa processing" },
  { id: "SUP-005", name: "Oman Insurance", type: "insurance", contactName: "Ali Al-Balushi", email: "ali@omaninsurance.om", phone: "+968 24 456 789", country: "Oman", city: "Muscat", commissionRate: 15, paymentTerms: "Net 30", contractStart: "2024-07-01", contractEnd: "2025-06-30", status: "active", rating: 4.5, totalBookings: 98, notes: "Travel insurance provider" },
  { id: "SUP-006", name: "Turkish Airlines", type: "airline", contactName: "Mehmet Yilmaz", email: "mehmet@thy.com", phone: "+90 212 123 4567", country: "Turkey", city: "Istanbul", commissionRate: 7, paymentTerms: "Net 45", contractStart: "2024-01-01", contractEnd: "2024-06-30", status: "inactive", rating: 4.3, totalBookings: 67, notes: "Contract expired, renewal in progress" },
];

const typeConfig = {
  airline: { label: "Airline", color: "bg-blue-100 text-blue-700", icon: Plane },
  hotel: { label: "Hotel", color: "bg-green-100 text-green-700", icon: Hotel },
  ground_handler: { label: "Ground Handler", color: "bg-orange-100 text-orange-700", icon: Truck },
  visa_provider: { label: "Visa Provider", color: "bg-purple-100 text-purple-700", icon: FileText },
  insurance: { label: "Insurance", color: "bg-teal-100 text-teal-700", icon: Shield },
  other: { label: "Other", color: "bg-gray-100 text-gray-600", icon: Building2 },
};

const statusConfig = {
  active: { label: "Active", color: "bg-green-100 text-green-700", icon: CheckCircle },
  inactive: { label: "Inactive", color: "bg-gray-100 text-gray-600", icon: XCircle },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: AlertTriangle },
};

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const itemsPerPage = 5;

  const filteredSuppliers = mockSuppliers.filter((sup) => {
    const matchesSearch = sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sup.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || sup.type === selectedType;
    const matchesStatus = selectedStatus === "all" || sup.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSuppliers = filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suppliers & Vendors</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button
          onClick={() => setShowSupplierModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Supplier
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Suppliers</p>
              <p className="text-2xl font-bold text-gray-900">{mockSuppliers.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-green-600">{mockSuppliers.filter((s) => s.status === "active").length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Contracts</p>
              <p className="text-2xl font-bold text-yellow-600">{mockSuppliers.filter((s) => s.status === "pending").length}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{mockSuppliers.reduce((sum, s) => sum + s.totalBookings, 0)}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Vendor Directory</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search suppliers..."
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
                <option value="airline">Airline</option>
                <option value="hotel">Hotel</option>
                <option value="ground_handler">Ground Handler</option>
                <option value="visa_provider">Visa Provider</option>
                <option value="insurance">Insurance</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedSuppliers.map((supplier) => {
                const typeInfo = typeConfig[supplier.type];
                const statusInfo = statusConfig[supplier.status];
                const TypeIcon = typeInfo.icon;
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeInfo.color}`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{supplier.name}</p>
                          <p className="text-xs text-gray-500">{supplier.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{supplier.contactName}</p>
                      <p className="text-xs text-gray-500">{supplier.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{supplier.city}, {supplier.country}</td>
                    <td className="px-4 py-3 text-right">
                      <p className="text-sm font-semibold text-gray-900">{supplier.commissionRate}%</p>
                      <p className="text-xs text-gray-500">{supplier.paymentTerms}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {renderStars(supplier.rating)}
                        <span className="text-xs text-gray-500 ml-1">{supplier.rating}</span>
                      </div>
                    </td>
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSuppliers.length)} of {filteredSuppliers.length} suppliers
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

      {/* Supplier Modal */}
      {showSupplierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">New Supplier</h2>
              <button onClick={() => setShowSupplierModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                  <input type="text" placeholder="e.g. Emirates Airlines" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="airline">Airline</option>
                    <option value="hotel">Hotel</option>
                    <option value="ground_handler">Ground Handler</option>
                    <option value="visa_provider">Visa Provider</option>
                    <option value="insurance">Insurance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Name</label>
                  <input type="text" placeholder="Primary contact" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" placeholder="contact@supplier.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" placeholder="+XXX XXXX XXXX" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                  <input type="text" placeholder="Country" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                  <input type="text" placeholder="City" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Commission Rate (%)</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Payment Terms</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Net 15">Net 15</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 45">Net 45</option>
                    <option value="Net 60">Net 60</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Contract Start</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Contract End</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                  <textarea rows={3} placeholder="Additional notes..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowSupplierModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={() => setShowSupplierModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                Save Supplier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
