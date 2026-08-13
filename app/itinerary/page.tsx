"use client";

import React, { useState } from "react";
import {
  Map,
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
  Plane,
  Hotel,
  Car,
  FileText,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X,
  Save,
  Printer,
  Mail,
  FileCheck,
  DollarSign,
} from "lucide-react";

interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  activities: {
    time: string;
    type: "flight" | "hotel" | "transport" | "visa" | "activity";
    title: string;
    description: string;
    location: string;
    status: "confirmed" | "pending" | "cancelled";
  }[];
}

interface Itinerary {
  id: string;
  customer: string;
  customerEmail: string;
  startDate: string;
  endDate: string;
  destination: string;
  adults: number;
  children: number;
  status: "draft" | "confirmed" | "completed" | "cancelled";
  totalAmount: number;
  currency: string;
  days: ItineraryDay[];
  notes?: string;
}

const mockItineraries: Itinerary[] = [
  {
    id: "ITN-001",
    customer: "Ahmed Al-Farsi",
    customerEmail: "ahmed@email.com",
    startDate: "2026-08-15",
    endDate: "2026-08-20",
    destination: "Bali, Indonesia",
    adults: 2,
    children: 0,
    status: "confirmed",
    totalAmount: 2100,
    currency: "USD",
    notes: "Honeymoon trip",
    days: [
      {
        day: 1,
        date: "2026-08-15",
        title: "Arrival in Bali",
        activities: [
          { time: "14:30", type: "flight", title: "Flight arrival — DPS", description: " arrive at Ngurah Rai International Airport", location: "Denpasar, Bali", status: "confirmed" },
          { time: "16:00", type: "transport", title: "Airport Transfer", description: "Private car to hotel", location: "Denpasar to Seminyak", status: "confirmed" },
          { time: "17:30", type: "hotel", title: "Check-in — The Oberoi Bali", description: "5-star beachfront resort", location: "Seminyak Beach", status: "confirmed" },
        ],
      },
      {
        day: 2,
        date: "2026-08-16",
        title: "Beach & Spa Day",
        activities: [
          { time: "09:00", type: "activity", title: "Breakfast at hotel", description: "Continental breakfast", location: "The Oberoi Bali", status: "confirmed" },
          { time: "10:30", type: "activity", title: "Spa Treatment", description: "Couples spa package", location: "The Oberoi Spa", status: "pending" },
          { time: "19:00", type: "activity", title: "Sunset Dinner", description: "Private beach dinner", location: "The Oberoi Beach", status: "pending" },
        ],
      },
      {
        day: 3,
        date: "2026-08-17",
        title: "Ubud Cultural Tour",
        activities: [
          { time: "08:00", type: "transport", title: "Private car to Ubud", description: "Full day tour with driver", location: "Seminyak to Ubud", status: "confirmed" },
          { time: "10:00", type: "activity", title: "Sacred Monkey Forest", description: "Guided tour of monkey sanctuary", location: "Ubud", status: "confirmed" },
          { time: "14:00", type: "activity", title: "Tegallalang Rice Terraces", description: " UNESCO heritage site visit", location: "Tegallalang", status: "confirmed" },
        ],
      },
    ],
  },
  {
    id: "ITN-002",
    customer: "Fatima Malik",
    customerEmail: "fatima@email.com",
    startDate: "2026-08-20",
    endDate: "2026-08-25",
    destination: "Istanbul, Turkey",
    adults: 1,
    children: 1,
    status: "draft",
    totalAmount: 1850,
    currency: "USD",
    notes: "Family vacation",
    days: [
      {
        day: 1,
        date: "2026-08-20",
        title: "Arrival in Istanbul",
        activities: [
          { time: "10:00", type: "flight", title: "Flight arrival — IST", description: "Arrive at Istanbul Airport", location: "Istanbul, Turkey", status: "pending" },
          { time: "12:00", type: "hotel", title: "Check-in — Four Seasons", description: "Luxury hotel in Sultanahmet", location: "Sultanahmet", status: "pending" },
        ],
      },
    ],
  },
];

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-600", icon: FileText },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-700", icon: CheckCircle },
  completed: { label: "Completed", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-600", icon: XCircle },
};

