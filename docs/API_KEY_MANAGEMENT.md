# API Key Management Guide

How to set up separate API keys for local development vs production across all Softworks projects.

## Why Separate Keys?

| Environment | Key Type | Restrictions |
|-------------|----------|--------------|
| **Production** | Restricted | HTTP referer, IP limits, API limits |
| **Local Dev** | Unrestricted | None (CLI scripts, testing) |

Production keys should be locked down. Dev keys need flexibility for CLI scripts, image generation, testing, etc.

---

## Setup: Google Cloud (Gemini, Vertex AI)

### Step 1: Create a Dev API Key

1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Select your project (or create one)
3. Click **+ CREATE CREDENTIALS** → **API key**
4. Click **Edit API key** (pencil icon)
5. Name it clearly: `gemini-dev-unrestricted` or `softworks-local-dev`
6. Under **Application restrictions**: Select **None**
7. Under **API restrictions**: Select **Don't restrict key** (or restrict to specific APIs only)
8. Click **Save**

### Step 2: Keep Production Key Restricted

Your existing key should have:
- **HTTP referrers** restricted to your domains (`softworkstrading.com`, `sftwrks.com`)
- Name it clearly: `gemini-prod-restricted`

### Step 3: Configure Local Environment

Add the dev key to your `.env.local`:

```bash
# .env.local (local development - never commit)
GEMINI_API_KEY=AIzaSy..._your_dev_key_here
ANTHROPIC_API_KEY=sk-ant-..._your_key_here
```

Production keys go in Vercel/hosting environment variables, not in code.

---

## Setup: Anthropic (Claude API)

Anthropic keys don't have referer restrictions, but you should still use separate keys:

1. Go to [Anthropic Console](https://console.anthropic.com/settings/keys)
2. Create two keys:
   - `softworks-prod` - used in Vercel
   - `softworks-dev` - used locally
3. Add dev key to `.env.local`

---

## Setup: OpenAI

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create two keys with clear names
3. For production, you can restrict by IP in Organization settings

---

## Project Configuration

### Standard `.env.local` Template

```bash
# ===========================================
# LOCAL DEVELOPMENT KEYS (unrestricted)
# Never commit this file
# ===========================================

# Google Gemini / Imagen
GEMINI_API_KEY=AIzaSy...

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-api03-...

# OpenAI (if needed)
OPENAI_API_KEY=sk-...

# ElevenLabs (if needed)
ELEVENLABS_API_KEY=...
```

### Standard `.env.example` Template

```bash
# Copy to .env.local and fill in your dev keys
GEMINI_API_KEY=your_gemini_dev_key
ANTHROPIC_API_KEY=your_anthropic_dev_key
```

### Vercel Environment Variables

In Vercel dashboard → Project → Settings → Environment Variables:
- Add your **production (restricted)** keys
- Set scope to "Production" only if you want different keys per environment

---

## Naming Convention

Use consistent naming across all projects:

| Service | Production Key Name | Dev Key Name |
|---------|--------------------|--------------|
| Gemini | `gemini-prod-restricted` | `gemini-dev-unrestricted` |
| Anthropic | `anthropic-prod` | `anthropic-dev` |
| OpenAI | `openai-prod` | `openai-dev` |

---

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Production keys have HTTP referer/IP restrictions
- [ ] Dev keys are only on your local machine
- [ ] Keys are named clearly (you can identify which is which)
- [ ] Rotate keys if ever exposed in git history

---

## Quick Reference: Generate Images Locally

After setting up your unrestricted dev key:

```bash
# Load env and run any image generation script
source .env.local && node scripts/generate-hero-friendly.mjs
source .env.local && node scripts/generate-section-images.mjs
```

---

## Troubleshooting

**"Requests from referer <empty> are blocked"**
→ Your key has HTTP referer restrictions. Use your dev key instead.

**"API key not valid"**
→ Check the key is correct and the API is enabled in Google Cloud Console.

**"Quota exceeded"**
→ Check usage in Google Cloud Console. Dev keys share the same quota as prod.

---

*Last updated: January 2026*
