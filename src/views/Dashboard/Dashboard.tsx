import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import DashboardComponents from "./DashboardComponent";

export default function Dashboard() {
  return (
    <MainLayout>
      <DashboardComponents selectedSidebarItem="Overview Cards" />
    </MainLayout>
  );
}
