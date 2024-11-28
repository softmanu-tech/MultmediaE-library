import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api"; // Make sure this import is correct
import materials from "./sample-materials.json"; // Ensure this file contains the correct format

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function uploadMaterials() {
  // Check if materials are provided
  if (!materials || materials.length === 0) {
    console.error("No materials to upload.");
    return;
  }

  try {
    // Ensure materials is an array of the correct type
    const result = await convex.mutation(api.materials.uploadMaterials, {
      materials: materials, // Pass the array directly
    });
    console.log("Materials uploaded successfully:", result);
  } catch (error) {
    console.error("Failed to upload materials:", error);
  }
}

// Call the upload function
uploadMaterials();
