"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, Headphones, ScrollText, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const TEMP_USER_ID = "user123";

export function ActivitySummary() {
  const progress = useQuery(api.progress.getProgress, { userId: TEMP_USER_ID });

  if (!progress) return null;

  const totalItems = progress.length;
  const completedItems = progress.filter((p) => p.progress === 100).length;
  const averageProgress = progress.reduce((acc, curr) => acc + curr.progress, 0) / totalItems;

  const recentMilestone = completedItems > 0 && completedItems % 5 === 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItems}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedItems}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
          <Progress value={averageProgress} className="w-[60px] h-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(averageProgress)}%</div>
        </CardContent>
      </Card>

      {recentMilestone && (
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Milestone Reached!</CardTitle>
            <Trophy className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedItems} Materials Completed
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}