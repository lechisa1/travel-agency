"use client";

import React, { useState } from "react";
import {
  Users,
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
  UserPlus,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X,
  Save,
  Mail,
  Printer,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
} from "lucide-react";

interface GroupMember {
  id: string;
  name: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  emergencyContact: string;
  seatNumber?: string;
}

interface GroupBooking {
  id: string;
  groupName: string;
  destination: string;
  startDate: string;
  endDate: string;
  leader: string;
  leaderPhone: string;
  leaderEmail: string;
  totalPax: number;
  adults: number;
  children: number;
  infants: number;
  groupRate: number;
  totalAmount: number;
  currency: string;
  status: "draft" | "confirmed" | "in_progress" | "completed" | "cancelled";
  bookingReference?: string;
  members: GroupMember[];
  notes?: string;
}

const mockGroups: GroupBooking[] = [
  {
    id: "GRP-001",
    groupName: "Al-Khwarizmi School Trip",
    destination: "Istanbul, Turkey",
    startDate: "2026-09-15",
    endDate: "2026-09-20",
    leader: "Mr. Hassan Ali",
    leaderPhone: "+968 9100 0001",
    leaderEmail: "hassan@school.edu.om",
    totalPax: 25,
    adults: 3,
    children: 22,
    infants: 0,
    groupRate: 850,
    totalAmount: 21250,
    currency: "USD",
    status: "confirmed",
    bookingReference: "BOOK-2024-100",
    notes: "School group with 2 teachers and 23 students",
    members: [
      { id: "M-001", name: "Hassan Ali", passportNumber: "OM1234567", nationality: "Omani", dateOfBirth: "1980-05-15", phone: "+968 9100 0001", email: "hassan@email.com", emergencyContact: "Fatima +968 9100 0002", seatNumber: "1A" },
      { id: "M-002", name: "Fatima Hassan", passportNumber: "OM7654321", nationality: "Omani", dateOfBirth: "1982-08-20", phone: "+968 9100 0002", email: "fatima@email.com", emergencyContact: "Hassan +968 9100 0001", seatNumber: "1B" },
      { id: "M-003", name: "Ahmed Student", passportNumber: "OM1122334", nationality: "Omani", dateOfBirth: "2010-03-10", phone: "+968 9100 0003", email: "ahmed@email.com", emergencyContact: "Hassan +968 9100 0001", seatNumber: "2A" },
    ],
  },
  {
    id: "GRP-002",
    groupName: "Corporate Retreat — Oman Oil",
    destination: "Maldives",
    startDate: "2026-10-05",
    endDate: "2026-10-10",
    leader: "Ms. Sarah Al-Balushi",
    leaderPhone: "+968 24 123 456",
    leaderEmail: "sarah@omanoil.om",
    totalPax: 15,
    adults: 15,
    children: 0,
    infants: 0,
    groupRate: 2200,
    totalAmount: 33000,
    currency: "USD",
    status: "draft",
    members: [],
    notes: "Annual team building retreat",
  },
  {
    id: "GRP-003",
    groupName: "Umrah Group — Ramadan",
    destination: "Makkah & Madinah, KSA",
    startDate: "2026-03-01",
    endDate: "2026-03-15",
    leader: "Sheikh Mohammed Al-Harthy",
    leaderPhone: "+968 24 987 654",
    leaderEmail: "mohammed@umrah.om",
    totalPax: 50,
    adults: 50,
    children: 0,
    infants: 0,
    groupRate: 2400,
    totalAmount: 120000,
    currency: "USD",
    status: "completed",
    bookingReference: "BOOK-2024-045",
    notes: "Completed Umrah trip, all members satisfied",
    members: [],
  },
  {
    id: "GRP-004",
    groupName: "Family Wedding Group",
    destination: "Bali, Indonesia",
    startDate: "2026-11-20",
    endDate: "2026-11-27",
    leader: "Mr. Khalid Al-Rashid",
    leaderPhone: "+968 9100 0004",
    leaderEmail: "khalid@email.com",
    totalPax: 18,
    adults: 12,
    children: 6,
    infants: 0,
    groupRate: 1850,
    totalAmount: 33300,
    currency: "USD",
    status: "in_progress",
    bookingReference: "BOOK-2024-110",
    notes: "Wedding party with families",
    members: [],
  },
];

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-600", icon: FileText },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-700", icon: CheckCircle },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-700", icon: Clock },
  completed: { label: "Completed", color: "bg-purple-100 text-purple-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-600", icon: XCircle },
};

