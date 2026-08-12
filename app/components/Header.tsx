"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

// Get page title from pathname
const getPageTitle = (pathname: string) => {
  const path = pathname.split("/")[1] || "dashboard";
  return path.charAt(0).toUpperCase() + path.slice(1);
};

// Get current date formatted
const getCurrentDate = () => {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Header() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pageTitle = getPageTitle(pathname);
  const currentDate = getCurrentDate();

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New booking confirmed",
      description: "Ahmed Al-Farsi booked flight to Dubai",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Visa application updated",
      description: "Fatima Malik visa status changed to approved",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Payment received",
      description: "OMR 1,250 received from Mohammed Qasim",
      time: "3 hours ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        <div>
          <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
          <p className="text-sm text-gray-500 hidden sm:block">{currentDate}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search - Desktop */}
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64 transition-all"
          />
          <kbd className="absolute right-3 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
            ⌘K
          </kbd>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative text-gray-600"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsNotificationsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.read ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            notification.read ? "bg-gray-300" : "bg-blue-600"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {notification.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Profile"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
              OA
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                      OA
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Omar Al-Rashidi
                      </p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <User size={16} className="text-gray-400" />
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings size={16} className="text-gray-400" />
                    Settings
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
