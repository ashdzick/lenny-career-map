// Batch E: Product Designer×3, PM→AI PM, PM→CPO, PM→EM
// Sources read from: get-chunks.js output for each pair
const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/paths.json");
const paths = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

function set(from, to, lines) {
  const key = `${from}|||${to}`;
  if (!paths[key]) {
    console.warn(`Key not found: ${key}`);
    return;
  }
  paths[key].content = lines.join("\n");
  paths[key].generatedAt = "2026-03-29";
}

// ─── Product Designer → AI Product Manager ────────────────────────────────
set("Product Designer", "AI PM", [
  "## Career Transition Overview",
  "",
  "Product designers enter AI PM work with genuine advantages: systems thinking, deep user empathy, and a well-trained eye for quality. These matter a lot when AI outputs are inherently variable. The gaps are on the business/data side and specifically around AI evaluation — understanding how to measure whether a model is working well, how to do structured error analysis, and how to manage a product where \"correctness\" is probabilistic rather than binary. Expect 6–12 months of investment in the technical and evaluation dimensions.",
  "",
  "## Gaps to Close",
  "",
  "**AI evaluation and error analysis.** The most common mistake AI product teams make is measuring fashionable metrics (hallucination rates, toxicity scores) that don't correlate with real user problems. Hamel Husain and Shreya Shankar's framework [Building eval systems that improve your AI product] argues that you must first do systematic error analysis — understand *how* your product fails in the wild — before building evaluation metrics. Designers aren't trained for this; it's the biggest new skill to build.",
  "",
  "**Probabilistic product thinking.** Traditional PM and design both assume deterministic outputs — a button either works or it doesn't. AI outputs are probabilistic. Evaluation, product specs, and success metrics all need to change accordingly. The Differentiating your product framework [Differentiating your product] — Michael Porter's \"competing to be unique\" — applies here: AI products that survive are those that build differentiation around specific use-case quality, not raw model capability.",
  "",
  "**Business ownership.** Katie Dill's PM 🤝 Design Partnership [The PM 🤝 Design Partnership] notes that while designers and PMs share the goal of knowing what customers need, \"we often have very different approaches to achieving these goals.\" PMs own business impact; designers own craft quality. Moving to AI PM means owning both.",
  "",
  "## Skills to Build",
  "",
  "- **Evaluation systems**: [Building eval systems that improve your AI product] by Hamel Husain and Shreya Shankar gives the complete playbook — Phase 1 (error analysis grounded in real failures), Phase 2 (building a reliable eval suite), Phase 3 (operationalizing a continuous improvement flywheel). This is the most AI-PM-specific skill to develop.",
  "",
  "- **Product strategy**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy] give the frameworks for product-level strategy work. AI PMs need to make vision-first decisions just like any PM — the Airbnb Instant Book example (\"if you could see it, you could book it\") illustrates the kind of clean product vision that AI products require.",
  "",
  "- **Roadmap ideation**: [Where Great Product Roadmap Ideas Come From] lists 15 sources of great product ideas — most designers already use 3–4 of them (user observation, design review, using the product). AI PMs need to use all 15, especially customer churn analysis and technology shift monitoring.",
  "",
  "- **PM-Design collaboration from the PM side**: [The PM 🤝 Design Partnership] (Katie Dill, Head of Design at Stripe) explains what PMs need to do to make the collaboration work — trust designer expertise, be the conductor, include designers early, invest in north stars. As a designer transitioning to PM, you'll know this instinctively but need to practice it from the other chair.",
  "",
  "## Mindset Shifts",
  "",
  "**From craft quality → output quality at scale**: Design quality is evaluated on individual screens; AI product quality is evaluated across millions of diverse inputs.",
  "",
  "**From deterministic → probabilistic**: Design work has right and wrong answers; AI product work has distributions and error rates.",
  "",
  "**From advocating for users → owning business impact**: Designers are the user's advocate on the team; PMs are accountable for business outcomes. Both matter; now you own both.",
]);

