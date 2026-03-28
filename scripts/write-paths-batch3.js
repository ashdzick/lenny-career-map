"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};
const paths = {};

paths["Engineering Manager|||Product Manager"] = {
  from: "Engineering Manager", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is an uncommon but logical transition. EMs sit close to the product decisions — you've been in every sprint planning, every roadmap review, every design critique. The shift to PM is less about learning new knowledge and more about formally owning the decisions you've been influencing informally. The gap is giving up management authority and rebuilding your identity around product outcomes rather than team health. Expect a 6–12 month adjustment period.",
    "",
    "## Gaps to Close",
    "",
    "Your biggest gap as an EM moving to PM is that you've been optimizing for your team. PMs optimize for the product and the business. These sound similar but produce different instincts: EMs protect their engineers from unreasonable scope changes; PMs sometimes push for scope changes their engineers will hate because the customer problem demands it. You'll need to develop comfort on the other side of that conversation.",
    "",
    "The second gap is customer-facing skills. EMs spend most of their time with their team and with other leaders. PMs spend significant time with customers — conducting research, interpreting data, synthesizing user signals into product decisions. Building these habits takes time.",
    "",
    "Third: formal accountability for business outcomes. As an EM, if your team ships on time and morale is high, you're doing your job. As a PM, you're accountable for whether what your team shipped actually moved the business. [What is product management] makes this clear: the PM's output is business impact, not execution quality.",
    "",
    "## Skills to Build",
    "",
    "- **Prioritization from a product perspective**: [Prioritizing] covers the PM's core discipline — making one list, T-shirt sizing by impact and effort, sorting by ratio. As an EM, you've probably been involved in prioritization but from the 'can we build this?' angle. As a PM, you own the 'should we build this?' question. The shift requires developing genuine opinions about customer value, not just technical feasibility.",
    "",
    "- **Product strategy**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover what PMs are expected to own at a senior level. As an EM, you execute against a strategy. As a PM, you define it. Chandra's framework — connecting mission and vision through 3–5 concrete strategic investments — is directly applicable to the PM role.",
    "",
    "- **The full scope of the PM job**: [What is product management] is worth reading carefully as an EM-to-PM: you already know how to ship and synchronize. What you likely underinvest in is shaping the product upstream — talking to customers, synthesizing insights, questioning whether the roadmap is right. That's where the PM value is.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"protect the team\" → \"serve the customer\"**: EMs develop a strong instinct to protect their engineers from bad decisions, scope creep, and unreasonable timelines. That instinct is good for team health but can make you a bad PM, because PMs sometimes have to push back on engineers — or even accept slower delivery — in service of getting the customer problem right. The loyalty shifts from team to product.",
    "",
    "**From \"managing people\" → \"influencing without authority\"**: As an EM, you have formal authority over your engineers. As a PM, you have authority over the product backlog but not over the people who build it. The PM role is largely about influencing — designers, engineers, data scientists, executives, customers — without the ability to direct. Many EMs find this disorienting at first. [What is product management] describes the PM as someone who 'marshals the resources of their team' — which is a diplomatic description of leading without a reporting structure."
  ].join("\n")
};

paths["Engineering Manager|||Founder / CEO"] = {
  from: "Engineering Manager", to: "Founder / CEO",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "EMs are well-positioned to found companies — they have technical credibility, people leadership experience, and a track record of shipping. The gap is not in building; it's in the commercial and vision-setting dimensions of the CEO role. EMs know how to run teams. Founders know how to define what the team should exist to do. That's a different kind of skill. Expect the transition to require deliberate development of sales, fundraising, and company-level strategy — none of which most EMs have practiced.",
    "",
    "## Gaps to Close",
    "",
    "The first gap is customer and commercial orientation. EMs interact with customers through product requirements and support escalations. Founders do direct sales, handle investor conversations, and build the customer relationships that define the company's early trajectory. This is a significant behavioral shift for most EMs.",
    "",
    "The second gap is the founder-to-CEO evolution. [How a great founder becomes a great CEO — Jonathan Lowenhar] describes it precisely: to be a founder is a state of being; to be a CEO is a craft. EMs who found companies often stay in EM mode — managing the team, unblocking engineers, reviewing code — when they should be thinking about company strategy, board relationships, and organizational design at scale.",
    "",
    "Third: co-founder dynamics. [Healing your co-founder relationship] reveals how often founding relationships fracture along lines of role ambiguity and equity disagreement. EMs are used to clear reporting structures. Founding teams are often deliberately ambiguous in the early days, which creates friction that needs active management.",
    "",
    "## Skills to Build",
    "",
    "- **Pre-PMF startup prioritization**: [Prioritizing at startups] is essential reading for any EM founding a company. Your EM instincts — run a clean sprint, maintain velocity, reduce technical debt — are exactly wrong in the pre-PMF phase. You need to build fast, talk to users constantly, and be willing to throw away what you built. Christina Cacioppo, May Habib, and others in this piece describe the founder prioritization mindset that EMs need to actively build.",
    "",
    "- **Building community and distribution**: [A founder's guide to community] covers what most technical founders skip entirely: distribution. Companies like Atlassian and Twitch built durable competitive advantages through community, not just through product quality. EMs understand how to build product; they rarely think about how to build the audience that makes product growth possible.",
    "",
    "- **The founder-to-CEO craft**: [How a great founder becomes a great CEO — Jonathan Lowenhar] is the most directly relevant piece for this transition. Jonathan's key point: many founders — especially technical ones — resist the CEO identity because it feels less tangible than building. The ones who make it work accept that building the company is the job, even when it means not building the product.",
    "",
    "- **Company-level strategy**: [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] provides the framework for thinking at company scope. For EMs who are comfortable with team-level strategy but haven't had to define a company-level plan, this is a practical starting point.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"build the right product\" → \"build the right company\"**: EMs are excellent at shipping. Founders have to build the system that ships — the org, the culture, the hiring process, the decision-making frameworks. [Startup to exit: Lessons from a first-time founder] touches on this arc: the early excitement of building gives way to the longer, harder work of building an organization that can keep building without you personally executing everything.",
    "",
    "**From \"manage a team\" → \"set the vision everyone follows\"**: As an EM, you were given a product direction and asked to execute. As a founder, you define the direction. That directional clarity — a crisp, credible answer to 'why are we building this?' — is what attracts co-founders, early employees, and investors. [How a great founder becomes a great CEO — Jonathan Lowenhar] emphasizes that this clarity has to be genuine, not performed."
  ].join("\n")
};

