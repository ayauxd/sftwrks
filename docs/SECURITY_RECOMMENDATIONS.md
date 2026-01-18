# Security Recommendations for Softworks Website

## Current Security Posture

The site has good baseline security practices:
- React's JSX escapes user input by default (XSS protection)
- Custom inputs validated via Claude Haiku before display
- Email inputs properly encoded with `encodeURIComponent`
- No authenticated actions requiring CSRF protection

## Recommended Improvements

### 1. API Key Protection (Priority: High)

**Issue:** `VITE_ANTHROPIC_API_KEY` is exposed in client-side JavaScript.

**Current Risk:** Medium - The key can be extracted from browser DevTools and misused.

**Solutions:**

**Option A: Vercel Edge Function (Recommended)**
```typescript
// api/validate.ts - Vercel serverless function
export default async function handler(req, res) {
  const { input, question } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY, // Server-side only
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({ /* ... */ }),
  });

  return res.json(await response.json());
}
```

**Option B: API Key Restrictions**
In Anthropic Console, set:
- Rate limits per key
- Allowed models (only claude-3-haiku)
- Usage alerts

### 2. Webhook Spam Protection (Priority: Medium)

**Issue:** The n8n webhook URL is exposed and can receive fake submissions.

**Solutions:**

**Option A: Honeypot Field**
```tsx
// Add invisible field to form
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
  onChange={(e) => setHoneypot(e.target.value)}
/>

// In submit handler
if (honeypot) return; // Bot detected
```

**Option B: Rate Limiting via n8n**
Configure n8n workflow to:
- Track submissions by IP/fingerprint
- Block > 3 submissions per hour from same source
- Add CAPTCHA for suspicious patterns

**Option C: Server-side Webhook Proxy**
```typescript
// api/submit-assessment.ts
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({ tokensPerInterval: 5, interval: 'hour' });

export default async function handler(req, res) {
  const remaining = await limiter.removeTokens(1);
  if (remaining < 0) {
    return res.status(429).json({ error: 'Rate limited' });
  }
  // Forward to n8n...
}
```

### 3. Security Headers (Priority: Medium)

Add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.anthropic.com https://*.n8n.cloud; frame-ancestors 'none';"
        }
      ]
    }
  ]
}
```

### 4. Input Validation Hardening (Priority: Low)

Current validation uses AI which is good but can be bypassed with prompt injection.

**Add client-side pre-validation:**
```typescript
const sanitizeInput = (input: string): string => {
  // Remove any potential script tags or SQL-like patterns
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/['";]/g, '')
    .slice(0, 500); // Max length
};
```

### 5. Dependency Auditing (Priority: Low)

Run regularly:
```bash
npm audit
npm audit fix
```

Consider adding to CI/CD pipeline.

## Implementation Priority

1. **Immediate:** Add security headers to vercel.json
2. **Short-term:** Implement honeypot for webhook spam
3. **Medium-term:** Move API calls to serverless functions
4. **Ongoing:** Regular dependency audits

## Quick Wins (Can Do Now)

1. Add honeypot field to assessment form
2. Add security headers to vercel.json
3. Set up npm audit in deployment script

## Resources

- [Vercel Security Headers](https://vercel.com/docs/projects/project-configuration#headers)
- [OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/)
- [Anthropic API Best Practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
