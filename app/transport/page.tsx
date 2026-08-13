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
  Truck,
  Calendar,
  User,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Users,
  Car,
  Bus,
  Navigation,
  Phone,
  Mail,
  Edit2,
  Trash2,
  Eye,
  TrendingUp,
  Wrench,
  Gauge,
  Fuel,
  Shield,
} from "lucide-react";

// Types
interface Transfer {
  id: string;
  customer: string;
  vehicle: string;
  vehiclePlate: string;
  driver: string;
  pickup: string;
  dropoff: string;
  dateTime: string;
  pax: number;
  cost: number;
  status: "assigned" | "completed" | "cancelled" | "in-progress";
}

interface Vehicle {
  id: string;
  plate: string;
  model: string;
  capacity: number;
  driver: string;
  status: "available" | "assigned" | "maintenance" | "unassigned";
  type: "sedan" | "suv" | "van" | "bus" | "luxury";
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: "available" | "on-trip" | "off-duty";
  rating: number;
}

// Mock Data
const mockTransfers: Transfer[] = [
  {
    id: "TRF-0067",
    customer: "Fatima Malik",
    vehicle: "Toyota Hiace",
    vehiclePlate: "OM 1234",
    driver: "Saeed Al-Balushi",
    pickup: "MCT Airport",
    dropoff: "Grand Hyatt Muscat",
    dateTime: "2024-08-15 14:30",
    pax: 2,
    cost: 45,
    status: "assigned",
  },
  {
    id: "TRF-0066",
    customer: "Ahmed Al-Farsi",
    vehicle: "Mercedes V-Class",
    vehiclePlate: "OM 5678",
    driver: "Khalfan Rashdi",
    pickup: "DXB Airport T3",
    dropoff: "JW Marriott Dubai",
    dateTime: "2024-08-10 19:00",
    pax: 1,
    cost: 80,
    status: "completed",
  },
  {
    id: "TRF-0065",
    customer: "Mohammed Qasim",
    vehicle: "Toyota Camry",
    vehiclePlate: "OM 9012",
    driver: "Hamood Al-Farsi",
    pickup: "CDG Airport",
    dropoff: "Pullman Paris",
    dateTime: "2024-08-22 10:45",
    pax: 3,
    cost: 95,
    status: "assigned",
  },
  {
    id: "TRF-0064",
    customer: "Zainab Ibrahim",
    vehicle: "Toyota Land Cruiser",
    vehiclePlate: "OM 3456",
    driver: "Unassigned",
    pickup: "CAI Airport",
    dropoff: "Marriott Cairo",
    dateTime: "2024-08-28 09:00",
    pax: 3,
    cost: 120,
    status: "assigned",
  },
  {
    id: "TRF-0063",
    customer: "Khalid Al-Rashid",
    vehicle: "Coaster Bus",
    vehiclePlate: "OM 7890",
    driver: "Salim Badr",
    pickup: "AUH Airport",
    dropoff: "Park Hyatt Sydney",
    dateTime: "2024-09-01 16:00",
    pax: 15,
    cost: 250,
    status: "cancelled",
  },
];

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    plate: "OM 1234",
    model: "Toyota Hiace",
    capacity: 12,
    driver: "Saeed Al-Balushi",
    status: "assigned",
    type: "van",
  },
  {
    id: "2",
    plate: "OM 5678",
    model: "Mercedes V-Class",
    capacity: 7,
    driver: "Khalfan Rashdi",
    status: "assigned",
    type: "van",
  },
  {
    id: "3",
    plate: "OM 9012",
    model: "Toyota Camry",
    capacity: 4,
    driver: "Hamood Al-Farsi",
    status: "assigned",
    type: "sedan",
  },
  {
    id: "4",
    plate: "OM 3456",
    model: "Toyota Land Cruiser",
    capacity: 7,
    driver: "Unassigned",
    status: "unassigned",
    type: "suv",
  },
  {
    id: "5",
    plate: "OM 7890",
    model: "Coaster Bus",
    capacity: 30,
    driver: "Salim Badr",
    status: "maintenance",
    type: "bus",
  },
];

const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "Saeed Al-Balushi",
    phone: "+968 9123 4567",
    vehicle: "Toyota Hiace",
    status: "on-trip",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Khalfan Rashdi",
    phone: "+968 9234 5678",
    vehicle: "Mercedes V-Class",
    status: "available",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Hamood Al-Farsi",
    phone: "+968 9345 6789",
    vehicle: "Toyota Camry",
    status: "available",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Salim Badr",
    phone: "+968 9456 7890",
    vehicle: "Coaster Bus",
    status: "off-duty",
    rating: 4.5,
  },
  {
    id: "5",
    name: "Ahmed Al-Said",
    phone: "+968 9567 8901",
    vehicle: "Toyota Land Cruiser",
    status: "available",
    rating: 4.6,
  },
];

