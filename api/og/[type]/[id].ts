import type { VercelRequest, VercelResponse } from '@vercel/node';

// Article data for OG tags
const ARTICLES: Record<string, { title: string; excerpt: string; image: string }> = {
  'ai-jan-2026': {
    title: 'January 2026: When Your Payment Processor Forgets You Exist',
    excerpt: 'Your payment processor doesn\'t care about your business. One API glitch deleted a founder\'s entire revenue stream.',
    image: '/assets/journal/jan-2026.webp',
  },
  'ai-dec-2025': {
    title: 'December 2025: The Year AI Became Infrastructure',
    excerpt: 'The debate is over. AI isn\'t optional anymore.',
    image: '/assets/journal/dec-2025.webp',
  },
  'ai-nov-2025': {
    title: 'November 2025: Three Frontier Models in One Week',
    excerpt: 'Gemini 3, Claude Opus 4.5, and GPT-5.1 released within days.',
    image: '/assets/journal/nov-2025.webp',
  },
  'ai-oct-2025': {
    title: 'October 2025: The Solo Founder Revolution',
    excerpt: '35% of new US startups are now founded by one person.',
    image: '/assets/journal/oct-2025.webp',
  },
  'ai-sep-2025': {
    title: 'September 2025: Infrastructure at Scale',
    excerpt: 'Claude Sonnet 4.5 claims best coding model. Stargate expands to 7 gigawatts.',
    image: '/assets/journal/sep-2025.webp',
  },
  'ai-aug-2025': {
    title: 'August 2025: GPT-5 Changes the Game',
    excerpt: 'OpenAI\'s flagship model arrives with 256K context.',
    image: '/assets/journal/aug-2025.webp',
  },
  'ai-jul-2025': {
    title: 'July 2025: The Reality Check',
    excerpt: '95% of businesses found zero AI value. The 5% who won all did the same thing first.',
    image: '/assets/journal/jul-2025.webp',
  },
  'ai-jun-2025': {
    title: 'June 2025: The Talent War You Can\'t Win',
    excerpt: 'Meta paid $14.3B for Scale AI. Top AI talent commands sports-star compensation.',
    image: '/assets/journal/jun-2025.webp',
  },
  'ai-may-2025': {
    title: 'May 2025: Claude 4 Arrives',
    excerpt: 'Anthropic releases Claude 4. Y Combinator reports 25% of startups generate 95% of code with AI.',
    image: '/assets/journal/may-2025.webp',
  },
  'ai-apr-2025': {
    title: 'April 2025: Enterprise Spending Explodes',
    excerpt: 'Departmental AI spend hits $7.3B—up 4.1x year over year.',
    image: '/assets/journal/apr-2025.webp',
  },
  'ai-mar-2025': {
    title: 'March 2025: The Agent Evolution',
    excerpt: 'AI task capability doubles every 7 months.',
    image: '/assets/journal/mar-2025.webp',
  },
  'ai-feb-2025': {
    title: 'February 2025: Compliance Begins',
    excerpt: 'EU AI Act prohibitions take effect.',
    image: '/assets/journal/feb-2025.webp',
  },
  'ai-jan-2025': {
    title: 'January 2025: The Year Ahead',
    excerpt: 'AI capabilities are accelerating. Here\'s what to watch.',
    image: '/assets/journal/jan-2025.webp',
  },
};

// Case study data
const CASE_STUDIES: Record<string, { title: string; summary: string; image: string; client: string }> = {
  'cs1': {
    title: 'The Document Backlog Crisis',
    summary: 'Routing decisions buried in a 6-step manual process. One system fixed it.',
    image: '/assets/case-studies/logistics-noir.webp',
    client: 'Government Logistics Agency',
  },
  'cs2': {
    title: 'The Hallucination Problem in Regulated AI',
    summary: 'No verification layer between AI generation and customer. We built one.',
    image: '/assets/case-studies/finance-noir.webp',
    client: 'Financial Services Firm',
  },
  'cs4': {
    title: 'The Content Marketing Time Crunch',
    summary: 'Content production bottlenecked on the expert. We automated the tedious parts.',
    image: '/assets/case-studies/accounting-noir.webp',
    client: 'Accounting Practice',
  },
  'cs5': {
    title: 'The AI Photo Booth That Runs Itself',
    summary: 'The interface required technical knowledge. We built one a 5-year-old could use.',
    image: '/assets/case-studies/photobooth-noir.webp',
    client: 'Private Event',
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { type, id } = req.query;
  const baseUrl = 'https://www.sftwrks.com';

  let title = 'Softworks | AI Consulting';
  let description = 'We find where your problem actually lives before building anything.';
  let image = '/assets/logos/og-preview.png';
  let url = baseUrl;

  if (type === 'article' && typeof id === 'string') {
    const article = ARTICLES[id];
    if (article) {
      title = article.title;
      description = article.excerpt;
      image = article.image;
      url = `${baseUrl}/#/article/${id}`;
    }
  } else if (type === 'case-study' && typeof id === 'string') {
    const cs = CASE_STUDIES[id];
    if (cs) {
      title = `${cs.title} | ${cs.client}`;
      description = cs.summary;
      image = cs.image;
      url = `${baseUrl}/#/case-study/${id}`;
    }
  }

  const fullImageUrl = `${baseUrl}${image}?v=2`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Softworks</title>
  <meta name="description" content="${description}">

  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${fullImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Softworks">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${fullImageUrl}">

  <meta http-equiv="refresh" content="0;url=${url}">
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <p>Redirecting to <a href="${url}">Softworks</a>...</p>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
