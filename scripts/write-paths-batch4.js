"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};
const paths = {};

paths["Product Manager|||Chief Product Officer"] = {
  from: "Product Manager", to: "Chief Product Officer",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is not a lateral move — it's a step change in scope and accountability. A PM owns one product area. A CPO owns the entire product organization: how it's structured, how it prioritizes across competing team goals, what the company's product strategy is at the highest level, and how product interacts with engineering, design, data, and the executive team. The transition typically takes 5–8 years of progressive PM experience, including a successful stint managing other PMs. There is no shortcut.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is scope of strategy. PMs craft strategy for their product area. CPOs craft strategy for the entire product, which means making tradeoffs between teams, deciding which product bets the company is making for the next 2–3 years, and being accountable to the board for product outcomes. [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] describes what this looks like: Chandra applied his framework at the company level at Headspace, Meta, and VRChat to align Sheryl Sandberg, Chris Cox, and Andrew Bosworth on complex strategic decisions. That's the CPO's operating environment.",
    "",
    "The second gap is managing other PMs. Most PMs have never formally managed anyone. The CPO role requires building a PM team, setting the standard for what good PM work looks like, and coaching PMs through problems you can't solve for them. [Moving from IC product manager to manager of product managers] covers this transition in detail: it's not just doing PM work at scale — it's creating leverage through other PMs.",
    "",
    "Third: executive presence and board communication. CPOs present to boards, represent product to investors, and speak publicly about company direction. This is a different communication skill than writing a product spec or running a sprint review.",
    "",
    "## Skills to Build",
    "",
    "- **Managing PMs**: [Moving from IC product manager to manager of product managers] is the most directly relevant piece in the corpus. The five unexpected jobs of a PM manager: stopping bad decisions before they happen, unblocking your teams, maintaining the PM quality bar, maintaining the product quality bar, and building a united leadership group. The five ways to get promoted to PM manager: demonstrating you can lead people, deliver results, handle complexity, develop winning vision, and asking for it.",
    "",
    "- **Company-level product strategy**: [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] provides the framework CPOs use to structure company-level strategic decisions. The key artifact is a strategy document that sits between mission/vision and the plan — 3–5 concrete investments that, executed well, move the company toward winning. CPOs own this document.",
    "",
    "- **Product-led growth and monetization**: [Product-led marketing — Kyle Poyar] covers the funnel economics that CPOs need to understand — how PLG products acquire, convert, and retain users, and what the math looks like at different stages. CPOs who don't understand their product's growth engine struggle to make the right tradeoffs between growth features and core product investments.",
    "",
    "- **Prioritization at organizational scale**: [Prioritizing] and [Prioritizing at startups] together describe the full spectrum of prioritization challenges. CPOs face the hardest version of this: prioritizing across multiple product teams with competing roadmaps, each of which has legitimate reasons to be the priority. The instincts and frameworks from these posts apply, but the interpersonal and political complexity is significantly higher.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"my product area\" → \"the whole product\"**: As a PM, you defend your team's roadmap. As a CPO, you sometimes have to deprioritize your best PM's team in service of a more important company bet. This requires the ability to hold the whole product in mind simultaneously and make decisions that feel unfair at the team level but are right at the company level.",
    "",
    "**From \"doing PM work\" → \"defining what PM work is\"**: CPOs set the standard — how decisions get made, what a good spec looks like, when to ship vs. polish, what a PM career ladder looks like. As described in [Moving from IC product manager to manager of product managers], this shift from doing to defining is the central challenge of every PM leadership transition.",
    "",
    "**From \"roadmap owner\" → \"strategy owner\"**: PMs debate items on the roadmap. CPOs debate whether the roadmap reflects the right strategy. [Mission → Vision → Strategy → Goals → Roadmap → Task] illustrates this: the CPO is responsible for the strategy layer, not just the roadmap layer. A PM who gets promoted to CPO without developing genuine strategic instincts will be micromanaged by the CEO on every major decision."
  ].join("\n")
};

