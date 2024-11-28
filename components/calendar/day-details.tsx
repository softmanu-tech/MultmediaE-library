"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, Headphones, ScrollText } from "lucide-react";
import { format } from "date-fns";

const materialIcons = {
  book: BookOpen,
  video: Video,
  audio: Headphones,
  journal: ScrollText,
};

interface DayDetailsProps {
  date?: Date;
  userId: string;
}

export function DayDetails({ date, userId }: DayDetailsProps) {
  const progress = useQuery(api.progress.getProgress, { userId });

  if (!date || !progress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Daily Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Select a date to view activity</p>
        </CardContent>
      </Card>
    );
  }

  const selectedDate = date.toISOString().split('T')[0];
  const dayProgress = progress.filter(
    (p) => p.lastAccessed.split('T')[0] === selectedDate
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity for {format(date, 'MMMM d, yyyy')}</CardTitle>
      </CardHeader>
      <CardContent>
        {dayProgress.length === 0 ? (
          <p className="text-muted-foreground">No activity on this day</p>
        ) : (
          <div className="space-y-4">
            {dayProgress.map((progress) => {
              const material = useQuery(api.materials.getMaterials, {
                id: progress.materialId,
              });
              if (!material?.[0]) return null;

              const Icon = materialIcons[material[0].type as keyof typeof materialIcons];
              return (
                <div
                  key={progress._id}
                  className="flex items-start space-x-4 p-4 rounded-lg border"
                >
                  <Icon className="h-5 w-5 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-medium">{material[0].title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Progress: {progress.progress}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Last accessed:{" "}
                      {format(new Date(progress.lastAccessed), 'h:mm a')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}