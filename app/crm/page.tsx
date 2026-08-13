"use client";

import React, { useState } from "react";
import {
  UserPlus,
  Plus,
  Search,
  Download,
  Edit2,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Phone,
  Target,
  TrendingUp,
  Users,
  UserCheck,
  CheckCircle,
  XCircle,
  Star,
  MessageSquare,
  X,
  Save,
  FileText,
  User,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: "website" | "referral" | "social" | "walk-in" | "campaign" | "other";
  service: "flight" | "hotel" | "visa" | "package" | "transport" | "other";
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
  score: number;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  notes?: string;
  value: number;
}

const mockLeads: Lead[] = [
  { id: "LEAD-001", name: "Ahmed Al-Farsi", email: "ahmed@email.com", phone: "+968 9100 0001", source: "website", service: "package", status: "qualified", score: 85, assignedTo: "Mariam Salim", createdAt: "2026-08-10", lastContact: "2026-08-12", notes: "Interested in Umrah package for Ramadan", value: 2400 },
  { id: "LEAD-002", name: "Fatima Malik", email: "fatima@email.com", phone: "+968 9100 0002", source: "referral", service: "visa", status: "negotiation", score: 72, assignedTo: "Sara Ahmed", createdAt: "2026-08-08", lastContact: "2026-08-11", notes: "UK visa application in progress", value: 850 },
  { id: "LEAD-003", name: "Mohammed Qasim", email: "mohammed@email.com", phone: "+968 9100 0003", source: "social", service: "flight", status: "new", score: 45, assignedTo: "Mariam Salim", createdAt: "2026-08-12", lastContact: "2026-08-12", notes: "Inquiry about Dubai flights", value: 500 },
  { id: "LEAD-004", name: "Khalid Al-Rashid", email: "khalid@email.com", phone: "+968 9100 0004", source: "walk-in", service: "hotel", status: "proposal", score: 68, assignedTo: "Ali Hassan", createdAt: "2026-08-05", lastContact: "2026-08-10", notes: "Looking for Burj Al Arab booking", value: 3200 },
  { id: "LEAD-005", name: "Aisha Hassan", email: "aisha@email.com", phone: "+968 9100 0005", source: "campaign", service: "package", status: "won", score: 95, assignedTo: "Mariam Salim", createdAt: "2026-07-28", lastContact: "2026-08-09", notes: "Bali honeymoon confirmed", value: 1850 },
  { id: "LEAD-006", name: "Rashid Nasser", email: "rashid@email.com", phone: "+968 9100 0006", source: "website", service: "transport", status: "contacted", score: 55, assignedTo: "Ali Hassan", createdAt: "2026-08-11", lastContact: "2026-08-11", notes: "Airport transfer inquiry", value: 120 },
  { id: "LEAD-007", name: "Huda Al-Balushi", email: "huda@email.com", phone: "+968 9100 0007", source: "referral", service: "package", status: "lost", score: 30, assignedTo: "Mariam Salim", createdAt: "2026-08-01", lastContact: "2026-08-06", notes: "Chose competitor package", value: 1200 },
  { id: "LEAD-008", name: "Omar Al-Saadi", email: "omar@email.com", phone: "+968 9100 0008", source: "social", service: "flight", status: "new", score: 40, assignedTo: "Sara Ahmed", createdAt: "2026-08-13", lastContact: "2026-08-13", notes: "Last minute BOM inquiry", value: 650 },
];

const statusConfig = {
  new: { label: "New", color: "bg-blue-100 text-blue-700", icon: User },
  contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-700", icon: Phone },
  qualified: { label: "Qualified", color: "bg-green-100 text-green-700", icon: CheckCircle },
  proposal: { label: "Proposal", color: "bg-purple-100 text-purple-700", icon: FileText },
  negotiation: { label: "Negotiation", color: "bg-orange-100 text-orange-700", icon: MessageSquare },
  won: { label: "Won", color: "bg-emerald-100 text-emerald-700", icon: Star },
  lost: { label: "Lost", color: "bg-red-100 text-red-600", icon: XCircle },
};

