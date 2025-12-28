# Team Photo Generation Prompt

Use this prompt in Google AI Studio with Imagen 3 to generate the team photo.

## Prompt

```
Professional editorial photograph of a diverse team of five consultants collaborating in a modern workspace.

Scene: Wide shot (21:9 aspect ratio) of a bright, minimalist office with warm natural lighting. The team is gathered around a large table with laptops, tablets, and a central display showing abstract data visualizations.

Composition:
- Five people of varied ethnicities and genders, ages 30-50
- Some seated, some standing, creating dynamic levels
- Natural, candid interaction - NOT posed or looking at camera
- Two people in conversation, pointing at a screen
- One person taking notes on a tablet
- Two people reviewing documents together
- Body language suggests collaboration and engagement

Style:
- Editorial photography aesthetic (think Fast Company or Wired magazine)
- Soft, diffused lighting from large windows
- Color palette: Navy blues, warm whites, subtle cyan accents
- Professional but approachable attire - smart casual
- Shallow depth of field on background elements
- No direct eye contact with camera from any subject

Environment:
- Clean desk surfaces with minimal props
- Visible tech: laptops, tablets, one large display
- Subtle plant elements for warmth
- Navy and white color scheme in furniture/walls
- Abstract digital graphics visible on screens (not readable text)

Mood: Focused collaboration, quiet competence, human connection enhanced by technology
```

## Alternative Prompt (More Abstract)

```
Cinematic wide shot of five professionals in silhouette, gathered around a glowing central display in a dimly lit modern office. Their forms are partially illuminated by the soft cyan glow of multiple screens. Natural window light creates rim lighting on their profiles. No faces directly visible - focus on collaborative body language and the interplay of human forms with technology. Aspect ratio 21:9. Color palette: deep navy, warm amber, cyan accents.
```

## Output Path
Save generated image to: `public/assets/team/team-collaboration.png`

## After Generation
Update `components/Team.tsx` line 34 to use:
```tsx
src="/assets/team/team-collaboration.png"
```
