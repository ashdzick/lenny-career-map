"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};
const paths = {};

// ── Designer → PM ──────────────────────────────────────────────────────────
paths["Product Designer|||Product Manager"] = {
  from: "Product Designer", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is one of the most natural transitions in product — designers who move to PM already understand users deeply, can spot bad UX from a mile away, and have lived through the product development process. The gaps are on the business and strategy side. Expect the transition to take 6–12 months, often through an informal stretch into PM responsibilities at your current company before making it formal.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is business accountability. Designers are accountable for quality and craft. PMs are accountable for business impact — revenue, retention, activation. [What is product management] defines the PM's job as delivering business impact by identifying and solving the most impactful customer problems. 'Most impactful' is a business judgment, not a design judgment. Designers who move to PM have to develop comfort making decisions that sometimes make the product less beautiful in service of moving a business metric.",
    "",
    "The second gap is prioritization discipline. Designers prioritize by quality — what will create the best user experience. PMs prioritize by impact-to-effort ratio across many competing initiatives. [Prioritizing] lays out the core framework: one list, T-shirt sizes, sorted by impact/effort. The instinct to advocate for design quality has to make room for the instinct to sequence what matters most for the business.",
    "",
    "Third: stakeholder management and organizational navigation. Designers typically have one or two primary stakeholders (the PM and the design lead). PMs manage up, across, and down: engineering, design, data, marketing, legal, executives. The breadth of relationships is larger and the conflicts are more frequent.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy**: Your design instincts are an asset here — you already think about the product holistically. What's missing is the strategic framing. [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover how to develop a product strategy: define the north-star, identify 3–5 concrete investments, align stakeholders around a shared plan. Designers who develop this framing alongside their existing craft perspective become unusually strong PMs.",
    "",
    "- **The PM role in full**: [What is product management] is worth reading carefully as a designer-to-PM. The 'synchronize the people' dimension — aligning engineering, design, data, and marketing around one vision — is where most designer-PMs need the most development. You're used to being aligned to. As a PM, you have to align everyone else.",
    "",
    "- **Business metrics and impact measurement**: [Product-led marketing — Kyle Poyar] and [Prioritizing conversion opportunities] introduce the quantitative side of the PM role: funnel economics, conversion optimization, metrics that matter. Designers who develop fluency in these areas can bridge the craft/business gap in ways that make them standout PMs.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"does it feel right\" → \"does it move the number\"**: Designers evaluate success by feel and craft quality. PMs evaluate success by measurable business impact. These often align, but when they don't, the PM has to choose the metric. This shift is uncomfortable for designers who've built their identity around craft.",
    "",
    "**From \"advocate for the user\" → \"advocate for the right user problem\"**: Designers and PMs are both user advocates, but at different levels. Designers advocate for the experience. PMs advocate for solving the most impactful user problem — which sometimes means deprioritizing a beautiful solution to an unimportant problem in favor of a rougher solution to a critical one. [What is product management] makes this hierarchy explicit."
  ].join("\n")
};

