# Component organization

## Present today

- `src/App.vue` composes the header, hero, and Selected Projects section.
- `src/components/layout/AppHeader.vue` renders the wordmark and primary navigation. Its mobile toggle owns its open state; unavailable About and Contact destinations announce that those sections are planned.
- `src/components/sections/HeroSection.vue` renders the approved introduction and CTA pair. The work CTA targets the Selected Projects section; the contact CTA explains that contact details are not available yet.
- `src/components/sections/ProjectsSection.vue` introduces the selected work area and presents an explicit no-data state until verified project descriptions and screenshots are available. It renders no empty project cards.
- `src/main.js` creates the Vue app, installs the existing router, and imports global CSS.
- `src/router/index.js` retains Vue Router with no routes configured.
- `src/assets/styles/` holds tokens, global styles, and reduced-motion-aware motion utilities.

The components do not yet accept props or slots because their content and behavior are specific to this milestone. No project data module exists yet; there are no verified project records to separate from the presentation.

## Planned organization

As actual sections are introduced, organize components by responsibility:

- `components/layout/` for shared page structure such as a header or footer.
- `components/ui/` for reusable primitives such as buttons or cards.
- `components/sections/` for substantial portfolio sections composed from smaller pieces.
- `components/effects/` only for isolated visual effects that are justified by the design.
- `composables/` for reusable Vue behavior and `data/` for verified portfolio content.

Treat these as planned groups, not existing components. Keep components focused, pass configurable content through props, use slots when they clarify composition, and keep state local until it needs to be shared. Separate verified content from presentation when doing so makes updates easier. Avoid abstractions for one-off markup without a clear reuse case.
