"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface BatchActionsProps {
  collectionId: string;
  selectedMaterials: string[];
  onSelectionChange: (selected: string[]) => void;
  materials: any[];
}

export function BatchActions({
  collectionId,
  selectedMaterials,
  onSelectionChange,
  materials,
}: BatchActionsProps) {
  const removeFromCollection = useMutation(api.collections.removeFromCollection);

  const handleSelectAll = () => {
    if (selectedMaterials.length === materials.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(materials.map((m) => m._id));
    }
  };

  const handleBatchRemove = async () => {
    try {
      await Promise.all(
        selectedMaterials.map((materialId) =>
          removeFromCollection({ collectionId, materialId })
        )
      );
      onSelectionChange([]);
      toast.success(`${selectedMaterials.length} materials removed`);
    } catch (error) {
      toast.error("Failed to remove materials");
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={selectedMaterials.length === materials.length}
          onCheckedChange={handleSelectAll}
        />
        <span className="text-sm text-muted-foreground">
          {selectedMaterials.length} selected
        </span>
      </div>
      {selectedMaterials.length > 0 && (
        <Button
          variant="destructive"
          size="sm"
          onClick={handleBatchRemove}
          className="flex items-center space-x-2"
        >
          <Trash2 className="h-4 w-4" />
          <span>Remove Selected</span>
        </Button>
      )}
    </div>
  );
}