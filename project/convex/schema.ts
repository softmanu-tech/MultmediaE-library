import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  materials: defineTable({
    title: v.string(),
    type: v.string(), // 'book' | 'video' | 'audio' | 'journal'
    description: v.string(),
    fileUrl: v.string(),
    thumbnailUrl: v.string(),
    author: v.string(),
    publishDate: v.string(),
    duration: v.optional(v.number()),
    category: v.string(),
  }),

  collections: defineTable({
    name: v.string(),
    description: v.string(),
    userId: v.string(),
    materials: v.array(v.id("materials")),
    shareId: v.optional(v.string()),
  }),

  favorites: defineTable({
    userId: v.string(),
    materialId: v.id("materials"),
    addedAt: v.string(),
  }),

  progress: defineTable({
    userId: v.string(),
    materialId: v.id("materials"),
    progress: v.number(),
    lastAccessed: v.string(),
  }),
});