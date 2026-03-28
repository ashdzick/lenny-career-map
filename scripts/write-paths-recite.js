"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};
const paths = {};

// ─── Data Scientist → Product Manager ────────────────────────────────────────
paths["Data Scientist|||Product Manager"] = {
  from: "Data Scientist", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Data scientists bring strong quantitative reasoning, experimentation discipline, and often deep product insight to PM roles. The gap is in the qualitative, strategic, and interpersonal dimensions of the job. This is a well-trodden path — many strong PMs came from DS backgrounds. [New data on the product job market] confirms that analytical and technical backgrounds are among the most common PM entry points. The transition typically takes 6–12 months, often starting with a stretch role as a technical PM or APM at the same company.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is the shift from analysis to decision. [What is product management] is direct on this: the PM job is to deliver business impact by marshaling the resources of your team. Notice what's missing: the phrase \"analyze and report.\" PMs are accountable for outcomes, not insights. Data scientists produce rigorous analysis and present it to decision-makers. PMs make the decisions and own what happens next — you can't hide behind the data when the product doesn't work.",
    "",
    "The second gap is customer proximity. [What is product management] identifies three PM jobs: shape the product, ship the product, synchronize the people. Shaping requires direct customer proximity — interviews, calls, usability sessions — not just behavioral dashboards. [Building a world-class data org — Jessica Lachs] makes the complementary point: the best analytics work drives decisions, not just describes what happened. The gap for DS-to-PM is moving from the describing side to the deciding side.",
    "",
    "Third: the breadth of the PM stakeholder map. [Mission → Vision → Strategy → Goals → Roadmap → Task] reveals the PM's organizational surface area: you align different people at every level of this chain — mission, vision, strategy, goals, roadmap, tasks. Data scientists own fewer nodes. PMs manage relationships with engineering, design, data, marketing, legal, and executives simultaneously, which requires a different kind of influence than the DS role demands.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover what PMs are expected to own at a senior level. DS-to-PM transitions often underestimate how much of the PM job is strategic framing — not analysis. Writing a product strategy document, presenting it to executives, and defending it under pressure are skills that require practice separate from any analytical ability.",
    "",
    "- **Prioritization**: [Prioritizing] lays out the core PM prioritization discipline: make one list, T-shirt size by impact and effort, sort by ratio. Your DS background makes you well-equipped to estimate impact rigorously. The gap is making these calls quickly under uncertainty — without waiting for statistical significance — and communicating the reasoning to a non-technical audience.",
    "",
    "- **The PM role fully defined**: [What is product management] defines three PM jobs: shape the product, ship the product, synchronize the people. DS-to-PM transitions are typically strong on shaping — synthesizing user and data signals into product direction — and weaker on shipping (execution discipline, sprint management, unblocking engineers) and synchronizing (stakeholder alignment, cross-functional communication). Developing the execution and alignment muscles is the practical work of the transition.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"prove it\" → \"bet on it\"**: DS work produces evidence-backed conclusions. [Prioritizing] is explicit that PM work requires making bets before the evidence is conclusive — you sort by estimated impact and estimated effort, both inherently uncertain. This shift in epistemic standards is one of the harder adjustments for analytically-trained professionals. The skill is making confident decisions with incomplete data, then updating as results come in.",
    "",
    "**From \"technical depth\" → \"breadth across the product\"**: DS expertise is deep and narrow. PM expertise is broad — [What is product management] describes a role that touches customer problems, business metrics, engineering constraints, design principles, and organizational dynamics simultaneously. [New data on the product job market] shows that the most valued PMs combine analytical rigor with breadth. Developing this breadth without losing the quantitative rigor is the central challenge of the DS-to-PM transition.",
  ].join("\n")
};

