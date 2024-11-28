"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CollectionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  materialType: string;
  onTypeChange: (value: string) => void;
}

export function CollectionFilters({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  materialType,
  onTypeChange,
}: CollectionFiltersProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <Input
          placeholder="Search materials..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="date">Date Added</SelectItem>
          </SelectContent>
        </Select>

        <Select value={materialType} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Material type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="book">Books</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="journal">Journals</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}