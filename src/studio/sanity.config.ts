import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/schemaTypes";

export default defineConfig({
  name: "second-brain-studio",
  title: "Second Brain Studio",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "development",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
