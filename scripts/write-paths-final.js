"use strict";
const fs = require("fs");
const outPath = require("path").resolve(__dirname, "../data/paths.json");
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf-8")) : {};
const paths = {};

paths["Data Scientist|||Engineering Manager"] = {
  from: "Data Scientist", to: "Engineering Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is an unusual but possible transition, most often occurring at companies with ML-heavy engineering teams where data scientists are embedded in engineering. The gap is significant: data scientists are individual contributors measured on insight quality; EMs are people leaders measured on team output. Expect to spend 12–18 months developing formal people management experience — either through informal team leadership or by making a lateral move to a startup where the EM role is accessible without a pure software engineering background.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is people management. Data scientists work with data, not directly responsible for the development of other people. EMs hire, coach, set career expectations, and manage performance. [Fostering a culture of experimentation] touches on what it means to build a team culture around rigorous thinking — the experimentation mindset you have as a DS is directly transferable to how you'd lead an ML engineering team.",
    "",
    "The second gap is software engineering credibility. Most EM roles in product engineering require that you can evaluate software architecture and review code. DS work involves code but often not production-grade software engineering. You'll need to either close this gap deliberately or target EM roles specifically on ML/data engineering teams where your DS background is the right credential.",
    "",
    "The provided transcripts do not cover this specific transition directly. The gaps and skills below draw from adjacent content.",
    "",
    "## Skills to Build",
    "",
    "- **Leading teams through ambiguity**: [Fostering a culture of experimentation] describes how rigorous experimentation cultures are built — establishing shared standards for what counts as evidence, creating psychological safety to run tests that fail, and making data-driven decisions at the team level. These are directly applicable skills for an EM leading an ML team.",
    "",
    "- **Understanding the PM-engineering interface**: [The top 5 things PMs should know about engineering — Justin Gage] describes this relationship from the PM side. As an EM, understanding what PMs need from engineering — realistic scoping, technical trade-off transparency, proactive communication on blockers — helps you build a team that works well with its product partners.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"solving problems\" → \"growing people who solve problems\"**: Data scientists are individual problem solvers. EMs create the conditions for a team to solve problems better than any individual could. This requires giving up the direct satisfaction of solving hard technical problems yourself in exchange for the more diffuse satisfaction of building a high-performing team.",
    "",
    "**From \"be right\" → \"be effective\"**: DS work rewards rigor and correctness. EM work rewards effectiveness — moving projects forward, resolving conflicts, keeping people motivated. Sometimes being right about a technical decision is less important than making a decision and moving on."
  ].join("\n")
};

paths["Marketing Manager|||Growth Manager"] = {
  from: "Marketing Manager", to: "Growth Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a natural lateral move — the skills overlap significantly, but the orientation shifts from brand and campaigns to metrics and experiments. Marketing managers work on awareness, messaging, and channel management. Growth managers own a quantitative funnel metric and run experiments to move it. The transition requires developing product instincts and experimentation discipline that most marketing roles don't build. Expect 6–12 months of deliberate development.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is product proximity. Growth managers work at the intersection of product and marketing — they ship product changes (onboarding flows, referral mechanics, activation features) not just campaigns. Marketing managers typically don't have this product-side experience, and earning credibility with engineering teams requires developing it.",
    "",
    "The second gap is quantitative rigor. Marketing uses metrics (CTR, CAC, MQLs), but growth work uses them with more statistical discipline — designing experiments, measuring lift, controlling for confounds. [Breaking into growth] describes what separates growth PMs from traditional marketers: the ability to run rigorous experiments on product surfaces, not just ad campaigns.",
    "",
    "Third: retention and activation focus. Marketing typically owns top-of-funnel. Growth owns the full funnel including activation (do users get value on day 1?) and retention (do they come back?). [What is good retention?] establishes the framework: great retention means your cohorts flatten, not decay to zero. Developing fluency in retention metrics and what drives them is a core gap to close.",
    "",
    "## Skills to Build",
    "",
    "- **Growth mechanics and ideation**: [Growth ideas] provides a comprehensive playbook of growth tactics across acquisition, activation, and retention. [Growth inflections] covers what precedes sudden growth acceleration. For a marketing manager moving to growth, building a working vocabulary of growth levers across the full funnel is the most important skill to develop.",
    "",
    "- **PLG funnel economics**: [Product-led marketing — Kyle Poyar] covers the math behind product-led growth: conversion rates, CAC benchmarks, and what it means to make PLG funnel math work. Growth managers need to understand these numbers at a level of detail that most marketing managers don't develop.",
    "",
    "- **Experimentation discipline**: [Fostering a culture of experimentation] describes what it looks like to build and operate within a rigorous experimentation culture — running controlled tests, interpreting results correctly, and building institutional trust in data-driven decisions. This is the operational practice that separates growth from marketing.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"campaigns\" → \"systems\"**: Marketing managers build campaigns — discrete initiatives with start and end dates. Growth managers build systems — product changes and loops that compound over time. [Product-led marketing — Kyle Poyar] describes the PLG growth model as a system: organic search creates top-of-funnel, product virality creates compounding referral, and the two reinforce each other.",
    "",
    "**From \"awareness\" → \"activation\"**: Marketing success is often measured at the top of the funnel. Growth success is measured in whether users actually get value from the product. [How to determine your activation metric] makes this concrete: the activation metric captures the moment when a user has had their first meaningful success with your product. Owning that metric requires understanding the product deeply."
  ].join("\n")
};

