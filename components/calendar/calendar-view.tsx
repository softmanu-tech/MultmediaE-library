"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  selectedDate?: Date;
  onSelect: (date: Date | undefined) => void;
  dates: Record<string, number>;
}

export function CalendarView({ selectedDate, onSelect, dates }: CalendarViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelect}
          modifiers={{ hasActivity: (date) => date.toISOString().split('T')[0] in dates }}
          modifiersStyles={{
            hasActivity: {
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            },
          }}
          className="rounded-md border"
        />
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-sm bg-primary" />
            <span>Days with activity</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}