import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Guard: fail the production build early if paths haven't been generated.
if (process.env.NODE_ENV === "production") {
  const pathsFile = path.join(process.cwd(), "data", "paths.json");
  if (!fs.existsSync(pathsFile)) {
    throw new Error(
      "data/paths.json not found. Commit the generated paths file before deploying."
    );
  }
}

const nextConfig: NextConfig = {
  experimental: {
    // Ensure all data files are bundled into the serverless function
    outputFileTracingIncludes: {
      "/": [
        "./data/paths.json",
        "./data/citation-urls.json",
        "./data/market-signals.json",
      ],
    },
  },
};

export default nextConfig;
