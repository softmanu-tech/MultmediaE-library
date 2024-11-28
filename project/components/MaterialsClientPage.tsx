"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MaterialGrid } from "@/components/materials/material-grid";
import { MaterialFilters } from "@/components/materials/material-filters";
import { BookOpen, Video, Headphones, ScrollText } from "lucide-react";

const typeInfo = {
    books: {
        title: "Books",
        icon: BookOpen,
        description: "Explore our collection of digital books",
    },
    videos: {
        title: "Videos",
        icon: Video,
        description: "Watch educational videos and tutorials",
    },
    audio: {
        title: "Audio",
        icon: Headphones,
        description: "Listen to audiobooks and podcasts",
    },
    journals: {
        title: "Journals",
        icon: ScrollText,
        description: "Access academic journals and research papers",
    },
};

interface MaterialsClientPageProps {
    type: string;
}

export default function MaterialsClientPage({ type }: MaterialsClientPageProps) {
    const info = typeInfo[type as keyof typeof typeInfo];
    if (!info) {
        return <div>Invalid material type</div>;
    }

    const Icon = info.icon;

    // Fetch materials based on the type
    const materials = useQuery(api.materials.getMaterials, {
        type: type.slice(0, -1), // Adjust the type for your query
    });

    if (!materials) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center space-x-4">
                <Icon className="h-8 w-8" />
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{info.title}</h1>
                    <p className="text-muted-foreground">{info.description}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters */}
                <MaterialFilters />

                {/* Material Grid */}
                <div className="lg:col-span-3">
                    <MaterialGrid materials={materials} />
                </div>
            </div>
        </div>
    );
}
