"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};
const paths = {};

paths["Software Engineer|||Data Scientist"] = {
  from: "Software Engineer", to: "Data Scientist",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a lateral technical transition — you stay in an engineering-adjacent role but shift from building systems to extracting insight from them. The skill overlap is real (programming, systems thinking, comfort with data infrastructure), but the orientation flips: instead of asking 'how do I build this?', you ask 'what does the data tell us, and what should we do about it?' Expect the transition to take 6–18 months with deliberate practice in statistics, experimentation, and analytics tooling.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is the shift from building to measuring. Engineers tend to be oriented toward output. Data scientists are oriented toward understanding. As [Building a world-class data org — Jessica Lachs] articulates, good analytics is not a service function — it's a business-impact-driving function. Jessica draws a sharp distinction between analytics that just answers 'why did this happen' versus analytics that answers 'what should we do now that we know this?' That second question requires judgment that goes beyond SQL.",
    "",
    "The second gap is experimental rigor. [Fostering a culture of experimentation] describes how Airbnb built its data culture: running experiments carefully, understanding statistical significance, and not trusting results that can't be reproduced. Engineers often run 'experiments' informally — ship it and see. Data scientists need to design experiments before they run them, define success metrics upfront, and be skeptical of positive results.",
    "",
    "Third: choosing the right metrics. Jessica Lachs is direct in [Building a world-class data org — Jessica Lachs]: retention is a terrible thing to goal on. Defining metrics that are both measurable and actually reflect what matters is harder than it looks, and it's one of the things data scientists are most valued for.",
    "",
    "## Skills to Build",
    "",
    "- **Experimentation design and culture**: [Fostering a culture of experimentation] covers how Airbnb's data culture was built — not just running A/B tests but building a team-wide belief that data should drive decisions. For an engineer transitioning to DS, the key skill is learning to design experiments before writing any code: define the hypothesis, identify the metrics, calculate required sample sizes, and establish guardrail metrics. This is different from engineering's typical build-and-observe approach.",
    "",
    "- **Metrics definition and data org structure**: [Building a world-class data org — Jessica Lachs] is the most directly relevant piece for this transition. Jessica's DoorDash data team is one of the most respected in tech. Her core principle: analytics must drive business impact, not just describe what happened. For engineers moving to DS, this means learning to connect data work to decisions — and being willing to push back when a metric is being used in a way that will lead to bad decisions.",
    "",
    "- **Analytics and DS tooling**: [What's in your software stack] provides a survey of what tools product and data teams actually use across startups. For engineers, learning the analytics and DS stack — data warehouses, BI tools, notebook environments, experiment platforms — is the most concrete technical gap to close.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"build things\" → \"understand things\"**: Engineers ship. Data scientists interrogate. The satisfaction in DS work comes from answering questions correctly and influencing decisions, not from shipping features. This is a real shift in how you measure your own productivity and contribution.",
    "",
    "**From \"answer given, build it\" → \"question given, find the answer\"**: Engineers receive well-defined problems. DS work starts from poorly-defined questions: why is retention dropping? Which cohort of users is most valuable? These questions require translating a business problem into an analytical one, which is a skill that takes deliberate practice to develop. [Building a world-class data org — Jessica Lachs] repeatedly emphasizes that the data scientist's job starts before the SQL."
  ].join("\n")
};

paths["Software Engineer|||Product Designer"] = {
  from: "Software Engineer", to: "Product Designer",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is an uncommon but achievable transition that typically requires deliberate portfolio-building outside your current role. Engineers who design well — who care about how things feel, not just how they work — can make this move, but the barrier is showing proof. You need a portfolio of designed work, not just built work. Expect 1–2 years of side projects, design courses, and building in public before you can make a credible case for a junior design role.",
    "",
    "A common stepping stone: front-end engineer at a small product team, where the lines between engineering and design are blurry enough to let you practice both. This gives you design exposure without requiring a full leap.",
    "",
    "## Gaps to Close",
    "",
    "The biggest gap is the shift from correctness to feel. Engineering has right answers — the code either works or it doesn't. Design is about tradeoffs in how things feel, which requires a different kind of judgment that is harder to develop from first principles without feedback.",
    "",
    "The second gap is user research. Good product design is grounded in deep understanding of how users think and what they struggle with — not what engineers assume they struggle with. Learning to observe users, conduct interviews, and synthesize qualitative insights into design decisions is the most important skill to develop.",
    "",
    "The third gap is design tooling fluency — Figma, prototyping, component systems. These are learnable quickly but require deliberate practice.",
    "",
    "The provided transcripts do not cover the Software Engineer to Product Designer transition directly. The episodes surfaced by keyword matching are primarily about product management and strategy. The gaps and skills below draw from adjacent content in the corpus.",
    "",
    "## Skills to Build",
    "",
    "- **Understanding what product teams actually need from design**: [What is product management] and [What's in your software stack] together reveal how design fits into the broader product development process. Designers who understand PM priorities — customer problems, business impact, roadmap constraints — are vastly more effective than those who optimize for craft in isolation. Your engineering background will help you understand constraints; you'll need to develop the design craft to complement it.",
    "",
    "- **Product strategy context for design decisions**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] are relevant because the best designers understand why they're designing what they're designing. Design decisions that are disconnected from strategy tend to get overridden. Designers who can articulate why a design choice serves the product strategy earn more trust and get more autonomy.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"does it work\" → \"does it feel right\"**: Engineering success is binary. Design success is on a spectrum and is judged by how it lands with real users, not by whether it compiles. The provided transcripts do not cover this directly.",
    "",
    "**From \"build for specification\" → \"discover the right specification\"**: Engineers typically receive a design spec. Designers create the spec — starting from user research, competitive analysis, and product strategy. This requires comfort with ambiguity and iteration that is different from engineering's typical workflow. The provided transcripts do not cover this transition in depth."
  ].join("\n")
};

