"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};
const paths = {};

paths["UX Lead|||Director of Product"] = {
  from: "UX Lead", to: "Director of Product",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "UX Leads are unusually well-positioned for the Director of Product role — but the path is not obvious and the gap is real. You already lead people, you already sit at the intersection of user needs and product decisions, and you've built the cross-functional relationships that the Director role depends on. What's missing is formal ownership of business outcomes, product strategy across multiple teams, and the specific skill of managing PMs rather than designers. [Product management career ladders] shows that Director of Product is typically the first level where company-wide strategic impact is a hard requirement, not just a nice-to-have — and it's where the IC and manager tracks in PM diverge permanently. Expect 1–2 years of deliberate repositioning, often involving a hybrid or embedded PM role as a stepping stone.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is business accountability. UX Leads are measured on design quality — how well the product reflects user needs, how cohesive the experience is, how well the design team executes. [What is product management] defines the Director of Product's output differently: business impact, delivered by marshaling the resources of multiple teams. You are no longer accountable for how things look and feel. You are accountable for whether the product moves the business. This is a meaningful identity shift, not just a title change.",
    "",
    "The second gap is product strategy ownership. [The PM 🤝 Design Partnership] describes the PM-design relationship as one where designers react to product direction that PMs set. As a UX Lead, you've been on the reacting side — shaping how solutions look, questioning whether they serve users well. As a Director of Product, you set the direction that everyone else reacts to. [Getting better at product strategy] is direct on what this requires: a coherent plan with 3–5 concrete investments that, executed well, move the product toward winning. UX training gives you the user insight to inform that plan; it rarely gives you the practice of owning and defending it.",
    "",
    "Third: managing PMs is different from managing designers. [Moving from IC product manager to manager of product managers] lays out five unexpected jobs of the PM manager: stopping bad decisions before they happen, unblocking teams, maintaining the PM quality bar, maintaining the product quality bar, and building a united leadership group. Designers execute a defined craft; PMs operate with significant judgment and autonomy. Managing PMs means coaching people whose work is harder to evaluate, whose instincts you need to challenge without overriding, and whose success is ultimately measured in business outcomes you both share.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy at Director scope**: [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] gives the framework Directors need: connecting mission and vision through 3–5 concrete strategic investments, then aligning the organization around executing them. [Mission → Vision → Strategy → Goals → Roadmap → Task] describes the full chain the Director is responsible for holding together. Your UX background gives you a strong user-insight foundation for strategy; the skill to develop is translating that insight into a plan that engineering, data, and business stakeholders can execute against.",
    "",
    "- **Managing and developing PMs**: [Moving from IC product manager to manager of product managers] is the most directly relevant piece in the corpus for this transition. The five unexpected jobs — especially \"stopping bad decisions before they happen\" and \"maintaining the PM quality bar\" — are the hardest to develop without direct practice. UX Leads who want to move into Director of Product roles should seek out opportunities to formally mentor or shadow PMs before making the full jump.",
    "",
    "- **Prioritization across multiple product teams**: [Prioritizing] covers the foundational framework. At Director scope, the challenge is prioritization across teams — making calls about which product area gets resources, which roadmap gets accelerated, which gets deprioritized. [Product management career ladders] shows that scope and impact are the two attributes that most separate Director-level PMs from senior ICs. Developing genuine opinions about cross-team tradeoffs — and being willing to defend them — is the practical work of this transition.",
    "",
    "- **The full PM job from the leader's seat**: [What is product management] is worth reading carefully as a UX Lead. The three core PM jobs — shape the product, ship the product, synchronize the people — map to skills you have in varying degrees. Shaping is your strength. Shipping (execution discipline, managing delivery) and synchronizing (cross-functional alignment, executive communication) are where most UX Leads need deliberate development before they can credibly run a product org.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"user advocate\" → \"business decision-maker\"**: UX Leads are trained to advocate for the user — to push back when product or business pressures compromise the experience. Directors of Product hold both simultaneously and make tradeoffs between them. [What is product management] describes this as the core PM tension: business impact comes from solving customer problems, but not every customer problem is worth solving at a given moment. Moving from advocate to decision-maker means accepting that you will sometimes choose business priorities over user experience improvements, and being able to explain why.",
    "",
    "**From \"design quality\" → \"team quality\"**: [Moving from IC product manager to manager of product managers] describes the central shift of any IC-to-manager transition: your output is no longer your own work, it's the output of your team. For UX Leads, this is familiar — you already manage designers. The extension is managing PMs, whose work is less visually evaluable and whose quality bar is harder to hold. [Product management career ladders] identifies leadership as the number-one attribute at Director level: the ability to elevate the people around you, not just the work you personally produce.",
    "",
    "**From \"seat at the table\" → \"owning the table\"**: UX Leads typically fight to have design represented in product decisions. Directors of Product run the product decisions. [The PM 🤝 Design Partnership] describes the PM as \"conductor\" — holding the creative vision while moving the product forward. As Director, you become the conductor of conductors: setting the vision that the PMs, designers, and engineers on your teams execute toward. That shift from participant to owner is the defining experience of the first year in the Director role.",
  ].join("\n")
};

const updated = { ...existing, ...paths };
fs.writeFileSync(outPath, JSON.stringify(updated, null, 2));
console.log("Wrote " + Object.keys(paths).length + " paths. Total: " + Object.keys(updated).length);
