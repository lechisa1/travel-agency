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
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit2,
  Trash2,
  Shield,
  Users,
  Key,
  Lock,
  Unlock,
  UserPlus,
  UserCheck,
  UserX,
  Activity,
  TrendingUp,
  Briefcase,
  Building2,
} from "lucide-react";

// Types
interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  avatar?: string;
}

interface Permission {
  module: string;
  roles: {
    admin: boolean;
    accountant: boolean;
    sales: boolean;
    visaOfficer: boolean;
    ticketing: boolean;
  };
}

// Mock Data
const mockStaff: Staff[] = [
  {
    id: "EMP-001",
    name: "Omar Al-Rashidi",
    role: "Administrator",
    email: "omar@agency.com",
    phone: "+968 9100 0001",
    dateJoined: "2021-03-01",
    status: "active",
    lastLogin: "Today 09:14",
  },
  {
    id: "EMP-002",
    name: "Sara Ahmed",
    role: "Visa Officer",
    email: "sara@agency.com",
    phone: "+968 9100 0002",
    dateJoined: "2022-06-15",
    status: "active",
    lastLogin: "Today 08:45",
  },
  {
    id: "EMP-003",
    name: "Ali Hassan",
    role: "Accountant",
    email: "ali@agency.com",
    phone: "+968 9100 0003",
    dateJoined: "2022-01-10",
    status: "active",
    lastLogin: "Yesterday",
  },
  {
    id: "EMP-004",
    name: "Mariam Salim",
    role: "Sales Agent",
    email: "mariam@agency.com",
    phone: "+968 9100 0004",
    dateJoined: "2023-09-01",
    status: "active",
    lastLogin: "Today 10:02",
  },
  {
    id: "EMP-005",
    name: "Rashid Nasser",
    role: "Ticketing Officer",
    email: "rashid@agency.com",
    phone: "+968 9100 0005",
    dateJoined: "2023-11-20",
    status: "active",
    lastLogin: "Today 09:58",
  },
  {
    id: "EMP-006",
    name: "Huda Al-Balushi",
    role: "Sales Agent",
    email: "huda@agency.com",
    phone: "+968 9100 0006",
    dateJoined: "2024-01-08",
    status: "inactive",
    lastLogin: "3 days ago",
  },
];

const mockPermissions: Permission[] = [
  {
    module: "Dashboard",
    roles: {
      admin: true,
      accountant: false,
      sales: true,
      visaOfficer: false,
      ticketing: true,
    },
  },
  {
    module: "Customer Management",
    roles: {
      admin: true,
      accountant: false,
      sales: true,
      visaOfficer: false,
      ticketing: true,
    },
  },
  {
    module: "Visa Management",
    roles: {
      admin: true,
      accountant: false,
      sales: true,
      visaOfficer: true,
      ticketing: false,
    },
  },
  {
    module: "Flight Booking",
    roles: {
      admin: true,
      accountant: false,
      sales: true,
      visaOfficer: false,
      ticketing: true,
    },
  },
  {
    module: "Hotel Booking",
    roles: {
      admin: true,
      accountant: false,
      sales: true,
      visaOfficer: false,
      ticketing: true,
    },
  },
  {
    module: "Transportation",
    roles: {
      admin: true,
      accountant: false,
      sales: true,
      visaOfficer: false,
      ticketing: true,
    },
  },
  {
    module: "Accounting",
    roles: {
      admin: true,
      accountant: true,
      sales: false,
      visaOfficer: false,
      ticketing: false,
    },
  },
  {
    module: "Invoices",
    roles: {
      admin: true,
      accountant: true,
      sales: true,
      visaOfficer: false,
      ticketing: false,
    },
  },
  {
    module: "Staff Management",
    roles: {
      admin: true,
      accountant: false,
      sales: false,
      visaOfficer: false,
      ticketing: false,
    },
  },
  {
    module: "Reports",
    roles: {
      admin: true,
      accountant: true,
      sales: true,
      visaOfficer: false,
      ticketing: true,
    },
  },
];

const roleColors: Record<string, string> = {
  Administrator: "bg-purple-100 text-purple-700",
  Accountant: "bg-blue-100 text-blue-700",
  "Sales Agent": "bg-green-100 text-green-700",
  "Visa Officer": "bg-yellow-100 text-yellow-700",
  "Ticketing Officer": "bg-orange-100 text-orange-700",
};

// Helper components for icons (since we can't use JSX in objects directly)
const CalculatorIcon = ({ className }: { className?: string }) => <span className={className}>💰</span>;
const FileTextIcon = ({ className }: { className?: string }) => <span className={className}>📄</span>;
const TicketIcon = ({ className }: { className?: string }) => <span className={className}>🎫</span>;

const roleIcons: Record<string, React.ReactNode> = {
  Administrator: <Shield className="w-4 h-4" />,
  Accountant: <CalculatorIcon className="w-4 h-4" />,
  "Sales Agent": <Users className="w-4 h-4" />,
  "Visa Officer": <FileTextIcon className="w-4 h-4" />,
  "Ticketing Officer": <TicketIcon className="w-4 h-4" />,
};

