import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getProgress = query({
  args: {
    userId: v.string(),
    materialId: v.optional(v.id("materials")),
  },
  handler: async (ctx, args) => {
    let progressQuery = ctx.db
      .query("progress")
      .filter((q) => q.eq(q.field("userId"), args.userId));

    if (args.materialId) {
      progressQuery = progressQuery.filter((q) =>
        q.eq(q.field("materialId"), args.materialId)
      );
    }

    return await progressQuery.collect();
  },
});

export const updateProgress = mutation({
  args: {
    userId: v.string(),
    materialId: v.id("materials"),
    progress: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("progress")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("materialId"), args.materialId)
        )
      )
      .first();

    if (existing) {
      return await ctx.db.patch(existing._id, {
        progress: args.progress,
        lastAccessed: new Date().toISOString(),
      });
    } else {
      return await ctx.db.insert("progress", {
        userId: args.userId,
        materialId: args.materialId,
        progress: args.progress,
        lastAccessed: new Date().toISOString(),
      });
    }
  },
});