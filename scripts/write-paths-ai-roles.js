"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};
const paths = {};

// ─── Product Manager → AI PM ──────────────────────────────────────────────────
paths["Product Manager|||AI PM"] = {
  from: "Product Manager", to: "AI PM",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This isn't a lateral move — AI PM is PM with a new set of constraints and a new quality bar. [State of the product job market in early 2026] puts AI PM demand in the \"hockey-stick\" category, with openings surging while traditional PM roles are merely recovering. The good news: the foundational PM skills — discovery, prioritization, stakeholder alignment, roadmapping — transfer directly. What's new is that your product is probabilistic, not deterministic. Outputs vary, errors are invisible until they're not, and the development loop looks nothing like shipping a conventional feature. [Inside ChatGPT: The fastest-growing product in history — Nick Turley] captures the core new rule: \"You won't know what to polish until after you ship.\" That tolerance for uncertainty — and the process discipline to navigate it — is what separates the PMs who thrive in AI from the ones who apply conventional playbooks and wonder why they're not working.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is eval fluency. In conventional PM, quality assurance is binary — a button works or it doesn't, an API returns a value or it errors. AI products are non-deterministic: the same prompt can produce different outputs, edge cases are impossible to enumerate in advance, and \"good enough\" is a judgment call, not a pass/fail. [Why AI evals are the hottest new skill for product builders — Hamel Husain & Shreya Shankar] is explicit: \"To build great AI products, you need to be really good at building evals. It's the highest ROI activity you can engage in.\" PMs who can define what good looks like — write test cases, categorize failure modes, instrument measurement — are the ones who ship AI products that actually improve over time. PMs who can't do this ship AI products that feel like magic in the demo and drift in production.",
    "",
    "The second gap is working in the AI development loop. [The future of AI in software development — Inbal Shani] describes how AI is changing what engineers spend their time on — and by extension, what PMs need to understand. The planning cycle is faster, the feedback loop is shorter, and the \"what should we build\" question arrives sooner and more often. PMs who understand how engineers work with AI tools — agents, code generation, automated testing — can set better scope, spot risks earlier, and avoid becoming the bottleneck in a faster-moving team.",
    "",
    "Third: prompting and model behavior literacy. [Building eval systems that improve your AI product] and [Why AI evals are the hottest new skill for product builders — Hamel Husain & Shreya Shankar] both describe a working knowledge of how models behave — context windows, hallucination patterns, confidence calibration — as a prerequisite for writing good product specs in AI. You don't need to implement models. You do need to understand what they can and can't do reliably, what a regression looks like, and what \"improved\" means when the model is the product.",
    "",
    "## Skills to Build",
    "",
    "- **Evals as a first-class product discipline**: [Why AI evals are the hottest new skill for product builders — Hamel Husain & Shreya Shankar] is the most important piece in the corpus for this transition. The framework: define what good looks like for your AI feature, create a test set of real cases, run evals before and after every model or prompt change, and use failure analysis to drive the roadmap. Shankar's framing — \"the goal is not to do evals perfectly, it's to actionably improve your product\" — is exactly the right orientation. Start practicing this on any AI feature you currently own, even informally.",
    "",
    "- **Shipping under uncertainty**: [Inside ChatGPT: The fastest-growing product in history — Nick Turley] describes the mental model that makes AI PM different: \"This is a pattern with AI — you won't know what to polish until after you ship.\" That means intentionally shipping to learn rather than shipping when confident, instrumenting aggressively from day one, and building feedback loops into the product that help you see what the model is getting wrong. Conventional PM instincts push toward polish before launch. AI PM pushes toward launch before you know what polish means.",
    "",
    "- **The AI-native operating model**: [The AI-native startup: 5 products, 7-figure revenue, 100% AI-written code — Dan Shipper] describes what products built entirely on AI tooling look like from the inside — how decisions get made, how prompts become the spec, what the team structure looks like. AI PMs who understand this model can operate effectively at AI-first companies, not just AI-feature teams inside conventional ones.",
    "",
    "- **Technology scope and constraint fluency**: [The future of AI in software development — Inbal Shani] provides the framework for how engineering has changed — what AI tools handle vs. what still requires human judgment. AI PMs who understand these constraints write better specs: not \"build a feature that does X\" but \"here's the task, here's the quality bar, here's what a regression looks like, here's the feedback loop.\"",
    "",
    "## Mindset Shifts",
    "",
    "**From \"deterministic spec\" → \"probabilistic quality bar\"**: Conventional PM means defining behavior precisely: when user clicks X, show Y. AI PM means defining acceptable output distribution: when user asks X, the response should usually be accurate, never harmful, occasionally surprising in a good way. [Why AI evals are the hottest new skill for product builders — Hamel Husain & Shreya Shankar] codifies this shift — instead of a spec, you write a test set. Instead of passing or failing, you're measuring distribution drift. The instinct to nail down exact behavior before building is correct in conventional PM and counterproductive in AI PM.",
    "",
    "**From \"features shipped\" → \"model improved\"**: In conventional PM, the output is features that shipped. In AI PM, the output is a model — or a prompt plus retrieval system — that performs better on the tasks your users actually have. [Building eval systems that improve your AI product] describes this loop: instrument → eval → improve → re-eval. The roadmap is driven by failure analysis, not feature requests. This is a genuinely different rhythm and it takes deliberate adjustment.",
    "",
    "**From \"user feedback informs the roadmap\" → \"user feedback trains the system\"**: [Inside ChatGPT: The fastest-growing product in history — Nick Turley] describes how at OpenAI, user interactions are not just signals for product decisions — they shape how the system improves. This is the deep difference: in AI PM, you are never done shipping because the model is always improvable. The mental model of \"we launch, we iterate, we eventually move on\" doesn't apply. The product is the system, and the system evolves continuously with usage.",
  ].join("\n"),
};