// Status Configuration
const statusConfig = {
  assigned: {
    label: "Assigned",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-yellow-100 text-yellow-700",
    icon: AlertCircle,
  },
};

const fleetStatusConfig = {
  available: {
    label: "Available",
    color: "bg-green-100 text-green-700",
  },
  assigned: {
    label: "Assigned",
    color: "bg-blue-100 text-blue-700",
  },
  maintenance: {
    label: "Maintenance",
    color: "bg-red-100 text-red-700",
  },
  unassigned: {
    label: "Unassigned",
    color: "bg-gray-100 text-gray-700",
  },
};

const driverStatusConfig = {
  available: {
    label: "Available",
    color: "bg-green-100 text-green-700",
  },
  "on-trip": {
    label: "On Trip",
    color: "bg-yellow-100 text-yellow-700",
  },
  "off-duty": {
    label: "Off Duty",
    color: "bg-gray-100 text-gray-700",
  },
};

const vehicleIcons = {
  sedan: Car,
  suv: Car,
  van: Truck,
  bus: Bus,
  luxury: Car,
};

export default function TransportationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(
    mockTransfers[0],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter transfers
  const filteredTransfers = mockTransfers.filter(
    (transfer) =>
      transfer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.dropoff.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransfers = filteredTransfers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Stats
  const totalTransfers = mockTransfers.length;
  const todayTransfers = mockTransfers.filter((t) => {
    const today = new Date().toDateString();
    const transferDate = new Date(t.dateTime).toDateString();
    return transferDate === today;
  }).length;
  const totalVehicles = mockVehicles.length;
  const totalDrivers = mockDrivers.length;

  const formatDate = (dateTime: string) => {
    const d = new Date(dateTime);
    return (
      d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      " " +
      d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
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
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (rating % 1 >= 0.5) {
      stars.push("½");
    }
    return stars.join("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transportation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>New Transfer</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Transfers</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalTransfers}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">+8 this month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Transfers</p>
              <p className="text-2xl font-bold text-gray-900">
                {todayTransfers}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {todayTransfers > 0
              ? `${todayTransfers} scheduled today`
              : "No transfers today"}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalVehicles}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {mockVehicles.filter((v) => v.status === "available").length}{" "}
            available
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Drivers</p>
              <p className="text-2xl font-bold text-gray-900">{totalDrivers}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {mockDrivers.filter((d) => d.status === "available").length}{" "}
            available
          </p>
        </div>
      </div>

      {/* Recent Transfers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Transfers
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search transfers..."
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pickup
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dropoff
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pax
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fleet Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedTransfers.map((transfer) => {
                const StatusIcon = statusConfig[transfer.status].icon;
                const statusInfo = statusConfig[transfer.status];
                const vehicleData = mockVehicles.find(
                  (v) => v.plate === transfer.vehiclePlate,
                );
                const fleetStatus = vehicleData?.status || "unassigned";
                const fleetStatusInfo = fleetStatusConfig[fleetStatus];

                return (
                  <tr
                    key={transfer.id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedTransfer?.id === transfer.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedTransfer(transfer)}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {transfer.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {transfer.customer}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <span>{transfer.vehicle}</span>
                        <span className="text-xs text-gray-400">—</span>
                        <span className="text-xs font-mono text-gray-500">
                          {transfer.vehiclePlate}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {transfer.driver}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
                      {transfer.pickup}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[120px] truncate">
                      {transfer.dropoff}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(transfer.dateTime)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {transfer.pax}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                      OMR {transfer.cost}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${fleetStatusInfo.color}`}
                      >
                        {transfer.vehiclePlate} {transfer.vehicle}
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
              {Math.min(startIndex + itemsPerPage, filteredTransfers.length)} of{" "}
              {filteredTransfers.length} results
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

      {/* Fleet Status */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Fleet Status
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Manage Fleet
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {mockVehicles.map((vehicle) => {
            const statusInfo = fleetStatusConfig[vehicle.status];
            const VehicleIcon = vehicleIcons[vehicle.type] || Car;

            return (
              <div
                key={vehicle.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <VehicleIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {vehicle.plate}
                      </p>
                      <p className="text-xs text-gray-500">{vehicle.model}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Capacity:</span>
                    <span className="ml-1 text-gray-600 font-medium">
                      {vehicle.capacity} pax
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Driver:</span>
                    <span className="ml-1 text-gray-600 font-medium">
                      {vehicle.driver}
                    </span>
                  </div>
                </div>
                {vehicle.status === "maintenance" && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                    <Wrench className="w-3 h-3" />
                    <span>Under maintenance</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