// ─── Product Designer → Product Manager ────────────────────────────────────
set("Product Designer", "Product Manager", [
  "## Career Transition Overview",
  "",
  "Product designers and PMs share more overlap than any other role pair. Katie Dill (Head of Design at Stripe, formerly Lyft and Airbnb) opens her PM 🤝 Design Partnership guide [The PM 🤝 Design Partnership] with this: \"Ask a Product Designer what their job is and what you'll hear is likely very close to what a PM would say: to know what customers need and to deliver it in the form of products that drive the business.\" The transition is about filling in the business, data, and cross-functional gaps — not reinventing yourself.",
  "",
  "## Gaps to Close",
  "",
  "**Business and data ownership.** Designers focus on craft quality; PMs focus on business impact. Lenny's definition [What is product management] — \"deliver business impact by marshaling the resources of your team to identify and solve the most impactful customer problems\" — makes impact primary. Data analysis, goal-setting, and metric ownership are the biggest gaps for designers entering PM.",
  "",
  "**Prioritization across non-design dimensions.** Designers know how to prioritize design quality. PMs prioritize across business impact, engineering cost, and strategic alignment simultaneously. The T-shirt-size impact-vs-cost framework [Prioritizing] is the starting point; the harder part is developing intuition for engineering cost and business impact.",
  "",
  "**Cross-functional leadership.** Designers are key contributors in cross-functional teams; PMs are the de facto leaders. The IC-to-manager transition article [Moving from IC product manager to manager of product managers] describes the leverage model: \"A PM manager's output = the output of their team + the output of neighboring teams.\" PMs must work through others across all disciplines — not just design.",
  "",
  "## Skills to Build",
  "",
  "- **PM-Design partnership from the PM seat**: [The PM 🤝 Design Partnership] (Katie Dill) gives five principles for the collaboration — trust the designer's expertise, be the conductor, include designers early, invest in north stars, create shared goals. You know these instinctively as a designer; learning to *give* them as a PM is the practice.",
  "",
  "- **Product strategy**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy] give the most actionable product strategy frameworks. Design work often follows strategy; PM work sets it.",
  "",
  "- **Roadmap ideation**: [Where Great Product Roadmap Ideas Come From] lists 15 sources of great ideas — designers typically use 4–5 (using the product, user research, design reviews). PMs need all 15, especially customer conversation, churn analysis, and technology shift monitoring.",
  "",
  "- **Mission-to-roadmap hierarchy**: [Mission → Vision → Strategy → Goals → Roadmap → Task] explains how strategy connects to roadmap. Designers work primarily at the roadmap level; PMs need to hold all six levels simultaneously.",
  "",
  "- **Product differentiation**: [Differentiating your product] covers Michael Porter's two paths to winning — operational effectiveness vs. differentiation. PMs define which game their product plays; designers execute it.",
  "",
  "## Mindset Shifts",
  "",
  "**From craft quality → business impact**: Design quality is evaluated on craft; PM success is evaluated on metrics.",
  "",
  "**From advocating for the user → balancing user, business, and engineering**: Designers are the user's champion; PMs are accountable to all three simultaneously.",
  "",
  "**From contributor → conductor**: Katie Dill's \"be the conductor\" principle — PMs don't build the product, they coordinate the team that does.",
]);