// ─── Product Designer → AI PM ─────────────────────────────────────────────────
paths["Product Designer|||AI PM"] = {
  from: "Product Designer", to: "AI PM",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Design hiring has been flat since 2023 while AI PM demand is on a hockey stick. [State of the product job market in early 2026] is direct about the structural shift: the PM-to-designer ratio has flipped from parity to 1.27x favoring PMs, and the theory is that AI is letting engineers move so fast that \"there's less opportunity — and less desire — to involve the traditional design process.\" That shift is not reversing. For designers who want to stay at the center of how products get built, AI PM is a logical repositioning — not a retreat. The designers who become AI PMs aren't abandoning their craft instincts; they're putting those instincts in a seat with more decision authority and more market demand. The gap is real but narrower than it appears: you already understand users deeply, you already know what \"good\" looks like, and you've been in the room when product decisions get made. The missing piece is formal ownership of business outcomes and comfort with a development process you've observed from the outside.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is business accountability. Designers are measured on quality — coherence, usability, craft. PMs are measured on business outcomes — activation, retention, revenue, error rate. [What is product management] defines the PM's job as \"delivering business impact by marshaling the resources of their teams.\" That reframe — from quality advocate to outcome owner — is the identity shift at the center of this transition. You will sometimes decide to ship something that isn't designed as well as you'd like because the business priority is elsewhere. Making and owning that call is PM work.",
    "",
    "The second gap is eval fluency. AI PM requires a product quality bar that's entirely different from visual design quality. [Why AI evals are the hottest new skill for product builders — Hamel Husain & Shreya Shankar] describes it: you need to define what good looks like for an AI output, build test sets of real examples, and measure distribution rather than binary correctness. This is actually a skill designers are well-suited to develop — it's fundamentally about defining quality criteria and recognizing failure modes. The vocabulary is different but the instinct is the same.",
    "",
    "Third: the PM's relationship to engineering. [The PM 🤝 Design Partnership] describes the PM as \"conductor\" — the role that holds the creative vision while moving the product forward. As a designer, you've been the expert collaborator the PM coordinates with. In the PM seat, you're the coordinator: setting the direction, breaking the tie, making the call. [The future of AI in software development — Inbal Shani] describes how the engineering workflow is changing with AI tools — the planning loop is faster, specs need to be cleaner, and scope decisions arrive earlier. AI PMs who understand this pace can keep up; those who apply conventional design-process timelines as PMs will find themselves the bottleneck.",
    "",
    "## Skills to Build",
    "",
    "- **Evals and AI quality measurement**: [Why AI evals are the hottest new skill for product builders — Hamel Husain & Shreya Shankar] is the most direct preparation for AI PM quality work. Designers have a refined sense of what \"good\" looks like; the development task is translating that intuition into quantifiable criteria — error categories, success rates, edge case inventories — that an engineering team can instrument and improve against. This is learnable, and your design sensibility is an asset: most engineers struggle to articulate quality criteria that are rooted in human experience.",
    "",
    "- **The full PM role**: [What is product management] lays out the three core PM jobs: shape the product, ship the product, synchronize the people. Designers are strong on shaping. The development areas are shipping — execution discipline, delivery management, tradeoff-making under time pressure — and synchronizing, which means cross-functional alignment, business-case communication, and executive reporting. [Becoming a senior Product Manager] describes the PM who does the most important work upstream: discovering market opportunities, building strategic cases before anyone else sees them. That proactive, business-grounded posture is the complement to your design instincts.",
    "",
    "- **Shipping under uncertainty**: [Inside ChatGPT: The fastest-growing product in history — Nick Turley] makes the key point: \"You won't know what to polish until after you ship.\" Designers are trained to polish before shipping. AI PM inverts this — launch early, instrument aggressively, let usage data define what matters. The instinct to perfect before releasing is a genuine liability in AI PM and requires deliberate unlearning.",
    "",
    "- **Business-outcome framing**: [The PM 🤝 Design Partnership] shows the PM as the role that translates user needs into business commitments. As an AI PM, you're making that translation constantly: this user research finding → this activation hypothesis → this experiment → this metric. Your user-insight depth is a substantial asset here. The development area is the business-outcome end of the chain, not the user-insight end.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"design quality\" → \"outcome quality\"**: The quality bar you've held as a designer — visual coherence, interaction polish, usability — remains relevant but becomes one input among many. [What is product management] describes the core PM tension: business impact comes from solving customer problems, but not every customer problem is worth solving at this moment. As an AI PM, you'll sometimes ship something that's less polished than you'd design, because the learning from shipping outweighs the cost of imperfection. Accepting that tradeoff — and owning it — is the central identity shift.",
    "",
    "**From \"influence the product\" → \"own the product\"**: Designers shape products through expertise and advocacy. PMs own the outcome. [The PM 🤝 Design Partnership] describes the dynamic from the design side — the PM as conductor, the designer as key creative partner. Moving from partner to conductor means absorbing the weight of decisions that were previously the PM's problem. When the product misses its metric, that's on you — not on the design, not on engineering. That accountability is heavier than it looks from the designer's seat.",
    "",
    "**From \"advocate for users\" → \"advocate for users within a business constraint\"**: The design instinct to push back when pressures compromise the user experience is correct and valuable — keep it. What changes is that you now make the calls you used to push back on. [State of the product job market in early 2026] describes a market where AI is letting engineers move so fast that traditional design involvement is being skipped. As an AI PM, you decide how much design investment to make — and you're accountable for the consequences either way.",
  ].join("\n"),
};

