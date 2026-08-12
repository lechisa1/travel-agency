"use client";

import React from "react";
import { TrendingUp, TrendingDown, AlertCircle, Calendar } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = "up",
  subtitle,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              {changeType === "up" ? (
                <TrendingUp size={14} className="text-green-600" />
              ) : (
                <TrendingDown size={14} className="text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${changeType === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {change}
              </span>
            </div>
          )}
        </div>
        {subtitle && (
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Revenue (Jul)"
        value="OMR 76,400"
        change="vs OMR 72,000 last month"
        changeType="up"
        subtitle="+6.1%"
      />
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Bookings</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">68</p>
            <div className="flex items-center gap-1 mt-2">
              <AlertCircle size={14} className="text-yellow-600" />
              <span className="text-sm text-yellow-600 font-medium">
                12 pending action
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
            23
          </span>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm text-blue-600 font-medium">
                in review
              </span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-green-600 font-medium">
                5 approved
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
            Within next 6 months
          </span>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-blue-100">Upcoming Trips</p>
            <p className="text-2xl font-bold mt-1">23</p>
            <div className="flex items-center gap-2 mt-2">
              <Calendar size={14} className="text-blue-200" />
              <span className="text-sm text-blue-100">Next 30 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
