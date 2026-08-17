"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  User,
  Calendar,
  Mail,
  Phone,
  Flag,
  CreditCard,
  Clock,
  Star,
  FileText,
  BookOpen,
  Users,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  Filter,
  Download,
  Edit2,
  Trash2,
  X,
  Save,
} from "lucide-react";

// Types
interface Customer {
  id: string;
  name: string;
  passportNumber: string;
  nationality: string;
  bookings: number;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  issueCountry: string;
  isVIP: boolean;
  status: "active" | "inactive" | "pending";
  notes?: string;
  avatar?: string;
}

// Mock Data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Ahmed Al-Farsi",
    passportNumber: "P12847364",
    nationality: "Omani",
    bookings: 7,
    email: "ahmed.alfarsi@email.com",
    phone: "+968 9123 4567",
    dateOfBirth: "1985-06-15",
    passportIssueDate: "2022-01-10",
    passportExpiryDate: "2027-01-09",
    issueCountry: "Oman",
    isVIP: true,
    status: "active",
    notes: "Preferred business class. Frequent flyer with Emirates.",
  },
  {
    id: "2",
    name: "Fatima Malik",
    passportNumber: "PK9384712",
    nationality: "Pakistan",
    bookings: 14,
    email: "fatima.malik@email.com",
    phone: "+92 300 1234567",
    dateOfBirth: "1990-11-22",
    passportIssueDate: "2023-03-15",
    passportExpiryDate: "2028-03-14",
    issueCountry: "Pakistan",
    isVIP: false,
    status: "active",
  },
  {
    id: "3",
    name: "Mohammed Qasim",
    passportNumber: "SA1234568",
    nationality: "Saudi",
    bookings: 3,
    email: "mohammed.qasim@email.com",
    phone: "+966 50 1234567",
    dateOfBirth: "1992-09-08",
    passportIssueDate: "2021-07-20",
    passportExpiryDate: "2026-07-19",
    issueCountry: "Saudi Arabia",
    isVIP: false,
    status: "active",
  },
  {
    id: "4",
    name: "Zainab Ibrahim",
    passportNumber: "EG8473921",
    nationality: "Egyptian",
    bookings: 5,
    email: "zainab.ibrahim@email.com",
    phone: "+20 100 1234567",
    dateOfBirth: "1988-04-30",
    passportIssueDate: "2024-01-05",
    passportExpiryDate: "2029-01-04",
    issueCountry: "Egypt",
    isVIP: true,
    status: "active",
  },
  {
    id: "5",
    name: "Khalid Al-Rashid",
    passportNumber: "AE7293847",
    nationality: "Emirati",
    bookings: 2,
    email: "khalid.alrashid@email.com",
    phone: "+971 50 1234567",
    dateOfBirth: "1995-12-01",
    passportIssueDate: "2023-09-10",
    passportExpiryDate: "2028-09-09",
    issueCountry: "UAE",
    isVIP: false,
    status: "inactive",
  },
  {
    id: "6",
    name: "Noor Al-Hassan",
    passportNumber: "KW3847261",
    nationality: "Kuwaiti",
    bookings: 9,
    email: "noor.alhassan@email.com",
    phone: "+965 9000 1234",
    dateOfBirth: "1993-07-25",
    passportIssueDate: "2022-11-15",
    passportExpiryDate: "2027-11-14",
    issueCountry: "Kuwait",
    isVIP: false,
    status: "pending",
  },
];

