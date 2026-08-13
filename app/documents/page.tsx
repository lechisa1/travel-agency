"use client";

import React, { useState } from "react";
import {
  Upload,
  FileText,
  FileCheck,
  Download,
  Eye,
  Search,
  Filter,
  Shield,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  FolderOpen,
  Image as ImageIcon,
  FileSpreadsheet,
  FileArchive,
  X,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  category: "passport" | "visa" | "ticket" | "insurance" | "other";
  customer: string;
  uploadDate: string;
  expiryDate?: string;
  fileSize: string;
  fileType: string;
  uploadedBy: string;
  accessLevel: "public" | "internal" | "confidential";
  status: "valid" | "expiring_soon" | "expired";
}

interface AccessControl {
  id: string;
  role: string;
  view: boolean;
  download: boolean;
  edit: boolean;
  delete: boolean;
}

const mockDocuments: Document[] = [
  { id: "1", name: "Passport_scan_Ahmed_AlFarsi.pdf", category: "passport", customer: "Ahmed Al-Farsi", uploadDate: "2026-08-10", expiryDate: "2027-02-15", fileSize: "2.4 MB", fileType: "PDF", uploadedBy: "Mariam Salim", accessLevel: "confidential", status: "valid" },
  { id: "2", name: "UK_Visa_Fatima_Malik.pdf", category: "visa", customer: "Fatima Malik", uploadDate: "2026-08-08", expiryDate: "2026-12-01", fileSize: "1.8 MB", fileType: "PDF", uploadedBy: "Sara Ahmed", accessLevel: "internal", status: "valid" },
  { id: "3", name: "Ticket_EK621_Ahmed.pdf", category: "ticket", customer: "Ahmed Al-Farsi", uploadDate: "2026-08-11", fileSize: "890 KB", fileType: "PDF", uploadedBy: "Rashid Nasser", accessLevel: "public", status: "valid" },
  { id: "4", name: "Insurance_Khalid.pdf", category: "insurance", customer: "Khalid Al-Rashid", uploadDate: "2026-07-20", expiryDate: "2026-09-20", fileSize: "3.2 MB", fileType: "PDF", uploadedBy: "Mariam Salim", accessLevel: "confidential", status: "expiring_soon" },
  { id: "5", name: "Passport_Mohammed.pdf", category: "passport", customer: "Mohammed Qasim", uploadDate: "2026-06-15", expiryDate: "2026-08-15", fileSize: "2.1 MB", fileType: "PDF", uploadedBy: "Sara Ahmed", accessLevel: "confidential", status: "expiring_soon" },
  { id: "6", name: "Hotel_Voucher_BurjAlArab.pdf", category: "other", customer: "Fatima Malik", uploadDate: "2026-08-09", fileSize: "450 KB", fileType: "PDF", uploadedBy: "Mariam Salim", accessLevel: "internal", status: "valid" },
  { id: "7", name: "Schengen_Visa_Aisha.pdf", category: "visa", customer: "Aisha Hassan", uploadDate: "2026-07-01", expiryDate: "2026-07-30", fileSize: "1.5 MB", fileType: "PDF", uploadedBy: "Sara Ahmed", accessLevel: "internal", status: "expired" },
];

const mockAccessControls: AccessControl[] = [
  { id: "1", role: "Administrator", view: true, download: true, edit: true, delete: true },
  { id: "2", role: "Visa Officer", view: true, download: true, edit: true, delete: false },
  { id: "3", role: "Ticketing Officer", view: true, download: true, edit: true, delete: false },
  { id: "4", role: "Sales Agent", view: true, download: false, edit: false, delete: false },
  { id: "5", role: "Accountant", view: true, download: false, edit: false, delete: false },
];