const activityTypeConfig = {
  flight: { label: "Flight", color: "bg-blue-100 text-blue-700", icon: Plane },
  hotel: { label: "Hotel", color: "bg-green-100 text-green-700", icon: Hotel },
  transport: { label: "Transport", color: "bg-orange-100 text-orange-700", icon: Car },
  visa: { label: "Visa", color: "bg-purple-100 text-purple-700", icon: FileText },
  activity: { label: "Activity", color: "bg-yellow-100 text-yellow-700", icon: Calendar },
};

export default function ItineraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [viewingItinerary, setViewingItinerary] = useState<Itinerary | null>(null);
  const itemsPerPage = 5;

  const filteredItineraries = mockItineraries.filter((itn) => {
    const matchesSearch = itn.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itn.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || itn.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredItineraries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItineraries = filteredItineraries.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", OMR: "﷼", SAR: "﷼", AED: "د.إ" };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Itinerary Builder</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button
          onClick={() => setShowItineraryModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Itinerary
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Itineraries</p>
              <p className="text-2xl font-bold text-gray-900">{mockItineraries.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Map className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{mockItineraries.filter((i) => i.status === "confirmed").length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Draft</p>
              <p className="text-2xl font-bold text-yellow-600">{mockItineraries.filter((i) => i.status === "draft").length}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockItineraries.reduce((sum, i) => sum + i.totalAmount, 0), "USD")}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Consolidated Bookings</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search itineraries..."
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Itinerary ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pax</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedItineraries.map((itn) => {
                const statusInfo = statusConfig[itn.status];
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={itn.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{itn.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{itn.customer}</p>
                        <p className="text-xs text-gray-500">{itn.adults} adults, {itn.children} children</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{itn.destination}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{itn.startDate} — {itn.endDate}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">{itn.adults + itn.children}</td>
                    <td className="px-4 py-3 text-right">
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(itn.totalAmount, itn.currency)}</p>
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
                          onClick={() => setViewingItinerary(itn)}
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItineraries.length)} of {filteredItineraries.length} itineraries
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

      {/* View Itinerary Modal */}
      {viewingItinerary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Itinerary Details</h2>
                <p className="text-sm text-gray-500">{viewingItinerary.id} — {viewingItinerary.customer}</p>
              </div>
              <button onClick={() => setViewingItinerary(null)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="text-lg font-semibold text-gray-900">{viewingItinerary.destination}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[viewingItinerary.status].color}`}>
                    {statusConfig[viewingItinerary.status].label}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="text-sm font-medium text-gray-900">{viewingItinerary.startDate}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">End Date</p>
                    <p className="text-sm font-medium text-gray-900">{viewingItinerary.endDate}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Adults</p>
                    <p className="text-sm font-medium text-gray-900">{viewingItinerary.adults}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Children</p>
                    <p className="text-sm font-medium text-gray-900">{viewingItinerary.children}</p>
                  </div>
                </div>

                {viewingItinerary.notes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700">{viewingItinerary.notes}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Day-by-Day Itinerary</h4>
                  <div className="space-y-4">
                    {viewingItinerary.days.map((day) => (
                      <div key={day.day} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="text-sm font-semibold text-gray-900">Day {day.day} — {day.title}</h5>
                              <p className="text-xs text-gray-500">{day.date}</p>
                            </div>
                          </div>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {day.activities.map((activity, idx) => {
                            const typeInfo = activityTypeConfig[activity.type];
                            const TypeIcon = typeInfo.icon;
                            return (
                              <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start gap-4">
                                  <div className="flex flex-col items-center">
                                    <span className="text-xs font-medium text-gray-500 w-12">{activity.time}</span>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mt-1 ${typeInfo.color}`}>
                                      <TypeIcon className="w-4 h-4" />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h6 className="text-sm font-medium text-gray-900">{activity.title}</h6>
                                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${activity.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                        {activity.status}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {activity.location}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Total Amount</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(viewingItinerary.totalAmount, viewingItinerary.currency)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setViewingItinerary(null)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Close
              </button>
              <button onClick={() => setViewingItinerary(null)} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button onClick={() => setViewingItinerary(null)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Mail className="w-4 h-4" />
                Send to Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Itinerary Modal */}
      {showItineraryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">New Itinerary</h2>
              <button onClick={() => setShowItineraryModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
                  <input type="text" placeholder="e.g. Bali, Indonesia" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
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
                  <input type="number" placeholder="1" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Children</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                  <textarea rows={3} placeholder="Special requests, preferences..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowItineraryModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={() => setShowItineraryModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                Save Itinerary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
