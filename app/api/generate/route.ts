// This route is no longer used.
// Career transition paths are pre-generated at build time via:
//   node scripts/generate-paths.js
// and served as static data from data/paths.json.

export function GET() {
  return new Response(
    JSON.stringify({ message: "Paths are served statically. See data/paths.json." }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