const sourceConfig = {
  website: { label: "Website", color: "bg-blue-50 text-blue-700" },
  referral: { label: "Referral", color: "bg-green-50 text-green-700" },
  social: { label: "Social Media", color: "bg-purple-50 text-purple-700" },
  "walk-in": { label: "Walk-in", color: "bg-yellow-50 text-yellow-700" },
  campaign: { label: "Campaign", color: "bg-pink-50 text-pink-700" },
  other: { label: "Other", color: "bg-gray-50 text-gray-600" },
};

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const itemsPerPage = 5;

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || lead.status === selectedStatus;
    const matchesSource = selectedSource === "all" || lead.source === selectedSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    total: mockLeads.length,
    new: mockLeads.filter((l) => l.status === "new").length,
    qualified: mockLeads.filter((l) => l.status === "qualified").length,
    won: mockLeads.filter((l) => l.status === "won").length,
    conversionRate: ((mockLeads.filter((l) => l.status === "won").length / mockLeads.length) * 100).toFixed(1),
  };

  const formatCurrency = (amount: number) => {
    return `OMR ${amount.toLocaleString()}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    if (score >= 40) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM & Lead Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button
          onClick={() => setShowLeadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Leads</p>
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
              <p className="text-sm text-gray-500">New Leads</p>
              <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Qualified</p>
              <p className="text-2xl font-bold text-green-600">{stats.qualified}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Converted</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.won}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion</p>
              <p className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search leads..."
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
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sources</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
                <option value="walk-in">Walk-in</option>
                <option value="campaign">Campaign</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode("kanban")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === "kanban" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Kanban
                </button>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <Download className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === "list" ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedLeads.map((lead) => {
                    const statusInfo = statusConfig[lead.status];
                    const sourceInfo = sourceConfig[lead.source];
                    const StatusIcon = statusInfo.icon;
                    return (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                            <p className="text-xs text-gray-500">{lead.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${sourceInfo.color}`}>
                            {sourceInfo.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 capitalize">{lead.service}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.score)}`}>
                            <Target className="w-3 h-3" />
                            {lead.score}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{lead.assignedTo}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
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
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLeads.length)} of {filteredLeads.length} leads
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
          </>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(statusConfig).map(([key, config]) => {
                const leadsInStage = filteredLeads.filter((l) => l.status === key);
                const StatusIcon = config.icon;
                return (
                  <div key={key} className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.color}`}>
                        <StatusIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">{config.label}</h4>
                        <p className="text-xs text-gray-500">{leadsInStage.length} leads</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {leadsInStage.map((lead) => (
                        <div key={lead.id} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getScoreColor(lead.score)}`}>
                              {lead.score}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{lead.service} • {formatCurrency(lead.value)}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{lead.assignedTo}</span>
                            <span>{lead.lastContact}</span>
                          </div>
                        </div>
                      ))}
                      {leadsInStage.length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-4">No leads in this stage</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lead Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">New Lead</h2>
              <button onClick={() => setShowLeadModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input type="text" placeholder="Customer name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" placeholder="email@example.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" placeholder="+968 XXXX XXXX" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Source</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="social">Social Media</option>
                    <option value="walk-in">Walk-in</option>
                    <option value="campaign">Campaign</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Interest</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="flight">Flight</option>
                    <option value="hotel">Hotel</option>
                    <option value="visa">Visa</option>
                    <option value="package">Package/Tour</option>
                    <option value="transport">Transport</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Assign To</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Mariam Salim">Mariam Salim</option>
                    <option value="Sara Ahmed">Sara Ahmed</option>
                    <option value="Ali Hassan">Ali Hassan</option>
                    <option value="Rashid Nasser">Rashid Nasser</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                  <textarea rows={3} placeholder="Lead details, requirements, preferences..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowLeadModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={() => setShowLeadModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                Save Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
