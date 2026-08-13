"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChevronDown, TrendingUp, Calendar, Users } from "lucide-react";

const monthlyData = [
  { month: "Jan", bookings: 65 },
  { month: "Feb", bookings: 55 },
  { month: "Mar", bookings: 58 },
  { month: "Apr", bookings: 60 },
  { month: "May", bookings: 62 },
  { month: "Jun", bookings: 75 },
  { month: "Jul", bookings: 78 },
  { month: "Aug", bookings: 70 },
  { month: "Sep", bookings: 80 },
  { month: "Oct", bookings: 72 },
  { month: "Nov", bookings: 85 },
  { month: "Dec", bookings: 95 },
];

// Calculate stats
const totalBookings = monthlyData.reduce((sum, item) => sum + item.bookings, 0);
const averageBookings = Math.round(totalBookings / monthlyData.length);
const maxBookings = Math.max(...monthlyData.map((item) => item.bookings));
const maxMonth = monthlyData.find((item) => item.bookings === maxBookings);
const currentMonth = monthlyData[6]; // July (index 6)
const previousMonth = monthlyData[5]; // June (index 5)
const monthOverMonthChange = (
  ((currentMonth.bookings - previousMonth.bookings) / previousMonth.bookings) *
  100
).toFixed(1);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-blue-600 font-semibold">
          {payload[0].value} bookings
        </p>
      </div>
    );
  }
  return null;
};

export default function MonthlyBookingsChart() {
  const [timeRange, setTimeRange] = useState("2024");
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Color based on value
  const getBarColor = (value: number) => {
    if (value >= 80) return "#3b82f6"; // Blue for high
    if (value >= 70) return "#60a5fa"; // Light blue for medium-high
    if (value >= 60) return "#93c5fd"; // Lighter blue for medium
    return "#bfdbfe"; // Lightest blue for low
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Monthly Bookings
          </h3>
          <p className="text-sm text-gray-500">Total booking count per month</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <span>2024</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">Total Bookings</p>
          <p className="text-xl font-bold text-blue-700">{totalBookings}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">Monthly Avg</p>
          <p className="text-xl font-bold text-green-700">{averageBookings}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">Peak Month</p>
          <p className="text-xl font-bold text-purple-700">
            {maxMonth?.month} ({maxBookings})
          </p>
        </div>
        <div className="bg-orange-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">vs Last Month</p>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <p className="text-xl font-bold text-green-700">
              +{monthOverMonthChange}%
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="bookings"
              radius={[4, 4, 0, 0]}
              onMouseEnter={(data) => setHoveredBar(data.month)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {monthlyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    hoveredBar === entry.month
                      ? "#2563eb"
                      : getBarColor(entry.bookings)
                  }
                  className="transition-all duration-200"
                  style={{
                    opacity: hoveredBar && hoveredBar !== entry.month ? 0.5 : 1,
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {currentMonth.month} {currentMonth.bookings} bookings
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" />+
            {monthOverMonthChange}% MoM
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Avg: {averageBookings}</span>
          <span>•</span>
          <span>
            Peak: {maxMonth?.month} ({maxBookings})
          </span>
        </div>
      </div>
    </div>
  );
}
