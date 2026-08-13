"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Car,
  Hotel,
  Plane,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Bell,
  MapPin,
  Phone,
  Mail,
  Trash2,
  X,
  Save,
} from "lucide-react";

interface StaffSchedule {
  id: string;
  name: string;
  role: string;
  date: string;
  shift: "morning" | "afternoon" | "evening";
  status: "present" | "leave" | "remote";
}

interface BookingTimeline {
  id: string;
  customer: string;
  service: "flight" | "hotel" | "visa" | "transport";
  title: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
  location: string;
}

interface ResourceSchedule {
  id: string;
  name: string;
  type: "vehicle" | "room";
  date: string;
  timeSlot: string;
  assignedTo: string;
  status: "booked" | "available" | "maintenance";
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  type: "booking" | "document" | "payment" | "followup";
  completed: boolean;
}

const mockStaffSchedule: StaffSchedule[] = [
  { id: "1", name: "Omar Al-Rashidi", role: "Administrator", date: "2026-08-13", shift: "morning", status: "present" },
  { id: "2", name: "Sara Ahmed", role: "Visa Officer", date: "2026-08-13", shift: "morning", status: "present" },
  { id: "3", name: "Ali Hassan", role: "Accountant", date: "2026-08-13", shift: "afternoon", status: "remote" },
  { id: "4", name: "Mariam Salim", role: "Sales Agent", date: "2026-08-13", shift: "morning", status: "present" },
  { id: "5", name: "Rashid Nasser", role: "Ticketing Officer", date: "2026-08-13", shift: "evening", status: "leave" },
  { id: "6", name: "Huda Al-Balushi", role: "Sales Agent", date: "2026-08-13", shift: "morning", status: "present" },
];

const mockBookingTimeline: BookingTimeline[] = [
  { id: "1", customer: "Ahmed Al-Farsi", service: "flight", title: "DXB Departure — EK-621", date: "2026-08-13", time: "14:30", status: "confirmed", location: "Dubai Intl Airport" },
  { id: "2", customer: "Fatima Malik", service: "hotel", title: "Check-in — Burj Al Arab", date: "2026-08-13", time: "15:00", status: "confirmed", location: "Dubai, UAE" },
  { id: "3", customer: "Mohammed Qasim", service: "visa", title: "UK Visa Interview", date: "2026-08-14", time: "09:00", status: "pending", location: "VFS Global, Muscat" },
  { id: "4", customer: "Khalid Al-Rashid", service: "transport", title: "Airport Transfer — MCT", date: "2026-08-13", time: "06:00", status: "confirmed", location: "Muscat Intl Airport" },
  { id: "5", customer: "Aisha Hassan", service: "flight", title: "BOM Arrival — AI-901", date: "2026-08-14", time: "22:15", status: "pending", location: "Mumbai Intl" },
];

const mockResources: ResourceSchedule[] = [
  { id: "1", name: "Toyota Camry — Plate 12345", type: "vehicle", date: "2026-08-13", timeSlot: "06:00 - 14:00", assignedTo: "Khalid Al-Rashid", status: "booked" },
  { id: "2", name: "Toyota Camry — Plate 12346", type: "vehicle", date: "2026-08-13", timeSlot: "14:00 - 22:00", assignedTo: "Ahmed Al-Farsi", status: "booked" },
  { id: "3", name: "Hilux Van — Plate 98765", type: "vehicle", date: "2026-08-13", timeSlot: "Full Day", assignedTo: "Group Tour", status: "booked" },
  { id: "4", name: "Hilton Room 501", type: "room", date: "2026-08-13", timeSlot: "Check-in", assignedTo: "Fatima Malik", status: "booked" },
  { id: "5", name: "Hilton Room 502", type: "room", date: "2026-08-13", timeSlot: "Check-in", assignedTo: "Mohammed Qasim", status: "booked" },
  { id: "6", name: "Hilton Room 503", type: "room", date: "2026-08-13", timeSlot: "—", assignedTo: "Unassigned", status: "available" },
];

