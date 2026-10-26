# Component organization

## Present today

- `src/App.vue` composes the header, hero, and Selected Projects section.
- `src/components/layout/AppHeader.vue` renders the wordmark and primary navigation. Its mobile toggle owns its open state; unavailable About and Contact destinations announce that those sections are planned.
- `src/components/sections/HeroSection.vue` renders the approved introduction and CTA pair. The work CTA targets the Selected Projects section; the contact CTA explains that contact details are not available yet.
- `src/components/sections/ProjectsSection.vue` renders up to three project entries as a fixed-size depth carousel and shows an explicit empty state when the list is empty. The first project is active initially; circular previous/next buttons and side-card buttons change the active record while keyed cards retain their identity. Cards expose the active state, and motion respects reduced-motion preferences. Entries without an image use the shared public placeholder; optional external links are rendered only for HTTP(S) URLs.
- `src/data/projects.js` is the content source for the three selected project records and centralizes the fallback placeholder path.
- `src/main.js` creates the Vue app, installs the existing router, and imports global CSS.
- `src/router/index.js` retains Vue Router with no routes configured.
- `src/assets/styles/` holds tokens, global styles, and reduced-motion-aware motion utilities.

The section displays at most four entries. Each record has a stable `id`, verified `name`, short and full descriptions, date, platform, image path, and suitable alternative text. `technologies`, `liveUrl`, and `repositoryUrl` are optional and should only be supplied when verified. The current records use local screenshots in `/images/projects/`; replace each path and alt text only when a new authentic project preview is available. Helpdesk ULBI currently has no technology labels because its source record details supplied for this migration do not verify a stack.

## Planned organization

As actual sections are introduced, organize components by responsibility:

- `components/layout/` for shared page structure such as a header or footer.
- `components/ui/` for reusable primitives such as buttons or cards.
- `components/sections/` for substantial portfolio sections composed from smaller pieces.
- `components/effects/` only for isolated visual effects that are justified by the design.
- `composables/` for reusable Vue behavior and `data/` for verified portfolio content.

Treat these as planned groups, not existing components. Keep components focused, pass configurable content through props, use slots when they clarify composition, and keep state local until it needs to be shared. Separate verified content from presentation when doing so makes updates easier. Avoid abstractions for one-off markup without a clear reuse case.