paths["Marketing Manager|||Product Manager"] = {
  from: "Marketing Manager", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a stretch transition that requires closing a significant technical and process gap. Marketing managers understand customers, positioning, and distribution — all useful in PM work — but typically lack product development experience and technical fluency. The transition is achievable but usually requires 1–2 years of deliberate preparation, including an APM program, a lateral move to a smaller company, or significant exposure to the product development process in your current role.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is product development process. Marketing managers typically receive a finished product and figure out how to position and sell it. PMs shape the product before it's built — writing specs, working with engineers, making scope decisions, managing launches. This entire workflow is likely new.",
    "",
    "The second gap is technical communication. You don't need to code, but you need to understand enough about how software is built to have credible conversations with engineers. [The top 5 things PMs should know about engineering — Justin Gage] covers the essentials: tech stacks, databases, APIs, and what makes something easy or hard to build.",
    "",
    "Third: data and metrics orientation. PMs track product metrics — activation, retention, NPS, feature adoption — and use them to make roadmap decisions. Marketing metrics (impressions, CTR, MQLs) measure different things. Developing fluency in product metrics requires practice with the tools and the analytical mindset. [What is product management] defines the PM's job as delivering business impact — understanding which metrics reflect that impact is the core analytical skill.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover the strategic layer of the PM role. Your marketing background actually helps here — you understand positioning, competitive differentiation, and customer needs at a messaging level. The gap is in translating that into product decisions and roadmap priorities.",
    "",
    "- **Prioritization discipline**: [Prioritizing] and [Prioritizing at startups] cover the frameworks for making product prioritization decisions. Your marketing instincts about what customers care about are an asset; the skill to develop is applying those instincts within the constraints of an engineering roadmap.",
    "",
    "- **Product-led growth context**: [Product-led marketing — Kyle Poyar] is particularly relevant for marketing managers moving to PM — it describes how marketing and product intersect in PLG companies. Understanding this intersection is your natural advantage and a credible bridge narrative for why your background is relevant to PM work.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"position the product\" → \"define the product\"**: Marketing managers work with what the product team gives them and figure out how to communicate its value. PMs figure out what the product should be. The shift from reacting to the product to defining it is the central transition.",
    "",
    "**From \"customer as audience\" → \"customer as user\"**: Marketing understands customers in terms of segments, personas, and messaging. PMs understand customers in terms of jobs to be done, friction points in the product, and behavioral data. Developing the user-centric, behavioral lens requires direct exposure to product research and analytics."
  ].join("\n")
};

paths["Marketing Manager|||Founder / CEO"] = {
  from: "Marketing Manager", to: "Founder / CEO",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Marketing managers often become founders when they identify a market gap through their distribution expertise — a problem they understand deeply because they've been close to customers and channels. The advantage: you understand distribution, positioning, and customer psychology. The gap: product development, fundraising, and the organizational complexity of building a company. Expect 2–4 years to become competent in the full CEO scope.",
    "",
    "A useful stepping stone: growth or product marketing roles at early-stage startups, where you'll be closer to the product development process and get exposure to the company-building decisions founders make.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is product development. Marketing managers typically receive a finished product. Founders have to build the product from scratch — which requires either technical skills or the ability to manage engineers. [Prioritizing at startups] emphasizes that pre-PMF prioritization is about building and learning fast, which requires being close to the product development process.",
    "",
    "The second gap is fundraising. [How a great founder becomes a great CEO — Jonathan Lowenhar] covers the founder-to-CEO transition; the fundraising dimension requires a specific skill set — investor narrative, financial modeling, term sheet negotiation — that most marketing managers haven't developed.",
    "",
    "Third: organizational complexity. As a founder scaling a company, you'll need to hire engineers, PMs, and designers — roles that most marketing managers haven't managed. Building a diverse cross-functional organization requires credibility in domains outside your expertise.",
    "",
    "## Skills to Build",
    "",
    "- **Community and distribution as a founding advantage**: [A founder's guide to community] is highly relevant for marketing managers becoming founders — you already understand audiences and distribution better than most technical founders. Companies like Glossier and Twitch built durable advantages through community before they had a superior product. Your marketing background is a real founding advantage if you use it deliberately.",
    "",
    "- **Pre-PMF startup prioritization**: [Prioritizing at startups] is essential reading. Your marketing instinct to polish the message before the product is proven is the wrong instinct pre-PMF. The founders quoted in this piece — Christina Cacioppo, May Habib, and others — all emphasize building and iterating before perfecting the narrative.",
    "",
    "- **Founder-to-CEO transition**: [How a great founder becomes a great CEO — Jonathan Lowenhar] frames the transition most marketing founders need to make: from using marketing skills to build an audience to using CEO skills to build an organization. The craft is different.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"tell the story\" → \"make the story true\"**: Marketing managers craft narratives. Founders have to build the reality that the narrative describes. The gap between what you can articulate and what your company can deliver is the founder's daily tension.",
    "",
    "**From \"executing someone else's vision\" → \"defining the vision\"**: Marketing managers execute a product vision they received. Founders define the vision from scratch and then convince everyone else it's worth pursuing. [Healing your co-founder relationship] illustrates how much alignment work this requires even between co-founders who chose each other."
  ].join("\n")
};

