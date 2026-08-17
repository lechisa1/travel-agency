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
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  MapPin,
  FileText,
  CreditCard,
  DollarSign,
  Users,
  Globe,
  BookOpen,
  CheckSquare,
  Square,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  Save,
  X,
} from "lucide-react";

// Types
interface VisaApplication {
  id: string;
  applicantName: string;
  destination: string;
  visaType: string;
  appliedDate: string;
  status: "submitted" | "in-review" | "approved" | "rejected";
  officer?: string;
  visaFee: number;
  serviceCharge: number;
  totalFee: number;
  passportNumber: string;
  nationality: string;
  documentChecklist: DocumentChecklistItem[];
  notes?: string;
}

interface DocumentChecklistItem {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
}

// Mock Data
const mockApplications: VisaApplication[] = [
  {
    id: "VIS-0158",
    applicantName: "Ahmed Al-Farsi",
    destination: "United Kingdom",
    visaType: "Visit Visa",
    appliedDate: "2024-07-15",
    status: "rejected",
    officer: "Sara Ahmed",
    visaFee: 320,
    serviceCharge: 25,
    totalFee: 345,
    passportNumber: "P12847364",
    nationality: "Omani",
    documentChecklist: [
      {
        id: "1",
        name: "Passport (valid 6+ months)",
        required: true,
        uploaded: true,
      },
      {
        id: "2",
        name: "Passport copy (colour scan)",
        required: true,
        uploaded: true,
      },
      {
        id: "3",
        name: "Bank statements (3 months)",
        required: true,
        uploaded: false,
      },
      { id: "4", name: "Employment letter", required: true, uploaded: false },
      { id: "5", name: "Travel itinerary", required: true, uploaded: true },
      { id: "6", name: "Hotel confirmation", required: true, uploaded: false },
      { id: "7", name: "Travel insurance", required: false, uploaded: false },
      {
        id: "8",
        name: "Visa application form (signed)",
        required: true,
        uploaded: true,
      },
    ],
    notes:
      "Application submitted. Awaiting employment letter and hotel confirmation from applicant. Follow-up call scheduled for 01 Aug 2024.",
  },
  {
    id: "VIS-0157",
    applicantName: "Fatima Malik",
    destination: "United States",
    visaType: "B1/B2 Tourist",
    appliedDate: "2024-07-12",
    status: "approved",
    officer: "Omar Al-Balushi",
    visaFee: 185,
    serviceCharge: 25,
    totalFee: 210,
    passportNumber: "PK9384712",
    nationality: "Pakistan",
    documentChecklist: [
      {
        id: "1",
        name: "Passport (valid 6+ months)",
        required: true,
        uploaded: true,
      },
      {
        id: "2",
        name: "Passport copy (colour scan)",
        required: true,
        uploaded: true,
      },
      {
        id: "3",
        name: "Bank statements (3 months)",
        required: true,
        uploaded: true,
      },
      { id: "4", name: "Employment letter", required: true, uploaded: true },
      { id: "5", name: "Travel itinerary", required: true, uploaded: true },
      { id: "6", name: "Hotel confirmation", required: true, uploaded: true },
      { id: "7", name: "Travel insurance", required: false, uploaded: false },
      {
        id: "8",
        name: "Visa application form (signed)",
        required: true,
        uploaded: true,
      },
    ],
    notes: "Visa approved. Visa stamped on passport.",
  },
  {
    id: "VIS-0156",
    applicantName: "Mohammed Qasim",
    destination: "Schengen (France)",
    visaType: "Tourist Visa",
    appliedDate: "2024-07-10",
    status: "in-review",
    officer: "Sara Ahmed",
    visaFee: 90,
    serviceCharge: 25,
    totalFee: 115,
    passportNumber: "SA1234568",
    nationality: "Saudi",
    documentChecklist: [
      {
        id: "1",
        name: "Passport (valid 6+ months)",
        required: true,
        uploaded: true,
      },
      {
        id: "2",
        name: "Passport copy (colour scan)",
        required: true,
        uploaded: true,
      },
      {
        id: "3",
        name: "Bank statements (3 months)",
        required: true,
        uploaded: true,
      },
      { id: "4", name: "Employment letter", required: true, uploaded: true },
      { id: "5", name: "Travel itinerary", required: true, uploaded: true },
      { id: "6", name: "Hotel confirmation", required: true, uploaded: true },
      { id: "7", name: "Travel insurance", required: false, uploaded: true },
      {
        id: "8",
        name: "Visa application form (signed)",
        required: true,
        uploaded: true,
      },
    ],
  },
  {
    id: "VIS-0155",
    applicantName: "Zainab Ibrahim",
    destination: "Canada",
    visaType: "Visitor Visa",
    appliedDate: "2024-07-08",
    status: "submitted",
    officer: "Khalid Al-Habsi",
    visaFee: 150,
    serviceCharge: 25,
    totalFee: 175,
    passportNumber: "EG8473921",
    nationality: "Egyptian",
    documentChecklist: [
      {
        id: "1",
        name: "Passport (valid 6+ months)",
        required: true,
        uploaded: true,
      },
      {
        id: "2",
        name: "Passport copy (colour scan)",
        required: true,
        uploaded: false,
      },
      {
        id: "3",
        name: "Bank statements (3 months)",
        required: true,
        uploaded: false,
      },
      { id: "4", name: "Employment letter", required: true, uploaded: false },
      { id: "5", name: "Travel itinerary", required: true, uploaded: false },
      { id: "6", name: "Hotel confirmation", required: true, uploaded: false },
      { id: "7", name: "Travel insurance", required: false, uploaded: false },
      {
        id: "8",
        name: "Visa application form (signed)",
        required: true,
        uploaded: true,
      },
    ],
  },
  {
    id: "VIS-0154",
    applicantName: "Khalid Al-Rashid",
    destination: "Australia",
    visaType: "ETA",
    appliedDate: "2024-07-05",
    status: "approved",
    officer: "Omar Al-Balushi",
    visaFee: 50,
    serviceCharge: 25,
    totalFee: 75,
    passportNumber: "AE7293847",
    nationality: "Emirati",
    documentChecklist: [
      {
        id: "1",
        name: "Passport (valid 6+ months)",
        required: true,
        uploaded: true,
      },
      {
        id: "2",
        name: "Passport copy (colour scan)",
        required: true,
        uploaded: true,
      },
      {
        id: "3",
        name: "Bank statements (3 months)",
        required: true,
        uploaded: true,
      },
      { id: "4", name: "Employment letter", required: true, uploaded: true },
      { id: "5", name: "Travel itinerary", required: true, uploaded: true },
      { id: "6", name: "Hotel confirmation", required: true, uploaded: true },
      { id: "7", name: "Travel insurance", required: false, uploaded: false },
      {
        id: "8",
        name: "Visa application form (signed)",
        required: true,
        uploaded: true,
      },
    ],
  },
  {
    id: "VIS-0153",
    applicantName: "Noor Al-Hassan",
    destination: "Thailand",
    visaType: "Tourist Visa",
    appliedDate: "2024-07-03",
    status: "submitted",
    officer: "Sara Ahmed",
    visaFee: 80,
    serviceCharge: 25,
    totalFee: 105,
    passportNumber: "KW3847261",
    nationality: "Kuwaiti",
    documentChecklist: [
      {
        id: "1",
        name: "Passport (valid 6+ months)",
        required: true,
        uploaded: true,
      },
      {
        id: "2",
        name: "Passport copy (colour scan)",
        required: true,
        uploaded: true,
      },
      {
        id: "3",
        name: "Bank statements (3 months)",
        required: true,
        uploaded: true,
      },
      { id: "4", name: "Employment letter", required: true, uploaded: true },
      { id: "5", name: "Travel itinerary", required: true, uploaded: true },
      { id: "6", name: "Hotel confirmation", required: true, uploaded: false },
      { id: "7", name: "Travel insurance", required: false, uploaded: false },
      {
        id: "8",
        name: "Visa application form (signed)",
        required: true,
        uploaded: true,
      },
    ],
  },
];

