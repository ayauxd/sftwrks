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