paths["Growth Manager|||Chief Marketing Officer"] = {
  from: "Growth Manager", to: "Chief Marketing Officer",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This transition expands from owning a growth metric to owning the entire marketing function — brand, demand generation, communications, content, events, and sometimes product marketing. Growth managers who become CMOs typically do so at companies where growth and marketing are tightly coupled, or by taking CMO roles at earlier-stage companies where the scope is manageable. The transition requires developing brand intuition, team leadership, and executive communication skills that growth roles don't typically build. Expect 3–5 years of progressive scope expansion.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is brand and long-horizon thinking. Growth work is metric-driven and short-cycle. CMO work includes brand investment — building perception and trust over years, not quarters. These returns don't show up in a 30-day experiment. Growth managers who become CMOs have to make peace with spending money on things they can't measure directly.",
    "",
    "The second gap is organizational leadership. Growth teams are typically small and metrics-focused. Marketing organizations include brand, content, communications, and events teams with different success metrics, working styles, and stakeholder relationships. Managing this breadth requires different leadership skills than running a growth team.",
    "",
    "Third: executive and board communication. CMOs present marketing strategy to boards and represent the company externally. This is a different communication register than presenting experiment results to a product team.",
    "",
    "## Skills to Build",
    "",
    "- **Growth organization design**: [How to hire your first growth team] covers how to structure a growth function — what roles to hire, how to sequence the team build, and what to look for. For growth managers moving toward CMO, understanding how to build the full marketing organization — not just the growth team — is the most important organizational skill to develop.",
    "",
    "- **Full-funnel growth mechanics**: [Growth inflections] and [Growth ideas] cover the breadth of growth tactics a CMO needs to be conversant in. CMOs who come from pure growth backgrounds sometimes over-index on bottom-of-funnel and underinvest in brand and top-of-funnel. Developing a balanced perspective across the full funnel is the key maturation.",
    "",
    "- **PLG and marketing intersection**: [Product-led marketing — Kyle Poyar] is the most important conceptual framework for CMOs at PLG companies. Kyle's model — that PLG marketing is fundamentally different from traditional B2B marketing — shapes how CMOs at these companies allocate budget and build teams.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"metric owner\" → \"function owner\"**: Growth managers own a number. CMOs own a function — a team of people, a budget, a set of capabilities that the company needs to win in the market. This shift from individual accountability to organizational accountability is significant.",
    "",
    "**From \"experiments\" → \"strategy + experiments\"**: Growth is largely tactical — run experiments, double down on what works. CMOs set the strategy that determines which experiments are worth running. [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] are useful references for developing the strategic framing skills that growth roles rarely require."
  ].join("\n")
};

paths["Growth Manager|||Product Manager"] = {
  from: "Growth Manager", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a natural lateral move — growth managers already operate at the product-marketing intersection and are comfortable with metrics, experiments, and cross-functional work. The shift is from owning a growth metric to owning a broader product area, including features that aren't primarily about user acquisition or activation. The transition is typically accessible within 6–12 months, often by taking on a product PM role at the same company or a slightly larger PM scope.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is breadth of product thinking. Growth PMs optimize conversion and retention metrics. Core PMs make broader product decisions — what to build, how it works, what the user experience is — that aren't primarily measured in funnel metrics. Developing this broader product judgment requires exposure to product research, design collaboration, and longer-horizon roadmap thinking.",
    "",
    "The second gap is comfort with less measurable outcomes. Growth work is highly quantified. Core product work sometimes includes features whose value is harder to measure directly — trust, delight, durability. PMs who come from growth backgrounds sometimes over-optimize for measurable short-term impact and underinvest in product quality.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover what product PMs are expected to own at a senior level. Growth managers typically operate within a strategy set by the PM or CPO. Moving to PM means owning that strategy layer — writing the plan, aligning stakeholders around it, and defending it under pressure.",
    "",
    "- **Prioritization at product scope**: [Prioritizing] is directly relevant. Your growth background makes you strong at measuring impact. The skill to develop is applying that impact assessment across a broader set of product investments — not just conversion features — and making the case for long-horizon product bets that don't have immediate metric payoff.",
    "",
    "- **The full PM scope**: [What is product management] — shape, ship, synchronize. Growth managers are strong at shipping. The development areas are typically shaping (what should we build?) and synchronizing (aligning all stakeholders, not just the growth team, around one plan).",
    "",
    "## Mindset Shifts",
    "",
    "**From \"the funnel\" → \"the product\"**: Growth managers optimize flows and conversion points. PMs own the product experience holistically. [Prioritizing conversion opportunities] describes the growth PM lens; [What is product management] describes the broader PM lens. The difference is scope — one optimizes specific flows; the other owns what gets built and why.",
    "",
    "**From \"short experiments\" → \"long bets\"**: Growth teams run fast experiments with 2–4 week cycles. Product roadmaps include 6–12 month investments whose value isn't fully visible until much later. Developing comfort with longer-horizon commitments is a real behavioral shift."
  ].join("\n")
};