// ── Designer → UX Researcher ────────────────────────────────────────────────
paths["Product Designer|||UX Researcher"] = {
  from: "Product Designer", to: "UX Researcher",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a lateral move within the design discipline — both roles are user-centered, but they serve different functions. Designers synthesize; researchers generate the raw material that designers synthesize from. The transition typically requires developing formal research methodology skills: study design, interview protocols, usability testing, synthesis frameworks. It's accessible within 6–12 months of deliberate practice.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is research methodology rigor. Designers conduct informal research — absorbing user feedback, watching usability sessions, reading support tickets. UX researchers design formal studies: recruiting criteria, discussion guides, analysis frameworks, statistical vs. qualitative approaches. The difference is not in caring about users; it's in the systematic structure around gathering and synthesizing user evidence.",
    "",
    "The second gap is influence through insight rather than artifact. Designers influence through deliverables — wireframes, prototypes, design specs. Researchers influence through insights and recommendations — findings that change how the team thinks about a problem. This requires a different kind of communication skill: presenting ambiguous qualitative data in a way that drives clear decisions.",
    "",
    "The provided transcripts do not cover the Product Designer to UX Researcher transition directly. The corpus is primarily focused on product management and business strategy. The gaps and skills below draw from adjacent content.",
    "",
    "## Skills to Build",
    "",
    "- **Research methodology**: The provided transcripts do not cover this directly. The core methods to develop: moderated usability testing, unmoderated remote testing, in-depth user interviews, diary studies, survey design, and competitive analysis. Each method has specific appropriate use cases that require practice to recognize.",
    "",
    "- **Stakeholder communication for research**: [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] is relevant indirectly — it describes how to structure communication that aligns executives and stakeholders around ambiguous strategic questions. Researchers face a similar challenge: translating qualitative findings (which are inherently ambiguous) into actionable recommendations that product and design teams can act on.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"making things\" → \"understanding things\"**: Designers produce artifacts. Researchers produce insights. The satisfaction shifts from finishing a design to completing a study and watching a team change direction based on your findings. This is a meaningful identity shift for designers who are energized by creative output.",
    "",
    "**From \"designing the solution\" → \"defining the problem\"**: Designers typically enter the process after the problem is defined. Researchers define — and sometimes redefine — the problem itself. Moving upstream in this way requires comfort with the earliest, most ambiguous phase of product development."
  ].join("\n")
};

// ── UX Researcher → Product Designer ───────────────────────────────────────
paths["UX Researcher|||Product Designer"] = {
  from: "UX Researcher", to: "Product Designer",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Researchers who move to design bring a significant advantage: they understand users at a depth most designers don't. The gap is in production skills — the ability to translate that understanding into high-quality visual and interaction design deliverables, quickly and consistently. Expect 12–18 months of deliberate design practice (portfolio projects, design courses, mentorship) before you can credibly compete for a designer role.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is design craft: visual hierarchy, typography, interaction patterns, component design, and the ability to work fluently in Figma at production speed. Researchers often underestimate how long this takes to develop. Knowing what good design looks like (which researchers typically do) is not the same as being able to produce it.",
    "",
    "The second gap is production velocity. Design roles are evaluated on the ability to produce design artifacts at the pace product development requires — not just on the quality of any single artifact. Building that speed requires volume of practice.",
    "",
    "The provided transcripts do not cover this transition directly.",
    "",
    "## Skills to Build",
    "",
    "- **Design tooling and production**: Figma fluency, component library management, prototyping, and handoff to engineering are the practical skills to develop. None of these are conceptual — they require hands-on practice with real design problems.",
    "",
    "- **Cross-functional collaboration from the design seat**: [What is product management] describes how design fits into the product development process from the PM's perspective. Understanding what PMs and engineers need from designers — clear specs, responsive iteration, opinionated recommendations — helps researchers-turned-designers integrate effectively into product teams from day one.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"what users need\" → \"what users need, rendered visually\"**: Researchers understand user needs deeply. The designer's job is to translate that understanding into a concrete visual and interaction design — a judgment-heavy process that involves many decisions the research doesn't resolve. Your research background gives you better starting material than most; the gap is in the translation.",
    "",
    "**From \"presenting findings\" → \"making decisions\"**: Research is advisory. Design is decisional — at some point, a design goes to engineering, and that design is your recommendation. Moving from recommending to deciding is a meaningful professional shift."
  ].join("\n")
};