// Tabs
const tabs = ["Profile", "Bookings", "Documents"];
// 👇 ADD BOOKINGSTAB HERE
// 👇 BOOKINGSTAB WITH SAMPLE DATA
const BookingsTab = ({ customerId }: { customerId: string }) => {
  // Sample booking data for the selected customer
  const sampleBookings = [
    {
      id: "BK-2024-001",
      type: "Flight",
      destination: "Dubai → London",
      date: "2024-12-15",
      status: "Confirmed",
      amount: "OMR 450",
      passengers: 2,
    },
    {
      id: "BK-2024-002",
      type: "Hotel",
      destination: "Burj Al Arab, Dubai",
      date: "2024-12-16 - 2024-12-20",
      status: "Pending",
      amount: "OMR 1,200",
      passengers: 2,
    },
    {
      id: "BK-2024-003",
      type: "Visa",
      destination: "UK Visit Visa",
      date: "2024-11-20",
      status: "Approved",
      amount: "OMR 85",
      passengers: 1,
    },
    {
      id: "BK-2024-004",
      type: "Flight",
      destination: "Muscat → Singapore",
      date: "2025-01-10",
      status: "Cancelled",
      amount: "OMR 320",
      passengers: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "flight":
        return "✈️";
      case "hotel":
        return "🏨";
      case "visa":
        return "📄";
      default:
        return "📋";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Booking History</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Booking List */}
      <div className="space-y-3">
        {sampleBookings.map((booking) => (
          <div
            key={booking.id}
            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-lg">{getTypeIcon(booking.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {booking.type}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {booking.destination}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-gray-400">{booking.date}</p>
                    <span className="text-xs text-gray-300">•</span>
                    <p className="text-xs text-gray-400">
                      {booking.passengers} passenger
                      {booking.passengers > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="text-sm font-semibold text-gray-900">
                  {booking.amount}
                </p>
                <p className="text-xs text-gray-400">{booking.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
        <div className="text-center p-2 bg-blue-50 rounded-lg">
          <p className="text-lg font-bold text-blue-700">4</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div className="text-center p-2 bg-green-50 rounded-lg">
          <p className="text-lg font-bold text-green-700">2</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="text-center p-2 bg-yellow-50 rounded-lg">
          <p className="text-lg font-bold text-yellow-700">OMR 2,055</p>
          <p className="text-xs text-gray-500">Total Spent</p>
        </div>
      </div>
    </div>
  );
};

// 👇 DOCUMENTSTAB WITH SAMPLE DATA
const DocumentsTab = ({ customerId }: { customerId: string }) => {
  // Sample documents data
  const sampleDocuments = [
    {
      id: "DOC-001",
      name: "Passport Copy",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-10-15",
      status: "Verified",
      icon: "📄",
    },
    {
      id: "DOC-002",
      name: "Visa Photo",
      type: "JPG",
      size: "856 KB",
      uploadDate: "2024-10-20",
      status: "Pending",
      icon: "🖼️",
    },
    {
      id: "DOC-003",
      name: "Travel Insurance",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2024-11-01",
      status: "Verified",
      icon: "📄",
    },
    {
      id: "DOC-004",
      name: "Flight Itinerary",
      type: "PDF",
      size: "456 KB",
      uploadDate: "2024-11-05",
      status: "Expired",
      icon: "📄",
    },
    {
      id: "DOC-005",
      name: "Hotel Voucher",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: "2024-11-10",
      status: "Verified",
      icon: "📄",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "📕";
      case "jpg":
      case "png":
        return "🖼️";
      case "doc":
      case "docx":
        return "📘";
      default:
        return "📄";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Documents</h3>
        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
          <span>+</span> Upload
        </button>
      </div>

      {/* Document List */}
      <div className="space-y-2">
        {sampleDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
              {getFileIcon(doc.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {doc.name}
                </p>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(doc.status)}`}
                >
                  {doc.status}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <p className="text-xs text-gray-400">{doc.type}</p>
                <span className="text-xs text-gray-300">•</span>
                <p className="text-xs text-gray-400">{doc.size}</p>
                <span className="text-xs text-gray-300">•</span>
                <p className="text-xs text-gray-400">{doc.uploadDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
              <button className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-400 hover:text-red-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Drop files here or</p>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              browse to upload
            </button>
          </div>
          <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
        </div>
      </div>
    </div>
  );
};
// Helper: Get days until expiry
const getDaysUntilExpiry = (expiryDate: string) => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper: Status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700";
    case "inactive":
      return "bg-gray-100 text-gray-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// Helper: Get initials
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    customers[0],
  );
  const [activeTab, setActiveTab] = useState("Profile");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerForm, setCustomerForm] = useState<Partial<Customer>>({});
  const itemsPerPage = 4;

  // Filter customers based on search
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.passportNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.nationality.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const openNewCustomerModal = () => {
    setEditingCustomer(null);
    setCustomerForm({
      name: "",
      passportNumber: "",
      nationality: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      passportIssueDate: "",
      passportExpiryDate: "",
      issueCountry: "",
      status: "active",
      notes: "",
      isVIP: false,
      bookings: 0,
    });
    setShowCustomerModal(true);
  };

  const openEditCustomerModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setCustomerForm({ ...customer });
    setShowCustomerModal(true);
  };

  const handleSaveCustomer = () => {
    if (!customerForm.name?.trim() || !customerForm.passportNumber?.trim()) return;
    
    if (editingCustomer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editingCustomer.id
            ? { ...c, ...customerForm, id: c.id } as Customer
            : c,
        ),
      );
    } else {
      const newCustomer: Customer = {
        ...customerForm,
        id: Date.now().toString(),
      } as Customer;
      setCustomers((prev) => [...prev, newCustomer]);
      setSelectedCustomer(newCustomer);
    }
    setShowCustomerModal(false);
    setCustomerForm({});
    setEditingCustomer(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
            <p className="text-sm text-gray-500 mt-1">
              Wednesday, 12 August 2026
            </p>
          </div>
          <button onClick={openNewCustomerModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>New Customer</span>
          </button>
        </div>

        {/* All Customers Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Section Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              All Customers
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search name, passport, nationality..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
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

          {/* Customer List */}
          <div className="divide-y divide-gray-100">
            {paginatedCustomers.map((customer) => {
              const daysUntilExpiry = getDaysUntilExpiry(
                customer.passportExpiryDate,
              );
              const isExpiringSoon = daysUntilExpiry < 180;

              return (
                <div
                  key={customer.id}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedCustomer?.id === customer.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleSelectCustomer(customer)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                      {getInitials(customer.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {customer.name}
                        </h3>
                        {customer.isVIP && (
                          <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-medium">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            VIP
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}
                        >
                          {customer.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                        <span className="font-mono">
                          {customer.passportNumber}
                        </span>
                        <span>•</span>
                        <span>{customer.nationality}</span>
                        <span>•</span>
                        <span>{customer.bookings} bookings</span>
                        {isExpiringSoon && (
                          <>
                            <span>•</span>
                            <span className="text-yellow-600 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Expires in {daysUntilExpiry} days
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredCustomers.length)}{" "}
                of {filteredCustomers.length} results
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
      </div>

      {/* Customer Details Panel */}
      {selectedCustomer && (
        <div className="w-[440px] bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
          {/* Panel Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                {getInitials(selectedCustomer.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {selectedCustomer.name}
                  </h2>
                  {selectedCustomer.isVIP && (
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-gray-500 font-mono">
                    {selectedCustomer.passportNumber}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {selectedCustomer.nationality}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {selectedCustomer.bookings} bookings
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEditCustomerModal(selectedCustomer)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <Edit2 className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mt-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Panel Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "Profile" && (
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Full Name
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Email</p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Phone</p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Nationality
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.nationality}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Customer ID
                      </p>
                      <p className="text-sm text-gray-900 font-mono">
                        {selectedCustomer.id}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                {/* Additional Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-gray-400" />
                    Additional Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Contact Information
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        VIP Customer
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.isVIP ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Internal Notes
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.notes || "No notes available"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                {/* Passport Details */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    Passport Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Passport No
                      </p>
                      <p className="text-sm text-gray-900 font-mono">
                        {selectedCustomer.passportNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Nationality
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.nationality}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Date of Birth
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.dateOfBirth}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Issue Date
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.passportIssueDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Expiry Date
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.passportExpiryDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Issue Country
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.issueCountry}
                      </p>
                    </div>
                  </div>

                  {/* Expiry Warning */}
                  {getDaysUntilExpiry(selectedCustomer.passportExpiryDate) <
                    180 && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-yellow-700">
                          Passport expires in{" "}
                          <strong>
                            {getDaysUntilExpiry(
                              selectedCustomer.passportExpiryDate,
                            )}{" "}
                            days
                          </strong>
                          . Consider renewal before next booking.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === "Bookings" && (
              <BookingsTab customerId={selectedCustomer.id} />
            )}
            {activeTab === "Documents" && (
              <DocumentsTab customerId={selectedCustomer.id} />
            )}
          </div>
        </div>
      )}

      {showCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{editingCustomer ? "Edit Customer" : "New Customer"}</h2>
              <button onClick={() => setShowCustomerModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input type="text" placeholder="Customer name" value={customerForm.name || ""} onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Passport Number</label>
                  <input type="text" placeholder="e.g. P12847364" value={customerForm.passportNumber || ""} onChange={(e) => setCustomerForm({ ...customerForm, passportNumber: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nationality</label>
                  <input type="text" placeholder="e.g. Omani" value={customerForm.nationality || ""} onChange={(e) => setCustomerForm({ ...customerForm, nationality: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" placeholder="email@example.com" value={customerForm.email || ""} onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" placeholder="+968 XXXX XXXX" value={customerForm.phone || ""} onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
                  <input type="date" value={customerForm.dateOfBirth || ""} onChange={(e) => setCustomerForm({ ...customerForm, dateOfBirth: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Passport Issue Date</label>
                  <input type="date" value={customerForm.passportIssueDate || ""} onChange={(e) => setCustomerForm({ ...customerForm, passportIssueDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Passport Expiry Date</label>
                  <input type="date" value={customerForm.passportExpiryDate || ""} onChange={(e) => setCustomerForm({ ...customerForm, passportExpiryDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Issue Country</label>
                  <input type="text" placeholder="e.g. Oman" value={customerForm.issueCountry || ""} onChange={(e) => setCustomerForm({ ...customerForm, issueCountry: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select value={customerForm.status || "active"} onChange={(e) => setCustomerForm({ ...customerForm, status: e.target.value as Customer["status"] })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                  <textarea rows={3} placeholder="Customer notes..." value={customerForm.notes || ""} onChange={(e) => setCustomerForm({ ...customerForm, notes: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowCustomerModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">Cancel</button>
              <button onClick={handleSaveCustomer} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                {editingCustomer ? "Update Customer" : "Add Customer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
