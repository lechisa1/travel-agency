import React from "react";
import DashboardStats from "../components/DashboardStats";
import RevenueChart from "../components/RevenueChart";
import PieChartComponent from "../components/PieChartComponent";
import RecentActivity from "../components/RecentActivity";

export default function Home() {
  return (
    <>
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <PieChartComponent />
        </div>
      </div>

      <div className="mt-6">
        <RecentActivity />
      </div>
    </>
  );
}