paths["Account Executive|||Product Manager"] = {
  from: "Account Executive", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Sales to PM is a less common but legitimate path — AEs develop deep customer knowledge, objection-handling instincts, and a clear understanding of what buyers value. The gap is significant: product development process, technical fluency, and data analysis are all largely new. The transition typically takes 1–2 years of deliberate preparation. A common stepping stone: product marketing, solutions engineering, or customer success — roles that sit at the product-customer interface and build product knowledge without requiring engineering experience.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is the product development process. AEs close deals; PMs define what gets built. The entire workflow of specs, engineering collaboration, prioritization, and launch planning is largely foreign. [What is product management] defines what the job actually is — it's worth reading carefully to understand how different it is from sales.",
    "",
    "The second gap is technical fluency. PMs need to have credible conversations with engineers about feasibility, trade-offs, and complexity. [The top 5 things PMs should know about engineering — Justin Gage] covers the essentials. This gap is closable with deliberate study.",
    "",
    "Third: data and metrics fluency. Sales tracks pipeline and revenue. PM tracks product metrics — retention, activation, DAU, NPS. Developing comfort with product analytics requires exposure to the tools and the analytical framework for interpreting product data.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy**: Your customer knowledge is your biggest asset — you understand what buyers care about, what objections they raise, and what problems they'll pay to solve. [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] gives you the framework to translate that customer knowledge into a coherent product strategy.",
    "",
    "- **Prioritization**: [Prioritizing] covers the core framework. Your sales background makes you strong at estimating customer impact — you know which problems are biggest and which features customers push hardest for. The skill to develop is combining that customer signal with engineering effort estimates and business priorities to make systematic roadmap decisions.",
    "",
    "- **The PM job scope**: [What is product management] is required reading. The PM role is fundamentally about delivering business impact through cross-functional team leadership — not selling or closing. Understanding this distinction early prevents the most common AE-to-PM failure mode: treating the PM job like an internal sales role.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"close the deal\" → \"solve the problem\"**: AEs win when the customer signs. PMs win when the customer succeeds with the product. This shift from conversion to outcome is significant — and requires learning to say no to features that customers ask for but that won't actually solve their problem.",
    "",
    "**From \"external customer\" → \"all stakeholders\"**: AEs have one primary stakeholder: the buyer. PMs manage engineers, designers, data scientists, executives, and customers simultaneously. The stakeholder map expands dramatically, and managing it requires a different set of skills than managing a sales relationship."
  ].join("\n")
};

paths["Account Executive|||Founder / CEO"] = {
  from: "Account Executive", to: "Founder / CEO",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "AEs who become founders have a real advantage: they already know how to sell, handle objections, read buyer motivation, and close. The gap is on the product and organizational side — building what you'd sell, managing people who build it, and navigating the ambiguity of pre-PMF. Expect 2–4 years before you're genuinely competent in the full CEO scope. Many successful SaaS founders came from sales; your commercial instincts are a genuine founding advantage.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is product judgment. AEs understand what customers will buy. Founders have to figure out what to build — which is a harder problem, because customers can't always articulate what they need before they've seen it. [Prioritizing at startups] is direct: pre-PMF prioritization is about building fast and learning, not perfecting the pitch.",
    "",
    "The second gap is people leadership. AEs manage themselves and their deals. Founders manage a team — hiring, developing, and sometimes firing the people who build the product. [Healing your co-founder relationship] covers the interpersonal complexity of founding teams, which surprises most first-time founders.",
    "",
    "Third: the founder-to-CEO craft. [How a great founder becomes a great CEO — Jonathan Lowenhar] describes the transition clearly: being a founder is an attitude; being a CEO is a craft. AEs who found companies often stay in sales mode — going on every call, handling every objection themselves — when they should be building the organization that handles it at scale.",
    "",
    "## Skills to Build",
    "",
    "- **Community and early distribution**: [A founder's guide to community] is particularly relevant for AE founders — you already understand customers deeply. Building community around your product before launch, as companies like Twitch and Glossier did, leverages your commercial instincts in a high-leverage way. Your network of buyers and prospects is a founding asset.",
    "",
    "- **Pre-PMF prioritization**: [Prioritizing at startups] covers the early-stage prioritization discipline. Your sales background makes you strong at understanding customer pain — the skill to develop is translating that into product decisions quickly, without over-investing in polish before you've validated the core.",
    "",
    "- **Founder-to-CEO transition**: [How a great founder becomes a great CEO — Jonathan Lowenhar] is the single most relevant piece for this transition. The AE-to-CEO path is particularly susceptible to one failure mode: staying in individual-contributor sales mode too long, closing deals yourself instead of building a sales organization.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"close the deal\" → \"build what closes the deal\"**: AEs win by convincing buyers the product is worth paying for. Founders win by building a product that is genuinely worth paying for — and then building an organization that can sell it at scale without the founder on every call.",
    "",
    "**From \"quota\" → \"company health\"**: Sales is measured in quota. CEO success is measured in company health — revenue, growth rate, team quality, product-market fit. The time horizon expands dramatically, and the feedback loops are much slower."
  ].join("\n")
};

