import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Guard: fail the production build early if paths haven't been generated.
if (process.env.NODE_ENV === "production") {
  const pathsFile = path.join(__dirname, "data", "paths.json");
  if (!fs.existsSync(pathsFile)) {
    throw new Error(
      "data/paths.json not found. Commit the generated paths file before deploying."
    );
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure all data files are bundled into the serverless function
    outputFileTracingIncludes: {
      "/": [
        "./data/paths.json",
        "./data/citation-urls.json",
        "./data/market-signals.json",
        "./data/podcast-recs.json",
      ],
    },
  },
};

export default nextConfig;
