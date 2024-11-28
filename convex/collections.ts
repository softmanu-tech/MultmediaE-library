import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCollections = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("collections")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const getCollection = query({
  args: { id: v.id("collections") },
  handler: async (ctx, args) => {
    const collection = await ctx.db.get(args.id);
    if (!collection) return null;

    const materials = await Promise.all(
      collection.materials.map((id) => ctx.db.get(id))
    );
    return { ...collection, materials: materials.filter(Boolean) };
  },
});

export const createCollection = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("collections", {
      ...args,
      materials: [],
      shareId: undefined,
    });
  },
});

export const deleteCollection = mutation({
  args: { id: v.id("collections") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const addToCollection = mutation({
  args: {
    collectionId: v.id("collections"),
    materialId: v.id("materials"),
  },
  handler: async (ctx, args) => {
    const collection = await ctx.db.get(args.collectionId);
    if (!collection) throw new Error("Collection not found");

    const materials = [...collection.materials, args.materialId];
    await ctx.db.patch(args.collectionId, { materials });
  },
});

export const removeFromCollection = mutation({
  args: {
    collectionId: v.id("collections"),
    materialId: v.id("materials"),
  },
  handler: async (ctx, args) => {
    const collection = await ctx.db.get(args.collectionId);
    if (!collection) throw new Error("Collection not found");

    const materials = collection.materials.filter(
      (id) => id !== args.materialId
    );
    await ctx.db.patch(args.collectionId, { materials });
  },
});

export const reorderMaterials = mutation({
  args: {
    collectionId: v.id("collections"),
    materialIds: v.array(v.id("materials")),
  },
  handler: async (ctx, args) => {
    const collection = await ctx.db.get(args.collectionId);
    if (!collection) throw new Error("Collection not found");

    await ctx.db.patch(args.collectionId, { materials: args.materialIds });
  },
});

export const generateShareLink = mutation({
  args: {
    collectionId: v.id("collections"),
  },
  handler: async (ctx, args) => {
    const collection = await ctx.db.get(args.collectionId);
    if (!collection) throw new Error("Collection not found");

    const shareId = Math.random().toString(36).substring(2, 15);
    await ctx.db.patch(args.collectionId, { shareId });

    return `${process.env.NEXT_PUBLIC_SITE_URL}/shared/${shareId}`;
  },
});