paths["Account Executive|||Marketing Manager"] = {
  from: "Account Executive", to: "Marketing Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a lateral move within the commercial function — both roles are customer-facing, but AEs create revenue through direct relationships while marketers create demand through scalable channels. The transition is accessible but requires developing a very different set of skills: content creation, channel management, data analytics, and campaign operations. A common bridge role: sales enablement or product marketing, which combines sales knowledge with marketing execution.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is scalability. AEs work one deal at a time. Marketing creates systems that work at scale — campaigns, content, channels that reach thousands of people simultaneously. Developing the ability to think in systems rather than individual relationships is the central transition.",
    "",
    "The second gap is content creation and channel expertise. [Content-driven growth] and [Product-led marketing — Kyle Poyar] describe two of the most important marketing channels for modern SaaS: content/SEO and product virality. AEs typically haven't built expertise in either.",
    "",
    "Third: marketing analytics. AEs track pipeline, conversion rates, and revenue. Marketing tracks impressions, CTR, CAC, MQLs, and attribution. These are different measurement frameworks that require different tools and analytical approaches.",
    "",
    "## Skills to Build",
    "",
    "- **PLG and growth marketing**: [Product-led marketing — Kyle Poyar] covers the mechanics of PLG marketing — organic search, product virality, and the funnel math that makes PLG work. For AEs moving to marketing, understanding how scalable customer acquisition works (vs. one-to-one selling) is the most important mental model to develop.",
    "",
    "- **Growth channel breadth**: [Growth ideas] provides a broad vocabulary of growth tactics across acquisition, activation, and retention. For AEs who've been focused on one channel (direct outbound), developing fluency in the full range of marketing channels expands your toolkit substantially.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"this deal\" → \"this audience\"**: AEs think about individual buyers. Marketers think about audiences — groups of people who share needs, behaviors, and responses to messages. Developing the ability to reason about segments rather than individuals is the central mindset shift.",
    "",
    "**From \"relationship-driven\" → \"systems-driven\"**: AE success comes from relationship quality. Marketing success comes from system design — the right message, the right channel, the right timing, at scale. Your relationship instincts remain valuable in marketing (especially for ABM and content), but they have to be embedded in systems that work without you personally present."
  ].join("\n")
};

paths["Management Consultant|||Product Manager"] = {
  from: "Management Consultant", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Consulting to PM is one of the most common career pivots at business schools and is well-trodden enough that most big tech companies have explicit programs for it. Consultants bring strong structured thinking, communication, and stakeholder management — all valuable in PM work. The gaps are in technical fluency, product intuition, and the shift from recommending to executing. Expect 6–12 months of deliberate preparation, often including an APM program or a direct application to a tech company with a formal consultant-to-PM pipeline.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is ownership and execution. Consulting produces recommendations; PM work requires owning the outcome through execution. [What is product management] defines the PM's job as delivering business impact — which means you're accountable not just for the analysis but for whether the thing you recommended actually gets built and works.",
    "",
    "The second gap is user empathy from direct exposure. Consultants understand customers through research, interviews, and data synthesis — which is closer to PM work than it seems. But PMs develop customer intuition through ongoing, direct exposure: watching users struggle with the product, reading support tickets, analyzing feature usage data. This requires time in role to develop.",
    "",
    "Third: technical fluency. [The top 5 things PMs should know about engineering — Justin Gage] covers what PMs need to know. Consultants often lack this foundation and need to develop it deliberately before entering PM interviews.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy (applied)**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover strategy at the product level. Consultants are often skilled at company-level strategy frameworks (Porter, etc.) but less practiced at the specific craft of product strategy — defining a north-star, identifying the 3–5 product investments that will win, and communicating that plan to an engineering team.",
    "",
    "- **Prioritization**: [Prioritizing] covers the PM's daily practice. Consultants are strong at impact estimation through structured analysis — the development area is making these estimates quickly and decisively, often with less data than a consulting engagement would require.",
    "",
    "- **Managing and developing PMs**: [Moving from IC product manager to manager of product managers] is useful for consultants who want to understand where the PM career leads — it reveals that senior PM work looks more like consulting management than individual IC work, which may provide useful framing for the transition narrative.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"recommend\" → \"own\"**: Consultants exit the engagement when the recommendation is delivered. PMs live with the consequences of their decisions for years. This shift in accountability — from advisory to executional — is the central challenge of the consulting-to-PM transition.",
    "",
    "**From \"the client\" → \"the user\"**: Consulting centers on the client's needs. PM work centers on the user's needs — and these are often different things. The client wants X; users need Y; the business requires Z. PMs navigate this triangle constantly, and developing the user-centric instinct requires direct exposure to users that consulting rarely provides."
  ].join("\n")
};

paths["Management Consultant|||Founder / CEO"] = {
  from: "Management Consultant", to: "Founder / CEO",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Consultants often become founders because they've spent years identifying problems across industries and can't stop thinking about a specific one. The advantage: structured thinking, strong executive communication, and a broad network. The gap: building products, shipping fast, and the pre-PMF messiness that is the opposite of a polished consulting deliverable. The consulting instinct to perfect the analysis before presenting it is exactly wrong in the early days of a startup. Expect 2–4 years to build genuine founder competency.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is shipping speed. [Prioritizing at startups] is explicit: too many founders — especially those with analytical backgrounds — spend too much time on strategy documents and not enough on building. The multiple founders quoted (Christina Cacioppo, May Habib, Rujul Zaparde) all emphasize that building fast and talking to users is the pre-PMF discipline, not frameworks.",
    "",
    "The second gap is the founder-to-CEO craft. [How a great founder becomes a great CEO — Jonathan Lowenhar] describes the specific challenge for consultants-turned-founders: you're used to presenting a finished recommendation to a client. As a founder, there's no finished version — you're building and learning simultaneously, in public, with your own money on the line.",
    "",
    "Third: co-founder and team dynamics. Consultants work in project teams with clear hierarchy. Founding teams are ambiguous, high-stakes, and personal. [Healing your co-founder relationship] covers the most common sources of conflict and how to address them before they become catastrophic.",
    "",
    "## Skills to Build",
    "",
    "- **Pre-PMF prioritization**: [Prioritizing at startups] is required reading. Your analytical background will make you want to run a proper analysis before each decision. At the early stage, this will kill you. The discipline is to build, ship, talk to users, and iterate — with the analysis serving the iteration, not preceding it.",
    "",
    "- **Community and distribution**: [A founder's guide to community] covers one of the most undervalued founding skills. Consultants have strong networks but those networks are typically peer or client relationships, not the user communities that early-stage companies need. Building a community around your problem space before you've built the product is a high-leverage use of your communication skills.",
    "",
    "- **Founder-to-CEO craft**: [How a great founder becomes a great CEO — Jonathan Lowenhar] frames the transition well. Jonathan's core point about consultants specifically: the consulting mindset (diagnose, recommend, exit) has to give way to the founder mindset (build, learn, stay).",
    "",
    "## Mindset Shifts",
    "",
    "**From \"frameworks\" → \"learning loops\"**: Consulting produces frameworks. Founding requires learning loops — build, measure, learn, repeat. The value of the analytical frameworks you've developed is in helping you ask the right questions, not in providing the answers before you've built anything.",
    "",
    "**From \"advisory\" → \"existential\"**: In consulting, a wrong recommendation has consequences but you don't carry them personally. In founding, every wrong call is your problem to live with and fix. This accountability is clarifying but also terrifying in a way most consultants don't anticipate."
  ].join("\n")
};

