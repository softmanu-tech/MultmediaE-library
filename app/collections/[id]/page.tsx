"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AddToCollection } from "@/components/collections/add-to-collection";
import { CollectionFilters } from "@/components/collections/collection-filters";
import { SortableMaterialCard } from "@/components/collections/sortable-material-card";
import { BatchActions } from "@/components/collections/batch-actions";
import { ShareCollection } from "@/components/collections/share-collection";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

export default function CollectionPage() {
  const params = useParams();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [materialType, setMaterialType] = useState("all");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const collection = useQuery(api.collections.getCollection, {
    id: params.id as string,
  });
  const removeFromCollection = useMutation(api.collections.removeFromCollection);
  const reorderMaterials = useMutation(api.collections.reorderMaterials);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!collection) {
    return <div>Loading...</div>;
  }

  const filteredMaterials = collection.materials
    .filter((material) => {
      const matchesSearch = 
        material.title.toLowerCase().includes(search.toLowerCase()) ||
        material.author.toLowerCase().includes(search.toLowerCase());
      const matchesType = materialType === "all" || material.type === materialType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "date":
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        default:
          return 0;
      }
    });

  const handleRemove = async (materialId: string) => {
    try {
      await removeFromCollection({
        collectionId: params.id as string,
        materialId,
      });
      toast.success("Material removed from collection");
    } catch (error) {
      toast.error("Failed to remove material");
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = filteredMaterials.findIndex((m) => m._id === active.id);
      const newIndex = filteredMaterials.findIndex((m) => m._id === over.id);
      const newOrder = arrayMove(filteredMaterials, oldIndex, newIndex);
      
      try {
        await reorderMaterials({
          collectionId: params.id as string,
          materialIds: newOrder.map((m) => m._id),
        });
      } catch (error) {
        toast.error("Failed to reorder materials");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{collection.name}</h1>
          <p className="text-muted-foreground">{collection.description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <ShareCollection collectionId={params.id as string} />
          <AddToCollection collectionId={params.id as string} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CollectionFilters
            search={search}
            onSearchChange={setSearch}
            sortBy={sortBy}
            onSortChange={setSortBy}
            materialType={materialType}
            onTypeChange={setMaterialType}
          />
        </div>

        <div className="lg:col-span-3 space-y-4">
          <BatchActions
            collectionId={params.id as string}
            selectedMaterials={selectedMaterials}
            onSelectionChange={setSelectedMaterials}
            materials={filteredMaterials}
          />

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredMaterials.map((m) => m._id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMaterials.map((material) => (
                  <SortableMaterialCard
                    key={material._id}
                    material={material}
                    onRemove={handleRemove}
                    isSelected={selectedMaterials.includes(material._id)}
                    onSelect={(id) => {
                      setSelectedMaterials((prev) =>
                        prev.includes(id)
                          ? prev.filter((m) => m !== id)
                          : [...prev, id]
                      );
                    }}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}