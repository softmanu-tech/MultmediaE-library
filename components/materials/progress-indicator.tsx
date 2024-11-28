"use client";

import { Progress } from "@/components/ui/progress";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// TODO: Replace with actual user ID from authentication
const TEMP_USER_ID = "user123";

export function ProgressIndicator({ materialId }: { materialId: string }) {
  const progress = useQuery(api.progress.getProgress, {
    userId: TEMP_USER_ID,
    materialId,
  });

  const value = progress?.[0]?.progress || 0;

  return (
    <div className="space-y-1.5">
      <Progress value={value} className="h-2" />
      <p className="text-xs text-muted-foreground text-right">{value}% complete</p>
    </div>
  );
}