// ─── Product Designer → UX Researcher ──────────────────────────────────────
set("Product Designer", "UX Researcher", [
  "## Career Transition Overview",
  "",
  "Product designers already do a great deal of research work — user interviews, usability testing, design critique, and prototyping. The transition to UX Researcher is about deepening and systematizing that work: moving from research as a tool for making design decisions to research as a primary deliverable, with rigor, documentation, and communication to a broader audience. Expect 3–6 months of skill-building around research methodology, participant recruitment, and research communication.",
  "",
  "## Gaps to Close",
  "",
  "**Research methodology rigor.** Designers use research to answer specific design questions; researchers design studies to answer broader product and business questions. The design-PM collaboration framework [The PM 🤝 Design Partnership] (Katie Dill, Stripe Head of Design) highlights that \"including designers early\" means researchers need to define their scope carefully — not just answering tactical design questions but framing research that shapes product strategy.",
  "",
  "**Scope and independence.** Designers conduct research in service of design work; researchers define their own research agenda. This requires learning to scope studies, write research plans, and present findings to stakeholders without a design deliverable as the anchor.",
  "",
  "**Systematic documentation.** Design work produces Figma files and specs; research produces reports, insight repositories, and recommendations. The research communication part — knowing how to write findings that drive decisions rather than files that get read once — is the most important gap to close.",
  "",
  "## Skills to Build",
  "",
  "- **Designing for research, not just for product**: [Where Great Product Roadmap Ideas Come From] lists 15 sources of product ideas, with research feeding 6 of them directly (talking to customers, observing through data and user research, user journey storyboards, spending quality time with prior research). A UX Researcher's job is to make all six of these sources richer and more systematic.",
  "",
  "- **Research as a strategic input**: [What is product management] defines \"marshaling insights from customers\" as the first of a PM's three jobs. Researchers who understand what decisions their work needs to inform — rather than just documenting behavior — create the most valuable output.",
  "",
  "- **PM 🤝 Design collaboration principles**: [The PM 🤝 Design Partnership] (Katie Dill) — particularly \"invest in even the smallest of north stars\" and \"create shared goals\" — applies directly to researcher-designer collaboration. Researchers who align with designers on what questions they're trying to answer together do the most useful work.",
  "",
  "- **Product strategy context**: [Getting better at product strategy] gives an example of how product insights can reframe strategy entirely — Airbnb's insight that the ideal booking experience would be instant reshaped the entire booking roadmap. Researchers who understand this kind of strategic leverage develop better instincts for what questions to ask.",
  "",
  "## Mindset Shifts",
  "",
  "**From research in service of design → research in service of decisions**: Designers use research to improve their work; researchers produce research that shapes what gets built and why.",
  "",
  "**From one-time inquiry → systematic knowledge**: Design research answers today's question; UX research builds a cumulative understanding of the user that the whole team can draw on.",
  "",
  "**From visual output → written insight**: Design work is evaluated visually; research work is evaluated by whether findings are clear, credible, and actionable.",
]);

// ─── Product Manager → AI Product Manager ─────────────────────────────────
set("Product Manager", "AI PM", [
  "## Career Transition Overview",
  "",
  "Product managers moving into AI PM work carry all their existing skills — prioritization, stakeholder alignment, roadmapping, customer understanding — but need to add a new technical and evaluation layer specific to AI products. The biggest difference is that AI products are probabilistic: you can't test whether they \"work\" with a binary yes/no. Quality must be measured, evaluated, and continuously improved. This is a skill set most PMs haven't had to develop. Expect 3–6 months of technical upskilling.",
  "",
  "## Gaps to Close",
  "",
  "**AI evaluation and error analysis.** Hamel Husain and Shreya Shankar's guide to building eval systems [Building eval systems that improve your AI product] identifies the most common failure mode: teams build eval dashboards around fashionable metrics (hallucination, toxicity) that are disconnected from real user problems. The right approach starts with systematic error analysis — understanding *how* your product fails in the wild — before defining what to measure.",
  "",
  "**Probabilistic product thinking.** Traditional PM work assumes deterministic outcomes — you launch a feature, it either works or it doesn't. AI PM work requires thinking in distributions: what percentage of outputs are good enough? What edge cases matter most? How do you define a regression? These questions require different product specs, different success metrics, and different launch criteria.",
  "",
  "**AI-specific differentiation.** [Differentiating your product] covers Michael Porter's two paths to winning — operational effectiveness vs. differentiation. In AI products, \"competing to be unique\" often means being demonstrably better on specific use cases, not across all dimensions. AI PMs who don't define their differentiation clearly end up competing on raw model capability — a race they rarely win.",
  "",
  "## Skills to Build",
  "",
  "- **Evaluation systems**: [Building eval systems that improve your AI product] (Hamel Husain and Shreya Shankar) gives the complete playbook — error analysis first, then build a reliable eval suite, then operationalize a continuous improvement flywheel. This is the most important new skill for AI PMs.",
  "",
  "- **Product strategy for AI products**: [Strategy Blocks: An operator's guide to product strategy] — Chandra Janakiraman's framework — is particularly relevant for AI products where strategy must be explicit about what the AI is and isn't optimized for. The mission→vision→strategy→goals hierarchy helps teams avoid building vague \"AI-powered\" features.",
  "",
  "- **Roadmap ideation with AI in mind**: [Where Great Product Roadmap Ideas Come From] — particularly \"catching technology shifts\" (item 15) — is how AI PMs stay ahead. New model capabilities, emerging benchmark results, and infrastructure changes are all technology shifts that create roadmap opportunities.",
  "",
  "- **Product differentiation**: [Differentiating your product] — the seven ways to differentiate apply to AI products: be cheapest (lowest cost inference), highest quality on specific tasks, most integrated, or most trusted. Knowing which game you're playing informs every product decision.",
  "",
  "## Mindset Shifts",
  "",
  "**From deterministic → probabilistic**: Features either work or they don't; AI outputs have quality distributions that require ongoing measurement.",
  "",
  "**From launch-and-move-on → continuous evaluation**: Traditional PM work ships and moves on; AI PM work requires a continuous evaluation flywheel.",
  "",
  "**From feature roadmap → capability roadmap**: AI products are shaped by model capabilities, not just feature decisions. PMs who understand the model layer make better roadmap decisions.",
]);

