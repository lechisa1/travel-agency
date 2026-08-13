"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Plane,
  Hotel,
  Truck,
  Calculator,
  Receipt,
  Shield,
  Search,
  ChevronDown,
  ChevronRight,
  Building2,
  BarChart3,
} from "lucide-react";
interface MenuItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: MenuItem[];
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    href: "/dashboard",
    badge: "+6.1%",
  },
  {
    name: "OPERATIONS",
    icon: null,
    subItems: [
      { name: "Customers", icon: <Users size={18} />, href: "/customers" },
      { name: "Visa Management", icon: <FileText size={18} />, href: "/visa" },
      { name: "Flight Booking", icon: <Plane size={18} />, href: "/flights" },
      { name: "Hotel Booking", icon: <Hotel size={18} />, href: "/hotels" },
      { name: "Transportation", icon: <Truck size={18} />, href: "/transport" },
    ],
  },
  {
    name: "FINANCE",
    icon: null,
    subItems: [
      {
        name: "Accounting",
        icon: <Calculator size={18} />,
        href: "/accounting",
      },
      { name: "Invoices", icon: <Receipt size={18} />, href: "/invoices" },
    ],
  },
  {
    name: "Administration",
    icon: null,
    subItems: [
      { name: "Staff & Roles", icon: <Shield size={18} />, href: "/admin" },
      { name: "Reports", icon: <BarChart3 size={18} />, href: "/reports" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["OPERATIONS"]);

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 h-16 border-b border-gray-200">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">TravelPro</h1>
          <p className="text-xs text-gray-500">Travel Agency</p>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {menuItems.map((item) => {
          if (item.subItems) {
            const isExpanded = expandedItems.includes(item.name);
            return (
              <div key={item.name} className="mb-2">
                <button
                  onClick={() => toggleExpand(item.name)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
                >
                  <span>{item.name}</span>
                  {isExpanded ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>
                <div className={`space-y-1 mt-1 ${!isExpanded && "hidden"}`}>
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href || "#"}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                        ${
                          isActive(subItem.href)
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      <span
                        className={
                          isActive(subItem.href)
                            ? "text-blue-700"
                            : "text-gray-400"
                        }
                      >
                        {subItem.icon}
                      </span>
                      <span>{subItem.name}</span>
                      {subItem.badge && (
                        <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          {subItem.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href || "#"}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all mb-1
                ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <span
                className={
                  isActive(item.href) ? "text-blue-700" : "text-gray-400"
                }
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
              {item.badge && (
                <span className="ml-auto text-xs text-green-600 font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
            OA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Omar Al-Rashidi
            </p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
