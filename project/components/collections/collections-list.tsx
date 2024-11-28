"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import Link from "next/link";

// TODO: Replace with actual user ID from authentication
const TEMP_USER_ID = "user123";

export function Collections() {
  const collections = useQuery(api.collections.getCollections, {
    userId: TEMP_USER_ID,
  });

  if (!collections) {
    return <div>Loading...</div>;
  }

  if (collections.length === 0) {
    return (
      <div className="text-center py-12">
        <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-lg font-semibold">No collections yet</h2>
        <p className="text-muted-foreground">
          Create a collection to organize your library materials
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((collection) => (
        <Link key={collection._id} href={`/collections/${collection._id}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>{collection.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{collection.description}</p>
              <p className="text-sm mt-2">
                {collection.materials.length} items
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}