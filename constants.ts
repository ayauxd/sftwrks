/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Initiative, Product, JournalArticle, CaseStudy } from './types';

export const BRAND_NAME = 'Softworks';
export const BRAND_NAME_SHORT = 'SOFTWORKS';
export const BRAND_TAGLINE = 'AI that works for your business';
export const BRAND_LEGAL_NAME = 'Softworks Trading Company';

export const INITIATIVES: Initiative[] = [
  {
    id: 'pitch',
    name: 'Pitch Film Studio',
    role: 'Media Production',
    description: 'Video and visual content that explains complex ideas clearly.',
    status: 'Active',
    link: 'mailto:agents@sftwrks.com?subject=Pitch%20Film%20Studio%20Inquiry'
  },
  {
    id: 'pre-purchase',
    name: 'Pre Purchase Pro',
    role: 'Asset Verification',
    description: 'Inspects vehicles before purchase with professional reports for better purchase descriptions.',
    status: 'Independent',
    link: 'mailto:agents@sftwrks.com?subject=Pre%20Purchase%20Pro%20Inquiry'
  },
  {
    id: 'tiwa',
    name: 'tiwa.ai',
    role: 'R&D Lab',
    description: 'A personal AI assistant for busy professionals who want to get more done.',
    status: 'Experimental',
    link: 'mailto:agents@sftwrks.com?subject=tiwa.ai%20Inquiry'
  },
  {
    id: 'cbah',
    name: 'CBAH Organization',
    role: 'Social Chain',
    description: 'A network of friends supporting friends to make a difference in their communities.',
    status: 'Affiliated',
    link: 'mailto:agents@sftwrks.com?subject=CBAH%20Organization%20Inquiry'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    client: 'Government Logistics Agency',
    sector: 'Public Sector',
    title: 'The Document Backlog Crisis',
    summary: 'They said: "We need to hire more people." The real constraint: routing decisions were buried in a 6-step manual process. One system fixed it.',
    outcome: 'Constraint: routing, not headcount. Result: 90% faster processing.',
    imageUrl: '/assets/case-studies/logistics-noir.webp',
    date: 'MAR 2025',
    completedDate: '2025-03',
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
    client: 'Mid-Size Financial Services Firm',
    sector: 'Financial Services',
    title: 'The Hallucination Problem in Regulated AI',
    summary: 'They said: "We need a smarter AI model." The real constraint: no verification layer between generation and customer. We built one.',
    outcome: 'Constraint: verification, not intelligence. Result: 0 hallucinations in 150K+ chats.',
    imageUrl: '/assets/case-studies/finance-noir.webp',
    date: 'NOV 2025',
    completedDate: '2025-11',
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
    id: 'cs4',
    client: 'Small Accounting Practice',
    sector: 'Professional Services',
    title: 'The Content Marketing Time Crunch',
    summary: 'They said: "We need to hire a marketing person." The real constraint: content production bottlenecked on the expert. We automated the tedious parts.',
    outcome: 'Constraint: production, not expertise. Result: 12 videos/mo from 2 hours.',
    imageUrl: '/assets/case-studies/accounting-noir.webp',
    date: 'JUN 2025',
    completedDate: '2025-06',
    content: `
      <p>Lisa Bennett runs a three-person accounting firm in the suburbs. Her problem wasn't finding clients—word of mouth kept her busy. Her problem was visibility. Every marketing consultant told her the same thing: you need to be on social media, posting consistently, showing your expertise.</p>

      <p>"I know I should," she told us. "But I have 47 tax returns due next week. When exactly am I supposed to create content?"</p>

      <p>This is the reality for most small professional services firms. They know content marketing works. They don't have the bandwidth to do it.</p>

      <h3>The Old Way Wasn't Working</h3>

      <p>Lisa had tried the usual approaches. She hired a marketing agency—generic posts that didn't sound like her. She tried doing it herself—managed three weeks before client work buried her. She bought a video course—never opened it.</p>

      <p>The content marketing advice assumes you have either time or money. Most small business owners have neither to spare.</p>

      <h3>Building the Content Pipeline</h3>

      <p>We built Lisa a system with one goal: turn 10 minutes of her expertise into a week of content.</p>

      <p>Once a week, Lisa answers three questions into her phone. Common client questions, tax tips, business advice—whatever's on her mind. Total time: about 10 minutes.</p>

      <p>The system handles everything else. AI transcription cleans up the audio. Language models extract key points and write them into short-form video scripts—maintaining Lisa's voice because we trained the system on her communication style. The automation generates motion graphics, formats for multiple platforms, burns in captions, and schedules posts across the week.</p>

      <h3>The Numbers That Matter</h3>

      <p>From those 10 minutes of talking, Lisa gets multiple videos per month across three platforms. Her total time investment: about 2 hours monthly, including review and approval.</p>

      <p>Six months in: website traffic up significantly. New clients directly attributed to "I saw your video." One local news interview request. And Lisa's favorite metric: zero hours spent editing video or writing captions.</p>

      <p>The ROI was immediate. Her first new client from the content covered the system cost for the entire year.</p>

      <h3>What This Actually Looks Like</h3>

      <p>The videos aren't Hollywood productions. They're simple, clear, and professional. Text on screen. Lisa's voice explaining something useful. Maybe a simple animation. That's it.</p>

      <p>But here's what Lisa figured out: on social media, consistency beats production value. Showing up every week with something helpful matters more than showing up once with something perfect.</p>

      <p>The automation handles the tedium. Lisa provides the expertise. Her audience gets value. Everyone wins.</p>

      <p>"I finally feel like I have a marketing department," Lisa told us recently. "It just happens to be robots."</p>
    `
  },
  {
    id: 'cs5',
    client: 'Private Event',
    sector: 'Consumer / Events',
    title: 'The AI Photo Booth That Runs Itself',
    summary: 'They said: "We need a photo booth attendant." The real constraint: the interface required technical knowledge. We built one a 5-year-old could use.',
    outcome: 'Constraint: interface, not staffing. Result: hundreds of personalized images, zero assistance needed.',
    imageUrl: '/assets/case-studies/photobooth-noir.webp?v=2',
    date: 'JAN 2026',
    completedDate: '2026-01',
    content: `
      <p>The request came three days before a children's event. "I want every kid to see themselves in a custom adventure scene." Dozens of children. Personalized photos for each one. No staff to run it.</p>

      <p>Traditional photo booths require attendants and produce generic results. AI image generation could create personalized adventures—but the technology typically requires someone who knows what they're doing.</p>

      <p>The question: could we build something that runs itself?</p>

      <h3>The Constraint That Shaped Everything</h3>

      <p>No staff meant no troubleshooting. No "let me fix that for you." No "try uploading again." Everything had to work the first time, every time, operated by young children and their parents who'd never used AI tools.</p>

      <p>This constraint drove every design decision. Minimal interface. Clear visual feedback. Error recovery built into the flow. The goal: anyone could walk up and use it without instructions.</p>

      <p>We designed an access system that let the host share entry codes via text message. No accounts. No passwords. No friction. Just a code and immediate access.</p>

      <h3>The Approach</h3>

      <p>The prompt engineering took longer than the code. Getting AI to preserve a person's likeness while placing them in a creative scene required careful structuring of scene, environment, and style parameters.</p>

      <p>We optimized for speed and reliability over features. Every component was chosen to minimize failure points and maximize uptime during the event window.</p>

      <h3>The Result</h3>

      <p>Hundreds of photos generated across the afternoon. Kids cycling back for "one more adventure." Parents sharing results before they left.</p>

      <p>The system ran for hours without intervention. No crashes. No confused users. No one asking how it works. They just used it.</p>

      <h3>The Bigger Point</h3>

      <p>This demonstrates something important: AI applications don't require AI expertise to use. The complexity can be hidden. The magic can feel effortless.</p>

      <p>When a 5-year-old can operate your AI system without help, you've probably designed it right.</p>

      <p>This approach scales to corporate events, brand activations, and any scenario where you need personalized AI-generated content without technical staff on site.</p>
    `
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  // 2026 Articles (newest first)
  {
    id: 'ai-jan-2026',
    title: 'January 2026: When Your Payment Processor Forgets You Exist',
    date: 'JAN 2026',
    author: 'Frederick A.',
    excerpt: 'Your payment processor doesn\'t care about your business. One API glitch deleted a founder\'s entire revenue stream. The recovery trick he used was pure luck.',
    image: '/assets/journal/jan-2026.webp',
    content: `
      <p>On January 14th, machine learning author Andriy Burkov shared a cautionary tale that should concern every business running on cloud infrastructure. He connected his existing Stripe account to X's Creator Revenue Sharing program. What happened next is a masterclass in platform dependency risk.</p>

      <h3>The Incident</h3>

      <p>The moment Burkov linked his Stripe account to X, his primary business account—the one handling all his ChapterPal app subscriptions—effectively disappeared from Stripe's system. Authenticator codes stopped working. Customer subscriptions failed with errors claiming the user didn't exist. Stripe support could only see an empty X-linked account.</p>

      <p>His entire payment infrastructure vanished because of an integration glitch.</p>

      <h3>The Resolution (And Why It Was Lucky)</h3>

      <p>Burkov found his original Stripe account ID cached in his browser history. Support used this to locate and restore access. The account "magically" started working again—a backend glitch, not permanent deletion.</p>

      <p>But Burkov knows how this could have ended. He previously had an Amazon KDP account deleted—permanently wiping his books and royalties with no recovery possible. That data is gone forever.</p>

      <h3>Best Practices for Cloud-Dependent Businesses</h3>

      <p><strong>Diversify payment processors.</strong> Never rely on a single provider. Set up backups (PayPal, Square, Adyen) that can handle transactions if one fails.</p>

      <p><strong>Maintain separate accounts for distinct integrations.</strong> Use dedicated accounts for different platform connections. This prevents cross-contamination when one integration goes wrong.</p>

      <p><strong>Keep detailed records outside the platform.</strong> Document account IDs, API keys, transaction histories, and customer data in secure offline storage. Browser history saved Burkov—but you shouldn't rely on luck.</p>

      <p><strong>Build existential redundancy.</strong> Design systems to reconstitute your business outside any single platform. Own your customer emails. Export data regularly. Assume any platform can fail or freeze your account without warning.</p>

      <h3>What This Means For You</h3>

      <p>The cloud giveth and the cloud taketh away. Every business running on third-party infrastructure is one database glitch away from operational crisis. The question isn't whether to use cloud services—they're essential. The question is whether you've built enough redundancy to survive when they fail.</p>

      <hr />

      <p><em>Your payment processor, your cloud storage, your SaaS tools—they're all rented infrastructure. Build your business knowing that any piece could disappear tomorrow. The survivors are the ones who planned for exactly that.</em></p>
    `
  },
  {
    id: 'ai-dec-2025',
    title: 'December 2025: The Year AI Became Infrastructure',
    date: 'DEC 2025',
    author: 'Frederick A.',
    excerpt: 'The debate is over. AI isn\'t optional anymore. But most companies who "adopted AI" in 2025 built the wrong things. Here\'s what the 5% got right.',
    image: '/assets/journal/dec-2025.webp',
    content: `
      <p>A year ago, the question was whether AI would live up to the hype. Twelve months later, the question has changed entirely. It's no longer "should we adopt AI?" It's "how do we implement it before our competitors do?"</p>

      <h3>The Numbers That Defined 2025</h3>

      <p><strong>$7.3 billion</strong> in departmental AI spending by Q1 alone—up 4.1x year over year. <strong>35%</strong> of new US startups founded by solo entrepreneurs, enabled by AI coding tools. <strong>87%</strong> of large enterprises now have AI implementations in production.</p>

      <p>The shift wasn't gradual. It was a phase change. AI went from experimental to essential in the span of months.</p>

      <h3>What Actually Shipped</h3>

      <p>GPT-5 arrived in August with 256K context windows. Claude 4 and Opus 4.5 pushed coding capabilities to near-human levels. DeepSeek proved you don't need billions to build competitive models. Gemini 3 finally gave Google a clear win in the foundation model race.</p>

      <p>But the real story wasn't the models—it was the applications. AI video generation went from "impressive demo" to "production tool." Coding assistants became standard developer equipment. Customer service bots stopped being jokes.</p>

      <h3>The Talent Paradox</h3>

      <p>Top AI talent now commands sports-star compensation—tens to hundreds of millions for four-year contracts. Yet the tools became accessible enough that non-technical founders are building sophisticated products through "vibe coding."</p>

      <p>The message: you don't need AI experts to use AI effectively. You need people who understand your business and can learn the tools.</p>

      <h3>Looking to 2026</h3>

      <p>Expect agents to become mainstream—AI systems that don't just respond but act autonomously on your behalf. Expect multimodal to become standard—models that work with text, images, video, and audio interchangeably. Expect prices to keep falling and capabilities to keep rising.</p>

      <p>The question for 2026 isn't whether AI matters. It's whether you've built the organizational capability to use it.</p>

      <hr />

      <p><em>2025 was the year AI proved itself. 2026 will be the year it becomes invisible—infrastructure so fundamental we stop noticing it's there.</em></p>
    `
  },
  // 2025 Articles (newest first)
  {
    id: 'ai-nov-2025',
    title: 'November 2025: Three Frontier Models in One Week',
    date: 'NOV 2025',
    author: 'Frederick A.',
    excerpt: 'Gemini 3, Claude Opus 4.5, and GPT-5.1 released within days. Here\'s what it means for your business.',
    image: '/assets/journal/nov-2025.webp',
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
    author: 'Frederick A.',
    excerpt: '35% of new US startups are now founded by one person. AI coding tools are the reason.',
    image: '/assets/journal/oct-2025.webp',
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
    author: 'Frederick A.',
    excerpt: 'Claude Sonnet 4.5 claims best coding model. Stargate expands to 7 gigawatts. What the buildout signals.',
    image: '/assets/journal/sep-2025.webp',
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
    image: '/assets/journal/aug-2025.webp',
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
    excerpt: '95% of businesses found zero AI value. The 5% who won all did the same thing first—and it wasn\'t what the consultants recommended.',
    image: '/assets/journal/jul-2025.webp',
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
    image: '/assets/journal/jun-2025.webp',
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
    image: '/assets/journal/may-2025.webp',
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
    image: '/assets/journal/apr-2025.webp',
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
    image: '/assets/journal/mar-2025.webp',
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
    image: '/assets/journal/feb-2025.webp',
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
    image: '/assets/journal/jan-2025.webp',
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
  // Thought Leadership Articles (spread across months with double entries)
  {
    id: 'j1',
    title: 'The Latency Tax: Why Speed Beats Intelligence',
    date: 'MAR 2025',
    author: 'SFTWRKS Intel',
    excerpt: 'If your AI takes more than a second to respond, people stop using it. Speed matters more than smarts. Here\'s the math.',
    image: '/assets/journal/latency-tax.webp',
    content: `
      <p class="intel-label">SFTWRKS INTEL | DEPLOYMENT PATTERNS</p>

      <p>User tolerance for AI latency drops sharply after 400 milliseconds. By 2 seconds, abandonment rates spike. By 5 seconds, users have switched to manual methods.</p>

      <p>This isn't preference. It's cognitive load. Working memory decays in 10-15 seconds. Slow AI breaks the user's train of thought before it can help.</p>

      <h3>The Threshold Data</h3>

      <table>
        <tr><td><strong>&lt; 400ms</strong></td><td>AI feels like extension of thought</td></tr>
        <tr><td><strong>400ms - 2s</strong></td><td>User notices the wait</td></tr>
        <tr><td><strong>2s - 5s</strong></td><td>User considers doing it manually</td></tr>
        <tr><td><strong>&gt; 5s</strong></td><td>User has already opened another tab</td></tr>
      </table>

      <h3>The Benchmark Trap</h3>

      <p>Model releases emphasize accuracy gains: 3% better at graduate math, 5% improvement on coding benchmarks. Latency benchmarks rarely appear in announcements.</p>

      <p>In production, the tradeoff matters:</p>
      <ul>
        <li>90% accuracy at 200ms → gets used</li>
        <li>95% accuracy at 3 seconds → gets abandoned</li>
      </ul>

      <h3>Routing as Solution</h3>

      <p>Production systems that maintain perceived speed use model routing:</p>
      <ul>
        <li>Simple queries → small, fast models (Haiku, GPT-4o-mini)</li>
        <li>Complex queries → capable models (Opus, GPT-4)</li>
        <li>User experience → consistent sub-second response</li>
      </ul>

      <p>The routing logic adds ~50ms overhead. The perceived speed improvement is 10x.</p>

      <h3>Implementation Note</h3>

      <p>Measure latency before accuracy. Run prompts through a stopwatch before an eval suite. If p95 latency exceeds 1 second, optimize for speed first—even at accuracy cost.</p>

      <hr />

      <p><em>Intelligence that arrives too late is indistinguishable from stupidity.</em></p>
    `
  },
  {
    id: 'j2',
    title: 'Context Windows: Why More Memory Makes Models Dumber',
    date: 'JUN 2025',
    author: 'SFTWRKS Intel',
    excerpt: 'There\'s a right way and wrong way to give AI information. Most people do it wrong—and wonder why their chatbot sounds stupid.',
    image: '/assets/journal/context-window.webp',
    content: `
      <p class="intel-label">SFTWRKS INTEL | RAG ARCHITECTURE</p>

      <p>Filling a context window degrades model performance. This is documented behavior, not a bug. Attention mechanisms lose signal in noise.</p>

      <h3>The "Lost in the Middle" Problem</h3>

      <p>Stanford research confirmed what practitioners observed: models reliably ignore information in the middle of long contexts. Attention concentrates on the beginning and end. Everything between becomes statistical noise.</p>

      <p>Implications for naive RAG:</p>
      <ul>
        <li>"Embed everything, retrieve top-k chunks" buries relevant information</li>
        <li>The model can't find what it needs</li>
        <li>Performance degrades as context grows</li>
      </ul>

      <h3>Two-System Architecture</h3>

      <p>Effective retrieval separates concerns:</p>

      <p><strong>Working Memory (Context Window)</strong></p>
      <ul>
        <li>Small, focused, constantly refreshed</li>
        <li>Only what's needed for current task</li>
        <li>Target: 5-10 highly relevant passages, not 50 moderately relevant ones</li>
      </ul>

      <p><strong>Long-Term Storage (Vector DB / Knowledge Graph)</strong></p>
      <ul>
        <li>Everything else</li>
        <li>Structured for retrieval by relationship</li>
        <li>Accessed surgically, never dumped wholesale</li>
      </ul>

      <h3>The Selection Principle</h3>

      <p>Time spent on what NOT to include > time spent on what to include.</p>

      <p>Five perfectly relevant paragraphs outperform fifty moderately relevant pages. The model doesn't need comprehensive context. It needs precise context.</p>

      <h3>Implementation Note</h3>

      <p>If RAG results are mediocre, the fix is rarely "bigger model" or "more chunks." The fix is almost always "more selective retrieval." Garbage in, garbage out—even with a trillion parameters.</p>

      <hr />

      <p><em>Retrieval quality is inversely proportional to retrieval quantity.</em></p>
    `
  },
  {
    id: 'j3',
    title: 'The Chief AI Officer Won\'t Exist in Three Years',
    date: 'NOV 2025',
    author: 'Frederick A.',
    excerpt: 'Stop hiring prompt engineers. The role was dead on arrival. Here\'s the 3-person team structure that actually ships AI products.',
    image: '/assets/journal/chief-ai-officer.webp',
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

// Currency configuration for Time Value Calculator
export interface Currency {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', locale: 'en-NG' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', locale: 'en-ZA' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', locale: 'en-KE' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', locale: 'en-GH' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', locale: 'ar-AE' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', locale: 'en-SG' },
];

// Time Value Calculator regions
export const REGIONS = [
  { label: 'North America', value: 'na' },
  { label: 'Europe', value: 'eu' },
  { label: 'Africa', value: 'af' },
  { label: 'Asia Pacific', value: 'apac' },
  { label: 'Middle East', value: 'me' },
  { label: 'Latin America', value: 'latam' },
];

// Time Value Calculator - Challenge options
export const CHALLENGE_OPTIONS = [
  { label: 'Admin overload', value: 'admin', description: 'Paperwork, data entry, repetitive tasks eating your day' },
  { label: 'Customer response time', value: 'response', description: 'Leads going cold, slow follow-up, missed opportunities' },
  { label: 'Team handoffs', value: 'handoffs', description: 'Information lost between people, duplicated work' },
  { label: 'Data & reporting', value: 'data', description: 'Manual reports, scattered data, no clear picture' },
  { label: 'Content creation', value: 'content', description: 'Marketing materials, documentation, proposals' },
];

// Team size options
export const TEAM_SIZE_OPTIONS = [
  { label: 'Just me', value: 'solo', multiplier: 1 },
  { label: '2-5 people', value: 'small', multiplier: 3 },
  { label: '6-15 people', value: 'medium', multiplier: 8 },
  { label: '16-50 people', value: 'large', multiplier: 25 },
  { label: '50+ people', value: 'enterprise', multiplier: 50 },
];

// Success goal options
export const SUCCESS_OPTIONS = [
  { label: 'Reclaim time each week', value: 'time', description: 'Get hours back for high-value work' },
  { label: 'Handle more without hiring', value: 'scale', description: 'Grow capacity without growing headcount' },
  { label: 'Reduce errors & rework', value: 'errors', description: 'Stop fixing the same mistakes' },
  { label: 'Faster customer response', value: 'speed', description: 'Beat competitors to the reply' },
];