// ── UX Researcher → PM ──────────────────────────────────────────────────────
paths["UX Researcher|||Product Manager"] = {
  from: "UX Researcher", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Researchers who move to PM have one of the strongest user understanding foundations of any PM background. The gap is on the business and execution side — prioritization, roadmap ownership, stakeholder alignment, and business metrics. This is a well-documented path; many strong PMs came from research. Expect 6–12 months to develop the business and execution muscles, often by taking on informal PM responsibilities at your current company first.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is business accountability. Researchers provide recommendations; PMs make decisions and own the outcomes. [What is product management] defines the PM's job as delivering business impact — which means being accountable for whether what gets built actually moves the business, not just whether it's well-informed by user research.",
    "",
    "The second gap is prioritization across competing options. Researchers generate insights. PMs have to take those insights (along with engineering constraints, business goals, and strategic priorities) and decide what to build next. [Prioritizing] and [Mission → Vision → Strategy → Goals → Roadmap → Task] cover the frameworks for making these decisions systematically.",
    "",
    "Third: execution orientation. Research timelines are measured in weeks (a study, a synthesis, a report). Product timelines are measured in sprints and quarters. PMs are accountable for shipping, not just for informing.",
    "",
    "## Skills to Build",
    "",
    "- **Prioritization**: [Prioritizing] is essential. The core framework — impact vs. effort, T-shirt sizes, sorted list — is the daily discipline of PM work. Your research background makes you unusually good at estimating impact accurately. The gap is in applying that judgment quickly and repeatedly across a full roadmap.",
    "",
    "- **Product strategy**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover the PM's strategic layer. Researchers often have strong instincts about what users need; the skill to develop is framing those instincts as a coherent strategy that aligns engineering, design, and business stakeholders.",
    "",
    "- **The full PM scope**: [What is product management] is worth reading carefully. The 'ship the product' and 'synchronize the people' dimensions are where most researcher-PMs need the most development. You're excellent at 'shape the product.' Shipping and synchronizing are different skills.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"recommend\" → \"decide\"**: Researchers present findings and let others decide. PMs make the call. This shift in accountability is significant — and in practice, often means making decisions with less information than a researcher would want.",
    "",
    "**From \"user evidence\" → \"user evidence + business evidence\"**: Researchers optimize for understanding users. PMs optimize for the intersection of user needs and business viability. Sometimes the most important user problem is not the most important business problem. PMs have to navigate that tension explicitly."
  ].join("\n")
};

// ── Data Analyst → PM ───────────────────────────────────────────────────────
paths["Data Analyst|||Product Manager"] = {
  from: "Data Analyst", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Data analysts have one of the strongest quantitative foundations of any PM background — you understand metrics, can run experiments, and think rigorously about causality. The gap is qualitative: talking to users, making product decisions without sufficient data, and influencing people who don't think in numbers. Expect 6–12 months of deliberate development on the qualitative and strategic sides, often by embedding more closely with a PM on your current team.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is qualitative judgment. Analysts are trained to wait for statistical significance. PMs often have to make decisions with weak signals, user interviews, and intuition. [Prioritizing at startups] makes this explicit: as an early-stage company, you simply don't have enough data for frameworks designed for larger companies. The analyst instinct to wait for better data can slow product development to a halt.",
    "",
    "The second gap is customer proximity. Analysts work with data generated by users. PMs talk directly to users. The difference is significant — behavioral data tells you what users did; conversations tell you why, and often reveal problems the data never surfaces.",
    "",
    "Third: the shift from providing insight to owning the outcome. Analysts inform decisions. PMs make them and are accountable for results.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover the strategic thinking PMs are expected to own. Analysts often underestimate how much of PM work is strategic framing rather than analysis. The ability to write a clear product strategy — not a data report — is a distinct skill.",
    "",
    "- **Prioritization**: [Prioritizing] is highly relevant. Your analytical background makes you well-equipped to estimate impact and effort rigorously. The skill to develop is making these estimates quickly under uncertainty, and making the call even when the data is ambiguous.",
    "",
    "- **The PM role scope**: [What is product management] defines the job: deliver business impact by marshaling team resources to solve the most impactful customer problems. Notice that 'marshaling the resources of your team' and 'most impactful customer problems' both require judgment that goes beyond analysis. Building that judgment through user conversations, market research, and cross-functional collaboration is the practical work of the transition.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"analyze what happened\" → \"decide what to do\"**: Analysts describe reality. PMs change it. This shift from descriptive to decisional is the central transition, and it requires a different relationship with uncertainty.",
    "",
    "**From \"be right\" → \"be useful\"**: Analysts are evaluated on correctness. PMs are evaluated on impact. Sometimes the right analysis isn't the useful one — and a PM who produces a technically correct analysis of the wrong question has failed. Developing the judgment about which questions matter most is the core PM skill."
  ].join("\n")
};

