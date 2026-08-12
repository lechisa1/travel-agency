"use client";

import React from "react";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Plane,
  Hotel,
  FileText,
} from "lucide-react";

const activities = [
  {
    id: 1,
    type: "flight",
    action: "New flight booking",
    customer: "Ahmed Al-Said",
    time: "2 minutes ago",
    status: "confirmed",
    icon: Plane,
  },
  {
    id: 2,
    type: "visa",
    action: "Visa application submitted",
    customer: "Fatima Al-Busaidi",
    time: "15 minutes ago",
    status: "pending",
    icon: FileText,
  },
  {
    id: 3,
    type: "hotel",
    action: "Hotel reservation confirmed",
    customer: "Khalid Al-Hinai",
    time: "1 hour ago",
    status: "completed",
    icon: Hotel,
  },
  {
    id: 4,
    type: "flight",
    action: "Flight cancellation requested",
    customer: "Noor Al-Hassan",
    time: "2 hours ago",
    status: "review",
    icon: Plane,
  },
];

const statusColors = {
  confirmed: "text-green-600 bg-green-50",
  pending: "text-yellow-600 bg-yellow-50",
  completed: "text-blue-600 bg-blue-50",
  review: "text-orange-600 bg-orange-50",
};

const statusIcons = {
  confirmed: CheckCircle,
  pending: Clock,
  completed: CheckCircle,
  review: AlertCircle,
};

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const StatusIcon =
            statusIcons[activity.status as keyof typeof statusIcons];
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.customer}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[activity.status as keyof typeof statusColors]}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    <span className="capitalize">{activity.status}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
