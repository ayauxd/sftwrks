# Slack + n8n Integration Plan for Assessment Submissions

## Current Setup (Implemented)
- **Primary**: FormSubmit.co → sends to `agents@sftwrks.com`
- **Fallback**: mailto link if FormSubmit fails
- **No backend required**

---

## Phase 2: Add Slack Notifications

### Option A: Direct Slack Webhook (Simple)

1. **Create Slack Incoming Webhook**
   - Go to: https://api.slack.com/apps
   - Create new app → "From scratch" → name it "Softworks Assessments"
   - Add "Incoming Webhooks" feature
   - Activate and create webhook for desired channel (e.g., #leads)
   - Copy webhook URL

2. **Add to .env.local**
   ```
   VITE_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ
   ```

3. **Update Assistant.tsx** - Add after FormSubmit call:
   ```typescript
   // Also notify Slack
   const slackUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;
   if (slackUrl) {
     fetch(slackUrl, {
       method: 'POST',
       body: JSON.stringify({
         text: `🎯 New Assessment: *${payload.tier}* (${payload.score}/25)`,
         blocks: [
           {
             type: "section",
             text: {
               type: "mrkdwn",
               text: `*New AI Assessment Submission*\n\n` +
                     `📊 Score: ${payload.score}/25 - ${payload.tier}\n` +
                     `📧 Email: ${payload.email}\n` +
                     `📱 Phone: ${payload.phone || 'Not provided'}`
             }
           }
         ]
       })
     }).catch(console.error);
   }
   ```

### Option B: n8n Cloud Workflow (Advanced)

For more complex routing (e.g., different channels based on score, CRM integration):

1. **Set up n8n Cloud**
   - Sign up at: https://n8n.io/cloud
   - Free tier: 5 active workflows

2. **Create Webhook Workflow**
   ```
   [Webhook Trigger] → [Switch by Score] → [Slack Message]
                                        → [Google Sheets]
                                        → [Email via SMTP]
   ```

3. **Workflow Logic**
   - Score 18+: Post to #hot-leads + tag sales
   - Score 13-17: Post to #leads
   - Score <13: Post to #nurture + add to drip campaign

4. **Update .env.local**
   ```
   VITE_N8N_WEBHOOK_URL=https://your-instance.app.n8n.cloud/webhook/xxxxx
   ```

---

## Recommended Implementation Order

1. ✅ **Done**: FormSubmit email (current)
2. **Next**: Direct Slack webhook (15 min setup)
3. **Later**: n8n workflow for advanced routing

---

## Quick Slack Setup Commands

```bash
# Add to .env.local
echo "VITE_SLACK_WEBHOOK_URL=your-webhook-url" >> .env.local

# Rebuild
npm run build

# Deploy
bash ~/.claude/skills/softworks-site-manager/scripts/deploy.sh "Add Slack notifications"
```

---

## Testing

1. Complete assessment on dev server
2. Check `agents@sftwrks.com` for email
3. Check Slack channel for notification (once configured)
