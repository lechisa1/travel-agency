"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { month: "Jan", revenue: 45000, expenses: 28000 },
  { month: "Feb", revenue: 52000, expenses: 30000 },
  { month: "Mar", revenue: 48000, expenses: 32000 },
  { month: "Apr", revenue: 61000, expenses: 35000 },
  { month: "May", revenue: 58000, expenses: 33000 },
  { month: "Jun", revenue: 72000, expenses: 38000 },
  { month: "Jul", revenue: 76400, expenses: 41000 },
  { month: "Aug", revenue: 69000, expenses: 39000 },
  { month: "Sep", revenue: 81000, expenses: 42000 },
  { month: "Oct", revenue: 78000, expenses: 40000 },
  { month: "Nov", revenue: 85000, expenses: 43000 },
  { month: "Dec", revenue: 92000, expenses: 45000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: item.color }}>
            {item.name}: {item.value.toLocaleString()} OMR
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const [timeRange, setTimeRange] = useState("2024");

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Revenue vs Expenses
          </h3>
          <p className="text-sm text-gray-500">12-month trend (OMR)</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            <span>2024</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
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
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ fill: "#3b82f6", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ fill: "#ef4444", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