paths["Engineering Manager|||VP of Engineering / CTO"] = {
  from: "Engineering Manager", to: "VP of Engineering / CTO",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a significant leadership step — from managing a team to owning an engineering organization and representing technology at the company's highest level. The skills that make a great EM (technical credibility, team trust, execution) are necessary but not sufficient. The CTO role adds a new dimension: company-wide technical vision, cross-functional executive relationships, board-level communication, and responsibility for how technology shapes the business strategy. Expect the transition to take 3–5 years of deliberate growth in management scope before it becomes realistic.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is operating at company scope rather than team scope. An EM optimizes their team. A VP of Engineering or CTO optimizes how technology serves the entire company. [Making Meta — Andrew 'Boz' Bosworth] illustrates what this looks like at the extreme: as Meta's CTO, Boz is responsible for technology decisions that affect billions of users and thousands of engineers. Even at a smaller scale, the VPE/CTO role requires thinking about how the engineering organization is structured, how it interfaces with product and business, and what technical bets will matter in 3–5 years.",
    "",
    "The second gap is external-facing communication. CTOs speak to the board, represent the company to technical candidates, engage with the engineering community, and sometimes write or speak publicly. Engineers and EMs rarely develop these skills. [Leaving big tech to build the #1 technology newsletter — Gergely Orosz] is instructive here: Gergely built a 300,000+ subscriber technical audience while still working as a senior engineer at Uber. His external credibility became its own kind of leverage.",
    "",
    "Third: the ability to hold technical vision under commercial pressure. The CTO role requires saying no to technical shortcuts when the business wants speed — and yes to shipping when technical perfectionism is slowing down the company. This judgment only comes from experience at the intersection of engineering and business.",
    "",
    "## Skills to Build",
    "",
    "- **Engineering organization design**: As a VPE or CTO, you're designing the system that produces software — team structures, hiring philosophy, career ladders, technical processes. [Making Meta — Andrew 'Boz' Bosworth] touches on what this looks like at scale: Boz joined Facebook as the 10th engineer and has been through every phase of engineering organization growth. His emphasis on what it actually costs — working 120-hour weeks, sleeping four hours at a time — is a candid view of what organizational growth demands from technical leaders.",
    "",
    "- **Technical strategy and long-horizon thinking**: [Building eval systems that improve your AI product] covers a domain where CTO-level judgment is increasingly critical — how to build AI systems that actually improve over time, with structured evaluation rather than vibes. For engineering leaders today, having a coherent point of view on AI's role in their technical stack is becoming table stakes.",
    "",
    "- **Public technical credibility**: [Leaving big tech to build the #1 technology newsletter — Gergely Orosz] demonstrates one path to building the kind of external reputation that makes VPE and CTO roles accessible. Gergely's newsletter earns him more than he made at Uber, but the more relevant point is that writing, speaking, and engaging with the engineering community publicly creates opportunities that staying heads-down never does.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"my team's output\" → \"the company's technical capability\"**: EMs think about their team. CTOs think about the organization as a whole — how it hires, how it's structured, what it's capable of building, and where it's falling short. This requires a willingness to sacrifice team-level optimization for company-level outcomes, which can feel like a betrayal of the team-first instincts that made you a good EM.",
    "",
    "**From \"technical decisions\" → \"technical strategy\"**: EMs make many small technical decisions. CTOs make fewer, larger ones — and those decisions have to account for the company's business strategy, competitive landscape, and 3-year horizon. [Making Meta — Andrew 'Boz' Bosworth] describes the complexity of holding both technical rigor and business reality simultaneously at the executive level. The ability to say 'we are making a technical bet because it serves the business strategy' — and to be right about it — is the defining CTO skill."
  ].join("\n")
};

const updated = { ...existing, ...paths };
fs.writeFileSync(outPath, JSON.stringify(updated, null, 2));
console.log("Wrote " + Object.keys(paths).length + " paths. Total: " + Object.keys(updated).length);
