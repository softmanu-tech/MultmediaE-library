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
import { Input } from "@/components/ui/input";
import { Share2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface ShareCollectionProps {
  collectionId: string;
  shareUrl?: string;
}

export function ShareCollection({ collectionId, shareUrl }: ShareCollectionProps) {
  const [open, setOpen] = useState(false);
  const generateShareLink = useMutation(api.collections.generateShareLink);

  const handleShare = async () => {
    try {
      const url = await generateShareLink({ collectionId });
      await navigator.clipboard.writeText(url);
      toast.success("Share link copied to clipboard");
    } catch (error) {
      toast.error("Failed to generate share link");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Collection</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              readOnly
              value={shareUrl || "Generating share link..."}
              className="flex-1"
            />
            <Button onClick={handleShare}>
              {shareUrl ? "Copy" : "Generate"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Anyone with this link can view this collection
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}