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
  Hotel,
  Calendar,
  User,
  MapPin,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Bed,
  Users,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  Building2,
  Edit2,
  Trash2,
  Eye,
} from "lucide-react";

// Types
interface HotelBooking {
  id: string;
  customer: string;
  hotel: string;
  city: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  roomType: string;
  ratePerNight: number;
  total: number;
  status: "confirmed" | "tentative" | "cancelled";
  voucherIssued: boolean;
}

interface HotelPartner {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  amenities: string[];
  email: string;
  phone: string;
  website: string;
}

// Mock Data
const mockBookings: HotelBooking[] = [
  {
    id: "HTL-0112",
    customer: "Fatima Malik",
    hotel: "Hilton Paddington",
    city: "London",
    checkIn: "2024-08-15",
    checkOut: "2024-08-22",
    rooms: 1,
    roomType: "Deluxe Double",
    ratePerNight: 280,
    total: 1960,
    status: "confirmed",
    voucherIssued: true,
  },
  {
    id: "HTL-0111",
    customer: "Ahmed Al-Farsi",
    hotel: "JW Marriott",
    city: "Dubai",
    checkIn: "2024-08-10",
    checkOut: "2024-08-13",
    rooms: 2,
    roomType: "Suite",
    ratePerNight: 550,
    total: 3300,
    status: "confirmed",
    voucherIssued: true,
  },
  {
    id: "HTL-0110",
    customer: "Mohammed Qasim",
    hotel: "Pullman Paris",
    city: "Paris",
    checkIn: "2024-08-22",
    checkOut: "2024-08-29",
    rooms: 1,
    roomType: "Standard",
    ratePerNight: 190,
    total: 1330,
    status: "tentative",
    voucherIssued: false,
  },
  {
    id: "HTL-0109",
    customer: "Khalid Al-Rashid",
    hotel: "Park Hyatt Sydney",
    city: "Sydney",
    checkIn: "2024-09-02",
    checkOut: "2024-09-09",
    rooms: 1,
    roomType: "Harbour View",
    ratePerNight: 620,
    total: 4340,
    status: "confirmed",
    voucherIssued: true,
  },
];

const mockPartners: HotelPartner[] = [
  {
    id: "1",
    name: "Hilton Paddington",
    location: "London, UK",
    rating: 4.2,
    reviews: 23,
    amenities: ["WiFi", "Pool", "Gym", "Restaurant"],
    email: "reservations@hiltonpaddington.co.uk",
    phone: "+44 20 1234 5678",
    website: "www.hilton.com/paddington",
  },
  {
    id: "2",
    name: "JW Marriott",
    location: "Dubai, UAE",
    rating: 4.8,
    reviews: 31,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar"],
    email: "res.jw.dubai@marriott.com",
    phone: "+971 4 123 4567",
    website: "www.marriott.com/dubai",
  },
  {
    id: "3",
    name: "Park Hyatt Sydney",
    location: "Sydney, Australia",
    rating: 4.9,
    reviews: 9,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Waterfront"],
    email: "sydney.park@hyatt.com",
    phone: "+61 2 1234 5678",
    website: "www.hyatt.com/sydney",
  },
  {
    id: "4",
    name: "Grand Hyatt Muscat",
    location: "Muscat, Oman",
    rating: 4.7,
    reviews: 47,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach Access"],
    email: "muscat.grand@hyatt.com",
    phone: "+968 24 123 456",
    website: "www.hyatt.com/muscat",
  },
  {
    id: "5",
    name: "Sofitel Makkah",
    location: "Makkah, KSA",
    rating: 4.5,
    reviews: 64,
    amenities: ["WiFi", "Restaurant", "Prayer Room", "Shopping"],
    email: "reservations@sofitelmakkah.com",
    phone: "+966 12 123 4567",
    website: "www.sofitel.com/makkah",
  },
];

// Status Configuration
const statusConfig = {
  confirmed: {
    label: "Confirmed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  tentative: {
    label: "Tentative",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

// Room type icons
const roomTypeIcons: Record<string, string> = {
  "Deluxe Double": "🛏️",
  Suite: "🏠",
  Standard: "🛌",
  "Harbour View": "🌊",
  "Family Room": "👨‍👩‍👧‍👦",
};

export default function HotelBookingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<HotelBooking | null>(
    mockBookings[0],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter bookings
  const filteredBookings = mockBookings.filter(
    (booking) =>
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Stats
  const totalBookings = mockBookings.length;
  const confirmedBookings = mockBookings.filter(
    (b) => b.status === "confirmed",
  ).length;
  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.total, 0);

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

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (hasHalfStar) {
      stars.push("½");
    }
    return stars.join("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hotel Booking</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>New Booking</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalBookings}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Hotel className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">+12 this month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">
                {confirmedBookings}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {((confirmedBookings / totalBookings) * 100).toFixed(0)}% of total
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
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
            +15.3% from last month
          </p>
        </div>
      </div>

      {/* Hotel Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        {/* Table Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Hotel Bookings
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search bookings..."
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
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hotel
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-In
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-Out
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rooms
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Type
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate/Night
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Voucher
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedBookings.map((booking) => {
                const StatusIcon = statusConfig[booking.status].icon;
                const statusInfo = statusConfig[booking.status];
                const nights = Math.ceil(
                  (new Date(booking.checkOut).getTime() -
                    new Date(booking.checkIn).getTime()) /
                    (1000 * 60 * 60 * 24),
                );

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
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.customer}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {booking.hotel}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {booking.city}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(booking.checkIn)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(booking.checkOut)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {booking.rooms}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span>{roomTypeIcons[booking.roomType] || "🏨"}</span>
                        {booking.roomType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right">
                      OMR {booking.ratePerNight}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                      OMR {booking.total.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {booking.voucherIssued ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Voucher
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
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

      {/* Hotel Partners Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Hotel Partners
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All Partners
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reviews
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amenities
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPartners.map((partner) => (
                <tr
                  key={partner.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {partner.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {partner.location}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm font-medium text-yellow-600">
                      {renderStars(partner.rating)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm text-gray-600">
                      {partner.reviews} bookings
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {partner.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                      {partner.amenities.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{partner.amenities.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${partner.email}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600"
                        title={partner.email}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${partner.phone}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-green-600"
                        title={partner.phone}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://${partner.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-purple-600"
                        title={partner.website}
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
