"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Plane,
  Calendar,
  User,
  MapPin,
  CreditCard,
  DollarSign,
  X,
  Save,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Briefcase,
  Crown,
  Shield,
  Edit2,
  Trash2,
} from "lucide-react";

// Types
interface FlightBooking {
  id: string;
  pnr: string;
  customer: string;
  airline: string;
  routeFrom: string;
  routeTo: string;
  travelDate: string;
  class: "Economy" | "Business" | "First";
  ticketNumber: string;
  fare: number;
  tax: number;
  serviceCharge: number;
  totalFare: number;
  status: "ticketed" | "confirmed" | "pending" | "cancelled";
  issuedBy?: string;
  bookingDate: string;
}

// Mock Data
const mockBookings: FlightBooking[] = [
  {
    id: "FLT-0289",
    pnr: "XKMP74",
    customer: "Fatima Malik",
    airline: "Emirates",
    routeFrom: "MCT",
    routeTo: "LHR",
    travelDate: "2024-08-15",
    class: "Economy",
    ticketNumber: "176-4123847261",
    fare: 1240,
    tax: 150,
    serviceCharge: 25,
    totalFare: 1415,
    status: "ticketed",
    issuedBy: "Sara Ahmed",
    bookingDate: "2024-07-20",
  },
  {
    id: "FLT-0288",
    pnr: "QRST89",
    customer: "Ahmed Al-Farsi",
    airline: "Oman Air",
    routeFrom: "MCT",
    routeTo: "DXB",
    travelDate: "2024-08-10",
    class: "Business",
    ticketNumber: "910-8374619283",
    fare: 890,
    tax: 80,
    serviceCharge: 25,
    totalFare: 995,
    status: "confirmed",
    issuedBy: "Omar Al-Balushi",
    bookingDate: "2024-07-18",
  },
  {
    id: "FLT-0287",
    pnr: "ABCD12",
    customer: "Mohammed Qasim",
    airline: "Qatar Airways",
    routeFrom: "RUH",
    routeTo: "CDG",
    travelDate: "2024-08-22",
    class: "Economy",
    ticketNumber: "157-9283741629",
    fare: 1680,
    tax: 200,
    serviceCharge: 25,
    totalFare: 1905,
    status: "ticketed",
    issuedBy: "Sara Ahmed",
    bookingDate: "2024-07-15",
  },
  {
    id: "FLT-0286",
    pnr: "EFGH45",
    customer: "Khalid Al-Rashid",
    airline: "Etihad Airways",
    routeFrom: "AUH",
    routeTo: "SYD",
    travelDate: "2024-09-01",
    class: "First",
    ticketNumber: "697-1298374650",
    fare: 8400,
    tax: 500,
    serviceCharge: 25,
    totalFare: 8925,
    status: "confirmed",
    issuedBy: "Khalid Al-Habsi",
    bookingDate: "2024-07-10",
  },
  {
    id: "FLT-0285",
    pnr: "IJKL67",
    customer: "Zainab Ibrahim",
    airline: "EgyptAir",
    routeFrom: "CAI",
    routeTo: "JFK",
    travelDate: "2024-08-28",
    class: "Economy",
    ticketNumber: "877-4736251898",
    fare: 1920,
    tax: 220,
    serviceCharge: 25,
    totalFare: 2165,
    status: "cancelled",
    issuedBy: "Sara Ahmed",
    bookingDate: "2024-07-05",
  },
];

