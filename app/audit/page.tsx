"use client";

import React, { useState } from "react";
import {
  Shield,
  Activity,
  Search,
  Filter,
  Download,
  Printer,
  Clock,
  Globe,
  Monitor,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical,
  FileText,
  Lock,
  UserPlus,
  Edit3,
  Trash2,
  Settings,
  Upload,
} from "lucide-react";

interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  module: string;
  entity: string;
  entityId: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  location: string;
  status: "success" | "failed" | "warning";
  details: string;
}

interface ComplianceMetric {
  id: string;
  name: string;
  description: string;
  score: number;
  status: "compliant" | "at_risk" | "non_compliant";
  lastAudit: string;
}

const mockAuditLogs: AuditLog[] = [
  { id: "1", user: "Omar Al-Rashidi", role: "Administrator", action: "Updated", module: "Staff", entity: "Staff Member", entityId: "EMP-004", timestamp: "2026-08-13 10:15:23", ipAddress: "10.0.1.45", device: "Desktop / Chrome", location: "Muscat, Oman", status: "success", details: "Updated role from Sales Agent to Senior Sales Agent" },
  { id: "2", user: "Sara Ahmed", role: "Visa Officer", action: "Approved", module: "Visa", entity: "Visa Application", entityId: "VISA-2024-0089", timestamp: "2026-08-13 09:45:12", ipAddress: "10.0.1.52", device: "Desktop / Firefox", location: "Muscat, Oman", status: "success", details: "Approved UK visa application for Fatima Malik" },
  { id: "3", user: "Rashid Nasser", role: "Ticketing Officer", action: "Issued", module: "Flights", entity: "Ticket", entityId: "FLT-0289", timestamp: "2026-08-13 09:30:45", ipAddress: "10.0.1.38", device: "Desktop / Chrome", location: "Muscat, Oman", status: "success", details: "Issued e-ticket EK-621 for Ahmed Al-Farsi" },
  { id: "4", user: "Ali Hassan", role: "Accountant", action: "Exported", module: "Accounting", entity: "Report", entityId: "RPT-2024-001", timestamp: "2026-08-13 08:55:00", ipAddress: "10.0.1.29", device: "Desktop / Chrome", location: "Muscat, Oman", status: "success", details: "Exported P&L report for July 2024" },
  { id: "5", user: "Mariam Salim", role: "Sales Agent", action: "Created", module: "Customers", entity: "Customer", entityId: "CUST-2024-0142", timestamp: "2026-08-13 08:20:18", ipAddress: "10.0.1.41", device: "Laptop / Safari", location: "Muscat, Oman", status: "success", details: "Created new customer record for Aisha Hassan" },
  { id: "6", user: "Unknown", role: "N/A", action: "Failed Login", module: "Auth", entity: "Login", entityId: "—", timestamp: "2026-08-13 07:12:33", ipAddress: "192.168.45.12", device: "Mobile / Chrome", location: "Dubai, UAE", status: "failed", details: "Multiple failed login attempts for admin account" },
  { id: "7", user: "Huda Al-Balushi", role: "Sales Agent", action: "Deleted", module: "Invoices", entity: "Invoice", entityId: "INV-2024-0085", timestamp: "2026-08-12 17:45:00", ipAddress: "10.0.1.58", device: "Desktop / Chrome", location: "Muscat, Oman", status: "warning", details: "Deleted invoice draft without supervisor approval" },
  { id: "8", user: "Omar Al-Rashidi", role: "Administrator", action: "Modified", module: "Settings", entity: "Tax Rate", entityId: "TAX-001", timestamp: "2026-08-12 16:30:00", ipAddress: "10.0.1.45", device: "Desktop / Chrome", location: "Muscat, Oman", status: "success", details: "Updated VAT rate configuration from 5% to 5%" },
  { id: "9", user: "Sara Ahmed", role: "Visa Officer", action: "Uploaded", module: "Documents", entity: "Document", entityId: "DOC-2024-0088", timestamp: "2026-08-12 14:20:00", ipAddress: "10.0.1.52", device: "Desktop / Firefox", location: "Muscat, Oman", status: "success", details: "Uploaded passport scan for Mohammed Qasim" },
  { id: "10", user: "Ali Hassan", role: "Accountant", action: "Reconciled", module: "Accounting", entity: "Transaction", entityId: "TXN-2024-0456", timestamp: "2026-08-12 11:00:00", ipAddress: "10.0.1.29", device: "Desktop / Chrome", location: "Muscat, Oman", status: "success", details: "Reconciled bank transaction for July 2024" },
];

