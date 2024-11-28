"use client";

import { ActivitySummary } from "@/components/stats/activity-summary";
import { ProgressChart } from "@/components/stats/progress-chart";
import { MaterialRecommendations } from "@/components/recommendations/material-recommendations";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your learning progress and discover new materials
        </p>
      </div>

      <ActivitySummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ProgressChart />
        <div className="lg:col-span-1">
          <MaterialRecommendations />
        </div>
      </div>
    </div>
  );
}