"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export function MaterialFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium">Sort By</Label>
          <RadioGroup defaultValue="recent" className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recent" id="recent" />
              <Label htmlFor="recent">Most Recent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="title" id="title" />
              <Label htmlFor="title">Title</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="author" id="author" />
              <Label htmlFor="author">Author</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium">Categories</Label>
          <RadioGroup defaultValue="all" className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Categories</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fiction" id="fiction" />
              <Label htmlFor="fiction">Fiction</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non-fiction" id="non-fiction" />
              <Label htmlFor="non-fiction">Non-Fiction</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="educational" id="educational" />
              <Label htmlFor="educational">Educational</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}