"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};
const paths = {};

// ─── Product Manager → VP of Product ─────────────────────────────────────────
paths["Product Manager|||VP of Product"] = {
  from: "Product Manager", to: "VP of Product",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "VP of Product is the role where the PM job fundamentally changes character. You stop being an excellent individual contributor and start being accountable for an entire product organization — multiple teams, multiple roadmaps, multiple PMs whose quality and output reflect on you. [Product management career ladders] shows this clearly: at the Director level, scope and impact become hard requirements; at the VP level, leadership and vision are what separate the people who get there from the people who don't. Most PMs who make this transition do so after 8–12 years in product, typically via a Director role first. Skipping Director is possible but rare, and usually happens at a fast-moving startup where the organization grows around you.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is managing PMs at scale — not just one team, but a portfolio of them. [Moving from IC product manager to manager of product managers] describes five unexpected jobs that appear the moment you move from IC to PM manager: stopping bad decisions before they happen, unblocking teams, maintaining the PM quality bar, maintaining the product quality bar, and building a united leadership group. At the VP level, these five jobs apply across an entire org. You are not just doing them yourself — you are developing Directors and senior PMs who do them for you. That's a different kind of leverage than even a strong Director exercises.",
    "",
    "The second gap is company-level strategy ownership. [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] describes the strategy document that sits between mission/vision and the plan — 3–5 concrete investments that define how the product wins. VPs own this document for their domain and defend it to the CPO, CEO, and board. [Getting better at product strategy] is direct about what makes strategy hard: it requires synthesizing customer insight, competitive context, and business constraints into a coherent plan that a large organization can execute. Most senior PMs have done this for a product area. VPs do it for multiple product areas simultaneously.",
    "",
    "Third: executive communication and organizational influence. [What is product management] defines the PM output as business impact delivered through team leverage. At VP level, your leverage extends beyond your direct reports — you're shaping how the entire product function operates, what the quality bar is, and how product interacts with engineering, design, data, and the C-suite. [Mission → Vision → Strategy → Goals → Roadmap → Task] shows the chain you're responsible for holding together: VPs live at the Strategy layer and must keep everything below it aligned.",
    "",
    "## Skills to Build",
    "",
    "- **Managing managers**: [Moving from IC product manager to manager of product managers] covers the IC-to-PM-manager transition. The VP transition adds another layer: managing people who manage people. The five unexpected jobs from that post apply, but at VP scale you do them through Directors, not directly through ICs. The skill to develop is coaching your managers to do these jobs well — quality bar, unblocking, decision-making — rather than doing it yourself.",
    "",
    "- **Cross-portfolio strategy**: [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] provides the framework VPs apply repeatedly — once per product area, then once at the portfolio level. Chandra's approach at Headspace and VRChat involved aligning executives including CPOs and CEOs around strategic decisions. VPs are expected to run this process for their teams and present coherent, defensible strategy upward.",
    "",
    "- **Organizational design and hiring**: [Product management career ladders] reveals that at VP level, leadership is the top-ranked attribute across 20+ company career ladders — ahead of execution, strategy, and vision. VPs decide how product teams are structured, what roles exist, and who gets hired and promoted. Building this organizational muscle — deciding where to invest headcount, how to structure reporting lines — is different from any IC PM skill.",
    "",
    "- **The full PM job at organizational scale**: [What is product management] defines three PM jobs: shape the product, ship the product, synchronize the people. At VP level, you ensure that every PM in your org is doing all three — not just the ones on your direct team. Your job is to identify which dimension each PM is weak in and develop them accordingly.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"my team's roadmap\" → \"the product org's output\"**: Senior PMs are expert at owning and defending their team's roadmap. VPs are accountable for every roadmap across their org — including ones they disagree with but can't personally fix. [Moving from IC product manager to manager of product managers] captures the first version of this shift: your output is now what your team produces. At VP level it extends further: your output is what an entire organization produces, including the decisions made by PMs you may never directly coach.",
    "",
    "**From \"doing strategy\" → \"setting the standard for strategy\"**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] describe what good product strategy looks like. VPs don't just produce good strategy themselves — they define what good strategy looks like for the whole org, review their PMs' strategies, and push back when the thinking is shallow. This is a harder skill than writing a good strategy yourself, because it requires being able to identify the gap between what was written and what was needed.",
    "",
    "**From \"getting promoted\" → \"developing people who get promoted\"**: [Product management career ladders] shows that at VP level, one of the most visible signals of leadership is the career trajectory of your direct reports. VPs who consistently develop PMs who get promoted — to senior PM, Director, VP elsewhere — build the kind of organizational reputation that compounds over time. Making this shift from personal advancement to organizational development is the central identity change of the VP transition.",
  ].join("\n")
};

