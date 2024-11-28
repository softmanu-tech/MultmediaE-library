"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, Headphones, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TEMP_USER_ID = "user123";

const materialIcons = {
  book: BookOpen,
  video: Video,
  audio: Headphones,
  journal: ScrollText,
};

export function MaterialRecommendations() {
  const progress = useQuery(api.progress.getProgress, { userId: TEMP_USER_ID });
  const materials = useQuery(api.materials.getMaterials);

  if (!progress || !materials) return null;

  // Get user's preferred material types based on activity
  const typePreferences = progress.reduce((acc: Record<string, number>, curr) => {
    const material = materials.find(m => m._id === curr.materialId);
    if (material) {
      acc[material.type] = (acc[material.type] || 0) + 1;
    }
    return acc;
  }, {});

  // Get recommendations based on preferences
  const recommendations = materials
    .filter(material => {
      // Filter out materials already in progress
      return !progress.some(p => p.materialId === material._id);
    })
    .sort((a, b) => (typePreferences[b.type] || 0) - (typePreferences[a.type] || 0))
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map(material => {
            const Icon = materialIcons[material.type as keyof typeof materialIcons];
            return (
              <div
                key={material._id}
                className="flex items-start space-x-4 p-4 rounded-lg border"
              >
                <Icon className="h-5 w-5 mt-1" />
                <div className="flex-1">
                  <h3 className="font-medium">{material.title}</h3>
                  <p className="text-sm text-muted-foreground">{material.description}</p>
                  <Button className="mt-2" size="sm" asChild>
                    <Link href={`/materials/${material.type}s`}>
                      View {material.type}
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}