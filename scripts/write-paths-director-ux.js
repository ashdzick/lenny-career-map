"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};
const paths = {};

// ─── Director of UX → Director of Product ────────────────────────────────────
paths["Director of UX|||Director of Product"] = {
  from: "Director of UX", to: "Director of Product",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a repositioning at the same organizational level, not a step up or down. You already have the org leadership, executive presence, and cross-functional authority that take most PMs years to develop. What changes is what you're accountable for: as a Director of UX, you're measured on design quality and user experience coherence; as a Director of Product, you're measured on business outcomes — revenue, retention, activation, engagement. That accountability shift is the whole transition. The craft gap is real but closeable in 6–12 months. The identity gap — from advocate for users to owner of business results — is the harder and more important one to close. [Product management career ladders] shows Director of Product Management typically at L8, the same organizational weight as a Director of UX. You're not starting over. You're translating.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is business accountability. [What is product management] defines the Director of Product's job as delivering business impact by marshaling the resources of their teams. UX Directors deliver experience quality. The difference is not philosophical — it's what you're graded on in your performance review, what you defend in quarterly business reviews, and what your teams optimize for. [Getting better at product strategy] describes the strategy artifact that Directors own: a coherent plan with 3–5 concrete investments that, executed well, move the product toward winning. You will have opinions about what that plan should be — your user insight is an asset. The gap is in formally owning and defending it.",
    "",
    "The second gap is product roadmap authority. As a Director of UX, you shape the product by influencing design decisions and pushing back on product direction. As a Director of Product, you set the direction. [The PM 🤝 Design Partnership] describes this from the other side: the PM as conductor, holding the creative vision while moving the product forward. You've been in the orchestra. Moving to conductor requires being willing to make calls that designers will push back on — the same pushback you've delivered from the other side.",
    "",
    "Third: PM-specific tooling and process fluency. [Prioritizing] covers the core discipline: a single ranked list, T-shirt sizing by impact and effort, sorted by ratio. [Mission → Vision → Strategy → Goals → Roadmap → Task] describes the full strategic chain Directors manage. These are learnable frameworks, not innate abilities — and your existing strategic experience means you'll internalize them faster than someone coming from an IC PM role. The gap is practice, not aptitude.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy ownership**: [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] provides the most practical framework for crafting and presenting product strategy at director scope. Chandra's approach — 3–5 concrete strategic investments sitting between mission/vision and the plan — is exactly what you'll need to produce and defend as a Director of Product. Your UX background gives you unusually strong customer insight to fuel this; the development area is translating that insight into a strategy that engineering and business stakeholders can execute against.",
    "",
    "- **Managing PMs vs. managing designers**: [Moving from IC product manager to manager of product managers] describes the PM manager's five unexpected jobs: stopping bad decisions before they happen, unblocking teams, maintaining the PM quality bar, maintaining the product quality bar, and building a united leadership group. You already do versions of four of these. The new one is maintaining the PM quality bar — coaching people whose work is harder to evaluate than design output, whose decisions are less visually legible, and whose success is measured in business metrics you share accountability for.",
    "",
    "- **Prioritization at product scope**: [Prioritizing] and [Prioritizing conversion opportunities] cover the PM's core daily discipline. The prioritization you've done as a UX Director — which design investments to make, which experience problems to solve — is good preparation. The extension is prioritizing across engineering capacity, business goals, and user needs simultaneously, and communicating those tradeoffs to a broader set of stakeholders than a design org typically involves.",
    "",
    "- **Business metrics fluency**: [What is product management] is worth reading with fresh eyes. The attributes [Product management career ladders] shows matter most at Director level — leadership, impact, scope, execution — are ones you've developed. The one most UX Directors need to build deliberately is impact measured in business terms: revenue per user, activation rates, retention curves. Developing genuine fluency here means owning a metric, running experiments against it, and being accountable when it moves in the wrong direction.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"user advocate\" → \"decision owner\"**: Directors of UX are trained to push back when product or business pressures compromise the user experience. That instinct is valuable and you should keep it. What changes is that you now also make the calls you used to push back on. [What is product management] describes the PM's core tension: business impact comes from solving customer problems, but not every customer problem is worth solving at this moment. You will sometimes decide against a UX improvement because the business priority is elsewhere — and you will need to own that decision, not just deliver it.",
    "",
    "**From \"influencing product\" → \"owning product\"**: As a Director of UX, your authority was over design. Product direction was adjacent to your authority — you shaped it through collaboration and advocacy. As a Director of Product, [Mission → Vision → Strategy → Goals → Roadmap → Task] shows that you own the strategy layer, the goals, and the roadmap. That ownership is heavier than influence. It means being accountable when the product underperforms — not just when the experience is poor.",
    "",
    "**From \"quality bar\" → \"business bar\"**: Directors of UX hold a quality bar for user experience. Directors of Product hold a quality bar for outcomes. [Moving from IC product manager to manager of product managers] describes preserving and improving the product quality bar as one of the most important PM manager jobs. As a Director of Product, that bar extends from experience quality to business impact — and you'll need to develop a clear internal standard for what \"good\" means in both dimensions simultaneously.",
  ].join("\n")
};

