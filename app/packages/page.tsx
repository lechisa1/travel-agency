"use client";

import React, { useState } from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Heart,
  Users,
  Mountain,
  Star,
  CheckCircle,
  XCircle,
  X,
  Save,
  Image,
  FileText,
  Shield,
} from "lucide-react";

interface TourPackage {
  id: string;
  name: string;
  category: "honeymoon" | "family" | "adventure" | "umrah" | "hajj" | "luxury" | "budget";
  duration: string;
  destination: string;
  price: number;
  originalPrice?: number;
  currency: string;
  status: "active" | "draft" | "archived";
  rating: number;
  reviews: number;
  bookings: number;
  maxGroupSize: number;
  inclusions: string[];
  exclusions: string[];
  description: string;
  image?: string;
  createdAt: string;
}

const mockPackages: TourPackage[] = [
  { id: "PKG-001", name: "Romantic Bali Honeymoon", category: "honeymoon", duration: "5 Days / 4 Nights", destination: "Bali, Indonesia", price: 1850, originalPrice: 2200, currency: "USD", status: "active", rating: 4.8, reviews: 124, bookings: 45, maxGroupSize: 2, inclusions: ["Flights", "Hotel", "Breakfast", "Spa"], exclusions: ["Lunch", "Dinner", "Tips"], description: "A romantic getaway to Bali with private villa, spa treatments, and sunset dinners.", createdAt: "2026-01-15" },
  { id: "PKG-002", name: "Umrah Express — Ramadan", category: "umrah", duration: "10 Days / 9 Nights", destination: "Makkah & Madinah, KSA", price: 2400, currency: "USD", status: "active", rating: 4.9, reviews: 312, bookings: 180, maxGroupSize: 50, inclusions: ["Flights", "Hotel", "Visa", "Transport", "Guide", "Ziyarat"], exclusions: ["Lunch", "Shopping"], description: "Premium Umrah package during Ramadan with 5-star hotels near Haram.", createdAt: "2026-02-01" },
  { id: "PKG-003", name: "Swiss Alps Adventure", category: "adventure", duration: "7 Days / 6 Nights", destination: "Zurich, Switzerland", price: 3200, currency: "USD", status: "active", rating: 4.7, reviews: 89, bookings: 22, maxGroupSize: 15, inclusions: ["Flights", "Hotel", "Breakfast", "Train Pass", "Guide"], exclusions: ["Lunch", "Dinner", "Equipment"], description: "Thrilling adventure through the Swiss Alps with hiking, skiing, and glacier tours.", createdAt: "2026-03-10" },
  { id: "PKG-004", name: "Dubai Family Fun", category: "family", duration: "4 Days / 3 Nights", destination: "Dubai, UAE", price: 1200, originalPrice: 1500, currency: "USD", status: "active", rating: 4.5, reviews: 203, bookings: 67, maxGroupSize: 6, inclusions: ["Flights", "Hotel", "Park Tickets", "Desert Safari"], exclusions: ["Meals", "Shopping"], description: "Perfect family vacation with theme parks, aquarium, and desert safari.", createdAt: "2026-04-05" },
  { id: "PKG-005", name: "Luxury Maldives Escape", category: "luxury", duration: "6 Days / 5 Nights", destination: "Malé, Maldives", price: 4500, currency: "USD", status: "draft", rating: 0, reviews: 0, bookings: 0, maxGroupSize: 2, inclusions: ["Flights", "Water Villa", "All Meals", "Spa", "Seaplane"], exclusions: ["Tips", "Extras"], description: "Ultimate luxury overwater villa experience with private butler service.", createdAt: "2026-05-20" },
  { id: "PKG-006", name: "Budget Turkey Explorer", category: "budget", duration: "5 Days / 4 Nights", destination: "Istanbul & Cappadocia", price: 650, originalPrice: 850, currency: "USD", status: "active", rating: 4.3, reviews: 156, bookings: 34, maxGroupSize: 20, inclusions: ["Flights", "Hotel", "Breakfast", "Tours"], exclusions: ["Lunch", "Dinner", "Visa"], description: "Explore the magic of Turkey on a budget with hot air balloon rides and historic tours.", createdAt: "2026-06-01" },
  { id: "PKG-007", name: "Hajj 2027 — VIP", category: "hajj", duration: "28 Days / 27 Nights", destination: "Makkah & Madinah, KSA", price: 8500, currency: "USD", status: "draft", rating: 0, reviews: 0, bookings: 0, maxGroupSize: 40, inclusions: ["Flights", "5-Star Hotel", "Visa", "Transport", "Guide", "All Meals"], exclusions: ["Shopping", "Extras"], description: "VIP Hajj package with premium accommodations and personalized service.", createdAt: "2026-07-01" },
];

