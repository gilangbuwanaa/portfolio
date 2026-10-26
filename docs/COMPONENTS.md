# Component organization

## Present today

- `src/App.vue` composes the header, hero, Selected Projects, About & Expertise, Tools & Technology, Professional Experience, Organizational Experience, Research & Publications, and Beyond Codes sections in that order.
- `src/components/layout/AppHeader.vue` renders the wordmark and primary navigation. Its mobile toggle owns its open state; About navigates to the implemented section, while the unavailable Contact destination announces that the section is planned.
- `src/components/sections/HeroSection.vue` renders the approved introduction and CTA pair. The work CTA targets the Selected Projects section; the contact CTA explains that contact details are not available yet.
- `src/components/sections/ProjectsSection.vue` renders up to three project entries as a fixed-size depth carousel and shows an explicit empty state when the list is empty. The first project is active initially; circular previous/next buttons and side-card buttons change the active record while keyed cards retain their identity. Cards expose the active state, and motion respects reduced-motion preferences. Entries without an image use the shared public placeholder; optional external links are rendered only for HTTP(S) URLs.
- `src/components/sections/AboutSection.vue` presents the approved profile introduction, education, concise experience history, and expertise areas with semantic section headings.
- `src/components/sections/SkillsSection.vue` presents six tool categories in two opposing, duplicate-backed marquee rows; duplicate content is hidden from assistive technology and reduced-motion mode renders a static category grid.
- `src/components/sections/ExperienceSection.vue` presents verified work records in reverse chronological order, with local employer logos and concise project-based descriptions.
- `src/components/sections/OrganizationsSection.vue` presents verified organizational roles with local event photographs and descriptive alternative text.
- `src/components/sections/ResearchSection.vue` presents research projects and literature reviews as clickable source-linked records with dates and supported findings, without implying formal publication status.
- `src/components/sections/SongsSection.vue` presents the 15-track Beyond Codes playlist with lazy-loaded Spotify and YouTube players, explicit playback controls, and platform links.
- `src/data/projects.js` is the content source for the three selected project records and centralizes the fallback placeholder path.
- `src/data/profile.js` is the source for approved profile, education, and expertise content used by About & Expertise; its experience list reuses the shared records in the existing About order.
- `src/data/experience.js` is the source of truth for experience dates, organizations, logo paths, and project-supported summaries; About reuses the same records in its existing order.
- `src/data/research.js` centralizes approved research titles, dates, work types, and quantitative findings.
- `src/data/skills.js` is the centralized source for the six tool categories and their local icon paths; Flutter remains text-only because no local icon is available.
- `src/data/organizations.js` centralizes approved organizational experience and local event-photo references.
- `src/data/songs.js` centralizes the supplied playlist titles, artist names, platform names, and exact track URLs.
- `src/composables/useMusicPlayer.js` owns playlist selection and provider-confirmed playback state; provider scripts load only after the visitor starts playback.
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