// ─── Director of UX → Principal PM ───────────────────────────────────────────
paths["Director of UX|||Principal PM"] = {
  from: "Director of UX", to: "Principal PM",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Principal PM is a deliberate choice to stay on the individual contributor track rather than the management track — and at a well-leveled company, it's not a step down. [Product management career ladders] shows the IC sequence: Associate PM → PM → Senior PM → Principal PM (L7). The management track forks at the same level: Group PM → Director → Senior Director → VP. Principal PM sits at the same organizational weight as Group PM or a junior Director. For a Director of UX, this is a lateral repositioning: you're trading organizational authority over a design function for deep individual influence over product direction across multiple teams. The appeal is focus — no headcount management, no performance reviews, no org design. Just product thinking at its highest individual level.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is product ownership without organizational authority. As a Director of UX, your influence came partly from your title and your team — you had designers executing on your direction. Principal PMs influence through expertise and persuasion. [What is product management] defines the PM's job as marshaling resources without direct authority — this is the core PM skill, and it's one you'll be developing from scratch in a formal sense even if you've done it informally. [Moving from IC product manager to manager of product managers] describes what leverage looks like when it runs through people you manage; Principal PM leverage runs through ideas and trust instead.",
    "",
    "The second gap is business-metric accountability. [What is product management] is direct: the PM's output is business impact. Principal PMs own metrics — activation rates, retention curves, revenue contribution from a product area — and are accountable when those metrics move in the wrong direction. UX Directors are accountable for experience quality and design execution, which is a related but distinct accountability. The hardest version of this shift is accepting that a beautiful, well-researched product decision that doesn't move the business metric is a miss.",
    "",
    "Third: the formal PM toolkit. [Prioritizing] covers the prioritization discipline that PMs apply daily. [Mission → Vision → Strategy → Goals → Roadmap → Task] describes the strategic chain Principal PMs contribute to at the strategy and goals level. [Product management career ladders] shows that at the Principal level, the top attributes are leadership, impact, scope, and strategy — all of which you've developed. The gap is the specific PM practice: writing product specs, running discovery, owning a roadmap, presenting at quarterly business reviews. These are learnable skills, not innate ones, and your strategic and user-research depth means you'll develop them faster than someone entering PM from an earlier career stage.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy at IC scope**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover what Principal PMs are expected to own. At this level, you're not just reacting to strategy — you're shaping it for your product area, identifying the 3–5 investments that matter, and defending that plan to Director and VP-level stakeholders. Your UX background gives you unusually strong user-signal input for this. The development area is translating that input into a business-grounded strategic recommendation.",
    "",
    "- **Prioritization as a daily practice**: [Prioritizing] is the most fundamental piece for this transition. Principal PMs are expected to maintain a single ranked list of their team's opportunities, size them by impact and effort, and communicate the reasoning to stakeholders who will push back. [Prioritizing conversion opportunities] covers the specific discipline of choosing between growth levers — a domain where your design background (understanding what creates friction and motivation for users) is directly applicable.",
    "",
    "- **The full PM role at senior scope**: [Becoming a senior Product Manager] describes what separates senior PMs from ICs at earlier levels: strategy, autonomy, and nuance. The example is instructive — a senior PM discovers a market opportunity during customer conversations and builds the strategic case before anyone else sees it. This proactive, strategic posture is exactly what Principal PM demands. Your experience conducting design research and synthesizing user signals is strong preparation for the discovery component; the gap is in building and communicating the business case.",
    "",
    "- **Influencing without authority**: [What is product management] frames this as the core PM skill — marshaling resources you don't control. As a Director of UX you had a team; as a Principal PM you have expertise and relationships. [The PM 🤝 Design Partnership] describes what good PM-design collaboration looks like from the design side — you've lived that side. Reading it as a PM is useful for understanding what your former counterparts need from you in your new role: clear direction, early inclusion, and respect for design expertise.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"organizational authority\" → \"earned influence\"**: Director of UX authority comes partly from title and headcount. Principal PM influence comes entirely from being right, being trusted, and being useful to the teams around you. This is a harder kind of leverage to build and easier to lose. [What is product management] describes PMs as the \"ultimate business lever\" — but only if they've earned the credibility to pull it. Your prior director experience means you understand organizational dynamics; the adjustment is operating without the structural support of a team behind you.",
    "",
    "**From \"experience quality\" → \"business outcomes\"**: [Product management career ladders] shows impact as the second-most important attribute at senior PM levels, measured in business terms. The shift from UX Director to Principal PM is largely a shift in what you optimize for: from experience coherence and design quality to activation rates, retention, and revenue contribution. Your UX instincts remain an asset — products with poor UX rarely hit their business metrics — but they become inputs to a business decision rather than the decision itself.",
    "",
    "**From \"managing up through a team\" → \"managing across through ideas\"**: Directors of UX amplify their influence through their team. Principal PMs amplify their influence through the quality of their thinking. [Becoming a senior Product Manager] describes senior PMs who do their most important work invisibly — discovering opportunities, building strategic cases, aligning stakeholders — before any spec is written. That invisible upstream work is where Principal PMs live. Your experience making the case for design investments to skeptical product and engineering stakeholders is exactly the preparation for this — the subject matter changes, but the skill of persuasion under uncertainty is the same.",
  ].join("\n")
};

const updated = { ...existing, ...paths };
fs.writeFileSync(outPath, JSON.stringify(updated, null, 2));
console.log("Wrote " + Object.keys(paths).length + " paths. Total: " + Object.keys(updated).length);
