"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { MaterialCard } from "@/components/materials/material-card";
import { Input } from "@/components/ui/input";

const TEMP_USER_ID = "user123";

interface AddToCollectionProps {
  collectionId: string;
}

export function AddToCollection({ collectionId }: AddToCollectionProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  const materials = useQuery(api.materials.getMaterials);
  const addToCollection = useMutation(api.collections.addToCollection);
  const collection = useQuery(api.collections.getCollection, { id: collectionId });

  const filteredMaterials = materials?.filter(material => 
    !collection?.materials.some(m => m._id === material._id) &&
    (material.title.toLowerCase().includes(search.toLowerCase()) ||
     material.author.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAdd = async (materialId: string) => {
    try {
      await addToCollection({ collectionId, materialId });
      toast.success("Material added to collection");
    } catch (error) {
      toast.error("Failed to add material");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Materials
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Materials to Collection</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaterials?.map((material) => (
              <div key={material._id} className="relative">
                <MaterialCard material={material} />
                <Button
                  className="absolute top-2 right-2"
                  size="sm"
                  onClick={() => handleAdd(material._id)}
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}