// ── Data Analyst → Data Scientist ───────────────────────────────────────────
paths["Data Analyst|||Data Scientist"] = {
  from: "Data Analyst", to: "Data Scientist",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a technical deepening, not a role change. The work overlaps significantly — both roles work with data, write code, and try to generate business insight. The difference is in methods and depth: data scientists build predictive models, run causal inference studies, and apply more advanced statistical techniques. The transition requires developing stronger statistical and ML foundations. Expect 6–18 months depending on your current technical depth and the target company's expectations.",
    "",
    "## Gaps to Close",
    "",
    "The primary technical gap is predictive modeling and machine learning. Analysts describe what happened. Data scientists predict what will happen and build systems that automate those predictions. This requires probability theory, statistical learning, and enough engineering to put models into production.",
    "",
    "The second gap is causal inference. [Fostering a culture of experimentation] describes what a rigorous experimentation culture looks like — running controlled experiments, measuring true causal effects, and being appropriately skeptical of observational data. Many analysts run correlational analyses; data scientists are expected to design experiments that establish causality.",
    "",
    "Third: understanding data infrastructure and ML systems. [Building a world-class data org — Jessica Lachs] touches on this — a mature data org requires the infrastructure to run experiments, the models to generate insights at scale, and the processes to make those insights actionable. Data scientists are expected to contribute to this infrastructure, not just consume it.",
    "",
    "## Skills to Build",
    "",
    "- **Experimentation and causal inference**: [Fostering a culture of experimentation] covers how to build and operate within an experimentation culture. For the transition from analyst to DS, the key skills are: designing experiments with adequate power, understanding treatment effects and confounding, and knowing when observational analysis is sufficient vs. when you need a controlled experiment.",
    "",
    "- **Business impact orientation**: [Building a world-class data org — Jessica Lachs] is the most relevant piece in the corpus. Jessica's distinction — analytics as a business-impact-driving function, not a service function — applies doubly to data scientists. DS who only answer 'what does the model predict?' without connecting it to 'what should the team do?' are less valuable than those who close that loop.",
    "",
    "- **Analytics and DS tooling depth**: [What's in your software stack] surveys the tools product and data teams use. For the DA-to-DS transition, developing depth in ML frameworks (scikit-learn, PyTorch/TensorFlow), experimentation platforms, and data pipeline tools is the practical technical work.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"describe\" → \"predict and prescribe\"**: Analysts answer 'what happened.' Data scientists answer 'what will happen' and 'what should we do about it.' The second question requires building systems, not just running queries.",
    "",
    "**From \"working with data\" → \"building data products\"**: DS work often produces artifacts that live in production — recommendation systems, churn models, fraud detectors. This is different from analysis, which produces a report that informs one decision. Developing the engineering discipline to build, deploy, and maintain these systems is a meaningful step up."
  ].join("\n")
};