// ─── Software Engineer → AI Engineer ─────────────────────────────────────────
paths["Software Engineer|||AI Engineer"] = {
  from: "Software Engineer", to: "AI Engineer",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "AI engineer is not a separate career track — it's what software engineering is becoming. [Boris Cherny] describes working at the leading edge: \"100% of my code is written by Claude Code. I have not edited a single line by hand since November. Productivity per engineer has increased 200%.\" [The future of AI in software development — Inbal Shani] frames the structural shift at GitHub: the job is no longer primarily writing code. It's \"evolving your thinking to the big picture, to the connected experience, to connected systems — which today we find more in the world of more senior developers.\" AI engineering concentrates on judgment, architecture, and system design — skills that were previously reserved for staff-level engineers — and automates the mechanical production of code that used to occupy most of a junior or mid-level engineer's day. The transition is less about learning new tools, though you must, and more about developing a new relationship to your work: from code producer to system director.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is AI systems literacy — understanding how large language models, embeddings, retrieval systems, and agents actually work, well enough to make sound architectural decisions about when to use them and how to structure them. [Why AI evals are the hottest new skill for product builders — Hamel Husain & Shreya Shankar] describes eval design as the most foundational skill: \"To build great AI products, you need to be really good at building evals. It's the highest ROI activity you can engage in.\" An engineer who can't define what good output looks like — can't write a test set, can't measure regressions, can't instrument an AI feature — is building blind. That gap is more important than any specific framework or API.",
    "",
    "The second gap is orchestration and agent architecture. [How Devin replaces your junior engineers with infinite AI interns that never sleep — Scott Wu] describes the state of AI agents: \"Most folks on the team are definitely working with up to five Devins at once.\" The AI engineer's job increasingly involves designing systems where multiple AI agents collaborate, hand off tasks, and fail gracefully — not implementing individual functions. This is systems design at a new level of abstraction. The architectural patterns — task decomposition, agent checkpointing, human-in-the-loop handoffs, failure recovery — are learnable but unfamiliar to engineers whose mental model is synchronous function calls.",
    "",
    "Third: prompting, context engineering, and model behavior. [Building eval systems that improve your AI product] covers the engineering discipline of working with non-deterministic systems: how to structure prompts to reduce variance, how to use context windows effectively, how to detect and measure hallucination, how to design retrieval pipelines that give models the right information. This is engineering, not magic — but it requires building new intuitions that take real time to develop under production load.",
    "",
    "## Skills to Build",
    "",
    "- **Eval systems as core engineering practice**: [Why AI evals are the hottest new skill for product builders — Hamel Husain & Shreya Shankar] and [Building eval systems that improve your AI product] are the two most practically valuable pieces for this transition. The discipline: define expected outputs, build a representative test set, instrument measurement, run before and after every model or prompt change. Engineers who develop this as a first-class practice — rather than shipping AI features and hoping they work — build products that improve predictably. Husain's framing: \"When you're building an AI application, you just learn a lot.\" The eval loop is the learning loop.",
    "",
    "- **AI-native development workflow**: [Boris Cherny] shows what 200% productivity looks like from the inside — running five agents in parallel, shipping 20-30 PRs a day, letting AI generate all code while staying focused on direction and review. The transition isn't just adopting a tool; it's developing a new workflow where you're always working at two levels simultaneously: agent-level (what am I asking it to do right now) and system-level (what am I actually building). Engineers who stay in the old workflow — writing every line themselves — will produce less than engineers who develop this orchestration instinct.",
    "",
    "- **Architectural judgment for AI systems**: [The future of AI in software development — Inbal Shani] describes the GitHub CPO's view of where AI is heading: \"It's really evolving your thinking to the big picture, to the connected experience, to connected systems.\" AI engineers are increasingly making decisions about when to call a model vs. use deterministic logic, how to structure retrieval to reduce hallucination, how to build agent pipelines that fail safely. These are architecture decisions. The engineers who develop this layer of judgment become the staff-level engineers of the AI era.",
    "",
    "- **Understanding AI's economic trajectory**: [Marc Andreessen: The real AI boom hasn't even started yet] and [How Devin replaces your junior engineers with infinite AI interns that never sleep — Scott Wu] both describe the scale of what's coming — Devin PRs heading toward the majority of production merges, founders building companies alone with AI. AI engineers who understand the trajectory, not just the current toolset, make better long-term architectural decisions and build skills that compound rather than become obsolete.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"code producer\" → \"system director\"**: [Boris Cherny] makes this concrete: \"I have never enjoyed coding as much as I do today, because I don't have to deal with all the minutia.\" The AI engineer's primary value is no longer in the code they write but in the direction they give, the quality bar they set, and the failures they catch. Engineers who hold onto code production as the thing they're good at will be outproduced by engineers who develop the judgment to direct AI agents effectively.",
    "",
    "**From \"deterministic output\" → \"probabilistic quality\"**: Software engineers are trained on binary correctness — a function either passes the test or doesn't. AI systems produce distributions of outputs, and \"correct\" is a range, not a point. [Why AI evals are the hottest new skill for product builders — Hamel Husain & Shreya Shankar] describes the new quality discipline: \"The goal is not to do evals perfectly, it's to actionably improve your product.\" Engineers who develop a tolerance for probabilistic quality — and the measurement rigor to manage it — thrive in AI engineering. Engineers who can't accept that outputs vary will find AI systems deeply uncomfortable.",
    "",
    "**From \"my team's code\" → \"the system's behavior\"**: [The future of AI in software development — Inbal Shani] describes the shift happening across millions of developers at GitHub: from \"I wrote this function\" to \"I understand this system.\" AI engineers are accountable for how a pipeline behaves end-to-end — the model, the retrieval, the agent orchestration, the eval loop — not just the functions they personally implemented. [How Devin replaces your junior engineers with infinite AI interns that never sleep — Scott Wu] shows where this leads: systems where AI handles implementation and humans handle direction, architecture, and quality judgment. That's a different relationship to ownership — and a more valuable one.",
  ].join("\n"),
};

const updated = { ...existing, ...paths };
fs.writeFileSync(outPath, JSON.stringify(updated, null, 2));
console.log("Wrote " + Object.keys(paths).length + " paths. Total: " + Object.keys(updated).length);