const categories = [
  { id: "all", label: "All Documents", icon: FolderOpen, count: mockDocuments.length },
  { id: "passport", label: "Passports", icon: FileText, count: mockDocuments.filter((d) => d.category === "passport").length },
  { id: "visa", label: "Visas", icon: FileCheck, count: mockDocuments.filter((d) => d.category === "visa").length },
  { id: "ticket", label: "Tickets", icon: FileArchive, count: mockDocuments.filter((d) => d.category === "ticket").length },
  { id: "insurance", label: "Insurance", icon: Shield, count: mockDocuments.filter((d) => d.category === "insurance").length },
  { id: "other", label: "Other", icon: FileSpreadsheet, count: mockDocuments.filter((d) => d.category === "other").length },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "passport": return <FileText className="w-4 h-4" />;
    case "visa": return <FileCheck className="w-4 h-4" />;
    case "ticket": return <FileArchive className="w-4 h-4" />;
    case "insurance": return <Shield className="w-4 h-4" />;
    default: return <FileSpreadsheet className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "passport": return "bg-blue-100 text-blue-700";
    case "visa": return "bg-purple-100 text-purple-700";
    case "ticket": return "bg-green-100 text-green-700";
    case "insurance": return "bg-orange-100 text-orange-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case "valid": return { label: "Valid", color: "bg-green-100 text-green-700", icon: CheckCircle };
    case "expiring_soon": return { label: "Expiring Soon", color: "bg-yellow-100 text-yellow-700", icon: AlertTriangle };
    case "expired": return { label: "Expired", color: "bg-red-100 text-red-700", icon: XCircle };
    default: return { label: "Unknown", color: "bg-gray-100 text-gray-700", icon: Clock };
  }
};

const getAccessLevelColor = (level: string) => {
  switch (level) {
    case "public": return "bg-green-100 text-green-700";
    case "internal": return "bg-yellow-100 text-yellow-700";
    case "confidential": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const getDaysUntilExpiry = (expiryDate?: string) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Upload className="w-4 h-4" />
          Upload Documents
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{mockDocuments.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">+3 this week</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-bold text-yellow-600">{mockDocuments.filter((d) => d.status === "expiring_soon").length}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Within 30 days</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Expired</p>
              <p className="text-2xl font-bold text-red-600">{mockDocuments.filter((d) => d.status === "expired").length}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Requires immediate action</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Confidential</p>
              <p className="text-2xl font-bold text-purple-600">{mockDocuments.filter((d) => d.accessLevel === "confidential").length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Restricted access</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">Categories</h3>
          </div>
          <div className="p-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${
                  activeCategory === cat.id
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.id ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
                  />
                </div>
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDocuments.map((doc) => {
                  const statusConfig = getStatusConfig(doc.status);
                  const daysLeft = getDaysUntilExpiry(doc.expiryDate);
                  return (
                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 max-w-[200px] truncate">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.fileSize} • {doc.fileType}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                          {getCategoryIcon(doc.category)}
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{doc.customer}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatDate(doc.uploadDate)}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {doc.expiryDate ? (
                          <span className={daysLeft !== null && daysLeft <= 30 ? "text-red-600 font-medium" : ""}>
                            {formatDate(doc.expiryDate)}
                            {daysLeft !== null && daysLeft > 0 && daysLeft <= 30 && (
                              <span className="text-xs text-red-500 block">({daysLeft}d left)</span>
                            )}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          <statusConfig.icon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(doc.accessLevel)}`}>
                          {doc.accessLevel === "confidential" ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                          {doc.accessLevel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                            <Download className="w-4 h-4 text-gray-400" />
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
        </div>
      </div>

      {/* Access Controls */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-400" />
            Access Control Matrix
          </h2>
          <p className="text-sm text-gray-500">Document access permissions by role</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Download</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockAccessControls.map((control) => (
                <tr key={control.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{control.role}</td>
                  <td className="px-4 py-3 text-center">
                    {control.view ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {control.download ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {control.edit ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {control.delete ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors mb-6 ${
                  dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-900 mb-1">Drag & drop files here</p>
                <p className="text-xs text-gray-500 mb-4">or click to browse from your computer</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Browse Files
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="passport">Passport</option>
                    <option value="visa">Visa</option>
                    <option value="ticket">Ticket</option>
                    <option value="insurance">Insurance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Customer</label>
                  <input
                    type="text"
                    placeholder="Select customer..."
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Access Level</label>
                  <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="public">Public</option>
                    <option value="internal">Internal</option>
                    <option value="confidential">Confidential</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={() => setShowUploadModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Upload className="w-4 h-4" />
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
