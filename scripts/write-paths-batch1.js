"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};

const paths = {};

paths["Software Engineer|||Product Manager"] = {
  from: "Software Engineer", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is one of the most common transitions in tech and a genuine pivot in accountability. You move from being evaluated on what you build to being evaluated on the impact of what gets built. Expect the full transition to take 1–2 years, whether through an internal APM role, a side project that demonstrates PM instincts, or a lateral move into a smaller company where the PM role is less gatekept.",
    "",
    "## Gaps to Close",
    "",
    "The biggest gap is not technical knowledge — you have more of that than most PMs need. The gap is owning outcomes rather than delivery. As defined in [What is product management]: your job as a PM is to deliver business impact by marshaling the resources of your team to identify and solve the most impactful customer problems. Engineers are accountable for shipping. PMs are accountable for shipping the right thing.",
    "",
    "The second gap is customer proximity. Engineers typically receive customer problems pre-digested through a ticket or spec. PMs go directly to the source: talking to users, running research, analyzing behavioral data. You'll need to build habits you've never needed before.",
    "",
    "Third is stakeholder alignment. Much of a PM's job, as [Mission → Vision → Strategy → Goals → Roadmap → Task] makes clear, is cascading a clear strategy into a roadmap — and aligning engineering, design, marketing, and leadership around it. Engineers who become PMs often underestimate how much of the job is this communication work, not the product decisions themselves.",
    "",
    "## Skills to Build",
    "",
    "- **Prioritization**: The ability to say no — and explain why — is the core PM skill. [Prioritizing] lays out a durable approach: make one list, T-shirt size ideas on impact vs. effort, sort by ratio, then adjust 10–20% based on dependencies and strategic context. The key insight is that prioritization is never purely data-driven — it involves people, opinions, and unknowns, and PMs who pretend otherwise burn trust with their teams.",
    "",
    "- **Product strategy**: Strategy is the plan between vision and roadmap — 3 to 5 concrete investments that, if executed well, move the product closer to winning. [Getting better at product strategy] walks through how defining a north-star (100% Instant Book at Airbnb) changed how an entire team sequenced its work for two years. [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] goes further with a step-by-step framework Chandra has applied at Headspace, Meta, and VRChat to align senior leadership on complex strategic decisions.",
    "",
    "- **Defining the PM role clearly**: Before you can do the job, you need a clear model of what the job is — and so does everyone around you. [What is product management] breaks it into three parts: shape the product, ship the product, synchronize the people. Most engineers entering PM overindex on the first two and underestimate the third. The ten attributes of successful PMs — communication, collaboration, execution, customer insights, strategy — represent the full scope of what you'll be evaluated on.",
    "",
    "- **Technical credibility as a PM asset**: Your engineering background is an advantage — use it deliberately. [The top 5 things PMs should know about engineering — Justin Gage] explains how understanding your company's tech stack, database constraints, and build vs. buy tradeoffs lets you write better specs, earn more engineering trust, and make faster scope decisions. Gage's core point: technical knowledge as a PM doesn't mean writing code; it means knowing enough to ask the right questions.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"build it right\" → \"build the right thing\"**: Engineers are trained to take a spec and execute it excellently. PMs are responsible for questioning the spec before execution begins. As [What is product management] makes clear, business impact comes from identifying and solving the most impactful customer problems — which means shipping something flawlessly and still failing if it was the wrong problem. Many engineers moving into PM keep executing. The shift is to start challenging the list before worrying about how to build what's on it.",
    "",
    "**From \"individual output\" → \"team leverage\"**: An engineer's output is code shipped. A PM's output is the output of their team. As articulated in [Moving from IC product manager to manager of product managers], you stop being evaluated on what you personally produce. This is disorienting for engineers who've built their professional identity around individual technical contributions. The transition requires finding satisfaction in enabling others rather than building yourself.",
    "",
    "**From \"roadmap as plan\" → \"roadmap as strategy made visible\"**: Engineers experience the roadmap as a list of things to build. PMs need to experience it as a reflection of a strategy. [Mission → Vision → Strategy → Goals → Roadmap → Task] shows that every roadmap item should be traceable to a strategic bet. PMs who cannot explain why each item is on the list — not just what it is — will struggle to defend their roadmap under pressure from stakeholders."
  ].join("\n")
};

