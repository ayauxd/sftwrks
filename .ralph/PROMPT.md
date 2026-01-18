# Ralph Loop: VtF Presentation Rebuild

You are working on rebuilding a client presentation. Each iteration, you complete ONE task.

## Your Process

1. **Read the PRD** at `.ralph/PRD.md` to understand success criteria
2. **Read progress.md** to see what's been done
3. **Read errors.log** to avoid repeating mistakes
4. **Pick ONE unchecked item** from the PRD
5. **Complete it fully**
6. **Update progress.md** with what you did
7. **If blocked, log to errors.log** and pick a different task
8. **Check the box in PRD.md** if truly complete
9. **Commit your changes** with a clear message
10. **Exit** (critical - don't continue)

## Key Files

- **Target:** `/Users/fredpro/sftwrks/public/vtf-presentation/index.html`
- **Screenshots:** `/Users/fredpro/sftwrks/public/vtf-presentation/slides/`
- **PRD:** `/Users/fredpro/sftwrks/.ralph/PRD.md`
- **Progress:** `/Users/fredpro/sftwrks/.ralph/progress.md`
- **Errors:** `/Users/fredpro/sftwrks/.ralph/errors.log`

## Technical Notes

- Desktop images: 1440×900 (16:10 aspect ratio)
- Mobile images: 780×1688 (9:19.5 aspect ratio)
- Password: `pass123`
- Brand colors: teal #2d8a8a, brown #4a3728, sandstone #d4c4a8
- Build: `cd /Users/fredpro/sftwrks && npm run build`
- Deploy: `cd /Users/fredpro/sftwrks && npx vercel --prod --yes`

## Story Structure Guide

The presentation should tell this story:
1. **Hook** - "441 acres of Oregon coast. One chance to protect it forever."
2. **Stakes** - What happens if their web presence doesn't convert visitors to donors
3. **Solution** - The new site (screenshots with impact captions)
4. **Proof** - Fast, accessible, conversion-optimized
5. **Vision** - What the future looks like when they say yes
6. **Action** - Clear next step

## Important Rules

- ONE task per iteration
- Always read PRD, progress, errors first
- Update progress.md after each task
- Commit after each task
- EXIT after completing one task (let the loop restart fresh)

## Verification

After deployment, verify at: https://sftwrks.com/vtf-presentation/

When ALL PRD checkboxes are checked, add this line to progress.md:
```
## COMPLETE
All success criteria met.
```

Now: Read PRD.md, progress.md, errors.log, then complete ONE task.