// ─── Product Designer → UX Researcher ────────────────────────────────────────
paths["Product Designer|||UX Researcher"] = {
  from: "Product Designer", to: "UX Researcher",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a lateral move within the design discipline — both roles are user-centered, but they serve different functions. Designers synthesize; researchers generate the raw material that designers synthesize from. The shift is less about learning entirely new skills and more about developing formal research methodology rigor that design work rarely demands. [The UX research reckoning is here — Judd Antin] is essential reading for this transition: Judd, who built the research practice at Facebook and led research at Airbnb, argues that most user-centered work in tech is actually performance — going through the motions — rather than research designed to change minds. Moving from design to research means committing to the latter.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is research methodology rigor. Designers conduct informal research — absorbing user feedback, watching usability sessions, reading support tickets. UX researchers design formal studies with recruiting criteria, discussion guides, analysis frameworks, and a deliberate choice between statistical and qualitative approaches. [The UX research reckoning is here — Judd Antin] draws the sharpest possible line here: \"We don't validate, we falsify. We are looking to be wrong.\" Most designers who conduct research are validating assumptions, not falsifying them. The transition to researcher requires genuinely committing to the falsification mindset — designing studies intended to surface what the team is wrong about.",
    "",
    "The second gap is influence through insight rather than artifact. [The UX research reckoning is here — Judd Antin] identifies this as the central challenge facing the research field: researchers often produce good findings but fail to make them land. Designers influence through deliverables — wireframes, prototypes, specs. Researchers influence through insights and recommendations — findings that change how the team thinks about a problem. Judd's team at Airbnb trained researchers who went on to lead at Figma, Notion, Slack, Robinhood, and Duolingo; what distinguished them was the ability to make research matter, not just make it rigorous.",
    "",
    "## Skills to Build",
    "",
    "- **Research methodology**: The core methods to develop are moderated usability testing, unmoderated remote testing, in-depth user interviews, diary studies, survey design, and competitive analysis. [The UX research reckoning is here — Judd Antin] argues that the field's problems are not methodological but organizational — researchers being brought in too late, after decisions are made. As a designer moving into research, you already understand when in the process research is valuable. The skill to develop is the methodological rigor to conduct it well.",
    "",
    "- **Stakeholder communication for research**: [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] describes how to structure communication that aligns executives and stakeholders around ambiguous strategic questions. Researchers face an equivalent challenge: translating qualitative findings — which are inherently ambiguous and resist simple summary — into actionable recommendations that product and design teams can act on. The structural thinking from Chandra's framework applies directly.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"making things\" → \"understanding things\"**: Designers produce artifacts. Researchers produce insights. [The UX research reckoning is here — Judd Antin] is blunt about what this requires: a genuine commitment to being wrong. The satisfaction shifts from completing a design to completing a study that changes the team's direction. This is a meaningful identity shift for designers energized by creative output.",
    "",
    "**From \"designing the solution\" → \"defining the problem\"**: Designers typically enter the process after the problem is defined. Researchers define — and sometimes redefine — the problem itself. [The UX research reckoning is here — Judd Antin] describes how the most common failure mode in user research is being brought in at the end: \"Can you just run a quick user study to validate our assumptions?\" Moving into research means fighting for earlier involvement and accepting that your job is to define what the team should be solving, not to validate what they've already decided.",
  ].join("\n")
};