// Status Configuration
const statusConfig = {
  submitted: {
    label: "Submitted",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  "in-review": {
    label: "In Review",
    color: "bg-yellow-100 text-yellow-700",
    icon: AlertCircle,
  },
  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

const statusFilters = ["All", "Submitted", "In Review", "Approved", "Rejected"];

export default function VisaManagementPage() {
  const [applications, setApplications] = useState<VisaApplication[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState<VisaApplication | null>(applications[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [editingApplication, setEditingApplication] = useState<VisaApplication | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    applicantName: "",
    destination: "",
    visaType: "",
    passportNumber: "",
    nationality: "",
    visaFee: "",
    serviceCharge: "",
    notes: "",
    status: "submitted" as VisaApplication["status"],
  });
  const itemsPerPage = 4;

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.visaType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" ||
      app.status === selectedStatus.toLowerCase().replace(" ", "-");

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Status counts
  const statusCounts = applications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysSince = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffTime = now.getTime() - then.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const openNewApplicationModal = () => {
    setEditingApplication(null);
    setApplicationForm({
      applicantName: "",
      destination: "",
      visaType: "",
      passportNumber: "",
      nationality: "",
      visaFee: "",
      serviceCharge: "",
      notes: "",
      status: "submitted",
    });
    setShowApplicationModal(true);
  };

  const openEditApplicationModal = (application: VisaApplication) => {
    setEditingApplication(application);
    setApplicationForm({
      applicantName: application.applicantName,
      destination: application.destination,
      visaType: application.visaType,
      passportNumber: application.passportNumber,
      nationality: application.nationality,
      visaFee: application.visaFee.toString(),
      serviceCharge: application.serviceCharge.toString(),
      notes: application.notes || "",
      status: application.status,
    });
    setShowApplicationModal(true);
  };

  const handleSaveApplication = () => {
    if (!applicationForm.applicantName.trim() || !applicationForm.destination.trim()) return;

    const visaFee = parseFloat(applicationForm.visaFee) || 0;
    const serviceCharge = parseFloat(applicationForm.serviceCharge) || 0;

    if (editingApplication) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === editingApplication.id
            ? {
                ...app,
                ...applicationForm,
                visaFee,
                serviceCharge,
                totalFee: visaFee + serviceCharge,
              }
            : app,
        ),
      );
    } else {
      const newApplication: VisaApplication = {
        id: `VIS-${Date.now().toString().slice(-4)}`,
        applicantName: applicationForm.applicantName,
        destination: applicationForm.destination,
        visaType: applicationForm.visaType,
        passportNumber: applicationForm.passportNumber,
        nationality: applicationForm.nationality,
        visaFee,
        serviceCharge,
        totalFee: visaFee + serviceCharge,
        appliedDate: new Date().toISOString().split("T")[0],
        status: applicationForm.status,
        documentChecklist: [],
        notes: applicationForm.notes,
      };
      setApplications((prev) => [newApplication, ...prev]);
      setSelectedApplication(newApplication);
    }
    setShowApplicationModal(false);
    setApplicationForm({
      applicantName: "",
      destination: "",
      visaType: "",
      passportNumber: "",
      nationality: "",
      visaFee: "",
      serviceCharge: "",
      notes: "",
      status: "submitted",
    });
    setEditingApplication(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Visa Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Wednesday, 12 August 2026
            </p>
          </div>
          <button onClick={openNewApplicationModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>New Application</span>
          </button>
        </div>

        {/* Visa Applications Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Section Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Visa Applications
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search applications..."
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

            {/* Status Filters */}
            <div className="flex gap-1 mt-4 flex-wrap">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === status
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {status}
                  {status !== "All" && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-gray-100 rounded-full text-xs">
                      {statusCounts[
                        status
                          .toLowerCase()
                          .replace(" ", "-") as keyof typeof statusCounts
                      ] || 0}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Application List */}
          <div className="divide-y divide-gray-100">
            {paginatedApplications.map((application) => {
              const StatusIcon = statusConfig[application.status].icon;
              const statusInfo = statusConfig[application.status];
              const daysSince = getDaysSince(application.appliedDate);

              return (
                <div
                  key={application.id}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedApplication?.id === application.id
                      ? "bg-blue-50"
                      : ""
                  }`}
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {getInitials(application.applicantName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {application.applicantName}
                        </h3>
                        <span className="text-xs text-gray-400 font-mono">
                          {application.id}
                        </span>
                        <span
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {application.destination}
                        </span>
                        <span>•</span>
                        <span>{application.visaType}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Applied: {formatDate(application.appliedDate)}
                        </span>
                        <span className="text-gray-400">({daysSince})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        OMR {application.totalFee}
                      </p>
                      <p className="text-xs text-gray-400">Total Fee</p>
                    </div>
                    <button
                      className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredApplications.length,
                )}{" "}
                of {filteredApplications.length} results
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

      {/* Application Details Panel */}
      {selectedApplication && (
        <div className="w-[480px] bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
          {/* Panel Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold">
                  {getInitials(selectedApplication.applicantName)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedApplication.applicantName}
                  </h2>
                  <p className="text-sm text-gray-500 font-mono">
                    {selectedApplication.id}
                  </p>
                </div>
              </div>
              <span
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[selectedApplication.status].color}`}
              >
                {React.createElement(
                  statusConfig[selectedApplication.status].icon,
                  { className: "w-3.5 h-3.5" },
                )}
                {statusConfig[selectedApplication.status].label}
              </span>
            </div>
          </div>

          {/* Panel Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Application Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  Application Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Applicant
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedApplication.applicantName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Destination
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedApplication.destination}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Visa Type
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedApplication.visaType}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Applied Date
                    </p>
                    <p className="text-sm text-gray-900">
                      {formatDate(selectedApplication.appliedDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Officer</p>
                    <p className="text-sm text-gray-900">
                      {selectedApplication.officer || "Not assigned"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Passport
                    </p>
                    <p className="text-sm text-gray-900 font-mono">
                      {selectedApplication.passportNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Nationality
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedApplication.nationality}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Visa Fee
                    </p>
                    <p className="text-sm text-gray-900">
                      USD {selectedApplication.visaFee}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Service Charge
                    </p>
                    <p className="text-sm text-gray-900">
                      OMR {selectedApplication.serviceCharge}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Total Fee
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      OMR {selectedApplication.totalFee}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200" />

              {/* Document Checklist */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-gray-400" />
                  Document Checklist
                </h3>
                <div className="space-y-2">
                  {selectedApplication.documentChecklist.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {doc.uploaded ? (
                        <CheckSquare className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${doc.uploaded ? "text-gray-900" : "text-gray-400"}`}
                      >
                        {doc.name}
                      </span>
                      {doc.required && (
                        <span className="text-xs text-red-400 ml-auto">
                          Required
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200" />

              {/* Officer Notes */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  Officer Notes
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedApplication.notes ||
                      "No notes available for this application."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Footer Actions */}
          <div className="p-4 border-t border-gray-200 flex gap-2">
            <button onClick={() => selectedApplication && openEditApplicationModal(selectedApplication)} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Update Status
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
              <Phone className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {showApplicationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{editingApplication ? "Edit Application" : "New Application"}</h2>
              <button onClick={() => setShowApplicationModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Applicant Name</label>
                  <input type="text" placeholder="Full name" value={applicationForm.applicantName} onChange={(e) => setApplicationForm({ ...applicationForm, applicantName: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
                  <input type="text" placeholder="e.g. United Kingdom" value={applicationForm.destination} onChange={(e) => setApplicationForm({ ...applicationForm, destination: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Visa Type</label>
                  <input type="text" placeholder="e.g. Visit Visa" value={applicationForm.visaType} onChange={(e) => setApplicationForm({ ...applicationForm, visaType: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Passport Number</label>
                  <input type="text" placeholder="e.g. P12847364" value={applicationForm.passportNumber} onChange={(e) => setApplicationForm({ ...applicationForm, passportNumber: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nationality</label>
                  <input type="text" placeholder="e.g. Omani" value={applicationForm.nationality} onChange={(e) => setApplicationForm({ ...applicationForm, nationality: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Visa Fee (USD)</label>
                  <input type="number" placeholder="0.00" value={applicationForm.visaFee} onChange={(e) => setApplicationForm({ ...applicationForm, visaFee: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Charge (OMR)</label>
                  <input type="number" placeholder="0.00" value={applicationForm.serviceCharge} onChange={(e) => setApplicationForm({ ...applicationForm, serviceCharge: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select value={applicationForm.status} onChange={(e) => setApplicationForm({ ...applicationForm, status: e.target.value as VisaApplication["status"] })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="submitted">Submitted</option>
                    <option value="in-review">In Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                  <textarea rows={3} placeholder="Application notes..." value={applicationForm.notes} onChange={(e) => setApplicationForm({ ...applicationForm, notes: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowApplicationModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSaveApplication} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                {editingApplication ? "Update Application" : "Add Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
