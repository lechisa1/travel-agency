"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Printer,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plane,
  Hotel,
  Truck,
  FileText,
  PieChart,
  BarChart3,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Eye,
  Users,
  Building2,
  Clock,
  Award,
} from "lucide-react";

// Types
interface ReportData {
  totalBookings: number;
  totalBookingsChange: number;
  revenue: number;
  revenueChange: number;
  expenses: number;
  expensesChange: number;
  netProfit: number;
  netProfitChange: number;
  avgBookingValue: number;
  avgBookingValueChange: number;
}

interface ServiceBreakdown {
  service: string;
  bookings: number;
  revenue: number;
  avgValue: number;
  change: number;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

// Mock Data
const reportData: ReportData = {
  totalBookings: 68,
  totalBookingsChange: 6,
  revenue: 76400,
  revenueChange: 6.1,
  expenses: 43200,
  expensesChange: 7.5,
  netProfit: 33200,
  netProfitChange: 4.1,
  avgBookingValue: 1124,
  avgBookingValueChange: 1.3,
};

const serviceBreakdown: ServiceBreakdown[] = [
  {
    service: "Flight Booking",
    bookings: 26,
    revenue: 48200,
    avgValue: 1854,
    change: 8.2,
    percentage: 63.1,
    icon: <Plane className="w-4 h-4" />,
    color: "text-blue-600",
  },
  {
    service: "Visa Services",
    bookings: 18,
    revenue: 12800,
    avgValue: 711,
    change: 3.1,
    percentage: 16.8,
    icon: <FileText className="w-4 h-4" />,
    color: "text-purple-600",
  },
  {
    service: "Hotel Booking",
    bookings: 14,
    revenue: 9600,
    avgValue: 686,
    change: 12.5,
    percentage: 12.6,
    icon: <Hotel className="w-4 h-4" />,
    color: "text-green-600",
  },
  {
    service: "Transportation",
    bookings: 10,
    revenue: 5800,
    avgValue: 580,
    change: -2.1,
    percentage: 7.6,
    icon: <Truck className="w-4 h-4" />,
    color: "text-orange-600",
  },
];

// Monthly revenue trend data
const monthlyRevenue = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 35000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 48000 },
  { month: "Jun", revenue: 52000 },
  { month: "Jul", revenue: 76400 },
  { month: "Aug", revenue: 72000 },
  { month: "Sep", revenue: 68000 },
  { month: "Oct", revenue: 71000 },
  { month: "Nov", revenue: 78000 },
  { month: "Dec", revenue: 84000 },
];

// Bookings by service for pie chart
const bookingsByService = [
  { service: "Flight", count: 26, color: "#3b82f6" },
  { service: "Visa", count: 18, color: "#8b5cf6" },
  { service: "Hotel", count: 14, color: "#10b981" },
  { service: "Transport", count: 10, color: "#f59e0b" },
];

const maxRevenue = Math.max(...monthlyRevenue.map((d) => d.revenue));

export default function ReportsPage() {
  const [reportPeriod, setReportPeriod] = useState<
    "daily" | "monthly" | "annual"
  >("monthly");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return `OMR ${amount.toLocaleString()}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const totalRevenue = serviceBreakdown.reduce((sum, s) => sum + s.revenue, 0);
  const totalBookings = serviceBreakdown.reduce(
    (sum, s) => sum + s.bookings,
    0,
  );
  const avgValue = totalRevenue / totalBookings;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
            {(["daily", "monthly", "annual"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setReportPeriod(period)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  reportPeriod === period
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Bookings</p>
              <p className="text-xl font-bold text-gray-900">
                {formatNumber(reportData.totalBookings)}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />+{reportData.totalBookingsChange}{" "}
            vs last month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Revenue</p>
              <p className="text-xl font-bold text-blue-600">
                {formatCurrency(reportData.revenue)}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />+{reportData.revenueChange}% vs
            last month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Expenses</p>
              <p className="text-xl font-bold text-red-600">
                {formatCurrency(reportData.expenses)}
              </p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-1 flex items-center gap-0.5">
            <TrendingDown className="w-3 h-3" />+{reportData.expensesChange}% vs
            last month
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-100">Net Profit</p>
              <p className="text-xl font-bold">
                {formatCurrency(reportData.netProfit)}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-xs text-blue-200 mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />+{reportData.netProfitChange}% vs
            last month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Avg. Booking Value</p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(reportData.avgBookingValue)}
              </p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />+
            {reportData.avgBookingValueChange}% vs last month
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Monthly Revenue Trend
            </h2>
            <p className="text-sm text-gray-500">OMR Revenue</p>
          </div>
          <div className="p-6">
            <div className="flex items-end gap-3 h-48">
              {monthlyRevenue.map((data, index) => {
                const height = (data.revenue / maxRevenue) * 100;
                const isCurrentMonth = data.month === "Jul";

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className={`w-full rounded-t transition-all duration-500 hover:opacity-80 ${
                        isCurrentMonth ? "bg-blue-600" : "bg-blue-400"
                      }`}
                      style={{
                        height: `${Math.max(height, 4)}%`,
                        minHeight: "4px",
                      }}
                    />
                    <span
                      className={`text-xs mt-1 font-medium ${isCurrentMonth ? "text-blue-600" : "text-gray-500"}`}
                    >
                      {data.month}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded" />
                <span className="text-xs text-gray-600">Revenue (OMR)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings by Service */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Bookings by Service
            </h2>
            <p className="text-sm text-gray-500">Count per service type</p>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center gap-8">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {bookingsByService.map((item, index) => {
                    const total = bookingsByService.reduce(
                      (sum, i) => sum + i.count,
                      0,
                    );
                    const percentage = (item.count / total) * 100;
                    const circumference = 2 * Math.PI * 40;
                    const offset =
                      circumference - (percentage / 100) * circumference;
                    const previousOffset = bookingsByService
                      .slice(0, index)
                      .reduce(
                        (sum, i) => sum + (i.count / total) * circumference,
                        0,
                      );

                    return (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="20"
                        strokeDasharray={`${circumference}`}
                        strokeDashoffset={
                          circumference - offset - previousOffset
                        }
                        className="transition-all duration-500"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {totalBookings}
                    </p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {bookingsByService.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {item.service}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Breakdown Report */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Service Breakdown Report — July 2024
              </h2>
            </div>
            <div className="flex items-center gap-2">
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
                  Service
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue (OMR)
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Value (OMR)
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  vs Last Month
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {serviceBreakdown.map((service, index) => {
                const isPositive = service.change > 0;
                const barWidth = (service.revenue / totalRevenue) * 100;

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onMouseEnter={() => setSelectedService(service.service)}
                    onMouseLeave={() => setSelectedService(null)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={service.color}>{service.icon}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {service.service}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {service.bookings}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                      {formatCurrency(service.revenue)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {formatCurrency(service.avgValue)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 font-medium ${
                          isPositive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {isPositive ? "+" : ""}
                        {service.change}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: service.color
                                .replace("text-", "bg-")
                                .replace("600", "500"),
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {service.percentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                  Total
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                  {totalBookings}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-blue-600 text-right">
                  {formatCurrency(totalRevenue)}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                  {formatCurrency(avgValue)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400 text-right">
                  —
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                  100%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