// ─── UX Researcher → Product Designer ────────────────────────────────────────
paths["UX Researcher|||Product Designer"] = {
  from: "UX Researcher", to: "Product Designer",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Researchers who move to design bring a significant advantage: they understand users at a depth most designers don't. [The PM 🤝 Design Partnership] — written by Katie Dill, who led design at Airbnb, Lyft, and Stripe — identifies user understanding as the foundation of great design: \"Ask a Product Designer what their job is and what you'll hear is likely very close to what a Product Manager would say: to know what customers need and to deliver it in the form of products that drive the business.\" You already have half of this equation. The gap is in translating that understanding into high-quality visual and interaction design deliverables, consistently and quickly. Expect 12–18 months of deliberate design practice — portfolio projects, courses, mentorship — before you can credibly compete for a designer role.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is design craft: visual hierarchy, typography, interaction patterns, component design, and the ability to work fluently in Figma at production speed. [The PM 🤝 Design Partnership] describes Katie Dill's first principle for PM-design partnership: \"Trust the designer's expertise.\" That expertise is specific — it is the ability to render good user understanding into a concrete, buildable artifact that engineers can implement. Your research background gives you the understanding; the expertise is in the rendering, which is learnable but slow to develop.",
    "",
    "The second gap is production velocity. Design roles are evaluated on the ability to produce design artifacts at the pace product development requires. [The PM 🤝 Design Partnership] describes the designer's role as \"conductor\" — holding the creative vision while moving the product forward. Conductorship requires production speed. A designer who produces slowly becomes a bottleneck rather than an accelerant, regardless of the quality of any individual artifact.",
    "",
    "## Skills to Build",
    "",
    "- **Design tooling and production**: Figma fluency, component library management, prototyping, and handoff to engineering are the practical skills to develop. [What's in your software stack] surveys what product and design teams actually use across startups — Figma dominates design, but the full stack includes prototyping, handoff, and collaboration tools. None of these are conceptual — they require hands-on practice with real design problems.",
    "",
    "- **Cross-functional collaboration from the design seat**: [The PM 🤝 Design Partnership] is the most directly relevant piece in the corpus. Katie Dill's advice is structured as PM guidance, but reading it from the designer's seat is equally valuable — it reveals exactly what PMs need from designers: \"Include designers early,\" \"create shared goals,\" \"invest in north stars.\" Researchers-turned-designers who understand this dynamic from day one integrate effectively into product teams immediately.",
    "",
    "- **Understanding product strategy context**: [Getting better at product strategy] covers what PMs are optimizing for when they make product decisions. The best designers understand why they're designing what they're designing. [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] gives the framework. Design decisions disconnected from strategy get overridden; designers who can articulate why a design choice serves the product strategy earn more trust and more autonomy.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"what users need\" → \"what users need, rendered visually\"**: Researchers understand user needs deeply. [The PM 🤝 Design Partnership] describes designers and PMs as wanting the same thing — user value — but having very different methods. The designer's method is visual and concrete; it involves many judgment calls the research doesn't resolve: what color, what layout, what interaction pattern, what to leave out. Your research background gives you better starting material than most; the gap is in the judgment required to translate insight into artifact.",
    "",
    "**From \"presenting findings\" → \"making decisions\"**: Research is advisory. Design is decisional — a design goes to engineering, and that design is your recommendation. [The PM 🤝 Design Partnership] describes how designers and PMs have different approaches that \"can lead to friction\" — the designer's approach is to own the solution, not advise on it. Moving from recommending to deciding is the central professional shift of this transition.",
  ].join("\n")
};

// ─── Product Manager → Engineering Manager ────────────────────────────────────
paths["Product Manager|||Engineering Manager"] = {
  from: "Product Manager", to: "Engineering Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is an uncommon transition that typically requires going back to coding first, or making the move to a small startup where roles are fluid. Most PMs who become EMs do so because they want to lead people and build technical depth simultaneously, or because they're at an early-stage company where the EM role is accessible without a traditional engineering career path. [Moving from IC product manager to manager of product managers] describes the PM-to-manager transition in general — the same principles apply here, but the technical credibility requirement makes PM-to-EM meaningfully harder than PM-to-PM-manager. A more realistic stepping stone: chief of staff or associate GM role, which builds people and operational leadership without requiring coding.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is technical credibility. EMs earn the trust of engineers through demonstrated technical judgment — code review, architecture decisions, realistic scoping. [The top 5 things PMs should know about engineering — Justin Gage] describes what technical knowledge matters for PM-engineering collaboration, but an actual EM needs significantly more depth: the ability to evaluate technical proposals, identify engineering risks, and have credible opinions on build vs. buy decisions. PMs who want to become EMs without this foundation struggle to earn team trust regardless of their product track record.",
    "",
    "The second gap is people management with formal authority. [Moving from IC product manager to manager of product managers] is explicit that the shift from IC to manager is primarily an identity shift: your output is no longer your own work, it's what your team produces. For PMs moving to EM, this is familiar in concept — PMs already coordinate team output — but the formal responsibility is different: performance reviews, career development conversations, compensation decisions, and when necessary, managing people out. These require practice in contexts where the feedback loops are clear.",
    "",
    "## Skills to Build",
    "",
    "- **Technical credibility**: [The top 5 things PMs should know about engineering — Justin Gage] gives the PM baseline — understanding sprint velocity, technical debt, and system architecture at a conceptual level. Moving to EM requires going substantially further: being able to review code, evaluate architectural proposals, and identify when engineering estimates are off. PMs who want to make this transition need to deliberately invest in technical depth through side projects, open source contributions, or structured engineering coursework.",
    "",
    "- **People management fundamentals**: [Moving from IC product manager to manager of product managers] describes the five unexpected jobs of the PM manager: stopping bad decisions before they happen, unblocking teams, maintaining PM quality, maintaining product quality, and building a united leadership group. While this covers PM management specifically, the structural insight applies to any IC-to-manager transition: the job shifts from doing to enabling, and your success is measured through others' output, not your own.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"own the what\" → \"own the how\"**: [What is product management] describes the PM as responsible for delivering business impact — the what and the why. EMs own how it gets built: the processes, the team health, the technical quality, the delivery rhythm. These orientations can conflict. Former PMs who become EMs sometimes struggle to give up opinions about product direction that are no longer theirs to have.",
    "",
    "**From \"influence without authority\" → \"responsible for the team\"**: [What is product management] describes the PM as someone who \"marshals the resources of their team\" — a diplomatic description of leading without a reporting structure. As an EM, you have the reporting structure. That authority is heavier than most PMs anticipate: you are responsible for people's careers, not just their output. [Moving from IC product manager to manager of product managers] captures this well: the transition is as much psychological as it is functional.",
  ].join("\n")
};