paths["Management Consultant|||Chief of Staff"] = {
  from: "Management Consultant", to: "Chief of Staff",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is one of the most natural transitions from consulting — the Chief of Staff role is, in many ways, an internal consulting function. You're advising and supporting an executive, running projects across the organization, and translating strategy into execution. The skills transfer directly. The main gap is the shift from external advisory to internal execution — where you're accountable for outcomes, not just recommendations, and where organizational politics and relationships matter more than in a consulting engagement.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is internal organizational credibility. Consultants enter an organization as external advisors with explicit mandate. Chiefs of Staff earn their mandate through relationships, trust, and demonstrated judgment over time. Building internal credibility is slower and more interpersonal than building consulting credibility.",
    "",
    "The second gap is execution and follow-through. Consulting deliverables end at the recommendation. CoS work includes following the recommendation through to implementation — which means navigating resistance, managing timelines, and solving problems that emerge in execution.",
    "",
    "## Skills to Build",
    "",
    "- **Cross-functional meeting leadership**: [Leading a PM team meeting — Issue 19] covers the mechanics of running effective leadership meetings. CoS roles often involve facilitating executive team meetings, quarterly planning sessions, and cross-functional working groups. Developing the facilitation skills to run these meetings productively — with clear decisions and follow-through — is directly applicable.",
    "",
    "- **Org design and team structure**: [Moving from IC product manager to manager of product managers] and [In defense of feature team product managers] both touch on how product organizations are structured and how decisions get made across product teams. CoS roles often involve thinking about these organizational questions on behalf of the executive they support.",
    "",
    "- **Strategic communication**: [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] provides frameworks for structuring strategic communication upward (to CEOs and boards) that CoS roles require constantly. Your consulting background in structured communication is a direct asset here.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"external advisor\" → \"internal operator\"**: Consultants have the advantage of objectivity and the disadvantage of not having to live with the consequences. CoS roles require you to have opinions and push them through the organization — which requires building relationships and trust over months and years, not weeks.",
    "",
    "**From \"project-based\" → \"continuous\"**: Consulting engagements have a start and end. CoS work is continuous — the organizational problems don't end when the deliverable is presented. Developing the sustained operational focus that continuous roles require is a real behavioral shift."
  ].join("\n")
};

paths["Business Analyst|||Product Manager"] = {
  from: "Business Analyst", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is one of the most common transitions in tech — BAs often sit close enough to the product team to absorb PM skills, and many companies have formal BA-to-PM pathways. The overlap is real: requirements documentation, stakeholder communication, and data analysis are all shared skills. The gap is in customer ownership, technical depth, and the shift from supporting the product team to leading it. Expect 6–12 months of deliberate preparation, often by taking on informal PM responsibilities in your current role.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is customer ownership. BAs document requirements that come from stakeholders. PMs talk directly to customers, synthesize their needs, and decide what to build — without waiting for the requirements to come to them. Developing proactive customer discovery habits is the most important thing BAs moving to PM can do.",
    "",
    "The second gap is strategic framing. BAs typically work within a defined scope. PMs define the scope — which requires understanding the product strategy and being able to articulate why you're building what you're building. [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover this directly.",
    "",
    "Third: the shift from supporting to leading. BAs often support PMs. Moving to PM means leading the product conversation — setting direction, making calls, and being accountable for outcomes rather than deliverables.",
    "",
    "## Skills to Build",
    "",
    "- **Prioritization**: [Prioritizing] is directly applicable. Your BA background gives you strong analytical instincts for evaluating options. The skill to develop is making prioritization decisions quickly and decisively under uncertainty, and communicating the reasoning to stakeholders who disagree.",
    "",
    "- **Product strategy**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] cover the PM's strategic layer. BAs often have detailed knowledge of the product but haven't been responsible for setting its direction. Learning to write a product strategy — and defend it under pressure from executives — is a significant skill development.",
    "",
    "- **The full PM scope**: [What is product management] defines the job precisely: shape the product, ship the product, synchronize the people. BAs are typically strong on the execution side of shipping. The development areas are shaping (proactive customer discovery and strategic framing) and synchronizing (aligning all stakeholders, not just your immediate team).",
    "",
    "## Mindset Shifts",
    "",
    "**From \"document requirements\" → \"define requirements\"**: BAs gather and document requirements that others generate. PMs generate the requirements — by talking to customers, analyzing data, and making strategic bets about what will have the most impact. This shift from reactive to proactive is the central transition.",
    "",
    "**From \"support the PM\" → \"be the PM\"**: Many BAs develop PM skills while supporting PMs. The role transition requires stepping into the accountability that the PM holds — for outcomes, not just deliverables. This is a meaningful shift in professional identity."
  ].join("\n")
};

