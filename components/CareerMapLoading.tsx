/**
 * Suspense fallback: inline styles only so first paint looks correct even if
 * the Tailwind bundle is late or hydration is delayed (see BAILOUT_TO_CLIENT_SIDE_RENDERING).
 */
export default function CareerMapLoading() {
  return (
    <main style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", color: "#3d1f0a" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "#c96a28",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "0.75rem",
          }}
        >
          Lenny&apos;s Podcast
        </p>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
          Career Transition Map
        </h1>
        <p style={{ marginTop: "0.75rem", color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.55, maxWidth: "38rem" }}>
          Choose your current and target role. Every insight is grounded in Lenny&apos;s podcast
          interviews — no fabricated advice.
        </p>
      </header>
      <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Loading map…</p>
    </main>
  );
}
