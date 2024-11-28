"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, Headphones, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FavoriteButton } from "./favorite-button";
import { ProgressIndicator } from "./progress-indicator";

const materialIcons = {
  book: BookOpen,
  video: Video,
  audio: Headphones,
  journal: ScrollText,
};

export function MaterialGrid({ materials }: { materials: any[] }) {
  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No materials found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {materials.map((material) => {
        const Icon = materialIcons[material.type as keyof typeof materialIcons];
        return (
          <Card key={material._id} className="group relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5" />
                  <CardTitle className="text-lg">{material.title}</CardTitle>
                </div>
                <FavoriteButton materialId={material._id} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4">
                <img
                  src={material.thumbnail}
                  alt={material.title}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {material.description}
              </p>
              <div className="space-y-2">
                <p className="text-sm">Author: {material.author}</p>
                <p className="text-sm">
                  Published: {new Date(material.publishedDate).toLocaleDateString()}
                </p>
                <ProgressIndicator materialId={material._id} />
              </div>
              <Button className="w-full mt-4" asChild>
                <a href={material.url} target="_blank" rel="noopener noreferrer">
                  Open {material.type}
                </a>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}