const categoryConfig = {
  honeymoon: { label: "Honeymoon", color: "bg-pink-100 text-pink-700", icon: Heart },
  family: { label: "Family", color: "bg-green-100 text-green-700", icon: Users },
  adventure: { label: "Adventure", color: "bg-orange-100 text-orange-700", icon: Mountain },
  umrah: { label: "Umrah", color: "bg-emerald-100 text-emerald-700", icon: Shield },
  hajj: { label: "Hajj", color: "bg-purple-100 text-purple-700", icon: Shield },
  luxury: { label: "Luxury", color: "bg-yellow-100 text-yellow-700", icon: Star },
  budget: { label: "Budget", color: "bg-blue-100 text-blue-700", icon: Package },
};

const statusConfig = {
  active: { label: "Active", color: "bg-green-100 text-green-700", icon: CheckCircle },
  draft: { label: "Draft", color: "bg-gray-100 text-gray-600", icon: FileText },
  archived: { label: "Archived", color: "bg-red-100 text-red-600", icon: XCircle },
};

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const itemsPerPage = 5;

  const categories = Object.entries(categoryConfig).map(([key, config]) => ({
    id: key,
    label: config.label,
    icon: config.icon,
    count: mockPackages.filter((p) => p.category === key).length,
  }));

  const filteredPackages = mockPackages.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || pkg.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || pkg.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPackages = filteredPackages.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", OMR: "﷼", SAR: "﷼", AED: "د.إ" };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Packages & Tours</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <button
          onClick={() => { setEditingPackage(null); setShowPackageModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Package
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Packages</p>
              <p className="text-2xl font-bold text-gray-900">{mockPackages.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+3 this month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Packages</p>
              <p className="text-2xl font-bold text-green-600">{mockPackages.filter((p) => p.status === "active").length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Currently bookable</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{new Set(mockPackages.map((p) => p.category)).size}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Package types</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{mockPackages.reduce((sum, p) => sum + p.bookings, 0)}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Across all packages</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">Categories</h3>
          </div>
          <div className="p-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${selectedCategory === "all" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                All Packages
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === "all" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                {mockPackages.length}
              </span>
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${selectedCategory === cat.id ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat.id ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Packages List */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Tour Packages</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search packages..."
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
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPackages.map((pkg) => {
                  const catConfig = categoryConfig[pkg.category];
                  const statConfig = statusConfig[pkg.status];
                  const StatusIcon = statConfig.icon;
                  const CatIcon = catConfig.icon;
                  return (
                    <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                            <Image className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{pkg.name}</p>
                            <p className="text-xs text-gray-500">{pkg.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${catConfig.color}`}>
                          <CatIcon className="w-3 h-3" />
                          {catConfig.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{pkg.duration}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{pkg.destination}</td>
                      <td className="px-4 py-3 text-right">
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(pkg.price, pkg.currency)}</p>
                        {pkg.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">{formatCurrency(pkg.originalPrice, pkg.currency)}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          {renderStars(pkg.rating)}
                          <span className="text-xs text-gray-500 ml-1">{pkg.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statConfig.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statConfig.label}
                        </span>
                      </td>
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPackages.length)} of {filteredPackages.length} packages
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
      </div>

      {/* Package Modal */}
      {showPackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{editingPackage ? "Edit Package" : "New Tour Package"}</h2>
              <button onClick={() => setShowPackageModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Package Name</label>
                  <input type="text" placeholder="e.g. Romantic Bali Honeymoon" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="honeymoon">Honeymoon</option>
                    <option value="family">Family</option>
                    <option value="adventure">Adventure</option>
                    <option value="umrah">Umrah</option>
                    <option value="hajj">Hajj</option>
                    <option value="luxury">Luxury</option>
                    <option value="budget">Budget</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
                  <input type="text" placeholder="e.g. 5 Days / 4 Nights" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
                  <input type="text" placeholder="e.g. Bali, Indonesia" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (USD)</label>
                  <input type="number" placeholder="0.00" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Group Size</label>
                  <input type="number" placeholder="e.g. 10" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                  <textarea rows={3} placeholder="Package description..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Inclusions (one per line)</label>
                  <textarea rows={3} placeholder="Flights&#10;Hotel&#10;Breakfast" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Exclusions (one per line)</label>
                  <textarea rows={3} placeholder="Lunch&#10;Dinner&#10;Tips" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowPackageModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={() => setShowPackageModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                {editingPackage ? "Update Package" : "Create Package"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