export default function GroupsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [viewingGroup, setViewingGroup] = useState<GroupBooking | null>(null);
  const itemsPerPage = 5;

  const filteredGroups = mockGroups.filter((group) => {
    const matchesSearch = group.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || group.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGroups = filteredGroups.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", OMR: "﷼", SAR: "﷼", AED: "د.إ" };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };

  const stats = {
    total: mockGroups.length,
    active: mockGroups.filter((g) => g.status === "confirmed" || g.status === "in_progress").length,
    completed: mockGroups.filter((g) => g.status === "completed").length,
    totalPax: mockGroups.reduce((sum, g) => sum + g.totalPax, 0),
    totalRevenue: mockGroups.reduce((sum, g) => sum + g.totalAmount, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Group Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button
          onClick={() => setShowGroupModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Group
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Groups</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
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
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-purple-600">{stats.completed}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Pax</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPax}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue, "USD")}</p>
            </div>
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Group Bookings</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search groups..."
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
                <option value="confirmed">Confirmed</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leader</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pax</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedGroups.map((group) => {
                const statusInfo = statusConfig[group.status];
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{group.groupName}</p>
                        <p className="text-xs text-gray-500">{group.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{group.leader}</p>
                      <p className="text-xs text-gray-500">{group.leaderPhone}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{group.destination}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{group.startDate} — {group.endDate}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">{group.totalPax}</td>
                    <td className="px-4 py-3 text-right">
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(group.totalAmount, group.currency)}</p>
                      <p className="text-xs text-gray-500">{formatCurrency(group.groupRate, group.currency)}/person</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingGroup(group)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredGroups.length)} of {filteredGroups.length} groups
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

      {/* View Group Modal */}
      {viewingGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{viewingGroup.groupName}</h2>
                <p className="text-sm text-gray-500">{viewingGroup.id}</p>
              </div>
              <button onClick={() => setViewingGroup(null)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Destination</p>
                    <p className="text-sm text-gray-900 font-medium">{viewingGroup.destination}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Status</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[viewingGroup.status].color}`}>
                      {statusConfig[viewingGroup.status].label}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Dates</p>
                    <p className="text-sm text-gray-900">{viewingGroup.startDate} — {viewingGroup.endDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Group Leader</p>
                    <p className="text-sm text-gray-900">{viewingGroup.leader}</p>
                    <p className="text-xs text-gray-500">{viewingGroup.leaderPhone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Total Pax</p>
                    <p className="text-sm text-gray-900">{viewingGroup.adults} adults, {viewingGroup.children} children, {viewingGroup.infants} infants</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Total Amount</p>
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(viewingGroup.totalAmount, viewingGroup.currency)}</p>
                  </div>
                </div>

                {viewingGroup.notes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700">{viewingGroup.notes}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Group Members ({viewingGroup.members.length})</h4>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Passport</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nationality</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Emergency</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Seat</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {viewingGroup.members.map((member) => (
                          <tr key={member.id}>
                            <td className="px-4 py-2 text-sm text-gray-900">{member.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{member.passportNumber}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{member.nationality}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{member.phone}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{member.emergencyContact}</td>
                            <td className="px-4 py-2 text-center text-sm text-gray-900">{member.seatNumber || "—"}</td>
                          </tr>
                        ))}
                        {viewingGroup.members.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-4 py-4 text-sm text-gray-400 text-center">No members added yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setViewingGroup(null)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Close
              </button>
              <button onClick={() => setViewingGroup(null)} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                <UserPlus className="w-4 h-4" />
                Add Member
              </button>
              <button onClick={() => setViewingGroup(null)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Mail className="w-4 h-4" />
                Send to Leader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Group Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">New Group Booking</h2>
              <button onClick={() => setShowGroupModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Group Name</label>
                  <input type="text" placeholder="e.g. Al-Khwarizmi School Trip" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
                  <input type="text" placeholder="e.g. Istanbul, Turkey" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Amount</label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Adults</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Children</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Infants</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Group Rate (per person)</label>
                  <input type="number" placeholder="0.00" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Leader Name</label>
                  <input type="text" placeholder="Group leader name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Leader Phone</label>
                  <input type="tel" placeholder="+968 XXXX XXXX" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Leader Email</label>
                  <input type="email" placeholder="leader@email.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                  <textarea rows={3} placeholder="Special requirements, notes..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowGroupModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={() => setShowGroupModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