const statusConfig = {
  active: {
    label: "Active",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  inactive: {
    label: "Inactive",
    color: "bg-gray-100 text-gray-700",
    icon: XCircle,
  },
  suspended: {
    label: "Suspended",
    color: "bg-red-100 text-red-700",
    icon: AlertCircle,
  },
};

export default function StaffRolesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(
    mockStaff[0],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPermissions, setEditingPermissions] = useState(false);
  const itemsPerPage = 5;

  // Filter staff
  const filteredStaff = mockStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStaff = filteredStaff.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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

  const getRoleIcon = (role: string) => {
    const iconMap: Record<string, string> = {
      Administrator: "🛡️",
      Accountant: "💰",
      "Sales Agent": "👥",
      "Visa Officer": "📄",
      "Ticketing Officer": "🎫",
    };
    return iconMap[role] || "👤";
  };

  // Stats
  const totalStaff = mockStaff.length;
  const activeStaff = mockStaff.filter((s) => s.status === "active").length;
  const inactiveStaff = mockStaff.filter((s) => s.status === "inactive").length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff & Roles</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <UserPlus className="w-4 h-4" />
          <span>Add Staff</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{totalStaff}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">+2 this quarter</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-green-600">{activeStaff}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {((activeStaff / totalStaff) * 100).toFixed(0)}% of total
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactive</p>
              <p className="text-2xl font-bold text-gray-400">
                {inactiveStaff}
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <UserX className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {((inactiveStaff / totalStaff) * 100).toFixed(0)}% of total
          </p>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Staff Directory
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search staff..."
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
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Joined
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedStaff.map((staff) => {
                const StatusIcon = statusConfig[staff.status].icon;
                const statusInfo = statusConfig[staff.status];

                return (
                  <tr
                    key={staff.id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedStaff?.id === staff.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedStaff(staff)}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {staff.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                          {getInitials(staff.name)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {staff.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleColors[staff.role]}`}
                      >
                        <span>{getRoleIcon(staff.role)}</span>
                        {staff.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {staff.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {staff.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(staff.dateJoined)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {staff.lastLogin}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredStaff.length)} of{" "}
              {filteredStaff.length} staff
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

      {/* Role Permissions Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Role Permissions Matrix
              </h2>
              <p className="text-sm text-gray-500">
                Module access by role — click cells to toggle (demo)
              </p>
            </div>
            <button
              onClick={() => setEditingPermissions(!editingPermissions)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                editingPermissions
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {editingPermissions ? "Save Changes" : "Edit Permissions"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center justify-center gap-1">
                    <span>💰</span>
                    Accountant
                  </span>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center justify-center gap-1">
                    <Users className="w-3 h-3" />
                    Sales
                  </span>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center justify-center gap-1">
                    <span>📄</span>
                    Visa Officer
                  </span>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center justify-center gap-1">
                    <span>🎫</span>
                    Ticketing
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPermissions.map((permission) => (
                <tr
                  key={permission.module}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {permission.module}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className={`w-8 h-8 rounded-lg transition-colors ${
                        permission.roles.admin
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      } ${editingPermissions ? "cursor-pointer" : "cursor-default"}`}
                      onClick={() => {
                        if (editingPermissions) {
                          // Toggle permission (demo)
                        }
                      }}
                    >
                      {permission.roles.admin ? "✅" : "❌"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className={`w-8 h-8 rounded-lg transition-colors ${
                        permission.roles.accountant
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      } ${editingPermissions ? "cursor-pointer" : "cursor-default"}`}
                      onClick={() => {
                        if (editingPermissions) {
                          // Toggle permission (demo)
                        }
                      }}
                    >
                      {permission.roles.accountant ? "✅" : "❌"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className={`w-8 h-8 rounded-lg transition-colors ${
                        permission.roles.sales
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      } ${editingPermissions ? "cursor-pointer" : "cursor-default"}`}
                      onClick={() => {
                        if (editingPermissions) {
                          // Toggle permission (demo)
                        }
                      }}
                    >
                      {permission.roles.sales ? "✅" : "❌"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className={`w-8 h-8 rounded-lg transition-colors ${
                        permission.roles.visaOfficer
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      } ${editingPermissions ? "cursor-pointer" : "cursor-default"}`}
                      onClick={() => {
                        if (editingPermissions) {
                          // Toggle permission (demo)
                        }
                      }}
                    >
                      {permission.roles.visaOfficer ? "✅" : "❌"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className={`w-8 h-8 rounded-lg transition-colors ${
                        permission.roles.ticketing
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      } ${editingPermissions ? "cursor-pointer" : "cursor-default"}`}
                      onClick={() => {
                        if (editingPermissions) {
                          // Toggle permission (demo)
                        }
                      }}
                    >
                      {permission.roles.ticketing ? "✅" : "❌"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td colSpan={6} className="px-4 py-3">
                  <div className="flex items-center gap-6 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-green-100 rounded flex items-center justify-center text-xs">
                        ✅
                      </span>
                      Access granted
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-gray-100 rounded flex items-center justify-center text-xs">
                        ❌
                      </span>
                      No access
                    </span>
                    {editingPermissions && (
                      <span className="text-blue-600 font-medium">
                        Click any cell to toggle permission
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