const mockReminders: Reminder[] = [
  { id: "1", title: "Visa expiry — Fatima Malik", description: "UK visa expires in 15 days. Initiate renewal process.", dueDate: "2026-08-28", priority: "high", type: "document", completed: false },
  { id: "2", title: "Payment due — Ahmed Al-Farsi", description: "Invoice INV-2024-0090 pending payment.", dueDate: "2026-08-15", priority: "high", type: "payment", completed: false },
  { id: "3", title: "Follow-up — Mohammed Qasim", description: "Call customer regarding Umrah package options.", dueDate: "2026-08-14", priority: "medium", type: "followup", completed: false },
  { id: "4", title: "Flight reminder — EK-621", description: "Send reminder 24h before departure to Ahmed Al-Farsi.", dueDate: "2026-08-12", priority: "medium", type: "booking", completed: true },
  { id: "5", title: "Passport expiry — Khalid R.", description: "Passport expires in 30 days. Renewal required.", dueDate: "2026-09-12", priority: "low", type: "document", completed: false },
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const currentDate = new Date(2026, 7, 13);
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [activeTab, setActiveTab] = useState("timeline");
  const [showEventModal, setShowEventModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDaysList = getWeekDays();

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "flight": return <Plane className="w-4 h-4" />;
      case "hotel": return <Hotel className="w-4 h-4" />;
      case "visa": return <FileText className="w-4 h-4" />;
      case "transport": return <Car className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case "flight": return "bg-blue-100 text-blue-700";
      case "hotel": return "bg-green-100 text-green-700";
      case "visa": return "bg-purple-100 text-purple-700";
      case "transport": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "present":
      case "booked":
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
      case "leave":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const tabs = [
    { id: "timeline", label: "Booking Timeline", icon: Clock },
    { id: "staff", label: "Staff Schedule", icon: Users },
    { id: "resources", label: "Resource Scheduling", icon: Car },
    { id: "reminders", label: "Reminders & Alerts", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar & Scheduling</h1>
          <p className="text-sm text-gray-500 mt-1">
            {formatDate(currentDate)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode("week")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === "week" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode("month")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === "month" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Month
            </button>
          </div>
          <button onClick={() => setShowEventModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="border-b border-gray-200 px-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Booking Timeline */}
          {activeTab === "timeline" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h3>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                  </button>
                  <span className="text-sm font-medium text-gray-700">Today, Aug 13</span>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {mockBookingTimeline.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getServiceColor(booking.service)}`}>
                        {getServiceIcon(booking.service)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-gray-900">{booking.title}</h4>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            booking.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{booking.customer}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            {booking.date} at {booking.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {booking.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <Phone className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <Mail className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Staff Schedule */}
          {activeTab === "staff" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Weekly Staff Schedule</h3>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                  </button>
                  <span className="text-sm font-medium text-gray-700">Week of Aug 10 — 16</span>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                        {weekDaysList.map((day) => (
                          <th key={day.toISOString()} className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div>{weekDays[day.getDay()]}</div>
                            <div className="text-gray-400 font-normal normal-case">{day.getDate()}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mockStaffSchedule.slice(0, 4).map((staff) => (
                        <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                                {staff.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{staff.name}</p>
                                <p className="text-xs text-gray-500">{staff.role}</p>
                              </div>
                            </div>
                          </td>
                          {weekDaysList.map((day) => {
                            const dayStr = day.toISOString().split("T")[0];
                            const isToday = dayStr === staff.date;
                            return (
                              <td key={day.toISOString()} className="px-2 py-2 text-center">
                                {isToday ? (
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                    staff.status === "present" ? "bg-green-100 text-green-700" :
                                    staff.status === "leave" ? "bg-red-100 text-red-700" :
                                    "bg-blue-100 text-blue-700"
                                  }`}>
                                    {getStatusIcon(staff.status)}
                                    {staff.shift}
                                  </span>
                                ) : (
                                  <span className="text-gray-300">—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Resource Scheduling */}
          {activeTab === "resources" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Resource Availability</h3>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                  </button>
                  <span className="text-sm font-medium text-gray-700">Today, Aug 13</span>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Vehicles */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Car className="w-4 h-4 text-gray-400" />
                      Vehicles
                    </h4>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {mockResources.filter((r) => r.type === "vehicle").map((resource) => (
                      <div key={resource.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{resource.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{resource.timeSlot}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            resource.status === "booked" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                          }`}>
                            {resource.status === "booked" ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                            {resource.status}
                          </span>
                        </div>
                        {resource.status === "booked" && (
                          <p className="text-xs text-gray-500 mt-2">Assigned to: {resource.assignedTo}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rooms */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-gray-400" />
                      Hotel Rooms
                    </h4>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {mockResources.filter((r) => r.type === "room").map((resource) => (
                      <div key={resource.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{resource.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{resource.timeSlot}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            resource.status === "booked" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                          }`}>
                            {resource.status === "booked" ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                            {resource.status}
                          </span>
                        </div>
                        {resource.status === "booked" && (
                          <p className="text-xs text-gray-500 mt-2">Assigned to: {resource.assignedTo}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reminders */}
          {activeTab === "reminders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Reminders & Alerts</h3>
                <button onClick={() => setShowReminderModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                  <Plus className="w-4 h-4" />
                  Add Reminder
                </button>
              </div>

              <div className="space-y-3">
                {mockReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`bg-white rounded-xl border p-4 transition-all ${
                      reminder.completed ? "border-gray-200 opacity-60" : "border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        reminder.completed ? "bg-green-600 border-green-600" : "border-gray-300"
                      }`}>
                        {reminder.completed && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-sm font-semibold ${reminder.completed ? "text-gray-400 line-through" : "text-gray-900"}`}>
                            {reminder.title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(reminder.priority)}`}>
                            {reminder.priority}
                          </span>
                        </div>
                        <p className={`text-sm mb-2 ${reminder.completed ? "text-gray-400" : "text-gray-600"}`}>
                          {reminder.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            Due: {reminder.dueDate}
                          </span>
                          <span className="capitalize">{reminder.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <Bell className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">New Booking Event</h2>
              <button onClick={() => setShowEventModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Event Title</label>
                  <input type="text" placeholder="e.g. DXB Departure — EK-621" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Customer</label>
                  <input type="text" placeholder="Customer name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Type</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="flight">Flight</option>
                    <option value="hotel">Hotel</option>
                    <option value="visa">Visa</option>
                    <option value="transport">Transport</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Time</label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                  <input type="text" placeholder="e.g. Dubai Intl Airport" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                  <textarea rows={3} placeholder="Additional details..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowEventModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={() => setShowEventModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">New Reminder</h2>
              <button onClick={() => setShowReminderModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                  <input type="text" placeholder="e.g. Visa expiry — Fatima Malik" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                  <textarea rows={3} placeholder="Reminder details..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Due Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="booking">Booking</option>
                    <option value="document">Document</option>
                    <option value="payment">Payment</option>
                    <option value="followup">Follow-up</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowReminderModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={() => setShowReminderModal(false)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                Save Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
