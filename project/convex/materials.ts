import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Query to get materials
export const getMaterials = query({
  args: {
    type: v.optional(v.string()),
    category: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let materialsQuery = ctx.db.query("materials");

    if (args.type) {
      materialsQuery = materialsQuery.filter((q) =>
          q.eq(q.field("type"), args.type)
      );
    }

    if (args.category) {
      materialsQuery = materialsQuery.filter((q) =>
          q.eq(q.field("category"), args.category)
      );
    }

    if (args.search) {
      materialsQuery = materialsQuery.filter((q) =>
          q.or(
              q.eq(q.field("title"), args.search),
              q.eq(q.field("author"), args.search),
              q.eq(q.field("description"), args.search)
          )
      );
    }

    return await materialsQuery.collect();
  },
});

// Mutation to upload materials
export const uploadMaterials = mutation({
  args: {
    materials: v.array(
        v.object({
          title: v.string(),
          type: v.string(),
          description: v.string(),
          fileUrl: v.string(),
          thumbnailUrl: v.string(),
          author: v.string(),
          publishDate: v.string(),
          duration: v.optional(v.number()),
          category: v.string(),
        })
    ),
  },
  handler: async (ctx, args) => {
    // Insert each material into the database
    const uploadedMaterials = await Promise.all(
        args.materials.map((material) =>
            ctx.db.insert("materials", material)
        )
    );
    return uploadedMaterials;
  },
});

// Mutation to delete a material
export const deleteMaterial = mutation({
  args: { id: v.id("materials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
