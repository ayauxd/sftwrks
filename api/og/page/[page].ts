import type { VercelRequest, VercelResponse } from '@vercel/node';

// Page-level OG data
const PAGES: Record<string, { title: string; description: string; image: string; redirect: string }> = {
  'journal': {
    title: 'Journal | Softworks',
    description: 'Monthly insights on AI adoption, automation trends, and what actually works for businesses.',
    image: '/assets/logos/og-preview.png',
    redirect: '/#/journal',
  },
  'case-studies': {
    title: 'Case Studies | Softworks',
    description: 'Real projects. Real outcomes. See how we solve bottlenecks with AI systems that work.',
    image: '/assets/logos/og-preview.png',
    redirect: '/#/case-studies',
  },
  'media': {
    title: 'Media | Softworks',
    description: 'Press coverage, interviews, and resources about Softworks and AI consulting.',
    image: '/assets/logos/og-preview.png',
    redirect: '/#/media',
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { page } = req.query;
  const baseUrl = 'https://www.sftwrks.com';

  // Default fallback
  let title = 'Softworks | AI Consulting';
  let description = 'We find where your problem actually lives before building anything.';
  let image = '/assets/logos/og-preview.png';
  let canonicalUrl = baseUrl;
  let redirectUrl = baseUrl;

  if (typeof page === 'string' && PAGES[page]) {
    const pageData = PAGES[page];
    title = pageData.title;
    description = pageData.description;
    image = pageData.image;
    canonicalUrl = `${baseUrl}/${page}`;
    redirectUrl = `${baseUrl}${pageData.redirect}`;
  }

  const fullImageUrl = `${baseUrl}${image}?v=2`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
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

  <meta http-equiv="refresh" content="0;url=${redirectUrl}">
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <p>Redirecting to <a href="${redirectUrl}">Softworks</a>...</p>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
