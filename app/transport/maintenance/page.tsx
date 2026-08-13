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
  Wrench,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Car,
  DollarSign,
  User,
  FileText,
  Edit2,
  Trash2,
  Eye,
  X,
  Save,
} from "lucide-react";

interface MaintenanceLog {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  type: "routine" | "repair" | "inspection" | "accident" | "other";
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  date: string;
  completedDate?: string;
  cost: number;
  currency: string;
  garage: string;
  assignedTo: string;
  notes?: string;
  mileage: number;
}

const mockMaintenanceLogs: MaintenanceLog[] = [
  {
    id: "MNT-001",
    vehicleId: "VEH-001",
    vehiclePlate: "OM 1234",
    vehicleModel: "Toyota Hiace",
    type: "routine",
    status: "completed",
    date: "2026-07-15",
    completedDate: "2026-07-15",
    cost: 450,
    currency: "OMR",
    garage: "Muscat Auto Service",
    assignedTo: "Saeed Al-Balushi",
    notes: "Oil change and brake inspection",
    mileage: 44000,
  },
  {
    id: "MNT-002",
    vehicleId: "VEH-005",
    vehiclePlate: "OM 7890",
    vehicleModel: "Coaster Bus",
    type: "repair",
    status: "in-progress",
    date: "2026-08-10",
    cost: 1200,
    currency: "OMR",
    garage: "Oman Motors Garage",
    assignedTo: "Salim Badr",
    notes: "Engine overheating issue - radiator replacement",
    mileage: 81000,
  },
  {
    id: "MNT-003",
    vehicleId: "VEH-002",
    vehiclePlate: "OM 5678",
    vehicleModel: "Mercedes V-Class",
    type: "inspection",
    status: "scheduled",
    date: "2026-08-20",
    cost: 200,
    currency: "OMR",
    garage: "Al-Mazroui Service Center",
    assignedTo: "Khalfan Rashdi",
    notes: "Annual inspection due",
    mileage: 27000,
  },
  {
    id: "MNT-004",
    vehicleId: "VEH-003",
    vehiclePlate: "OM 9012",
    vehicleModel: "Toyota Camry",
    type: "routine",
    status: "completed",
    date: "2026-05-10",
    completedDate: "2026-05-10",
    cost: 300,
    currency: "OMR",
    garage: "Muscat Auto Service",
    assignedTo: "Hamood Al-Farsi",
    notes: "Tire rotation and alignment",
    mileage: 31000,
  },
  {
    id: "MNT-005",
    vehicleId: "VEH-004",
    vehiclePlate: "OM 3456",
    vehicleModel: "Toyota Land Cruiser",
    type: "repair",
    status: "cancelled",
    date: "2026-06-05",
    cost: 800,
    currency: "OMR",
    garage: "4x4 Oman Service",
    assignedTo: "Unassigned",
    notes: "Suspension issue - parts not available",
    mileage: 54000,
  },
  {
    id: "MNT-006",
    vehicleId: "VEH-006",
    vehiclePlate: "OM 1122",
    vehicleModel: "Honda CR-V",
    type: "routine",
    status: "scheduled",
    date: "2026-08-25",
    cost: 350,
    currency: "OMR",
    garage: "Honda Service Center",
    assignedTo: "Omar Al-Balushi",
    notes: "15,000 km service",
    mileage: 17500,
  },
];

const typeConfig = {
  routine: { label: "Routine", color: "bg-blue-100 text-blue-700", icon: Wrench },
  repair: { label: "Repair", color: "bg-red-100 text-red-700", icon: AlertTriangle },
  inspection: { label: "Inspection", color: "bg-green-100 text-green-700", icon: CheckCircle },
  accident: { label: "Accident", color: "bg-orange-100 text-orange-700", icon: XCircle },
  other: { label: "Other", color: "bg-gray-100 text-gray-700", icon: FileText },
};

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-yellow-100 text-yellow-700",
    icon: AlertTriangle,
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
};

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showLogModal, setShowLogModal] = useState(false);
  const [editingLog, setEditingLog] = useState<MaintenanceLog | null>(null);
  const itemsPerPage = 5;

  const filteredLogs = mockMaintenanceLogs.filter((log) => {
    const matchesSearch =
      log.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.garage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || log.type === selectedType;
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    total: mockMaintenanceLogs.length,
    scheduled: mockMaintenanceLogs.filter((l) => l.status === "scheduled").length,
    inProgress: mockMaintenanceLogs.filter((l) => l.status === "in-progress").length,
    completed: mockMaintenanceLogs.filter((l) => l.status === "completed").length,
    totalCost: mockMaintenanceLogs.reduce((sum, l) => sum + l.cost, 0),
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Logs</h1>
          <p className="text-sm text-gray-500 mt-1">Wednesday, 12 August 2026</p>
        </div>
        <button onClick={() => { setEditingLog(null); setShowLogModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>New Log</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">OMR {stats.totalCost.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Maintenance History</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="routine">Routine</option>
                <option value="repair">Repair</option>
                <option value="inspection">Inspection</option>
                <option value="accident">Accident</option>
                <option value="other">Other</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Log ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Garage</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedLogs.map((log) => {
                const TypeIcon = typeConfig[log.type].icon;
                const typeInfo = typeConfig[log.type];
                const StatusIcon = statusConfig[log.status].icon;
                const statusInfo = statusConfig[log.status];

                return (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{log.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{log.vehiclePlate}</p>
                          <p className="text-xs text-gray-500">{log.vehicleModel}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                        <TypeIcon className="w-3 h-3" />
                        {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{formatDate(log.date)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.garage}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">OMR {log.cost.toLocaleString()}</td>
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
                        <button onClick={() => { setEditingLog(log); setShowLogModal(true); }} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
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

      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{editingLog ? "Edit Maintenance Log" : "New Maintenance Log"}</h2>
              <button onClick={() => setShowLogModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Vehicle Plate</label>
                  <input type="text" placeholder="e.g. OM 1234" defaultValue={editingLog?.vehiclePlate} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                  <select defaultValue={editingLog?.type || "routine"} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="routine">Routine</option>
                    <option value="repair">Repair</option>
                    <option value="inspection">Inspection</option>
                    <option value="accident">Accident</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select defaultValue={editingLog?.status || "scheduled"} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                  <input type="date" defaultValue={editingLog?.date} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Garage</label>
                  <input type="text" placeholder="Garage name" defaultValue={editingLog?.garage} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Cost (OMR)</label>
                  <input type="number" placeholder="0.000" defaultValue={editingLog?.cost} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned To</label>
                  <input type="text" placeholder="Staff name" defaultValue={editingLog?.assignedTo} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mileage (km)</label>
                  <input type="number" placeholder="0" defaultValue={editingLog?.mileage} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                  <textarea rows={3} placeholder="Maintenance details..." defaultValue={editingLog?.notes} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowLogModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">Cancel</button>
              <button onClick={() => setShowLogModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                {editingLog ? "Update Log" : "Create Log"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
