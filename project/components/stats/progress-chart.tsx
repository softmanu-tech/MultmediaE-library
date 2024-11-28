"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";

const TEMP_USER_ID = "user123";

export function ProgressChart() {
  const progress = useQuery(api.progress.getProgress, { userId: TEMP_USER_ID });

  if (!progress) return null;

  const start = startOfWeek(new Date());
  const end = endOfWeek(new Date());
  const days = eachDayOfInterval({ start, end });

  const data = days.map(day => {
    const dayProgress = progress.filter(
      p => p.lastAccessed.split('T')[0] === format(day, 'yyyy-MM-dd')
    );
    return {
      name: format(day, 'EEE'),
      materials: dayProgress.length,
      progress: dayProgress.reduce((acc, curr) => acc + curr.progress, 0) / (dayProgress.length || 1)
    };
  });

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="materials" fill="hsl(var(--chart-1))" name="Materials Accessed" />
              <Bar dataKey="progress" fill="hsl(var(--chart-2))" name="Average Progress" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}