paths["Software Engineer|||Engineering Manager"] = {
  from: "Software Engineer", to: "Engineering Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a promotion-path transition rather than a lateral move — many engineers become EMs by being the most senior person on a team and taking on informal leadership gradually. The formal step often feels less dramatic than expected. That said, it is a role change, not just a title change. Expect to feel less productive for 6–12 months as you shift from building to enabling others to build.",
    "",
    "## Gaps to Close",
    "",
    "The largest gap is the shift from technical output to people output. As a senior engineer, your value comes from what you personally ship. As an EM, your value comes from how well your team ships — which means your leverage runs through others, not through your own code.",
    "",
    "The second gap is comfort with ambiguity in people problems. Debugging code has a correct answer. Debugging a team dynamic, a performance issue, or a misalignment between two engineers does not. EMs who apply engineering rigor to people management — if I follow this process, the output will be X — consistently struggle.",
    "",
    "Third is understanding what good product looks like from a management layer. [The future of AI in software development — Inbal Shani] illustrates this: as an EM, you are increasingly responsible for how your team thinks about big-picture and connected systems, not just individual features. Inbal notes that this kind of systems-level ownership is what separates strong senior engineers from effective engineering leaders — the junior developer executes simple code; the leader thinks in connected systems.",
    "",
    "## Skills to Build",
    "",
    "- **Technical mentorship and growing engineers**: Your job as EM is not to write the best code — it's to make your engineers better. [The future of AI in software development — Inbal Shani] covers how the nature of developer value is shifting: as AI handles more execution, the premium moves to systems thinking and big-picture reasoning. As an EM, developing this capability in your team — through code review, architecture conversations, and stretch assignments — is more valuable than shipping features yourself.",
    "",
    "- **Navigating the PM-engineering relationship**: [The top 5 things PMs should know about engineering — Justin Gage] is written for PMs but essential for new EMs — because you will now be the person translating between product and engineering. Understanding how PMs think about tradeoffs, tech debt, and scope changes helps you advocate effectively for your team in roadmap conversations and prevents the most common sources of PM-engineering friction.",
    "",
    "- **Understanding business context beyond the sprint**: [Leaving big tech to build the #1 technology newsletter — Gergely Orosz] is instructive as a career story: Gergely was a senior engineer at Uber who developed writing and audience-building skills alongside his technical work before leaving to build independently. The pattern reveals how engineers who develop skills outside pure execution — communication, understanding business dynamics, external credibility — create more career optionality. EMs who understand the business are better at shielding their teams from low-value work.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"my code\" → \"my team's output\"**: The hardest part of becoming an EM is that you can no longer point to a PR and say you built that. Your contribution is invisible: better meetings, clearer direction, unblocked engineers, higher team morale. This requires a real identity shift, especially for engineers who've built their confidence around technical output. The provided transcripts do not cover this transition in depth directly — it is a gap in the available corpus.",
    "",
    "**From \"solving problems\" → \"creating conditions for others to solve problems\"**: Senior engineers develop strong opinions about the right technical approach. EMs have to hold those opinions loosely and let their engineers make calls — sometimes imperfect ones — because the cost of disempowering a team long-term outweighs the cost of a suboptimal technical decision short-term. The provided transcripts do not cover this directly, but it is the central tension that recurs across leadership-focused discussions in the corpus."
  ].join("\n")
};