// ─── Product Manager → Chief Product Officer ───────────────────────────────
set("Product Manager", "Chief Product Officer", [
  "## Career Transition Overview",
  "",
  "The PM-to-CPO transition is a series of compounding scope expansions: IC PM → PM manager → Director → VP → CPO. Each level requires a different mental model. The most important shift happens somewhere around Director: you stop managing individual PMs and start managing managers, and product strategy becomes your primary job rather than a tool for your team's work. Chandra Janakiraman's Strategy Blocks framework [Strategy Blocks: An operator's guide to product strategy] describes it as \"particularly helpful for chief product officers looking for a comprehensive strategy architecture that balances action and aspiration.\"",
  "",
  "## Gaps to Close",
  "",
  "**IC-to-manager transition at each level.** The IC-to-manager piece [Moving from IC product manager to manager of product managers] describes five things that surprise new PM managers: stopping bad things from happening, unblocking constantly, preserving team quality, preserving product quality, and building a united leadership group. Each of these gets more important — and harder — at CPO level.",
  "",
  "**Strategy as a primary output.** At IC PM level, strategy is a tool you use. At CPO level, strategy is the product you deliver to your team. Lenny's experience at Airbnb [Getting better at product strategy] captures this: the Instant Book strategy didn't just guide one team — it reshaped the entire product. CPOs build strategies that do this across multiple teams and product areas.",
  "",
  "**Leadership scope.** From the PM career ladders survey [Product management career ladders], the most common attributes at VP/CPO level are: leadership, impact, scope, vision, and strategy — in that order. Execution and collaboration, which dominate IC PM evaluations, become table stakes.",
  "",
  "## Skills to Build",
  "",
  "- **Strategy architecture**: [Strategy Blocks: An operator's guide to product strategy] gives a comprehensive framework — mission, vision, strategy, goals, roadmap — that CPOs use to align entire product orgs. Chandra used it at Meta to align Sheryl Sandberg and Chris Cox on privacy protections and digital well-being tools.",
  "",
  "- **Managing managers**: [Moving from IC product manager to manager of product managers] covers the most important IC-to-manager skills — leverage, unblocking, stopping bad decisions, quality bar preservation. At CPO level you do this for PM managers, not individual PMs.",
  "",
  "- **Mission-to-roadmap hierarchy**: [Mission → Vision → Strategy → Goals → Roadmap → Task] — at CPO level you own this entire chain. Getting the mission right unlocks everything below it; a fuzzy mission creates confusion at every level of the product org.",
  "",
  "- **Product differentiation at scale**: [Differentiating your product] — Porter's insight that \"competing to be unique is ultimately more sustainable than competing to be the best\" is a CPO-level decision. CPOs define which differentiation game their company plays and make sure the entire product org is aligned around it.",
  "",
  "- **Roadmap idea generation at scale**: [Where Great Product Roadmap Ideas Come From] — CPOs build the systems (customer feedback loops, data analysis culture, competitor monitoring) that generate great roadmap ideas across all teams, not just their own.",
  "",
  "## Mindset Shifts",
  "",
  "**From shipping product → enabling others to ship product**: CPOs build the strategy, culture, and systems that let PM teams do their best work.",
  "",
  "**From team strategy → company strategy**: IC PMs own team-level strategy; CPOs own product strategy for the company, and must connect it to business strategy.",
  "",
  "**From execution-first → vision-first**: IC PMs are evaluated on execution; CPOs are evaluated on vision. The ability to articulate a compelling product future — and get the whole org aligned behind it — becomes the primary job.",
]);

