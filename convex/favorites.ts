import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getFavorites = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const favorites = await ctx.db
      .query("favorites")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    const materialIds = favorites.map((f) => f.materialId);
    const materials = await Promise.all(
      materialIds.map((id) => ctx.db.get(id))
    );

    return materials.filter(Boolean);
  },
});

export const toggleFavorite = mutation({
  args: {
    userId: v.string(),
    materialId: v.id("materials"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("favorites")
      .filter((q) => 
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("materialId"), args.materialId)
        )
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    } else {
      await ctx.db.insert("favorites", {
        userId: args.userId,
        materialId: args.materialId,
        addedAt: new Date().toISOString(),
      });
      return true;
    }
  },
});