paths["Software Engineer|||Founder / CEO"] = {
  from: "Software Engineer", to: "Founder / CEO",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a significant pivot — from executing within a system to building the system itself. Most successful founders from engineering backgrounds make this transition via a side project or co-founded startup, not by applying for CEO roles. The transition is not primarily about learning new skills; it's about accepting a fundamentally different relationship with uncertainty and personal accountability. Realistic timeline: 2–4 years before most founders feel genuinely competent in the full role.",
    "",
    "A useful stepping stone: building a 0-to-1 product feature end-to-end at your current company — owning not just the build but the customer conversations, go-to-market framing, and success metrics. This gives you a taste of the founder mindset without leaving your income.",
    "",
    "## Gaps to Close",
    "",
    "The biggest gap for engineers becoming founders is that engineering rewards precision; founding rewards speed. [Prioritizing at startups] is direct on this: early-stage founders who apply data-driven prioritization frameworks designed for larger companies move too slowly. You simply do not have enough data. The founder's job is to build, talk to users, and iterate faster than your capital runs out.",
    "",
    "The second gap is co-founder and people dynamics. [Healing your co-founder relationship] reveals how common co-founder conflict is and how destructive it becomes when unaddressed. Engineers starting companies often underestimate the interpersonal complexity of the founding team. Getting alignment on roles, equity, decision-making authority, and long-term vision is not a one-time conversation; it is an ongoing practice.",
    "",
    "Third: the transition from maker to CEO. As [How a great founder becomes a great CEO — Jonathan Lowenhar] articulates clearly: \"To be a founder is a state of being, it's an attitude. To be a CEO is a craft.\" Being a founder — having conviction, bias toward action, energy — does not automatically translate into being a good CEO. The CEO role is learnable, but it requires deliberate effort that many technical founders skip.",
    "",
    "## Skills to Build",
    "",
    "- **Pre-PMF prioritization**: Before product-market fit, your entire job is to find the right problem faster than you run out of money. [Prioritizing at startups] draws on advice from multiple first-time founders (Christina Cacioppo of Vanta, Rujul Zaparde of Zip, May Habib of Writer, and others): avoid solving nice-to-have problems, stop waiting for enough data, and build before you have a perfect strategy document. The common failure mode for technical founders is too much theory, not enough building.",
    "",
    "- **Building community and distribution**: [A founder's guide to community] covers one of the most underrated founder skills: building an audience or community before and around your product. Companies like Atlassian, Glossier, and Twitch built durable advantages by making their users feel ownership. For engineers who have never thought about distribution, community-building is a concrete and learnable skill set with real compounding returns.",
    "",
    "- **The founder-to-CEO transition**: [How a great founder becomes a great CEO — Jonathan Lowenhar] is the single most relevant piece for this transition. Jonathan works directly with founders on this exact problem. His core framing: many founders resist becoming CEOs because it means giving up the founder identity — the scrappy, move-fast energy — in favor of the slower, systems-building work of running a company. The ones who make the transition successfully accept that both things are true simultaneously.",
    "",
    "- **Company-level strategy**: [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] applies strategy frameworks to company-level decisions, not just product teams. For a founder becoming CEO, the ability to articulate a clear strategy that the whole company can execute against — not just ship features from — becomes critical as the company grows past 10 people.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"executing within constraints\" → \"defining the constraints\"**: Engineers work within a product spec, a tech stack, a team structure. Founders define all of these. [This Week #14: Transitioning from startup founder to product manager] — the reverse transition — reveals what founders miss most when they become employees again: the autonomy to make decisions without layers of approval. Learning to wield that autonomy productively rather than chaotically is the central founder challenge.",
    "",
    "**From \"individual excellence\" → \"organizational leverage\"**: Engineers advance by being individually excellent. Founders succeed by making everyone around them more effective. As [How a great founder becomes a great CEO — Jonathan Lowenhar] makes clear, the skills that get you to founding — technical depth, product intuition, hustle — are not the same skills that get you to building a company that outlasts your personal bandwidth.",
    "",
    "**From \"building the product\" → \"building the company\"**: This is the most common failure mode for technical founders across the corpus. Engineers love building and often keep building when they should be hiring, selling, or fundraising. The product is not the company. The company is the system that makes the product possible at scale — and building that system requires skills most engineers have never practiced."
  ].join("\n")
};

const updated = { ...existing, ...paths };
fs.writeFileSync(outPath, JSON.stringify(updated, null, 2));
console.log("Wrote " + Object.keys(paths).length + " paths. Total in file: " + Object.keys(updated).length);
