/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Initiative, Product, JournalArticle, CaseStudy } from './types';

export const BRAND_NAME = 'Softworks Trading Company';
export const BRAND_NAME_SHORT = 'SOFTWORKS';
export const BRAND_TAGLINE = 'Trading Company';

export const INITIATIVES: Initiative[] = [
  {
    id: 'pitch',
    name: 'Pitch Film Studio',
    role: 'Media Production',
    description: 'Video and visual content that explains complex ideas clearly.',
    status: 'Active',
    link: 'mailto:agents@softworkstrading.com?subject=Pitch%20Film%20Studio%20Inquiry'
  },
  {
    id: 'pre-purchase',
    name: 'Pre Purchase Pro',
    role: 'Asset Verification',
    description: 'Inspects vehicles before purchase with professional reports for better purchase descriptions.',
    status: 'Independent',
    link: 'mailto:agents@softworkstrading.com?subject=Pre%20Purchase%20Pro%20Inquiry'
  },
  {
    id: 'tiwa',
    name: 'tiwa.ai',
    role: 'R&D Lab',
    description: 'A personal AI assistant for busy professionals who want to get more done.',
    status: 'Experimental',
    link: 'mailto:agents@softworkstrading.com?subject=tiwa.ai%20Inquiry'
  },
  {
    id: 'cbah',
    name: 'CBAH Organization',
    role: 'Social Chain',
    description: 'A network of friends supporting friends to make a difference in their communities.',
    status: 'Affiliated',
    link: 'mailto:agents@softworkstrading.com?subject=CBAH%20Organization%20Inquiry'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    client: 'Regional Logistics Authority',
    sector: 'Public Sector',
    title: 'The Document Problem Nobody Wanted to Talk About',
    summary: 'How a government agency went from drowning in paper to processing 4,000 manifests daily—without hiring anyone.',
    outcome: '90% reduction in processing time.',
    imageUrl: '/assets/case-studies/landmark-gears.png',
    content: `
      <p>Here's a dirty secret about government operations: most of them run on paper, prayer, and the institutional knowledge of whoever's been there longest.</p>

      <p>The Regional Logistics Authority came to us with what they called a "digitization initiative." What they actually had was a crisis wearing a nice suit. Four thousand shipping manifestos hitting their desks every single day. Each one needed to be checked against three different regulatory databases. The error rate was hovering around 12%—which, in logistics terms, means delays, fines, and supply chain chaos cascading through the entire system.</p>

      <p>The previous solution? More bodies. They'd hired 40 additional data entry specialists over the past two years. It wasn't working. The backlog kept growing.</p>

      <h3>What We Actually Built</h3>

      <p>The temptation with these projects is to go full science fiction—build some monolithic AI brain that handles everything. That's how projects fail. Instead, we built a system with exactly one job: decide which documents need human eyes and which don't.</p>

      <p>The technical stack isn't magic. Vision-Language Models for OCR on the messy stuff (handwritten notes, faded stamps, coffee-stained manifests). Deterministic database checks for the regulatory lookups—because you don't want AI "interpreting" compliance rules. And a confidence scoring system that routes anything below 95% certainty to a human queue.</p>

      <p>The key insight wasn't technological. It was organizational. We didn't automate the humans out—we automated the tedium out. The same 40 specialists now spend their days on the edge cases that actually require judgment, instead of copy-pasting from one system to another.</p>

      <h3>The Numbers</h3>

      <p>Processing time per document: 6 minutes → 4 seconds. Autonomous processing rate: 94% of all volume. The backlog that had been growing for three years cleared in eleven weeks.</p>

      <p>But here's the number nobody talks about: zero layoffs. The Authority redeployed every single data entry specialist into exception management and process improvement roles. Turns out, when you free people from soul-crushing repetitive work, they become remarkably good at finding other problems to solve.</p>
    `
  },
  {
    id: 'cs2',
    client: 'Apex Financial',
    sector: 'Enterprise',
    title: 'When "Move Fast" Meets "Don\'t Get Sued"',
    summary: "Building an AI customer service agent that's never wrong—because in finance, 'mostly right' isn't good enough.",
    outcome: 'Zero AI hallucinations in 150K+ interactions.',
    imageUrl: '/assets/case-studies/landmark-brain.png',
    content: `
      <p>The call came in late November. Apex Financial's Head of Digital had just watched their competitor launch an AI chatbot. Two weeks later, that chatbot told a customer they qualified for a 2.9% mortgage rate that didn't exist. The screenshot went viral. The competitor's stock dropped 4%.</p>

      <p>"We want to do this," he told us, "but we cannot be that."</p>

      <p>Fair enough.</p>

      <h3>The Problem With AI in Finance</h3>

      <p>Here's what most people don't understand about deploying AI in regulated industries: the model isn't the hard part. You can fine-tune GPT to sound like a friendly banker in about a week. The hard part is making absolutely certain it never, ever makes things up.</p>

      <p>In AI circles, this is called "hallucination." In legal circles, it's called "a lawsuit waiting to happen." In financial services, it's called "how you lose your license."</p>

      <p>The standard approach—just tell the model to be careful and add some guardrails—doesn't work. Language models are, fundamentally, very sophisticated pattern completers. They don't "know" anything. They predict what word should come next. Sometimes that prediction is a fabricated APR or a policy that doesn't exist.</p>

      <h3>The Two-Brain Architecture</h3>

      <p>We built what we internally call the "paranoid assistant" model. Two separate AI systems that don't trust each other.</p>

      <p>Brain One generates responses, but it's only allowed to pull from a curated document set—rate sheets, policy documents, FAQ databases. It cannot access its general training knowledge. If something isn't in the approved docs, it says "I don't know" or routes to a human.</p>

      <p>Brain Two is smaller, faster, and has exactly one job: fact-check Brain One. Before any response goes to a customer, Brain Two compares every claim against the source documents. Interest rate mentioned? Verify. Policy referenced? Verify. Timeline quoted? Verify. If anything doesn't match, the response gets flagged for human review.</p>

      <p>Is it slower than a single-model approach? Yes, by about 400 milliseconds. Is it worth it? Ask the competitor still dealing with their PR crisis.</p>

      <h3>The Results</h3>

      <p>150,000+ customer interactions. Zero hallucinated financial information. Customer satisfaction up 18%—not because the AI is charming, but because it's available at 3am when customers actually have time to check their accounts.</p>

      <p>The support team didn't shrink. They shifted from answering routine questions to handling complex advisory conversations. Average case value for human interactions went up 40% because humans now only talk to customers who actually need human judgment.</p>
    `
  },
  {
    id: 'cs3',
    client: 'Metro Health Systems',
    sector: 'Healthcare',
    title: 'Ten Years of Medical Records, Actually Searchable',
    summary: 'Turning a "data lake" that was really a data swamp into something doctors can actually use.',
    outcome: 'Patient history retrieval: hours → seconds.',
    imageUrl: '/assets/case-studies/landmark-library.png',
    content: `
      <p>Every hospital administrator in America will tell you they have an "electronic health record system." What they actually have, in most cases, is several electronic health record systems that don't talk to each other, plus a decade of scanned PDFs, plus faxes (yes, healthcare still runs on faxes), plus handwritten notes from before the digital transition.</p>

      <p>Metro Health was refreshingly honest about their situation: "We have ten years of patient data. We cannot search any of it."</p>

      <p>A surgeon preparing for a complex case would spend—this is real—up to four hours manually reviewing patient history across multiple systems. Looking for drug interactions. Previous conditions. Old lab results buried in scanned documents from 2014.</p>

      <p>This isn't a technology problem. It's a patient safety problem wearing technology clothes.</p>

      <h3>Why "Just Digitize Everything" Doesn't Work</h3>

      <p>The obvious solution—OCR all the documents, dump them in a database, build a search function—sounds reasonable until you try it. Medical records aren't keyword-searchable in any useful way. A search for "diabetes" misses records that say "DM2" or "glucose intolerance" or "HbA1c elevated." Medical knowledge is relational, not textual.</p>

      <p>You don't want to find documents that mention a drug. You want to find all the times a patient interacted with that drug class—prescriptions, reactions, alternatives tried, dosage changes. That's a fundamentally different kind of search.</p>

      <h3>Building the Knowledge Graph</h3>

      <p>We built what's called a GraphRAG system—part knowledge graph, part retrieval-augmented generation. Every patient record gets processed not just for text, but for entities and relationships.</p>

      <p>Patient → diagnosed with → Condition → treated with → Medication → caused → Side Effect → leading to → Alternative Treatment.</p>

      <p>These relationships get stored in a Neo4j graph database. When a doctor asks "show me everything about this patient's cardiovascular history," the system doesn't search for keywords. It traverses relationships. It finds the cardiac event from 2019, the medication change that followed, the follow-up tests, the referral notes, the imaging results—all connected, all in context.</p>

      <p>The interface is natural language because doctors don't have time to learn query syntax. "What medications has this patient tried for hypertension?" Just works.</p>

      <h3>The Impact</h3>

      <p>Pre-surgical patient review went from hours to minutes. But the bigger impact was unexpected: the system started catching things humans missed. Drug interactions buried in old records. Contraindications that nobody remembered. Family history notes from intake forms that never made it into the active chart.</p>

      <p>We built a search tool. It turned into a safety net.</p>

      <p>Metro's malpractice insurance carrier noticed. Their premium review is "under discussion"—which, in insurance terms, means it's going down.</p>
    `
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  // Monthly AI Updates - 2025 (November to January, newest first)
  {
    id: 'ai-nov-2025',
    title: 'November 2025: Three Frontier Models in One Week',
    date: 'NOV 2025',
    author: 'Frederick A.',
    excerpt: 'Gemini 3, Claude Opus 4.5, and GPT-5.1 released within days. Here\'s what it means for your business.',
    image: '/assets/journal/nov-2025.jpg',
    content: `
      <p>The week of November 18th was the most competitive seven days in commercial AI history. Google dropped Gemini 3 Pro. Anthropic responded with Claude Opus 4.5. OpenAI released GPT-5.1. Three frontier models in one week.</p>

      <p>If you're a business leader trying to make sense of this, here's what actually matters.</p>

      <h3>What Each Model Brings</h3>

      <p><strong>Gemini 3 Pro (Nov 18)</strong> topped the LMArena leaderboard with breakthrough multimodal reasoning. Google's first clear win in the foundation model race.</p>

      <p><strong>Claude Opus 4.5 (Nov 24)</strong> reclaimed the coding crown with 80.9% on the SWE-bench benchmark. Anthropic priced it at $5/$25 per million tokens—aggressive for a frontier model.</p>

      <p><strong>GPT-5.1 (Nov 19)</strong> delivered improved agentic and coding capabilities as an interim release between GPT-5 and whatever comes next.</p>

      <h3>The Real Story</h3>

      <p>Competition is driving two things that matter to you: prices are dropping and capabilities are rising. What cost $100 in API calls a year ago now costs $10. What required custom engineering now works out of the box.</p>

      <p>NotebookLM added infographic and slide deck generation this month. That's frontier AI becoming practical office software.</p>

      <h3>What This Means For You</h3>

      <p>Stop waiting for the "right" model to adopt. The landscape will keep shifting. Focus on identifying specific workflows where AI creates value, then implement with whatever model fits best today. You can always upgrade later.</p>

      <hr />

      <p><em>The companies winning with AI aren't the ones using the newest model. They're the ones who started implementing six months ago and are now iterating.</em></p>
    `
  },
  {
    id: 'ai-oct-2025',
    title: 'October 2025: The Solo Founder Revolution',
    date: 'OCT 2025',
    author: 'Marcus T.',
    excerpt: '35% of new US startups are now founded by one person. AI coding tools are the reason.',
    image: '/assets/journal/oct-2025.jpg',
    content: `
      <p>Cursor's parent company just closed a $2.3 billion funding round at a $29.3 billion valuation. That's not a typo. A coding assistant is now worth more than most publicly traded tech companies.</p>

      <p>But the real story isn't Cursor's valuation. It's what's happening on the ground.</p>

      <h3>The Numbers</h3>

      <p>35% of new US startups in 2025 are led by solo founders. That's up from 22% in 2023. The combined valuation of leading AI coding startups—Cognition, Lovable, Replit, Cursor, Vercel—grew 350% year-over-year to over $36 billion.</p>

      <p>Y Combinator reported that 25% of their Winter 2025 batch generated 95% of their code with AI tools. Read that again. A quarter of the most competitive startup cohort on earth is building with almost no traditional coding.</p>

      <h3>What Changed</h3>

      <p>Claude Haiku 4.5 launched this month—Anthropic's fast, cost-effective model for high-volume applications. For builders, this means you can prototype ten ideas for the cost of one a year ago.</p>

      <p>The term "vibe coding" went mainstream. You describe what you want in plain English. The AI writes the code. You iterate through conversation. No CS degree required.</p>

      <h3>What This Means For You</h3>

      <p>If you've been putting off building that internal tool, launching that side project, or automating that workflow because "we don't have developers"—that excuse just expired. The barriers to building software are the lowest they've ever been.</p>

      <hr />

      <p><em>The question isn't whether you can build with AI. It's what you would build if the cost of building dropped to nearly zero.</em></p>
    `
  },
  {
    id: 'ai-sep-2025',
    title: 'September 2025: Infrastructure at Scale',
    date: 'SEP 2025',
    author: 'Nina R.',
    excerpt: 'Claude Sonnet 4.5 claims best coding model. Stargate expands to 7 gigawatts. What the buildout signals.',
    image: '/assets/journal/sep-2025.jpg',
    content: `
      <p>OpenAI announced five new Stargate data center sites this month, bringing total capacity to 7 gigawatts and over $400 billion in committed investment over three years. To put that in context: that's roughly the power consumption of a small country dedicated entirely to AI compute.</p>

      <h3>The Infrastructure Race</h3>

      <p>We're watching a new kind of arms race. Not for weapons, but for compute. The companies building the biggest data centers will have the capacity to train the largest models. The largest models generally perform best. Performance drives adoption. Adoption drives revenue. Revenue funds more infrastructure.</p>

      <p>This flywheel is now spinning at unprecedented speed.</p>

      <h3>Claude Sonnet 4.5</h3>

      <p>Anthropic released Claude Sonnet 4.5, which they describe as "the best coding model in the world." Whether that claim holds depends on your benchmarks, but the capability improvements are real. More importantly for businesses, it's faster and cheaper per token than its predecessor.</p>

      <p>Sora 2 also entered limited release this month. AI video generation is moving from "impressive demo" to "production tool."</p>

      <h3>What This Means For You</h3>

      <p>The infrastructure buildout signals that major players are betting heavily on AI becoming essential infrastructure—like electricity or internet. They're not building for curiosity. They're building because they expect demand to multiply.</p>

      <p>If the biggest tech companies on earth are investing hundreds of billions in AI infrastructure, the question isn't whether AI will transform business operations. It's whether you'll be ready when it does.</p>

      <hr />

      <p><em>Strategic planning used to mean planning for a world without AI. Now it means planning for a world where AI is everywhere.</em></p>
    `
  },
  {
    id: 'ai-aug-2025',
    title: 'August 2025: GPT-5 Changes the Game',
    date: 'AUG 2025',
    author: 'Frederick A.',
    excerpt: 'OpenAI\'s flagship model arrives with 256K context, built-in routing, and expert-level performance.',
    image: '/assets/journal/aug-2025.jpg',
    content: `
      <p>GPT-5 launched on August 7th. After months of speculation, OpenAI delivered a model that unifies capabilities most businesses were cobbling together from multiple tools.</p>

      <h3>What GPT-5 Actually Does</h3>

      <p>256K token context window (400K via API). That's roughly 500 pages of text in a single conversation. For businesses dealing with complex documents, contracts, or research—this is transformative.</p>

      <p>Built-in routing between instant and deep thinking modes. The model decides when to respond quickly and when to reason carefully. You don't have to choose which model to use anymore.</p>

      <p>94.6% on AIME 2025 (advanced math). 74.9% on SWE-bench Verified (real-world coding). These aren't demo benchmarks. They're measures of practical capability.</p>

      <h3>Claude Opus 4.1</h3>

      <p>Anthropic released Opus 4.1 just days before GPT-5, focused on agentic tasks and real-world coding. The competition is fierce, which means prices keep dropping and capabilities keep rising.</p>

      <h3>The Microsoft Factor</h3>

      <p>GPT-5 integration with Microsoft Copilot means enterprise workflows get frontier AI capabilities without custom development. For mid-market companies already in the Microsoft ecosystem, this is the fastest path to AI adoption.</p>

      <h3>What This Means For You</h3>

      <p>If you've been waiting for AI to reach "good enough" for serious business use, it has. GPT-5 and Claude Opus 4.1 handle tasks that required specialized consultants a year ago. The cost of inaction is now concrete: your competitors have access to the same tools.</p>

      <hr />

      <p><em>The question isn't whether these tools work. It's whether your organization can integrate them before your competitors do.</em></p>
    `
  },
  {
    id: 'ai-jul-2025',
    title: 'July 2025: The Reality Check',
    date: 'JUL 2025',
    author: 'David M.',
    excerpt: 'MIT study claims 95% of businesses found zero AI value. Here\'s what they got wrong—and right.',
    image: '/assets/journal/jul-2025.jpg',
    content: `
      <p>An MIT study dropped in July claiming 95% of businesses that tried AI found zero value. The headlines were brutal. "AI Hype Bubble Bursts." "Enterprise AI: All Sizzle, No Steak."</p>

      <p>The reality is more nuanced—and more useful.</p>

      <h3>What the Study Actually Found</h3>

      <p>The study examined companies that "tried AI." That's the key word. Most organizations that fail with AI fail because they approach it like a technology purchase rather than a capability transformation.</p>

      <p>They buy tools. They don't change workflows. They expect magic. They get disappointment.</p>

      <h3>What Success Actually Looks Like</h3>

      <p>The companies succeeding with AI share common patterns: they start with specific problems, not general "AI initiatives." They measure outcomes, not activity. They integrate AI into existing workflows rather than building parallel systems.</p>

      <p>OpenAI helped by releasing ChatGPT Agent as a unified agentic system. They also dropped GPT-4o pricing to $3/million input tokens. Lower costs mean faster experimentation. Faster experimentation means faster learning.</p>

      <h3>What This Means For You</h3>

      <p>The MIT study is a useful corrective to hype. But its conclusion—that AI doesn't work—misses the point. AI works when implemented thoughtfully. It fails when thrown at problems without strategy.</p>

      <p>The question isn't "does AI work?" It's "do we have a clear plan for how AI creates value in our specific context?"</p>

      <hr />

      <p><em>The difference between companies in the 5% that succeeded and the 95% that didn't isn't the technology they used. It's how they approached implementation.</em></p>
    `
  },
  {
    id: 'ai-jun-2025',
    title: 'June 2025: The Talent War You Can\'t Win',
    date: 'JUN 2025',
    author: 'Frederick A.',
    excerpt: 'Meta paid $14.3B for Scale AI. Top AI talent commands sports-star compensation. What this means for your hiring strategy.',
    image: '/assets/journal/jun-2025.jpg',
    content: `
      <p>Meta's $14.3 billion Scale AI investment was widely interpreted as an acqui-hire of CEO Alexandr Wang. One person, valued at billions. Welcome to the AI talent market.</p>

      <h3>The Compensation Reality</h3>

      <p>Top AI talent now commands tens to hundreds of millions for four-year contracts. These are compensation packages typically reserved for professional athletes and A-list entertainers.</p>

      <p>50% of developers now use AI coding tools daily. In top-quartile organizations, it's 65%. The people who can orchestrate AI systems effectively are the new scarce resource.</p>

      <h3>What This Means For Most Companies</h3>

      <p>You're not going to win the AI talent war. The math doesn't work. If Google, Meta, OpenAI, and Anthropic are offering hundreds of millions, mid-market companies can't compete on compensation.</p>

      <p>But you don't need to.</p>

      <h3>The Alternative Strategy</h3>

      <p>Instead of hiring AI specialists, upskill your existing team. The tools are designed for this. Claude, GPT, and Gemini are built to be used by people who aren't AI experts.</p>

      <p>Your competitive advantage isn't hiring the best AI engineers. It's having team members who understand your business deeply AND can leverage AI tools effectively. That combination is more valuable—and more achievable—than competing for unicorn hires.</p>

      <hr />

      <p><em>The companies winning with AI in 2025 aren't the ones with the biggest AI teams. They're the ones that made AI literacy a company-wide capability.</em></p>
    `
  },
  {
    id: 'ai-may-2025',
    title: 'May 2025: Claude 4 Arrives',
    date: 'MAY 2025',
    author: 'David M.',
    excerpt: 'Anthropic releases Claude 4. Y Combinator reports 25% of startups generate 95% of code with AI. The vibe coding era is official.',
    image: '/assets/journal/may-2025.jpg',
    content: `
      <p>May 22nd: Anthropic released Claude Sonnet 4 and Claude Opus 4, setting new standards for coding, reasoning, and AI agents. Opus 4 positioned itself as the world's best coding model.</p>

      <p>The timing aligned with a Y Combinator revelation: 25% of their Winter 2025 batch generated 95% of their code using AI tools.</p>

      <h3>What Claude 4 Changes</h3>

      <p>The performance improvements are significant, but the practical impact matters more. Tasks that required custom development—building internal tools, automating workflows, creating prototypes—now happen through conversation.</p>

      <p>Windsurf (formerly Codeium) launched its first family of AI software engineering models optimized for the entire development process. ElevenLabs integrated with n8n, enabling businesses to automate audio content creation.</p>

      <h3>The "Vibe Coding" Shift</h3>

      <p>Andrej Karpathy's term went mainstream this year: "vibe coding." You describe what you want. The AI writes the code. You iterate through conversation until it works.</p>

      <p>This isn't a gimmick. It's a fundamental shift in how software gets built. The barrier between "I have an idea" and "I have working software" just collapsed.</p>

      <h3>What This Means For You</h3>

      <p>If you're a business owner with technical problems but no technical team, Claude 4 is your engineering department. If you're a developer, it's your force multiplier. Either way, the productivity gains are real and immediate.</p>

      <hr />

      <p><em>The tools have arrived. The question is whether you'll use them to build or wait for someone else to build faster.</em></p>
    `
  },
  {
    id: 'ai-apr-2025',
    title: 'April 2025: Enterprise Spending Explodes',
    date: 'APR 2025',
    author: 'Nina R.',
    excerpt: 'Departmental AI spend hits $7.3B—up 4.1x year over year. Coding accounts for 55%. What the data reveals.',
    image: '/assets/journal/apr-2025.jpg',
    content: `
      <p>The numbers from Q1 2025 are in. Departmental AI spending reached $7.3 billion—up 4.1x year over year. Coding tools alone account for 55% of that spend, roughly $4 billion.</p>

      <p>This isn't hype. This is CFO-approved budget allocation.</p>

      <h3>Where the Money Goes</h3>

      <p>87% of large enterprises have now implemented AI solutions, averaging $6.5 million annual investment per organization. Windsurf (renamed from Codeium) became the second-largest source of enterprise LLM traffic with strong adoption of coding-focused models.</p>

      <p>The pattern is clear: enterprises are investing in AI tools that directly augment knowledge work, particularly software development.</p>

      <h3>The SMB Gap</h3>

      <p>Here's what concerns me. Large enterprises are investing millions in AI capability. Many small and mid-sized businesses are still experimenting with free tiers. The capability gap is widening.</p>

      <p>The good news: the same tools enterprises use are available to smaller organizations. The pricing is accessible. The learning curve is manageable. What's missing is usually strategy and commitment, not budget.</p>

      <h3>What This Means For You</h3>

      <p>Enterprise spending signals where the smart money sees value. Right now, that's coding assistance, workflow automation, and document processing. If you're not investing in these areas, you're falling behind competitors who are.</p>

      <hr />

      <p><em>The ROI data is in. AI implementation pays off when done strategically. The question is whether you'll make the investment now or scramble to catch up later.</em></p>
    `
  },
  {
    id: 'ai-mar-2025',
    title: 'March 2025: The Agent Evolution',
    date: 'MAR 2025',
    author: 'Frederick A.',
    excerpt: 'AI task capability doubles every 7 months. Agents won\'t replace jobs—they\'ll transform them.',
    image: '/assets/journal/mar-2025.jpg',
    content: `
      <p>METR published research in March showing AI task duration capability doubles approximately every 7 months. Read that again. Every seven months, AI can handle tasks that take twice as long.</p>

      <p>This has profound implications for how we think about AI and work.</p>

      <h3>The Dr. Strange Theory</h3>

      <p>NLW on AI Daily Brief articulated something important: AI agents won't be 1-to-1 replacements for labor. They won't simply do what humans do, cheaper. They'll transform how jobs get done entirely.</p>

      <p>Think about how spreadsheets changed accounting. Accountants didn't disappear. But the nature of accounting work changed completely. AI agents will do the same across knowledge work.</p>

      <h3>Vibe Coding Goes Mainstream</h3>

      <p>Andrej Karpathy's tweet about "vibe coding" went viral this month. The idea: developers describe what they want in natural language, AI handles the syntax. You iterate through conversation, not code.</p>

      <p>This isn't about replacing developers. It's about what developers can accomplish when they're freed from boilerplate and syntax. The answer: a lot more.</p>

      <h3>What This Means For You</h3>

      <p>Plan for AI capability that doubles every seven months. What seems impossible today will be routine in 18 months. Build your AI strategy around this trajectory, not today's limitations.</p>

      <hr />

      <p><em>The organizations that thrive won't be the ones that resist change. They'll be the ones that redesign work around what AI makes possible.</em></p>
    `
  },
  {
    id: 'ai-feb-2025',
    title: 'February 2025: Compliance Begins, Adoption Accelerates',
    date: 'FEB 2025',
    author: 'Nina R.',
    excerpt: 'EU AI Act prohibitions take effect. Meanwhile, SMB AI adoption climbs quietly. The two stories are connected.',
    image: '/assets/journal/feb-2025.jpg',
    content: `
      <p>February 2nd marked the beginning of EU AI Act enforcement. Prohibited AI practices and AI literacy obligations came into force across Europe. For businesses operating internationally, this is now a compliance requirement.</p>

      <h3>What the Regulation Requires</h3>

      <p>The EU AI Act categorizes AI systems by risk level. High-risk systems face strict requirements around transparency, human oversight, and documentation. Prohibited practices include social scoring, real-time facial recognition in public spaces, and manipulation techniques.</p>

      <p>For most business applications—chatbots, document processing, workflow automation—the requirements are manageable. But they require attention.</p>

      <h3>The Adoption Data</h3>

      <p>Meanwhile, Census Bureau data shows small business AI adoption (1-4 employees) increased from 4.6% to 5.8%. That might seem small, but it represents thousands of businesses discovering what AI can do for them.</p>

      <p>78% of business owners using AI reported time savings. GoDaddy launched "GoDaddy Airo" to help small businesses enhance online presence. The tool ecosystem for SMBs is expanding rapidly.</p>

      <h3>What This Means For You</h3>

      <p>Regulation and adoption aren't opposing forces. Smart regulation builds trust. Trust accelerates adoption. If you're implementing AI, build governance into your approach from the start. It's easier than retrofitting later.</p>

      <hr />

      <p><em>The EU AI Act isn't anti-innovation. It's a framework for responsible innovation. The companies that embrace it early will have a competitive advantage when governance becomes standard expectation.</em></p>
    `
  },
  {
    id: 'ai-jan-2025',
    title: 'January 2025: DeepSeek Changes Everything',
    date: 'JAN 2025',
    author: 'Frederick A.',
    excerpt: 'A Chinese AI lab built a GPT-4 competitor for $5.6 million. Then Stargate announced $500 billion. The AI economics just shifted.',
    image: '/assets/journal/jan-2025.jpg',
    content: `
      <p>January 2025 delivered two stories that seem contradictory but actually tell the same tale: AI economics are being rewritten.</p>

      <h3>The DeepSeek Shockwave</h3>

      <p>On January 23rd, Chinese AI startup DeepSeek released its R1 reasoning model. Open-source. Developed for $5.6 million—a fraction of what competitors spent. It matched OpenAI's o1 performance while requiring 50% less compute than GPT-4o.</p>

      <p>By month's end, DeepSeek overtook ChatGPT as the most downloaded app on Apple's App Store. A model that cost almost nothing to train, competing with models that cost billions.</p>

      <h3>Project Stargate</h3>

      <p>Two days earlier, on January 21st, President Trump announced the $500 billion Stargate AI infrastructure project alongside OpenAI's Sam Altman, SoftBank's Masayoshi Son, and Oracle's Larry Ellison. Initial $100 billion deployment began immediately.</p>

      <p>OpenAI also released GPT-4.5 (Orion) to Pro subscribers—incremental improvements while they prepare for GPT-5.</p>

      <h3>What Both Stories Mean</h3>

      <p>DeepSeek proved you don't need billions to build competitive AI. Stargate showed that the biggest players are betting billions anyway. The implication: AI capability is becoming simultaneously cheaper and more powerful. The gap between leaders and followers will widen, but the floor keeps rising.</p>

      <h3>What This Means For You</h3>

      <p>The cost of AI implementation dropped dramatically in January. Open-source models like DeepSeek R1 offer enterprise-grade capabilities without enterprise budgets. If cost was your objection to AI adoption, that objection just got much weaker.</p>

      <hr />

      <p><em>2025 began with a clear message: the AI barrier to entry is lower than ever, but the ceiling keeps rising. The time to implement is now.</em></p>
    `
  },
  // Existing thought leadership articles
  {
    id: 'j1',
    title: 'The Latency Tax Nobody Talks About',
    date: 'MAR 2025',
    author: 'David M.',
    excerpt: 'Your AI agent is probably too slow. Here\'s why that matters more than its intelligence.',
    image: '/assets/sections/integration-hub.png',
    content: `
      <p>I watched a product demo last month where the founder proudly showed off their AI assistant. It was genuinely impressive—nuanced responses, excellent reasoning, could handle complex multi-step tasks.</p>

      <p>It also took 8 seconds to respond to a simple question.</p>

      <p>The founder didn't seem to notice. Everyone in the room was politely waiting, the way you do. But here's what I kept thinking: nobody is going to use this. Not because it's not smart. Because it's not fast.</p>

      <h3>The 400ms Threshold</h3>

      <p>We've deployed enough AI systems at this point to know where the breaking point is. It's around 400 milliseconds. That's the moment where waiting for AI becomes more friction than just doing the thing yourself.</p>

      <p>Below 400ms, the AI feels like an extension of your thinking. Above it, you start noticing you're waiting. By 2 seconds, you're wondering if you should just do it manually. By 5 seconds, you've already opened another tab.</p>

      <p>This isn't a preference. It's neuroscience. Your working memory can only hold information for about 10-15 seconds before it starts decaying. A slow AI isn't just annoying—it's breaking your train of thought.</p>

      <h3>The Smartness Trap</h3>

      <p>The AI industry has an obsession with benchmark performance. Every new model release comes with charts showing it's 3% better at graduate-level math or 5% better at coding puzzles.</p>

      <p>Nobody shows the latency charts. Because they're embarrassing.</p>

      <p>The smartest model in the world is useless if it takes 10 seconds to respond. A slightly dumber model that responds instantly will get used. A genius that takes forever will collect dust.</p>

      <p>This is why we route aggressively. Simple questions go to small, fast models. Complex questions go to capable models. The user never sees the routing—they just experience speed.</p>

      <h3>What This Means For Deployment</h3>

      <p>If you're building AI into your product or workflow, measure latency before you measure accuracy. Run your prompts through a stopwatch before you run them through an eval suite.</p>

      <p>The painful truth: sometimes you need to make your AI dumber to make it useful. A 90% accurate response in 200ms beats a 95% accurate response in 3 seconds for almost every real-world application.</p>

      <p>Intelligence that arrives too late is indistinguishable from stupidity.</p>

      <hr />

      <p><em>This is something we think about constantly when designing systems for our clients. Speed isn't a feature—it's the feature. Everything else is academic if nobody waits around to see it.</em></p>
    `
  },
  {
    id: 'j2',
    title: 'Your Context Window Is Not a Database',
    date: 'FEB 2025',
    author: 'Nina R.',
    excerpt: 'The biggest mistake companies make with RAG: treating AI memory like a filing cabinet.',
    image: '/assets/sections/strategy-map.png',
    content: `
      <p>Every few weeks, someone pitches me on their new RAG system. "We can stuff a million tokens into context now," they say. "The model can access everything."</p>

      <p>Cool. Have you actually tested what happens when you do that?</p>

      <p>Because what happens is this: the model gets dumber. Not slightly dumber. Dramatically, measurably dumber. The more "memory" you give it, the worse it performs.</p>

      <p>This is not a bug. It's how attention mechanisms work. And if you're deploying AI systems without understanding this, you're building on sand.</p>

      <h3>The "Lost in the Middle" Problem</h3>

      <p>Researchers at Stanford documented this last year, but practitioners have known it forever. When you fill a context window with documents, the model reliably ignores information in the middle. It pays attention to the beginning. It pays attention to the end. Everything in between becomes statistical noise.</p>

      <p>Think about what this means for the naive RAG approach: "just embed everything and retrieve the top-k chunks." You're literally burying your most relevant information in a sea of moderately-relevant context. The model can't find it. It doesn't even look.</p>

      <h3>Memory Is Not Storage</h3>

      <p>Human memory doesn't work by storing everything and searching through it. It works by encoding relationships and retrieving through association. We remember things because they connect to other things.</p>

      <p>AI memory should work the same way. Not "dump everything in context and hope attention finds it," but "carefully select exactly what's needed and nothing else."</p>

      <p>We think about this as two distinct systems:</p>

      <p><strong>Working Memory</strong> (the context window) — Small, focused, constantly refreshed. Only what's needed for the current task. Like your desk while you're working: clean, relevant, immediate.</p>

      <p><strong>Long-Term Storage</strong> (vector databases, knowledge graphs) — Everything else. Structured for retrieval by relationship, not by keyword. Accessed surgically, not dumped wholesale.</p>

      <h3>The Practical Implication</h3>

      <p>When we build retrieval systems, we spend more time on what NOT to include than what to include. The goal isn't comprehensive context—it's precise context.</p>

      <p>Five perfectly relevant paragraphs will outperform fifty moderately relevant pages every single time. The model doesn't need everything. It needs exactly the right thing.</p>

      <p>This is harder than it sounds. It requires understanding your data well enough to know what "right" means for any given query. There are no shortcuts here.</p>

      <hr />

      <p><em>If your RAG system is returning mediocre results, the answer probably isn't "use a bigger model" or "increase chunk size." It's probably "be more selective about what you're retrieving." Garbage in, garbage out—even with a trillion parameters.</em></p>
    `
  },
  {
    id: 'j3',
    title: 'The Chief AI Officer Won\'t Exist in Three Years',
    date: 'JAN 2025',
    author: 'Frederick A.',
    excerpt: 'Why the hottest role in tech is already obsolete—and what\'s actually coming next.',
    image: '/assets/hero/bridge-metaphor.png',
    content: `
      <p>I've been getting a lot of calls from companies looking to hire their first "Head of AI" or "Chief AI Officer." The conversations all go roughly the same way.</p>

      <p>"We need someone to own our AI strategy."</p>

      <p>What they mean: "We have no idea what we're doing with AI and we want to hire someone to figure it out."</p>

      <p>I understand the impulse. But I'm going to tell you what I tell them: this role is a transitional patch, not a permanent solution. And if you hire for it wrong, you're going to have problems.</p>

      <h3>AI Is Not a Department</h3>

      <p>Here's the core issue: AI is not a function. It's not like legal or finance or HR, where you can hire specialists, put them in a department, and let them handle their thing.</p>

      <p>AI is a capability layer. It touches sales (lead scoring, outreach automation). It touches operations (process automation, quality control). It touches product (features, personalization). It touches support (chatbots, ticket routing). It touches literally everything.</p>

      <p>You know what happens when you hire a Chief AI Officer and give them their own department? They become a service bureau. Every team that wants AI has to submit a ticket, wait in queue, and hope the AI team has bandwidth. The AI team becomes a bottleneck instead of an accelerant.</p>

      <h3>What Actually Works</h3>

      <p>The companies getting this right aren't creating AI departments. They're embedding AI capability into existing teams.</p>

      <p>The CMO needs to understand what generative AI can do for content and personalization—not delegate to an AI team that doesn't understand marketing. The COO needs to understand agentic automation—not wait for an AI team to build something that doesn't fit their workflows.</p>

      <p>This requires something uncomfortable: existing leaders need to get technically literate. Not "can write code" literate. But "understands what's possible and what's not" literate. "Can evaluate vendors and bullshit" literate. "Knows enough to ask the right questions" literate.</p>

      <h3>The Transition</h3>

      <p>So what's the Chief AI Officer role actually for? In my view, it's a transitional position. Someone to accelerate the organization's AI maturity until AI capability is distributed across the business.</p>

      <p>A good CAIO should be working to make themselves unnecessary. Building internal training programs. Creating reusable infrastructure. Mentoring functional leaders on AI applications in their domains. Establishing governance and standards.</p>

      <p>If your CAIO is building an empire, they're doing it wrong. If they're building capabilities in other people's teams, they're doing it right.</p>

      <hr />

      <p><em>We're in a weird moment where AI expertise is rare enough to be centralized and important enough to be distributed. The companies that figure out this transition fastest will have a significant advantage. The ones that create AI fiefdoms will spend years unwinding them.</em></p>
    `
  }
];

export const PRODUCTS: Product[] = [];