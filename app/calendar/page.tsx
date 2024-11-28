"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CalendarView } from "@/components/calendar/calendar-view";
import { DayDetails } from "@/components/calendar/day-details";

// TODO: Replace with actual user ID from authentication
const TEMP_USER_ID = "user123";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const progress = useQuery(api.progress.getProgress, {
    userId: TEMP_USER_ID,
  });

  const dates = progress?.reduce((acc: Record<string, number>, curr) => {
    const date = new Date(curr.lastAccessed).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {}) || {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Learning Calendar</h1>
        <p className="text-muted-foreground">
          Track your learning progress and activity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CalendarView
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
            dates={dates}
          />
        </div>
        <div className="lg:col-span-2">
          <DayDetails date={selectedDate} userId={TEMP_USER_ID} />
        </div>
      </div>
    </div>
  );
}