paths["Product Manager|||Growth Manager"] = {
  from: "Product Manager", to: "Growth Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a lateral specialization, not a promotion. The skills overlap significantly — both roles require prioritization, experimentation, and customer insight — but the orientation differs: product PMs build for user value, growth PMs build for user acquisition, activation, and retention metrics. The transition is accessible to most PMs within 6–12 months, especially those who've already worked on onboarding, conversion, or referral features.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is funnel thinking. Growth work is organized around the user acquisition funnel — from awareness through activation to retention and referral. [Breaking into growth] is direct on this: the difference between a regular PM and a growth PM isn't as large as the titles suggest, but growth PMs must develop deep fluency in funnel metrics and conversion optimization.",
    "",
    "The second gap is distribution channel expertise. [Product-led marketing — Kyle Poyar] covers the two primary growth channels for PLG products: organic search/SEO and product virality. Growth PMs who don't understand these channels deeply tend to build features that don't move acquisition metrics.",
    "",
    "Third: experiment velocity. Growth teams typically run experiments faster and more frequently than product teams. The discipline of designing, running, and interpreting experiments — especially knowing when a result is real vs. noise — is a core growth skill that most PMs haven't developed systematically.",
    "",
    "## Skills to Build",
    "",
    "- **Growth channel mechanics**: [Product-led marketing — Kyle Poyar] covers PLG funnel math in detail: 1,000 visitors → 60 free signups → 3 paying customers, with CAC needing to stay under $1 per unique visitor. Kyle's framework of product-led marketing — organic search and product virality as the two primary PLG acquisition levers — is the mental model growth PMs need to operate from.",
    "",
    "- **Conversion optimization**: [Prioritizing conversion opportunities] breaks down three conversion levers: focus (reducing distraction), motivation (reinforcing why users should continue), and friction (making completion easier). The piece includes input from Lex Roman, Jeff Chang, and Isaac Silverman. The core insight: most teams overinvest in friction reduction and underinvest in motivation, which tends to have the highest upside.",
    "",
    "- **Growth ideation and experimentation**: [Growth ideas] provides a comprehensive list of growth tactics across acquisition, activation, and retention. [Growth inflections] examines what precedes sudden growth acceleration — useful for understanding which bets are likely to produce inflections vs. incremental gains.",
    "",
    "- **Prioritizing growth experiments**: [Prioritizing] remains highly relevant — growth teams face the same prioritization challenges as product teams, but under more pressure to show short-term metric movement. Applying the impact/effort framework to experiment prioritization, and resisting the pressure to run too many experiments at once, is a practical daily challenge.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"user value\" → \"user behavior at scale\"**: Product PMs think about whether a feature is valuable. Growth PMs think about whether a feature changes behavior at the top of the funnel — which is a different question. A feature can be valuable and not move growth metrics. Growth PMs have to hold both questions simultaneously.",
    "",
    "**From \"shipping features\" → \"running experiments\"**: Product teams ship and observe. Growth teams design experiments before running them — with hypotheses, success metrics, and minimum detectable effects defined upfront. [Breaking into growth] touches on this: the growth PM's relationship with data is more structured and more skeptical than the average PM's. Positive results are treated as hypotheses to confirm, not conclusions.",
    "",
    "**From \"long roadmap horizon\" → \"short feedback loops\"**: Product roadmaps typically operate on quarterly cycles. Growth experiments can turn around in days or weeks. The growth PM's job is to maximize the number of high-quality experiments per quarter, which requires a fundamentally different rhythm than traditional product management."
  ].join("\n")
};

paths["Product Manager|||Engineering Manager"] = {
  from: "Product Manager", to: "Engineering Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is an uncommon transition that typically requires going back to coding first, or making the move to a small startup where roles are fluid. Most PMs who become EMs do so because they want to lead people and build technical depth simultaneously, or because they're at an early-stage company where the EM role is accessible without a traditional engineering career path. It is a harder transition than the reverse (EM → PM) because you are giving up the skills that define your current job — product judgment, customer insight — to develop ones you haven't yet proven.",
    "",
    "A more realistic stepping stone: chief of staff or associate GM role, which builds people and operational leadership experience without requiring coding. Or: founding a startup where you hire and manage engineers directly.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is technical credibility. EMs earn the trust of engineers through demonstrated technical judgment — code review, architecture decisions, realistic scoping. PMs who want to become EMs without this foundation struggle to earn that trust. [The top 5 things PMs should know about engineering — Justin Gage] describes what technical knowledge matters for PM-engineering collaboration, but an actual EM needs significantly more depth than this.",
    "",
    "The second gap is people management experience. PMs influence without authority. EMs have formal responsibility for the people on their team — performance reviews, career development, conflict resolution, hiring decisions. These are different skills that require practice in formal management contexts.",
    "",
    "The provided transcripts do not cover this specific transition directly. The gaps and skills below draw from adjacent content in the corpus.",
    "",
    "## Skills to Build",
    "",
    "- **Technical credibility**: [The top 5 things PMs should know about engineering — Justin Gage] gives the baseline, but moving to EM requires going substantially further. Understanding your company's tech stack, being able to evaluate technical proposals, and reviewing code are table stakes for EM credibility. PMs who want to make this transition need to deliberately invest in technical depth — side projects, open source contributions, or engineering coursework.",
    "",
    "- **People management fundamentals**: [Moving from IC product manager to manager of product managers] describes the PM-to-manager transition in detail. While it covers PM management specifically, the principles apply: the job shifts from doing to enabling; your output is now measured through others; the most important skills are developing people and removing blockers. This is the template for any IC-to-manager transition.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"own the what\" → \"own the how\"**: PMs own what gets built. EMs own how it gets built — the processes, the team health, the technical quality. These orientations can conflict. Former PMs who become EMs sometimes struggle to give up opinions about product direction that are no longer theirs to have.",
    "",
    "**From \"influence the team\" → \"be responsible for the team\"**: PM influence is indirect — you propose, persuade, and prioritize. EM responsibility is direct — you hire, develop, and when necessary, manage people out. This accountability is heavier than most PMs anticipate. The provided transcripts do not cover this transition in depth directly."
  ].join("\n")
};

const updated = { ...existing, ...paths };
fs.writeFileSync(outPath, JSON.stringify(updated, null, 2));
console.log("Wrote " + Object.keys(paths).length + " paths. Total: " + Object.keys(updated).length);