const mockComplianceMetrics: ComplianceMetric[] = [
  { id: "1", name: "Data Retention Policy", description: "Customer data retention per GDPR and local regulations", score: 92, status: "compliant", lastAudit: "2026-08-01" },
  { id: "2", name: "Access Control", description: "Role-based access controls and authentication", score: 88, status: "compliant", lastAudit: "2026-08-01" },
  { id: "3", name: "Audit Trail Completeness", description: "All critical actions are logged and traceable", score: 95, status: "compliant", lastAudit: "2026-08-10" },
  { id: "4", name: "Financial Compliance", description: "Tax reporting and financial record accuracy", score: 78, status: "at_risk", lastAudit: "2026-07-15" },
  { id: "5", name: "Document Security", description: "Encryption and secure storage of sensitive documents", score: 85, status: "compliant", lastAudit: "2026-07-20" },
  { id: "6", name: "Consent Management", description: "Customer consent for data processing and marketing", score: 65, status: "at_risk", lastAudit: "2026-07-10" },
];

const actionIcons: Record<string, React.ReactNode> = {
  Updated: <Edit3 className="w-4 h-4" />,
  Approved: <CheckCircle className="w-4 h-4" />,
  Issued: <FileText className="w-4 h-4" />,
  Exported: <Download className="w-4 h-4" />,
  Created: <UserPlus className="w-4 h-4" />,
  Deleted: <Trash2 className="w-4 h-4" />,
  Modified: <Settings className="w-4 h-4" />,
  Uploaded: <Upload className="w-4 h-4" />,
  Reconciled: <CheckCircle className="w-4 h-4" />,
  "Failed Login": <Lock className="w-4 h-4" />,
};

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const modules = ["all", "Auth", "Customers", "Visa", "Flights", "Hotels", "Transport", "Accounting", "Invoices", "Documents", "Settings", "Staff"];

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = selectedModule === "all" || log.module === selectedModule;
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus;
    return matchesSearch && matchesModule && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "success": return { label: "Success", color: "bg-green-100 text-green-700", icon: CheckCircle };
      case "failed": return { label: "Failed", color: "bg-red-100 text-red-700", icon: XCircle };
      case "warning": return { label: "Warning", color: "bg-yellow-100 text-yellow-700", icon: AlertTriangle };
      default: return { label: "Unknown", color: "bg-gray-100 text-gray-700", icon: Clock };
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-green-100 text-green-700 border-green-200";
      case "at_risk": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "non_compliant": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const successCount = mockAuditLogs.filter((l) => l.status === "success").length;
  const failedCount = mockAuditLogs.filter((l) => l.status === "failed").length;
  const warningCount = mockAuditLogs.filter((l) => l.status === "warning").length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs & Compliance</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            <Printer className="w-4 h-4" />
            Print Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export Audit Log
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Actions</p>
              <p className="text-2xl font-bold text-gray-900">{mockAuditLogs.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Last 24 hours</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Successful</p>
              <p className="text-2xl font-bold text-green-600">{successCount}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">{((successCount / mockAuditLogs.length) * 100).toFixed(0)}% success rate</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Failed</p>
              <p className="text-2xl font-bold text-red-600">{failedCount}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Requires investigation</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Policy violations</p>
        </div>
      </div>

      {/* Compliance Dashboard */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Compliance Dashboard
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {mockComplianceMetrics.map((metric) => (
            <div key={metric.id} className="bg-gray-50 rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{metric.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getComplianceColor(metric.status)}`}>
                  {metric.status.replace("_", " ")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${metric.score >= 90 ? "bg-green-500" : metric.score >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700">{metric.score}%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Last audit: {metric.lastAudit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Audit Trail</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
                />
              </div>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {modules.map((m) => (
                  <option key={m} value={m}>{m === "all" ? "All Modules" : m}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="warning">Warning</option>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP / Device</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map((log) => {
                const statusConfig = getStatusConfig(log.status);
                const isExpanded = expandedLog === log.id;
                return (
                  <React.Fragment key={log.id}>
                    <tr
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${isExpanded ? "bg-blue-50" : ""}`}
                      onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                    >
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{formatDate(log.timestamp)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                            {log.user.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{log.user}</p>
                            <p className="text-xs text-gray-500">{log.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                          {actionIcons[log.action] || <Activity className="w-4 h-4" />}
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{log.module}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">{log.details}</td>
                      <td className="px-4 py-3">
                        <div className="text-xs text-gray-500">
                          <p className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {log.ipAddress}
                          </p>
                          <p className="flex items-center gap-1 mt-0.5">
                            <Monitor className="w-3 h-3" />
                            {log.device}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          <statusConfig.icon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-blue-50/50">
                        <td colSpan={8} className="px-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg border border-gray-200 p-3">
                              <p className="text-xs font-medium text-gray-500 mb-1">Entity</p>
                              <p className="text-sm text-gray-900">{log.entity} ({log.entityId})</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-3">
                              <p className="text-xs font-medium text-gray-500 mb-1">Location</p>
                              <p className="text-sm text-gray-900">{log.location}</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-3">
                              <p className="text-xs font-medium text-gray-500 mb-1">Full Details</p>
                              <p className="text-sm text-gray-900">{log.details}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