paths["Business Analyst|||Data Analyst"] = {
  from: "Business Analyst", to: "Data Analyst",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "This is a lateral technical deepening. Both roles analyze data and generate business insights, but BAs typically use lighter analytical tools (Excel, SQL basics, reporting) while data analysts go deeper into statistical analysis, data modeling, and more complex SQL or Python. The transition is accessible within 6–12 months of deliberate technical skill development, and the business context you've built as a BA is a genuine advantage.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is technical depth. Data analysts typically work with more complex data structures, write more sophisticated SQL, use statistical analysis tools, and sometimes build automated reporting pipelines. Developing these technical skills is the practical work of the transition.",
    "",
    "The second gap is experimentation literacy. [Fostering a culture of experimentation] describes how rigorous data teams design and interpret experiments. BAs often work with historical data; data analysts are expected to understand the difference between correlation and causation, and to design analyses that produce defensible conclusions.",
    "",
    "Third: data infrastructure familiarity. Data analysts typically work with data warehouses, BI tools, and sometimes data pipelines. Developing familiarity with the tools and infrastructure — not just the analysis — is part of the role.",
    "",
    "## Skills to Build",
    "",
    "- **Experimentation and statistical analysis**: [Fostering a culture of experimentation] covers what an experimentation culture looks like at a data-mature company. For BAs moving to data analyst, developing the statistical foundations of A/B testing, significance testing, and causal analysis is the most important technical development.",
    "",
    "- **Business impact orientation**: [Building a world-class data org — Jessica Lachs] establishes the standard: analytics is a business-impact-driving function, not a service function. Jessica's distinction — answering 'what should we do now that we know this?' rather than just 'why did this happen?' — applies directly to data analyst work. Your BA background, which is already business-oriented, is an advantage here.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"reporting\" → \"insight generation\"**: BAs often produce reports — structured summaries of what happened. Data analysts generate insights — they interrogate data to answer specific questions, often ones that weren't asked. Developing the analytical curiosity to go beyond the report is the central mindset shift.",
    "",
    "**From \"what happened\" → \"why it happened and what to do\"**: Reporting describes. Analysis explains. [Building a world-class data org — Jessica Lachs] makes this distinction clearly. The value of data analyst work is in connecting an observation to an action recommendation."
  ].join("\n")
};

paths["Chief of Staff|||Product Manager"] = {
  from: "Chief of Staff", to: "Product Manager",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Chiefs of Staff who move to PM often do so because the CoS role gave them a company-wide view of product decisions without the formal product ownership. The transition is natural — you've been close to product strategy, roadmap reviews, and cross-functional alignment. The gap is in the hands-on product development work: user research, spec writing, working with engineers daily, and owning a product metric. Expect 6–12 months of adjustment.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is product ownership at the working level. CoS roles operate at the executive layer — reviewing decisions, facilitating alignment, driving initiatives. PM roles operate at the team level — daily collaboration with engineers and designers, writing detailed specs, resolving technical trade-offs. The elevation you've operated at as a CoS is an advantage for senior PM roles but may feel like a step backward initially.",
    "",
    "The second gap is customer proximity at the product level. CoS roles involve customer understanding through executive conversations and high-level research. PMs build customer intuition through ongoing direct exposure — usability testing, user interviews, behavioral data. This ground-level customer exposure takes time to develop.",
    "",
    "## Skills to Build",
    "",
    "- **Product strategy**: [Getting better at product strategy] and [Strategy Blocks: An operator's guide to product strategy — Chandra Janakiraman] are directly relevant — you've likely been a consumer of this kind of thinking as a CoS. The skill to develop is doing it yourself for a specific product area, at a level of specificity that guides engineering team decisions.",
    "",
    "- **Prioritization at team scope**: [Prioritizing] covers the PM's daily prioritization practice. Your CoS background gives you strong company-level prioritization instincts. The development area is applying this discipline at the team level — making specific roadmap decisions within a constrained set of engineering resources.",
    "",
    "- **The PM role defined**: [What is product management] — shape, ship, synchronize. Your CoS background makes you unusually strong at synchronizing. The development areas are typically shaping (being deeply customer-informed at the product level) and shipping (living inside the engineering development process week to week).",
    "",
    "## Mindset Shifts",
    "",
    "**From \"company scope\" → \"product scope\"**: CoS roles require a company-wide view. PM roles require depth in a specific product area. This narrowing of scope can feel like a step down but is actually the path to developing genuine product expertise.",
    "",
    "**From \"facilitating decisions\" → \"making decisions\"**: CoS roles often support the decision-maker. PM roles require you to be the decision-maker — to have an opinion about what to build and defend it under pressure from engineers, designers, and executives."
  ].join("\n")
};