paths["Product Manager|||Founder / CEO"] = {
  from: "Product Manager", to: "Founder / CEO",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a natural progression and one of the most common founder backgrounds. PMs already own product vision, customer insight, prioritization, and cross-functional alignment — all of which transfer directly. What's missing is the commercial layer (sales, fundraising, investor relations) and the organizational layer (hiring, culture, equity). Many successful founders came from PM roles; the transition is well-trodden but still hard. Expect 2–3 years before you feel genuinely competent in the full CEO scope.",
    "",
    "## Gaps to Close",
    "",
    "The PM-to-founder gap is primarily commercial, not product. You know how to build. The gaps are: closing deals yourself (early-stage founders do direct sales), raising money (investor conversations are a different skill than stakeholder alignment), and making payroll decisions (hiring priorities are higher-stakes than roadmap priorities).",
    "",
    "The second gap is operating without the institutional support of a larger company. As a PM, you had an engineering team assigned to you, a design org, a data team. As a founder, you recruit all of these from scratch, often while still figuring out if your idea is right.",
    "",
    "Third: the pre-PMF mindset shift. [Prioritizing at startups] is explicit: most PM prioritization frameworks are designed for companies with established products and are wrong for early-stage startups. The discipline you've built around structured prioritization may actually slow you down before you find product-market fit.",
    "",
    "## Skills to Build",
    "",
    "- **Pre-PMF startup prioritization**: [Prioritizing at startups] draws on six first-time founders (Christina Cacioppo of Vanta, Rujul Zaparde of Zip, May Habib of Writer, and others) to describe what actually works before product-market fit: solve significant pain, not nice-to-have problems; don't wait for data you'll never have; build before you've perfected the strategy. PMs are trained to be data-driven and process-oriented — both of these instincts need to be loosened in the early days.",
    "",
    "- **Building community and distribution**: [A founder's guide to community] covers the distribution skills that PMs rarely develop. Building an audience or community around your product — the way Glossier, Atlassian, and Twitch did — creates compounding advantages that pure product quality cannot. Founders who understand distribution before launching are significantly better positioned than those who figure it out after.",
    "",
    "- **The founder-to-CEO transition**: [How a great founder becomes a great CEO — Jonathan Lowenhar] matters even at the beginning of the journey, because the habits you build as a founder determine how easy or hard the CEO transition will be. Jonathan's framing — founder as attitude, CEO as craft — is a useful prompt to ask yourself which hat you need to wear at any given moment.",
    "",
    "- **Co-founder relationship management**: [Healing your co-founder relationship] is valuable pre-emptively. Co-founder conflict is one of the most common reasons early startups break apart. PMs are skilled at stakeholder alignment, but co-founder alignment is more personal and higher-stakes. Doing the work upfront — explicit conversations about roles, equity, and decision rights — prevents most of the friction this piece describes.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"influence without authority\" → \"everyone reports to you (and that's terrifying)\"**: PMs are masters of influence without authority. As a founder, you have formal authority over everyone — and that authority is uncomfortable in a way most PMs don't anticipate. Decisions that were previously collaborative become unilaterally yours. [This Week #14: Transitioning from startup founder to product manager] describes the reverse transition, which reveals what founders miss most: the clarity that comes from having someone else set the direction.",
    "",
    "**From \"roadmap\" → \"company\"**: PMs think in roadmaps. Founders have to think in companies. A roadmap is a plan for what to build; a company is the system that builds, sells, and sustains it. The hardest shift for PM-founders is accepting that their time is often better spent on hiring, sales, or fundraising than on product decisions — even though product is what they're best at.",
    "",
    "**From \"steady state\" → \"pre-PMF urgency\"**: Product management at a mature company has a rhythm: quarterly planning, sprints, retros. Founding has no rhythm — it's a race. [Prioritizing at startups] captures this well: a startup is a newly lit fire, fragile and easily extinguished. The structured, methodical approach that makes PMs effective at scale is a liability in the sprint to find product-market fit."
  ].join("\n")
};

const updated = { ...existing, ...paths };
fs.writeFileSync(outPath, JSON.stringify(updated, null, 2));
console.log("Wrote " + Object.keys(paths).length + " paths. Total: " + Object.keys(updated).length);
