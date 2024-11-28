"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MaterialCard } from "../materials/material-card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { GripVertical, Trash2 } from "lucide-react";

interface SortableMaterialCardProps {
  material: any;
  onRemove: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function SortableMaterialCard({
  material,
  onRemove,
  isSelected,
  onSelect,
}: SortableMaterialCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: material._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group touch-none"
    >
      <div className="absolute left-2 top-2 z-10 flex items-center space-x-2">
        <div {...attributes} {...listeners}>
          <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
        </div>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(material._id)}
        />
      </div>
      <MaterialCard material={material} />
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(material._id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}