// ─── Founder / CEO → Product Manager ─────────────────────────────────────────
paths["Founder / CEO|||Product Manager"] = {
  from: "Founder / CEO", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is one of the most counterintuitive transitions in tech — trading authority and ownership for influence and execution. Founders who move into PM roles usually do so via acquisition (their startup is bought and they join the acquiring company), or by choice after burning out on the loneliness and risk of founding. [This Week #14: Transitioning from startup founder to product manager] is the most directly relevant piece in the corpus: Lenny himself made this exact move, going from CEO of Localmind to one of the first PMs at Airbnb after an acquisition. His candid reflection is that he was \"really bad at it\" at first — not because founders lack product instincts, but because the job is structurally different in ways that catch founders off guard.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is operating within a structure you don't control. [This Week #14: Transitioning from startup founder to product manager] is explicit: \"As a founder your job is essentially to win at all costs... As a PM, your job is to avoid chaos, to avoid changing course, and particularly at a large company to avoid pissing people off.\" Founders are rewarded for intensity and speed even when it creates friction. PMs are rewarded for keeping teams running smoothly and productively. The same behaviors that made you effective as a founder will make you difficult as a PM — and it takes active work to unlearn them.",
    "",
    "The second gap is accepting that you have a boss. [This Week #14: Transitioning from startup founder to product manager] names this directly: Lenny admits it took him \"waaaaaay too long\" to remember that you actually have to listen when your manager says no. Founders build the reflex of pushing past objections. PMs at large companies need to build the reflex of alignment — understanding why the answer is no, working within that constraint, or escalating through legitimate channels. This is a professional adjustment that is harder than it sounds.",
    "",
    "Third: the formal PM discipline most founders never developed. [What is product management] defines the three PM jobs: shape the product, ship the product, synchronize the people. Founders are typically strong on shaping — they built the company around a product vision — and often weak on the execution and synchronization disciplines that product management at a large company demands. [Prioritizing] covers the basic framework most PMs use daily; founders often rely on gut and urgency rather than structured prioritization against a single list.",
    "",
    "## Skills to Build",
    "",
    "- **The softer PM skills**: [This Week #14: Transitioning from startup founder to product manager] is direct about what to focus on: teamwork, collaboration, execution, buy-in, and communication. These are not the skills founders are celebrated for. \"Don't expect that hitting your goals will be the only thing that matters to your career as a PM\" — the process and the relationships matter too, which is a significant shift from founder culture where results justify almost any approach.",
    "",
    "- **Structured prioritization**: [Prioritizing] covers the core PM discipline: make one list, T-shirt size by impact and effort, sort by ratio, get team buy-in before finalizing. Founders typically operate at extremes — everything is a priority, then one thing is the only priority. Developing the habit of maintaining a single ranked list that the whole team can see and debate is a concrete early practice for founder-to-PM transitions.",
    "",
    "- **The PM role in a large organization**: [Startup PM vs. big company PM] describes the specific adjustments required when moving from a small company (where the PM is often also the founder, designer, and researcher) to a large one (where those roles are distinct and the PM's job is coordination and prioritization, not doing). Communication becomes more important at scale — as Boz notes, \"communication is the job.\"",
    "",
    "- **Product strategy at team scope**: [Getting better at product strategy] and [Mission → Vision → Strategy → Goals → Roadmap → Task] cover the strategic layer PMs own within a larger organization. Founders own company-level strategy; PMs own product-area strategy. The frameworks are similar but the scope is narrower and the accountability structure is different — you're contributing to a strategy the CPO or VP of Product sets, not defining the whole direction yourself.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"win at all costs\" → \"keep the team running smoothly\"**: [This Week #14: Transitioning from startup founder to product manager] names this as the central transition. Founders optimize for outcomes; PMs at large companies optimize for outcomes AND process AND team morale simultaneously. The hardest part is accepting that how you get to results matters — not because the company is bureaucratic, but because a large team can't sustain founder-style intensity indefinitely without burning out.",
    "",
    "**From \"everyone works for me\" → \"I influence without authority\"**: As a founder, your authority was absolute within your company. As a PM, [What is product management] describes your job as \"marshaling the resources of your team\" — people who don't report to you, whose priorities you influence but don't control. This influence-without-authority dynamic is the core of the PM role, and it requires a genuinely different set of interpersonal skills than the directness founders are used to.",
    "",
    "**From \"entrepreneurial speed\" → \"organizational rhythm\"**: [This Week #14: Transitioning from startup founder to product manager] advises founders not to lose their entrepreneurial spirit — companies often acquire startups precisely because they want that energy. The adjustment is channeling it within an organizational rhythm: sprint cycles, planning processes, review cadences. [Startup PM vs. big company PM] describes what this rhythm looks like at scale, and how to be effective within it rather than fighting against it.",
  ].join("\n")
};

