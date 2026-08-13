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
  Car,
  Bus,
  Truck,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  Eye,
  Shield,
  Fuel,
  Gauge,
  X,
  Save,
} from "lucide-react";

interface Vehicle {
  id: string;
  plate: string;
  model: string;
  type: "sedan" | "suv" | "van" | "bus" | "luxury";
  capacity: number;
  driver: string;
  status: "available" | "assigned" | "maintenance" | "unassigned";
  mileage: number;
  fuelType: string;
  lastService: string;
  nextService: string;
  insuranceExpiry: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: "VEH-001",
    plate: "OM 1234",
    model: "Toyota Hiace",
    type: "van",
    capacity: 12,
    driver: "Saeed Al-Balushi",
    status: "assigned",
    mileage: 45000,
    fuelType: "Diesel",
    lastService: "2026-07-15",
    nextService: "2026-10-15",
    insuranceExpiry: "2026-12-01",
  },
  {
    id: "VEH-002",
    plate: "OM 5678",
    model: "Mercedes V-Class",
    type: "van",
    capacity: 7,
    driver: "Khalfan Rashdi",
    status: "assigned",
    mileage: 28000,
    fuelType: "Petrol",
    lastService: "2026-06-20",
    nextService: "2026-09-20",
    insuranceExpiry: "2027-01-15",
  },
  {
    id: "VEH-003",
    plate: "OM 9012",
    model: "Toyota Camry",
    type: "sedan",
    capacity: 4,
    driver: "Hamood Al-Farsi",
    status: "assigned",
    mileage: 32000,
    fuelType: "Petrol",
    lastService: "2026-05-10",
    nextService: "2026-08-10",
    insuranceExpiry: "2026-11-20",
  },
  {
    id: "VEH-004",
    plate: "OM 3456",
    model: "Toyota Land Cruiser",
    type: "suv",
    capacity: 7,
    driver: "Unassigned",
    status: "unassigned",
    mileage: 55000,
    fuelType: "Diesel",
    lastService: "2026-04-05",
    nextService: "2026-07-05",
    insuranceExpiry: "2026-09-30",
  },
  {
    id: "VEH-005",
    plate: "OM 7890",
    model: "Coaster Bus",
    type: "bus",
    capacity: 30,
    driver: "Salim Badr",
    status: "maintenance",
    mileage: 82000,
    fuelType: "Diesel",
    lastService: "2026-08-01",
    nextService: "2026-08-15",
    insuranceExpiry: "2027-03-10",
  },
  {
    id: "VEH-006",
    plate: "OM 1122",
    model: "Honda CR-V",
    type: "suv",
    capacity: 5,
    driver: "Omar Al-Balushi",
    status: "assigned",
    mileage: 18000,
    fuelType: "Petrol",
    lastService: "2026-07-28",
    nextService: "2026-10-28",
    insuranceExpiry: "2027-05-22",
  },
];

const statusConfig = {
  available: {
    label: "Available",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  assigned: {
    label: "Assigned",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  maintenance: {
    label: "Maintenance",
    color: "bg-red-100 text-red-700",
    icon: AlertCircle,
  },
  unassigned: {
    label: "Unassigned",
    color: "bg-gray-100 text-gray-700",
    icon: XCircle,
  },
};

const typeIcons: Record<string, React.ReactNode> = {
  sedan: <Car className="w-4 h-4" />,
  suv: <Car className="w-4 h-4" />,
  van: <Truck className="w-4 h-4" />,
  bus: <Bus className="w-4 h-4" />,
  luxury: <Star className="w-4 h-4" />,
};

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const itemsPerPage = 5;

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || vehicle.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    total: mockVehicles.length,
    available: mockVehicles.filter((v) => v.status === "available").length,
    assigned: mockVehicles.filter((v) => v.status === "assigned").length,
    maintenance: mockVehicles.filter((v) => v.status === "maintenance").length,
    unassigned: mockVehicles.filter((v) => v.status === "unassigned").length,
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const getDaysUntilService = (nextService: string) => {
    const today = new Date();
    const service = new Date(nextService);
    const diff = Math.ceil((service.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
          <p className="text-sm text-gray-500 mt-1">Wednesday, 12 August 2026</p>
        </div>
        <button onClick={() => { setEditingVehicle(null); setShowVehicleModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add Vehicle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Assigned</p>
              <p className="text-2xl font-bold text-blue-600">{stats.assigned}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Maintenance</p>
              <p className="text-2xl font-bold text-red-600">{stats.maintenance}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Available</p>
              <p className="text-2xl font-bold text-green-600">{stats.available + stats.unassigned}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Fleet Registry</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search plate, model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
                <option value="maintenance">Maintenance</option>
                <option value="unassigned">Unassigned</option>
              </select>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedVehicles.map((vehicle) => {
                const StatusIcon = statusConfig[vehicle.status].icon;
                const statusInfo = statusConfig[vehicle.status];
                const daysUntilService = getDaysUntilService(vehicle.nextService);

                return (
                  <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                          {typeIcons[vehicle.type]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{vehicle.plate}</p>
                          <p className="text-xs text-gray-500">{vehicle.model}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 capitalize">{vehicle.type}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{vehicle.capacity} seats</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{vehicle.driver}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <span className={daysUntilService <= 30 ? "text-red-600 font-medium" : ""}>
                        {formatDate(vehicle.nextService)}
                        {daysUntilService <= 30 && (
                          <span className="text-xs text-red-500 block">({daysUntilService}d left)</span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{formatDate(vehicle.insuranceExpiry)}</td>
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
                        <button onClick={() => { setEditingVehicle(vehicle); setShowVehicleModal(true); }} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
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

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredVehicles.length)} of {filteredVehicles.length} vehicles
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

      {showVehicleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{editingVehicle ? "Edit Vehicle" : "New Vehicle"}</h2>
              <button onClick={() => setShowVehicleModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Model</label>
                  <input type="text" placeholder="e.g. Toyota Hiace" defaultValue={editingVehicle?.model} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Plate Number</label>
                  <input type="text" placeholder="e.g. OM 1234" defaultValue={editingVehicle?.plate} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                  <select defaultValue={editingVehicle?.type || "sedan"} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="van">Van</option>
                    <option value="bus">Bus</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Capacity</label>
                  <input type="number" placeholder="Seats" defaultValue={editingVehicle?.capacity} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned Driver</label>
                  <input type="text" placeholder="Driver name" defaultValue={editingVehicle?.driver} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select defaultValue={editingVehicle?.status || "available"} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="available">Available</option>
                    <option value="assigned">Assigned</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="unassigned">Unassigned</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mileage (km)</label>
                  <input type="number" placeholder="0" defaultValue={editingVehicle?.mileage} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Fuel Type</label>
                  <select defaultValue={editingVehicle?.fuelType || "Petrol"} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Next Service Date</label>
                  <input type="date" defaultValue={editingVehicle?.nextService} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Insurance Expiry</label>
                  <input type="date" defaultValue={editingVehicle?.insuranceExpiry} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowVehicleModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">Cancel</button>
              <button onClick={() => setShowVehicleModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