// Status Configuration
const statusConfig = {
  ticketed: {
    label: "Ticketed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    icon: AlertCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

// Class Configuration
const classConfig = {
  Economy: { icon: Users, color: "text-blue-600" },
  Business: { icon: Briefcase, color: "text-purple-600" },
  First: { icon: Crown, color: "text-yellow-600" },
};

const airlines = [
  "Emirates",
  "Oman Air",
  "Qatar Airways",
  "Etihad Airways",
  "EgyptAir",
  "Singapore Airlines",
  "British Airways",
];
const customers = [
  "Fatima Malik",
  "Ahmed Al-Farsi",
  "Mohammed Qasim",
  "Khalid Al-Rashid",
  "Zainab Ibrahim",
  "Noor Al-Hassan",
];
const staff = [
  "Sara Ahmed",
  "Omar Al-Balushi",
  "Khalid Al-Habsi",
  "Noor Al-Hassan",
];

export default function FlightBookingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<FlightBooking | null>(
    mockBookings[0],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewBooking, setShowNewBooking] = useState(false);
  const itemsPerPage = 5;

  // New Booking Form State
  const [newBooking, setNewBooking] = useState({
    customer: "",
    airline: "",
    pnr: "",
    routeFrom: "",
    routeTo: "",
    travelDate: "",
    class: "Economy",
    ticketNumber: "",
    baseFare: 0,
    tax: 0,
    serviceCharge: 25,
    issuedBy: "",
  });

  // Filter bookings
  const filteredBookings = mockBookings.filter(
    (booking) =>
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.pnr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.routeFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.routeTo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Stats
  const totalFlights = mockBookings.length;
  const thisMonthBookings = mockBookings.filter((b) => {
    const date = new Date(b.bookingDate);
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;
  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.totalFare, 0);
  const cancelledBookings = mockBookings.filter(
    (b) => b.status === "cancelled",
  ).length;

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSaveBooking = () => {
    // In a real app, this would save to the database
    console.log("New Booking:", newBooking);
    setShowNewBooking(false);
    // Reset form
    setNewBooking({
      customer: "",
      airline: "",
      pnr: "",
      routeFrom: "",
      routeTo: "",
      travelDate: "",
      class: "Economy",
      ticketNumber: "",
      baseFare: 0,
      tax: 0,
      serviceCharge: 25,
      issuedBy: "",
    });
  };

  const totalFare =
    newBooking.baseFare + newBooking.tax + newBooking.serviceCharge;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Flight Booking</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button
          onClick={() => setShowNewBooking(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Booking</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Flights</p>
              <p className="text-2xl font-bold text-gray-900">{totalFlights}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            +{thisMonthBookings} this month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {thisMonthBookings}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenue (Jul)</p>
              <p className="text-2xl font-bold text-gray-900">
                OMR {totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +8.2% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">
                {cancelledBookings}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {((cancelledBookings / totalFlights) * 100).toFixed(1)}% of total
          </p>
        </div>
      </div>

      {/* Flight Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Flight Bookings
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search PNR, customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64"
                />
              </div>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <Download className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PNR
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Airline
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket No
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fare (OMR)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedBookings.map((booking) => {
                const StatusIcon = statusConfig[booking.status].icon;
                const statusInfo = statusConfig[booking.status];
                const ClassIcon = classConfig[booking.class].icon;

                return (
                  <tr
                    key={booking.id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedBooking?.id === booking.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {booking.id}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-blue-600">
                      {booking.pnr}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.customer}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {booking.airline}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {booking.routeFrom} → {booking.routeTo}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(booking.travelDate)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`flex items-center gap-1 text-sm ${classConfig[booking.class].color}`}
                      >
                        <ClassIcon className="w-3.5 h-3.5" />
                        {booking.class}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-500">
                      {booking.ticketNumber}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                      {booking.totalFare.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
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
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredBookings.length)} of{" "}
              {filteredBookings.length} results
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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

      {/* New Booking Modal */}
      {showNewBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                New Flight Booking
              </h2>
              <button
                onClick={() => setShowNewBooking(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-5">
                {/* Customer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Customer
                  </label>
                  <select
                    value={newBooking.customer}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, customer: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select customer</option>
                    {customers.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Airline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Airline
                  </label>
                  <select
                    value={newBooking.airline}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, airline: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select airline</option>
                    {airlines.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PNR */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    PNR
                  </label>
                  <input
                    type="text"
                    value={newBooking.pnr}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, pnr: e.target.value })
                    }
                    placeholder="e.g. XKMP74"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Class
                  </label>
                  <select
                    value={newBooking.class}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        class: e.target.value as
                          | "Economy"
                          | "Business"
                          | "First",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First</option>
                  </select>
                </div>

                {/* Route From */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Route (From)
                  </label>
                  <input
                    type="text"
                    value={newBooking.routeFrom}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        routeFrom: e.target.value,
                      })
                    }
                    placeholder="e.g. MCT"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                  />
                </div>

                {/* Route To */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Route (To)
                  </label>
                  <input
                    type="text"
                    value={newBooking.routeTo}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, routeTo: e.target.value })
                    }
                    placeholder="e.g. LHR"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                  />
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={newBooking.travelDate}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        travelDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Ticket Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Ticket Number
                  </label>
                  <input
                    type="text"
                    value={newBooking.ticketNumber}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        ticketNumber: e.target.value,
                      })
                    }
                    placeholder="e.g. 176-1234567890"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Base Fare */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Base Fare (OMR)
                  </label>
                  <input
                    type="number"
                    value={newBooking.baseFare}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        baseFare: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.000"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Tax */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tax (OMR)
                  </label>
                  <input
                    type="number"
                    value={newBooking.tax}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        tax: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.000"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Service Charge */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Service Charge (OMR)
                  </label>
                  <input
                    type="number"
                    value={newBooking.serviceCharge}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        serviceCharge: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.000"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Issued By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Issued By
                  </label>
                  <select
                    value={newBooking.issuedBy}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, issuedBy: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select staff</option>
                    {staff.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total Fare (readonly) */}
                <div className="col-span-2">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Total Fare
                      </span>
                      <span className="text-2xl font-bold text-blue-700">
                        OMR {totalFare.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                      <span>Base: OMR {newBooking.baseFare.toFixed(2)}</span>
                      <span>Tax: OMR {newBooking.tax.toFixed(2)}</span>
                      <span>
                        Service: OMR {newBooking.serviceCharge.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowNewBooking(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBooking}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                Save Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