// ─── Data Scientist → Engineering Manager ────────────────────────────────────
paths["Data Scientist|||Engineering Manager"] = {
  from: "Data Scientist", to: "Engineering Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is an unusual but possible transition, most often occurring at companies with ML-heavy engineering teams where data scientists are embedded deeply in engineering. The gap is significant: data scientists are individual contributors measured on insight quality; EMs are people leaders measured on team output and health. [Moving from IC product manager to manager of product managers] describes what the IC-to-manager shift requires — it covers PM management, but the structural shift is identical: you stop being measured on your own output and start being measured on the output of people you develop. Expect to spend 12–18 months developing formal people management experience before this transition is credible.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is people management. Data scientists work with data, not directly responsible for the development of other people. EMs hire, coach, set career expectations, and manage performance. [Fostering a culture of experimentation] is relevant here: building the kind of rigorous, psychologically safe team culture that produces good experiments is exactly the kind of cultural leadership an EM of an ML team needs to develop. The experimentation mindset you have as a DS is transferable; the people management scaffolding around it is not.",
    "",
    "The second gap is software engineering credibility in product engineering contexts. [The top 5 things PMs should know about engineering — Justin Gage] describes what non-engineers need to understand about engineering — the DS-to-EM path requires going further than this. Most EM roles in product engineering require that you can evaluate software architecture and review production code. DS work involves code but often not production-grade software engineering at scale. The most viable path for DS-to-EM is targeting EM roles specifically on ML/data engineering teams, where your DS background is the right credential.",
    "",
    "## Skills to Build",
    "",
    "- **Leading teams through ambiguity**: [Fostering a culture of experimentation] describes how rigorous experimentation cultures are built — establishing shared standards for what counts as evidence, creating psychological safety to run tests that fail, and making data-driven decisions at the team level. For a DS becoming EM of an ML team, this is your most direct prior-experience advantage. The skill to develop is translating this into team practices: how you run planning, how you give feedback, how you handle a team member whose work isn't landing.",
    "",
    "- **The IC-to-manager shift**: [Moving from IC product manager to manager of product managers] is the most relevant piece for understanding the identity change this transition requires. It covers PM management, but the central insight applies universally: \"Your output is now the output of your team.\" Data scientists are trained to be right — to produce rigorous analysis. Managers are trained to be effective — to develop people and remove blockers even when they don't know the right answer.",
    "",
    "- **Understanding the PM-engineering interface**: [The top 5 things PMs should know about engineering — Justin Gage] describes this relationship from the PM side. As an EM, understanding what PMs need from engineering — realistic scoping, technical trade-off transparency, proactive communication on blockers — helps you build a team that works well with its product partners from day one.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"solving problems\" → \"growing people who solve problems\"**: Data scientists are individual problem solvers — the satisfaction comes from personally cracking a hard analytical problem. [Moving from IC product manager to manager of product managers] describes this shift precisely: you stop doing the work and start creating the conditions for the work. This requires giving up the direct satisfaction of solving hard problems yourself in exchange for the more diffuse satisfaction of building a high-performing team.",
    "",
    "**From \"be right\" → \"be effective\"**: [Fostering a culture of experimentation] builds on the idea that DS rigor — designing experiments to find the truth — is a strength. But EM effectiveness requires more than rigor: it requires making decisions with incomplete information, resolving conflicts where both sides are partially right, and keeping people motivated through uncertainty. [Building a world-class data org — Jessica Lachs] captures the management version of this: the best data leaders are not just technically excellent, they are effective at driving decisions across the organization.",
  ].join("\n")
};

const updated = { ...existing, ...paths };
fs.writeFileSync(outPath, JSON.stringify(updated, null, 2));
console.log("Rewrote " + Object.keys(paths).length + " paths. Total: " + Object.keys(updated).length);
