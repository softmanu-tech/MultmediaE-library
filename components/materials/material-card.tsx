"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, Headphones, ScrollText } from "lucide-react";

const materialIcons = {
  book: BookOpen,
  video: Video,
  audio: Headphones,
  journal: ScrollText,
};

interface MaterialCardProps {
  material: {
    _id: string;
    title: string;
    description: string;
    type: keyof typeof materialIcons;
    author: string;
    publishedDate: string;
    thumbnail?: string;
  };
}

export function MaterialCard({ material }: MaterialCardProps) {
  const Icon = materialIcons[material.type];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5" />
          <CardTitle className="text-lg">{material.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {material.thumbnail && (
          <div className="aspect-video mb-4">
            <img
              src={material.thumbnail}
              alt={material.title}
              className="rounded-md object-cover w-full h-full"
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground">{material.description}</p>
        <div className="mt-4 text-sm">
          <p>Author: {material.author}</p>
          <p>Published: {new Date(material.publishedDate).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}