import type { VercelRequest, VercelResponse } from '@vercel/node';

// Article data for OG tags - concise, compelling copy
const ARTICLES: Record<string, { title: string; excerpt: string; image: string }> = {
  'ai-jan-2026': {
    title: 'When Your Payment Processor Forgets You Exist',
    excerpt: 'One API glitch deleted a founder\'s entire revenue stream. Here\'s what every business should know.',
    image: '/assets/journal/jan-2026-og.png',
  },
  'ai-dec-2025': {
    title: 'The Year AI Became Infrastructure',
    excerpt: 'The debate is over. AI isn\'t optional anymore. December 2025 proved it.',
    image: '/assets/journal/dec-2025-og.png',
  },
  'ai-nov-2025': {
    title: 'Three Frontier Models in One Week',
    excerpt: 'Gemini 3, Claude Opus 4.5, and GPT-5.1 dropped within days. What it means for your business.',
    image: '/assets/journal/nov-2025-og.png',
  },
  'ai-oct-2025': {
    title: 'The Solo Founder Revolution',
    excerpt: '35% of new US startups are now one-person operations. AI made it possible.',
    image: '/assets/journal/oct-2025-og.png',
  },
  'ai-sep-2025': {
    title: 'Infrastructure at Scale',
    excerpt: 'Claude Sonnet 4.5 claims best coding model. Stargate expands to 7 gigawatts.',
    image: '/assets/journal/sep-2025-og.png',
  },
  'ai-aug-2025': {
    title: 'GPT-5 Changes the Game',
    excerpt: 'OpenAI\'s flagship model arrives with 256K context. What enterprises need to know.',
    image: '/assets/journal/aug-2025-og.png',
  },
  'ai-jul-2025': {
    title: 'The Reality Check',
    excerpt: '95% of businesses found zero AI value. The 5% who won all did the same thing first.',
    image: '/assets/journal/jul-2025-og.png',
  },
  'ai-jun-2025': {
    title: 'The Talent War You Can\'t Win',
    excerpt: 'Meta paid $14.3B for Scale AI. Top talent now commands sports-star pay.',
    image: '/assets/journal/jun-2025-og.png',
  },
  'ai-may-2025': {
    title: 'Claude 4 Arrives',
    excerpt: '25% of YC startups now generate 95% of their code with AI. Here\'s why.',
    image: '/assets/journal/may-2025-og.png',
  },
  'ai-apr-2025': {
    title: 'Enterprise AI Spending Explodes',
    excerpt: 'Departmental AI spend hits $7.3B—up 4.1x year over year. Where the money is going.',
    image: '/assets/journal/apr-2025-og.png',
  },
  'ai-mar-2025': {
    title: 'The Agent Evolution',
    excerpt: 'AI task capability doubles every 7 months. What that means for your team.',
    image: '/assets/journal/mar-2025-og.png',
  },
  'ai-feb-2025': {
    title: 'EU AI Act: Compliance Begins',
    excerpt: 'Prohibitions take effect this month. Is your AI use case affected?',
    image: '/assets/journal/feb-2025-og.png',
  },
  'ai-jan-2025': {
    title: 'AI in 2025: The Year Ahead',
    excerpt: 'Capabilities are accelerating faster than adoption. Here\'s what to watch.',
    image: '/assets/journal/jan-2025-og.png',
  },
};

// Case study data - outcome-focused descriptions (PNG for OG compatibility)
const CASE_STUDIES: Record<string, { title: string; summary: string; image: string; client: string }> = {
  'cs1': {
    title: 'Document Backlog Crisis',
    summary: '6-step manual routing process reduced to one automated system. 80% faster decisions.',
    image: '/assets/case-studies/logistics-noir-og.png',
    client: 'Government Logistics',
  },
  'cs2': {
    title: 'Solving AI Hallucinations',
    summary: 'Built a verification layer between AI generation and customers. Zero hallucinations shipped.',
    image: '/assets/case-studies/finance-noir-og.png',
    client: 'Financial Services',
  },
  'cs4': {
    title: 'Content Marketing Bottleneck',
    summary: 'Expert knowledge bottleneck eliminated. 10x content output, same team.',
    image: '/assets/case-studies/accounting-noir-og.png',
    client: 'Accounting Practice',
  },
  'cs5': {
    title: 'Self-Running AI Photo Booth',
    summary: 'Complex AI interface simplified for any guest. Zero technical support needed.',
    image: '/assets/case-studies/photobooth-noir-og.png',
    client: 'Private Event',
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { type, id } = req.query;
  const baseUrl = 'https://www.sftwrks.com';

  let title = 'Softworks | AI Adoption Consultants';
  let description = 'Workflow automation designed for your business. Cut through the noise and find the solution that fits.';
  let image = '/assets/logos/og-preview.png';
  let canonicalUrl = baseUrl;
  let redirectUrl = baseUrl;

  if (type === 'article' && typeof id === 'string') {
    const article = ARTICLES[id];
    if (article) {
      title = `${article.title} | Softworks`;
      description = article.excerpt;
      image = article.image;
      canonicalUrl = `${baseUrl}/article/${id}`;
      redirectUrl = `${baseUrl}/#/article/${id}`;
    }
  } else if (type === 'case-study' && typeof id === 'string') {
    const cs = CASE_STUDIES[id];
    if (cs) {
      title = `${cs.title} | Softworks`;
      description = `${cs.client}: ${cs.summary}`;
      image = cs.image;
      canonicalUrl = `${baseUrl}/case-study/${id}`;
      redirectUrl = `${baseUrl}/#/case-study/${id}`;
    }
  }

  const fullImageUrl = `${baseUrl}${image}`;

  const html = `<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / Facebook / Instagram / WhatsApp / iMessage / SMS -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${fullImageUrl}">
  <meta property="og:image:secure_url" content="${fullImageUrl}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${title}">
  <meta property="og:site_name" content="Softworks">
  <meta property="og:locale" content="en_US">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@sftwrks">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${fullImageUrl}">
  <meta name="twitter:image:alt" content="${title}">

  <!-- LinkedIn -->
  <meta property="article:author" content="Softworks">

  <meta http-equiv="refresh" content="0;url=${redirectUrl}">
  <script>window.location.replace("${redirectUrl}");</script>
</head>
<body style="display:none;"></body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
