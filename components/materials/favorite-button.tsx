"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { cn } from "@/lib/utils";

// TODO: Replace with actual user ID from authentication
const TEMP_USER_ID = "user123";

export function FavoriteButton({ materialId }: { materialId: string }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = useMutation(api.favorites.toggleFavorite);

  const handleToggle = async () => {
    const result = await toggleFavorite({
      userId: TEMP_USER_ID,
      materialId,
    });
    setIsFavorite(result);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={cn(
        "rounded-full",
        isFavorite && "text-red-500 hover:text-red-600"
      )}
    >
      <Heart className="h-5 w-5" />
    </Button>
  );
}