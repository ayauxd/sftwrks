# PRD: GitHub Actions CI/CD for sftwrks

## Context

Adding automated PR validation and deployment workflows to sftwrks.com (Softworks Trading Company website).

**Stack**: React 19 + TypeScript + Vite + Tailwind CSS v4, deployed on Vercel
**Current state**: No CI/CD automation exists

## Success Criteria

### Workflow 1: PR Validation (`validate.yml`)
- [x] Triggers on all pull requests to main
- [x] Runs TypeScript type checking (`npx tsc --noEmit`)
- [x] Runs build verification (`npm run build`)
- [x] Uses Node 20.x
- [x] Caches node_modules for speed
- [x] Fails PR if any check fails

### Workflow 2: Production Deploy (`deploy.yml`)
- [x] Triggers on push to main branch only
- [x] Runs build verification first
- [x] Deploys to Vercel using Vercel CLI
- [x] Uses Vercel project/org tokens from secrets
- [x] Includes deployment URL in workflow summary

### Repository Setup
- [x] `.github/workflows/` directory created
- [x] Both workflow files are valid YAML
- [ ] Workflows appear in GitHub Actions tab

### GitHub Secrets (Manual Step Required)
- [ ] Add `VERCEL_TOKEN` to GitHub secrets
- [ ] Add `VERCEL_ORG_ID` (value: `team_qVKqxJ9pStikymvWFb6ls4wH`)
- [ ] Add `VERCEL_PROJECT_ID` (value: `prj_4rhA4zwFRSsMGDjxiXyKeXutuMj5`)

### Verification
- [ ] Create test PR → validate workflow runs
- [ ] Merge to main → deploy workflow runs
- [ ] Site is live after deploy completes

## Done When

1. Both workflow files exist in `.github/workflows/`
2. Push to repo triggers workflows
3. PR validation blocks merge on type errors
4. Main branch push deploys to production

## Out of Scope

- Adding linting (no eslint configured currently)
- Adding test suite (no tests exist currently)
- Release/tagging workflows
- Desktop app builds
- Slack/Discord notifications

## Technical Notes

**Vercel Secrets Needed** (add to GitHub repo secrets):
- `VERCEL_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Vercel org/team ID
- `VERCEL_PROJECT_ID` - Vercel project ID

**Get Vercel IDs**:
```bash
cd /Users/fredpro/sftwrks
cat .vercel/project.json  # Contains projectId and orgId
```

## Files to Create

1. `/Users/fredpro/sftwrks/.github/workflows/validate.yml`
2. `/Users/fredpro/sftwrks/.github/workflows/deploy.yml`
