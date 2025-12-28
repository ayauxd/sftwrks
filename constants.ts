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
    title: 'Automating Compliance',
    summary: 'Using AI to automatically check shipping documents that used to be done by hand.',
    outcome: '90% reduction in processing time.',
    imageUrl: '/assets/case-studies/landmark-gears.png',
    content: `
      <h3>The Challenge</h3>
      <p>The Authority was processing 4,000 daily shipping manifestos manually. Each document required cross-referencing against three distinct regulatory databases. The error rate was 12%, leading to significant backlog penalties and supply chain friction.</p>

      <h3>The Solution</h3>
      <p>Softworks deployed a Vision-Language Model (VLM) pipeline tailored for optical character recognition on non-standard forms. The system was architected not just to "read" text, but to understand semantic intent.</p>
      <ul>
        <li><strong>Ingestion:</strong> Multi-modal intake of scanned PDFs and images.</li>
        <li><strong>Validation:</strong> Deterministic cross-checking against SQL government databases.</li>
        <li><strong>Escalation:</strong> A "Human-in-the-Loop" router that only flags ambiguous cases (confidence score < 0.95).</li>
      </ul>

      <h3>Operational Impact</h3>
      <p>The system now handles 94% of all volume autonomously. Processing time per document dropped from 6 minutes to 4 seconds. The team was reallocated from data entry to exception management.</p>
    `
  },
  {
    id: 'cs2',
    client: 'Apex Financial',
    sector: 'Enterprise',
    title: 'The "Human-in-Loop" Protocol',
    summary: 'Building safety guardrails for AI-powered customer service.',
    outcome: 'Zero AI mistakes with customers.',
    imageUrl: '/assets/case-studies/landmark-brain.png',
    content: `
      <h3>The Challenge</h3>
      <p>Apex Financial wished to deploy a generative customer support agent but was paralyzed by the reputational risk of "hallucinations"—specifically, the model inventing financial advice or promising non-existent rates.</p>

      <h3>The Solution</h3>
      <p>We built a "Constitutional AI" wrapper around their base model. Instead of relying on prompt engineering alone, we architected a two-stage verification process:</p>
      <ul>
        <li><strong>Stage 1 (Generation):</strong> The model drafts a response based <em>only</em> on retrieved documents (RAG).</li>
        <li><strong>Stage 2 (Audit):</strong> A smaller, faster model acts as a "Supervisor," checking the draft against a strict set of compliance rules before the user ever sees it.</li>
      </ul>

      <h3>Operational Impact</h3>
      <p>The system has served 150,000 interactions with zero instances of fabricated financial data. Customer satisfaction scores (CSAT) rose by 18% due to instant 24/7 availability.</p>
    `
  },
  {
    id: 'cs3',
    client: 'Metro Health Systems',
    sector: 'Healthcare',
    title: 'Unstructured Data Mining',
    summary: 'Making 10 years of scattered patient records searchable in seconds.',
    outcome: 'Patient history now available in seconds.',
    imageUrl: '/assets/case-studies/landmark-library.png',
    content: `
      <h3>The Challenge</h3>
      <p>Metro Health possessed a "Data Lake" that was effectively a data swamp. Ten years of patient history existed in unstructured PDFs, faxes, and handwritten notes, making longitudinal patient analysis impossible.</p>

      <h3>The Solution</h3>
      <p>We did not just "digitize" the documents; we structured them. Using a GraphRAG approach, we mapped entities (patients, drugs, diagnoses) and their relationships.</p>
      <ul>
        <li><strong>Extraction:</strong> Specialized entity extraction models trained on medical nomenclature.</li>
        <li><strong>Graphing:</strong> Building a Neo4j knowledge graph linking disparate records.</li>
        <li><strong>Query Interface:</strong> A natural language interface allowing doctors to ask, "Show me all interactions between Patient X and Beta Blockers in 2019."</li>
      </ul>

      <h3>Operational Impact</h3>
      <p>Retrieval of comprehensive patient history dropped from hours of manual file review to seconds. This system is now the backbone of their pre-operative planning.</p>
    `
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'j1',
    title: 'The Latency Tax',
    date: 'MAR 2025',
    excerpt: 'Why slow AI agents fail in production. Speed is not just a feature; it is the primary determinant of agentic adoption.',
    image: '/assets/sections/integration-hub.png',
    content: `
      <p>In high-frequency workflows, latency is the silent killer. When we design agentic workflows for enterprise clients, the first metric we optimize is not intelligence—it is time-to-first-token.</p>
      
      <p>We have observed that human operators will abandon an AI tool if the friction of waiting exceeds the cognitive load of doing the task manually. This threshold is surprisingly low: approximately 400ms.</p>
      
      <p>At Softworks, we implement aggressive caching, speculative decoding, and small-model routing to ensure that our systems move at the speed of thought. Intelligence that arrives too late is indistinguishable from stupidity.</p>
    `
  },
  {
    id: 'j2',
    title: 'Context vs. Memory',
    date: 'FEB 2025',
    excerpt: 'RAG is not a database. Treating context windows as infinite storage leads to degradation in reasoning capabilities.',
    image: '/assets/sections/strategy-map.png',
    content: `
      <p>There is a misconception that larger context windows solve the memory problem. They do not. Filling a model's context window with irrelevant data effectively dilutes its attention mechanism, leading to "lost in the middle" phenomena.</p>
      
      <p>True system memory requires structured retrieval. We distinguish between "Ephemeral Working Memory" (context window) and "Semantic Long-Term Storage" (vector databases + knowledge graphs).</p>
      
      <p>Our approach forces specific schema enforcement on memory retrieval, ensuring that the model only sees what it needs to solve the immediate problem, maintaining high-resolution reasoning.</p>
    `
  },
  {
    id: 'j3',
    title: 'Transitional Roles',
    date: 'JAN 2025',
    excerpt: 'Why the "Chief AI Officer" will disappear within 3 years, and what will replace it.',
    image: '/assets/hero/bridge-metaphor.png',
    content: `
      <p>We are currently seeing a surge in "Head of AI" titles. This is a temporary patch. AI is not a vertical; it is a horizontal layer that permeates every function.</p>
      
      <p>In the near future, technical literacy will be a requirement for every C-suite role. The CFO must understand token economics. The CMO must understand diffusion models. The COO must understand agentic orchestration.</p>
      
      <p>We advise our clients to build "AI Competency" across their existing leadership rather than siloing it into a single department that lacks operational authority.</p>
    `
  }
];

export const PRODUCTS: Product[] = [];