// ─── Product Manager → Engineering Manager ─────────────────────────────────
set("Product Manager", "Engineering Manager", [
  "## Career Transition Overview",
  "",
  "PM to EM is an unusual but not rare transition — it typically requires going back to engineering first, or stepping into a hybrid player-coach EM role at a small company. The core challenge is that EM is a deeply technical role: you need to understand your team's work well enough to unblock them, make architectural trade-offs, and evaluate engineering quality. Justin Gage's guide to technical PM skills [The top 5 things PMs should know about engineering] is the most honest assessment of how much technical depth is required — and most PMs are starting from less depth than they think.",
  "",
  "## Gaps to Close",
  "",
  "**Technical depth.** Justin Gage's framework [The top 5 things PMs should know about engineering] identifies five technical foundations: understanding your tech stack, APIs (how services communicate), version control and code review, database concepts, and testing/CI systems. PMs typically have surface awareness of all of these; EMs need working knowledge that lets them evaluate trade-offs and unblock engineers.",
  "",
  "**Engineering management skills.** The IC-to-manager transition [Moving from IC product manager to manager of product managers] describes leverage-based management — your output equals your team's output plus neighboring teams'. This applies to EM as much as to PM manager, but the domain is engineering execution and quality rather than product strategy.",
  "",
  "**People management for engineers.** Engineers and PMs respond differently to management. Engineers value technical credibility above almost everything else. PMs who move into EM roles without building technical credibility first are often ineffective — the team doesn't trust their judgment on engineering decisions.",
  "",
  "## Skills to Build",
  "",
  "- **Technical foundations**: [The top 5 things PMs should know about engineering] gives the clearest technical PM reading list — tech stack, APIs, version control, databases, testing. Each of these is described in terms of why it matters to product decisions, which is the PM-to-EM on-ramp.",
  "",
  "- **Engineering quality evaluation**: [Building eval systems that improve your AI product] — while AI-specific, the underlying principle (build feedback loops that catch real problems before they ship) is a core EM responsibility. EMs build the quality culture on their teams.",
  "",
  "- **Communication as the job**: [Startup PM vs. big company PM] quotes Boz (CTO of Meta): \"Communication is the job.\" This is true for EMs too — managing up to leadership, managing out to cross-functional partners, and managing within the team all require clear, consistent communication.",
  "",
  "- **Managing leverage**: [Moving from IC product manager to manager of product managers] — the Andy Grove leverage model applies directly. An EM's output is the team's output plus the output of teams they influence. PMs already think this way; applying it to engineering execution is the transition.",
  "",
  "## Mindset Shifts",
  "",
  "**From representing the product → representing the team**: PMs advocate for the product; EMs advocate for their engineering team's health, capacity, and quality.",
  "",
  "**From influencing without authority → managing with authority**: PMs lead through persuasion; EMs have direct reports and performance management responsibility.",
  "",
  "**From specification → execution judgment**: PMs define what to build; EMs make judgment calls on how to build it — architecture, trade-offs, technical debt, and delivery risk.",
]);

// ─── Write output ─────────────────────────────────────────────────────────
fs.writeFileSync(DATA_PATH, JSON.stringify(paths, null, 2));
console.log("Batch E: 6 paths written.");