paths["Chief of Staff|||Founder / CEO"] = {
  from: "Chief of Staff", to: "Founder / CEO",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "Chiefs of Staff are well-positioned to found companies — you've seen how companies are run from a high-level vantage point, you understand strategy and execution simultaneously, and you've built relationships with operators who can become advisors and investors. The gap is in the individual product and commercial skills: building a product, selling it yourself, and making founding decisions without the executive's support structure. Expect 2–3 years to develop genuine competency in the full founder role.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is hands-on execution. CoS roles involve directing and coordinating others' work. Founding — especially in the early days — requires doing everything yourself: writing the first code or working closely with an early engineer, selling the first customers personally, and running every function before you can hire for it.",
    "",
    "The second gap is the transition from supporting a vision to defining one. CoS roles are defined by the executive's vision. Founders define their own. [How a great founder becomes a great CEO — Jonathan Lowenhar] describes this transition: the founder's vision has to be genuine and compelling enough to attract co-founders, employees, and investors who don't have the institutional backing you did as a CoS.",
    "",
    "Third: pre-PMF discipline. [Prioritizing at startups] is explicit about what kills early companies: too much theory, not enough building. CoS roles can cultivate an overcorrection toward strategic process — founders need to bias strongly toward execution in the early days.",
    "",
    "## Skills to Build",
    "",
    "- **Pre-PMF startup prioritization**: [Prioritizing at startups] — draw on the multiple founders quoted about how they actually prioritized before finding PMF. Your CoS background gives you strong strategic instincts; the skill to develop is applying them with much less process and much more speed.",
    "",
    "- **Community and distribution**: [A founder's guide to community] covers how to build around a problem before you've built the product. Your relationship capital from the CoS role — access to operators, executives, and potential early customers — is a meaningful founding advantage if you use it to build an early community.",
    "",
    "- **Founder-to-CEO craft**: [How a great founder becomes a great CEO — Jonathan Lowenhar] is essential. Jonathan's key point: many people who've been close to the CEO role (including CoS) have a model of what CEOs do that is more polished and less messy than the actual early-stage founder experience. Recalibrating that model is part of the preparation.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"support the vision\" → \"own the vision\"**: Your CoS role gave you a front-row seat to how an executive's vision gets developed and communicated. As a founder, you have to generate that vision yourself — with no one to bounce it off, no institutional backing, and real personal stakes.",
    "",
    "**From \"organizational leverage\" → \"personal hustle\"**: CoS roles leverage organizational resources to get things done. Early-stage founders have almost no organizational resources — you're the organization. The transition requires a return to individual execution that can feel like regression."
  ].join("\n")
};

paths["Chief Product Officer|||Founder / CEO"] = {
  from: "Chief Product Officer", to: "Founder / CEO",
  generatedAt: new Date().toISOString(),
  markdown: [
    "## Career Transition Overview",
    "",
    "CPOs who become founders bring one of the strongest foundations possible: deep product craft, executive experience, and a track record of building at scale. The gaps are in the commercial and organizational dimensions that CPOs don't own — sales, fundraising, and the responsibility for everything, including the things you've never been responsible for before. The transition is typically more accessible than for non-executives, but the psychological shift from CPO (you own product) to CEO (you own everything) is underestimated by most who make it. Expect 18–24 months before you feel competent in the full CEO scope.",
    "",
    "## Gaps to Close",
    "",
    "The primary gap is commercial ownership. CPOs build what gets sold. Founders have to sell it — especially in the early days before you have a sales team. Your product knowledge is an asset in sales conversations, but the discipline of closing, handling objections, and building a pipeline is a different skill. [Prioritizing at startups] is a useful reminder that pre-PMF selling is different from enterprise selling — it's about validating the problem before perfecting the product.",
    "",
    "The second gap is fundraising. CPOs may have participated in investor conversations but rarely own the fundraising narrative, financial modeling, or term sheet negotiation. These are learnable skills, but they take time and relationships to develop.",
    "",
    "Third: leading functions outside product. As CEO, you're responsible for engineering, sales, marketing, finance, and HR — functions you've worked with but haven't owned. Developing enough depth to hire and lead in each requires deliberate development.",
    "",
    "## Skills to Build",
    "",
    "- **Pre-PMF startup discipline**: [Prioritizing at startups] is relevant even for experienced product leaders — the pre-PMF discipline is different from the mature-company product discipline you've developed as a CPO. The founders quoted emphasize building faster and validating sooner than most experienced operators are comfortable with.",
    "",
    "- **Community and early distribution**: [A founder's guide to community] covers what experienced product leaders often skip: building an audience before building the product. Your product credibility and network are founding advantages — using them to build a community around the problem you're solving creates early distribution that most founders don't have.",
    "",
    "- **Founder-to-CEO craft**: [How a great founder becomes a great CEO — Jonathan Lowenhar] is directly relevant. CPOs who found companies sometimes struggle with the CEO identity precisely because they have a strong product identity. Jonathan's framing — founder as attitude, CEO as craft — is useful for experienced product leaders who need to consciously develop the CEO dimension alongside their existing product strength.",
    "",
    "## Mindset Shifts",
    "",
    "**From \"product owns this\" → \"everything is yours\"**: As CPO, when something isn't product, it's not your problem. As CEO, everything is your problem — even the things you're not good at. Developing the breadth and comfort to lead across functions requires consciously stepping outside the product orientation that made you successful.",
    "",
    "**From \"product-market fit\" → \"company-market fit\"**: CPOs build toward product-market fit. CEOs build toward company-market fit — the whole company, not just the product, resonating with the market. This requires thinking about brand, culture, sales motion, and organizational design as components of the company's fit with the market, not just the product."
  ].join("\n")
};

const updated = { ...existing, ...paths };
fs.writeFileSync(outPath, JSON.stringify(updated, null, 2));
console.log("Wrote " + Object.keys(paths).length + " paths. Total: " + Object.keys(updated).length);