// ─── Software Engineer → Staff / Principal Engineer ───────────────────────────
paths["Software Engineer|||Staff Engineer"] = {
  from: "Software Engineer", to: "Staff Engineer",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Staff Engineer is the first level of the IC engineering track where your scope explicitly extends beyond your team. While a senior engineer is excellent within their team's domain, a staff engineer is expected to drive technical direction across multiple teams, identify architectural problems before they become crises, and raise the engineering quality bar for a broader organization. This is not a promotion that happens automatically with seniority — it requires deliberately developing a new set of skills while most of your engineering career has rewarded a different set. Lenny's corpus is primarily product and growth focused, but [Leaving big tech to build the #1 technology newsletter — Gergely Orosz] offers one of the most candid engineering career arcs available: Gergely worked his way from junior engineer in Hungary to senior engineer at Booking.com, Skype, and Uber before pivoting entirely. His trajectory illustrates what compounding technical credibility looks like over a decade.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is scope. Senior engineers are measured on their team's technical output. Staff engineers are measured on their influence across teams — identifying shared infrastructure needs, preventing architectural fragmentation, and making technical decisions that other teams then build on. This requires proactively inserting yourself into decisions outside your team's remit, which is a different posture than most engineers have been trained for.",
    "",
    "The second gap is communication at a non-technical audience level. [The top 5 things PMs should know about engineering — Justin Gage] describes the PM-engineering interface from the PM side — what PMs need engineers to communicate about tradeoffs, timelines, and risks. Staff engineers sit at this interface constantly, explaining architectural decisions to PMs, designers, and executives who don't share their technical vocabulary. The ability to make complex technical tradeoffs legible to non-engineers is a distinct skill that senior engineers rarely need to develop before the Staff level.",
    "",
    "Third: proactive problem identification rather than reactive problem solving. Senior engineers are handed problems to solve. Staff engineers are expected to find the problems that don't have a ticket yet — the scaling bottleneck nobody has written down, the architectural decision that will be painful in 18 months, the shared library that four teams are independently rebuilding. [The future of AI in software development — Inbal Shani] covers how AI is accelerating the rate at which these architectural decisions compound — staff-level judgment about what to build vs. adopt vs. defer is becoming more consequential, not less.",
    "",
    "## Skills to Build",
    "",
    "- **Cross-team technical influence**: The most direct development area is intentionally working on problems that span teams. This means volunteering for the cross-functional technical working group, writing the architectural proposal that affects three teams, or owning the migration that everyone agrees needs to happen but nobody wants to own. Staff engineers build this track record deliberately, not by waiting to be asked.",
    "",
    "- **Technical writing and documentation**: [Leaving big tech to build the #1 technology newsletter — Gergely Orosz] demonstrates how writing publicly about technical topics builds credibility and forces clarity. Gergely's newsletter grew to 300,000+ subscribers, but the relevant skill is the habit of writing clearly about technical subjects for a mixed audience. Staff engineers who write good architecture decision records (ADRs), design docs, and post-mortems build the kind of influence that extends beyond their immediate team.",
    "",
    "- **Understanding the product-engineering interface**: [The top 5 things PMs should know about engineering — Justin Gage] is worth reading from the engineering side. Staff engineers who understand what PMs need — realistic scoping, transparent tradeoff communication, proactive risk surfacing — become the engineers that PMs specifically request for high-stakes projects. That visibility accelerates the Staff promotion case.",
    "",
    "- **AI and modern tooling fluency**: [Building eval systems that improve your AI product] covers a domain where staff-level technical judgment is increasingly in demand. The engineers who develop deep fluency with AI systems, evaluation frameworks, and modern development toolchains are building skills that are both scarce and compounding. Staff engineers in AI-adjacent roles are being asked to make architectural decisions that will define how teams build for years.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"assigned problems\" → \"identified problems\"**: Senior engineers execute excellently on problems that are handed to them. Staff engineers are evaluated on the problems they surface and define. The shift requires developing a habit of looking up from the current sprint and asking what architectural debt, scaling risk, or cross-team coordination failure is building up outside your immediate scope.",
    "",
    "**From \"my team's code\" → \"the engineering organization's quality\"**: Senior engineers care deeply about their team's codebase. Staff engineers care about the broader engineering organization's technical health. [Leaving big tech to build the #1 technology newsletter — Gergely Orosz] reflects on Gergely's time at Uber and Booking.com — the engineers who had the most impact were those who treated technical quality as an organizational responsibility, not a personal one.",
    "",
    "**From \"technical excellence\" → \"technical leadership\"**: The Staff level is the first point on the IC track where leadership — not just technical skill — is explicitly evaluated. [The top 5 things PMs should know about engineering — Justin Gage] describes engineers who proactively communicate, push back constructively, and help non-engineers make better decisions. Staff engineers who develop this collaborative, communicative posture build organizational influence that compounds in a way pure technical excellence alone does not.",
  ].join("\n")
};

const updated = { ...existing, ...paths };
fs.writeFileSync(outPath, JSON.stringify(updated, null, 2));
console.log("Wrote " + Object.keys(paths).length + " paths. Total: " + Object.keys(updated).length);
