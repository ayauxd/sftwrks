import type { VercelRequest, VercelResponse } from '@vercel/node';

// Page-level OG data
const PAGES: Record<string, { title: string; description: string; image: string; redirect: string }> = {
  'journal': {
    title: 'Blog | Softworks',
    description: 'Monthly insights on AI adoption, workflow automation, and what actually works for businesses.',
    image: '/assets/logos/og-preview.png',
    redirect: '/insights',
  },
  'case-studies': {
    title: 'Case Studies | Softworks',
    description: 'Real projects. Real outcomes. See how we help businesses automate workflows that fit.',
    image: '/assets/logos/og-preview.png',
    redirect: '/case-studies',
  },
  'media': {
    title: 'Media | Softworks',
    description: 'Press coverage, interviews, and resources about Softworks AI adoption consulting.',
    image: '/assets/logos/og-preview.png',
    redirect: '/media',
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { page } = req.query;
  const baseUrl = 'https://www.sftwrks.com';

  // Default fallback
  let title = 'Softworks | AI Adoption Consultants';
  let description = 'Workflow automation designed for your business. Cut through the noise and find the solution that fits.';
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
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / Facebook / Instagram / WhatsApp / iMessage / SMS -->
  <meta property="og:type" content="website">
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
