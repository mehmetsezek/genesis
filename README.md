# Genesis Command HQ

Production-first MVP for the Genesis visual operating system.

## Included in this first build

- Three-floor Command HQ
- Exactly six clickable departments
- Central animated elevator
- Permanent top, left, right and bottom HUD
- Startup-scale mock metrics
- Department hover cards
- Smooth department drill-down views
- Lightweight AI worker animation
- Matrix-inspired atmosphere outside the building
- Responsive laptop behaviour and reduced-motion support

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate production build

```bash
npm run build
npm start
```

## Next implementation pass

1. Replace CSS room illustrations with final layered SVG artwork.
2. Add real authentication and PostgreSQL/Supabase schema.
3. Connect live agents, tasks, approvals and activity events.
4. Add real-time updates and data-cube workflow animation.
5. Add department-specific workspaces without changing the HQ shell.