// ── Data Analyst → Growth Manager ───────────────────────────────────────────
paths["Data Analyst|||Growth Manager"] = {
  from: "Data Analyst", to: "Growth Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a strong lateral transition — data analysts already have the quantitative foundation that makes growth work effective. The shift is from being the person who measures growth to being the person responsible for driving it. The gap is in the product and execution skills: designing experiments, owning a metric, shipping changes, and working across engineering and marketing. Expect 6–12 months to develop these muscles, often by working closely with a growth team before making the formal move.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is ownership of outcomes. Analysts support growth teams. Growth managers own the growth metric. [Breaking into growth] describes what growth PMs do: they are accountable for acquisition, activation, and retention metrics, which requires shipping changes, not just measuring them.",
    "",
    "The second gap is growth channel expertise. [Product-led marketing — Kyle Poyar] covers the two primary PLG growth levers: organic search/SEO and product virality. Analysts who haven't worked closely on these channels need to develop a working mental model of how each works and what moves the numbers.",
    "",
    "Third: stakeholder and cross-functional work. Analysts typically have a narrow set of stakeholders. Growth managers work across engineering, marketing, design, and data — owning the cross-functional roadmap for a metric.",
    "",
    "## Skills to Build",
    "",
    "- **Growth frameworks and ideation**: [Growth ideas] provides a comprehensive list of growth tactics across the funnel. [Growth inflections] examines what causes sudden growth acceleration. For an analyst moving to growth, developing a broad vocabulary of growth levers — and the instinct for which ones apply in which contexts — is the most important skill to build.",
    "",
    "- **Activation metric definition**: [How to determine your activation metric] covers one of the core growth PM skills: defining the leading indicator of long-term retention. Getting this right is harder than it looks — the activation milestone needs to be both measurable and causally connected to retention. Your analytical background gives you an advantage here; the skill to develop is translating statistical relationships into actionable product decisions.",
    "",
    "- **Experimentation culture**: [Fostering a culture of experimentation] describes what a rigorous growth experimentation culture looks like at Airbnb. You already understand the statistics; the skill to develop is the product side — writing experiment specs, prioritizing which experiments to run, and translating results into shipping decisions.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"measure growth\" → \"drive growth\"**: Analysts explain what happened to the growth curve. Growth managers own the curve. This shift from advisory to accountable is significant — and requires developing comfort making product bets based on incomplete data.",
    "",
    "**From \"one right answer\" → \"portfolio of experiments\"**: Analysts produce analyses with conclusions. Growth managers run experiments, most of which fail. Internalizing that a 20–30% win rate on experiments is normal — and that learning from failures is the job — is the central mindset shift."
  ].join("\n")
};

// ── Data Scientist → PM ──────────────────────────────────────────────────────
paths["Data Scientist|||Product Manager"] = {
  from: "Data Scientist", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Data scientists bring strong quantitative reasoning, experimentation discipline, and often deep product insight to PM roles. The gap is in the qualitative, strategic, and interpersonal dimensions of the job. This is a well-trodden path — many strong PMs came from DS backgrounds. The transition typically takes 6–12 months, often starting with a stretch role as a technical PM or APM at the same company.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is the shift from analysis to decision. Data scientists produce rigorous analysis and present it to decision-makers. PMs make the decisions and are accountable for the outcomes. This is a different kind of accountability — you can't hide behind the data when the product doesn't work.",
    "",
    "The second gap is customer proximity. Data scientists understand users through behavioral data. PMs talk to users directly — qualitative interviews, usability sessions, customer calls. The insight you get from a 45-minute user interview is often different from what the data shows, and PMs need both.",
    "",
    "Third: the breadth of the PM stakeholder map. Data scientists have a defined set of collaborators (data engineers, analysts, ML platform teams). PMs manage relationships with engineering, design, data, marketing, legal, and executives simultaneously.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover what PMs are expected to own at a senior level. DS-to-PM transitions often underestimate how much of the PM job is strategic framing — not analysis. Writing a product strategy document, presenting it to executives, and defending it under pressure are skills that require practice.",
    "",
    "- **Prioritization**: [Prioritizing] lays out the core PM prioritization discipline. Your DS background makes you well-equipped to estimate impact rigorously. The development area is making these calls quickly under uncertainty — without waiting for statistical significance — and communicating the reasoning to a non-technical audience.",
    "",
    "- **The PM role fully defined**: [What is product management] defines the three PM jobs: shape the product, ship the product, synchronize the people. DS-to-PM transitions are typically strong on the first and weaker on shipping and synchronizing. Developing the execution and alignment muscles is the practical work of the transition.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"prove it\" → \"bet on it\"**: DS work produces evidence-backed conclusions. PM work requires making bets before the evidence is conclusive. This shift in epistemic standards is one of the harder adjustments for analytically-trained professionals.",
    "",
    "**From \"technical depth\" → \"breadth across the product\"**: DS expertise is deep and narrow. PM expertise is broad — you need to be conversant in engineering tradeoffs, design principles, business metrics, and user psychology simultaneously. Developing this breadth without losing the analytical rigor is the central challenge."
  ].join("\n")
};

const updated = { ...existing, ...paths };
fs.writeFileSync(outPath, JSON.stringify(updated, null, 2));
console.log("Wrote " + Object.keys(paths).length + " paths. Total: " + Object.keys(updated).length);
