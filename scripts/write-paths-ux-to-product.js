"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};

const md = [
  "## Career Transition Overview",
  "",
  "Transitioning from Director of UX to Director of Product is lateral in seniority but a significant expansion in accountability. You already lead a cross-functional practice, run a team, and influence roadmaps. The shift is from influencing product decisions as the design authority to owning product outcomes as the business authority.",
  "",
  "Expect 12–18 months to feel genuinely fluent in the new accountability structure, particularly around business metrics ownership and stakeholder trade-offs that fall outside the experience lens. This transition most often happens internally — design leaders who have been strong product partners get offered the role. External moves are harder because product orgs need to see evidence of outcome ownership, not just design influence.",
  "",
  "## Gaps to Close",
  "",
  "The most significant gap is business impact ownership. As defined in [What is product management], the PM's job is to deliver business impact by marshaling the resources of your team to identify and solve the most impactful customer problems. Design directors are accountable for quality. Product directors are accountable for results. This is not a semantic difference — it changes what you measure, what you escalate, and what counts as a successful quarter.",
  "",
  "The second gap is strategic scope. Design leaders develop UX strategy — how to create excellent, coherent experiences across a surface. Product directors own product strategy, which is different in kind. [Getting better at product strategy] illustrates this directly: Lenny's team at Airbnb spent months optimizing the booking acceptance flow — adjusting reminders, incentivizing hosts, reducing friction — before stepping back and realizing the model itself was wrong. The insight that the entire experience should be instant was not a UX insight. It was a market and model insight. Directors of Product need to develop the habit of questioning the model, not just improving execution of it.",
  "",
  "The third gap is roadmap authority. Design directors influence the roadmap from the user-needs side; product directors own it. [Mission → Vision → Strategy → Goals → Roadmap → Task] makes clear that every item on the roadmap must be traceable back through goals to strategy to vision. When you're the design voice in the room, you can advocate for users and defer on business trade-offs. As Director of Product, you're the one making those trade-offs visible and defensible to leadership — there is no one else to defer to.",
  "",
  "## Skills to Build",
  "",
  "- **Product strategy development**: [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] is the most actionable framework in the corpus for this skill. Chandra built and applied Strategy Blocks across Headspace, Meta, and VRChat — including using it to align senior leaders on complex decisions about Facebook's digital well-being tools, privacy protections for youth, and Quest referrals. The core insight: most teams fail not because they lack a strategy but because they haven't achieved alignment on one. UX directors are skilled at alignment within design and with product partners. Directors of Product need to command alignment at the executive level across engineering, marketing, sales, and finance simultaneously.",
  "",
  "- **Prioritization as a business decision**: [Prioritizing] describes the core PM discipline as making a single list of all team ideas, sizing each on impact vs. cost, sorting by ratio, and accepting that there is no formula that removes human judgment. For a design director, prioritization typically lives in the user-needs space. As a Director of Product, you're prioritizing across the full business surface — engineering cost, revenue impact, retention, strategic positioning — and you must make those calls in public, under pressure, with incomplete data and competing stakeholder views.",
  "",
  "- **Managing a PM team**: [Moving from IC product manager to manager of product managers] describes what leading a PM org actually requires: stopping bad decisions before they compound, unblocking teams at every level, maintaining the quality bar, and building a unified leadership group. The UX director already does this within design. The shift is that PMs are harder to evaluate than designers — their output is less visible, their accountability is more diffuse, and the role is inherently ambiguous across companies. Developing a clear internal model for what good PM work looks like at your specific company is a prerequisite for managing a PM team well.",
  "",
  "- **Roadmap idea generation**: [Where Great Product Roadmap Ideas Come From] shows that the best product directors cultivate multiple input streams simultaneously: talking directly to customers, sitting with customer-facing teams (sales, support, marketing), observing behavioral data, using the product themselves, and working backwards from a long-term vision. Design directors have strong instincts on qual research and observation; the gaps are typically in data-driven insight, sales-channel feedback, and competitive/adjacent-market scanning.",
  "",
  "## Mindset Shifts",
  "",
  "**From \"user needs\" → \"customer problems that create business impact\"**: Design directors are trained to center the user. Product directors must center the most impactful customer problems — which is related but not identical. As [What is product management] frames it, business impact comes from identifying and solving the *most impactful* customer problems, which requires constant trade-offs between what users want, what creates revenue, and what's strategically defensible. You don't abandon user-centricity; you subordinate it to a larger accountability for outcomes.",
  "",
  "**From \"influence\" → \"owned accountability\"**: Design directors are highly influential but rarely solely accountable for business results. Product directors are. The career ladder research in [Product management career ladders] shows that Directors of Product are evaluated primarily on Impact and Scope — the measurable business results their teams produce, and the breadth of the organization they can lead and align. This is a different identity than the design director's role as quality and experience authority. The shift is uncomfortable: user research quality and design system coherence are no longer your success metrics.",
  "",
  "**From \"roadmap contributor\" → \"roadmap owner\"**: A design director who has been a strong product partner often believes they already own the roadmap in practice. The formal title change reveals how much was still implicitly shared or deferred. [Mission → Vision → Strategy → Goals → Roadmap → Task] shows that real roadmap ownership means being able to trace every item back through goals to strategy to vision to mission — and defend that entire chain in front of a skeptical leadership team with competing priorities. This requires a different quality of strategic conviction than design leadership typically demands.",
].join("\n");

existing["Director of UX|||Director of Product"] = {
  from: "Director of UX",
  to: "Director of Product",
  generatedAt: new Date().toISOString(),
  markdown: md,
};

fs.writeFileSync(outPath, JSON.stringify(existing, null, 2));
console.log("Done. Total paths:", Object.keys(existing).length);
