# Design system

The foundation follows the project's hybrid premium direction: restrained color, clear type hierarchy, generous spacing, and motion that does not compete with content. The current interface includes navigation, the hero, and an editorial Selected Projects showcase with verified local project screenshots.

## Color tokens

Tokens live in `src/assets/styles/tokens.css`. Tailwind CSS v4 is integrated through `@tailwindcss/vite`; `main.css` imports Tailwind, tokens, and motion styles, and maps semantic token aliases into Tailwind's theme so utilities can use names such as `bg-page`, `text-muted`, and `border-hairline`.

| Token | Value | Use |
| --- | --- | --- |
| `--color-background` | `#080A12` | Main page background |
| `--color-background-elevated` | `#171A25` | Elevated surfaces |
| `--color-accent` | `#112E59` | Deep blue accent |
| `--color-text-primary` | `#FFFFFF` | Main text |
| `--color-text-secondary` | `#A7ADBD` | Supporting text |
| `--color-border` | `rgb(255 255 255 / 12%)` | Subtle boundaries |
| `--color-focus` | `#8DBBFF` | Visible keyboard focus |

## Typography and layout

The CSS provides fallbacks for Space Grotesk headings, Inter body text, and JetBrains Mono metadata, followed by system fonts. No font files or external font requests are included yet. Layout tokens provide a content maximum width, responsive gutters, and section spacing; page specific breakpoints are introduced when sections need them.

## Global styles and motion

`main.css` imports Tailwind, the tokens, and motion styles, then sets global box sizing, page defaults, link behavior, and focus visibility in Tailwind's base layer. Horizontal overflow is clipped at the page level to avoid accidental sideways scrolling; components still need to be laid out correctly. Motion is limited to optional color and transform transitions. Reduced motion shortens animations and transitions.

Use Tailwind for component layout, spacing, responsive sizing, and common type and color styles. Keep foundational values in tokens and reserve custom CSS for the ambient hero background, navigation behavior, and other specialized patterns. Do not duplicate a token value in component classes when a semantic utility is available.

Project previews use local files under `/images/projects/` and maintain a shared 16:9 frame with `object-fit: cover` to match the supplied landscape screenshots. The Selected Projects carousel uses fixed card dimensions within each breakpoint, a restrained translucent navy surface, and a four-line visual description clamp while keeping full copy in the document text. On desktop, the active card sits between smaller side cards; mobile displays the active card while retaining other project text for assistive technology. Position changes use 520ms transforms and are substantially reduced when reduced motion is requested. The generic `/images/projects/image-placeholder.png` remains a fallback for future entries without an image; it is not currently displayed as a project preview.

## Icons

Use individual named imports from `@lucide/vue`, the current official Vue package. Lucide renamed the former `lucide-vue-next` package; do not add both. Prefer 16, 18, 20, or 24 px icons with a consistent 1.75–2 stroke. Label icon-only controls and hide decorative icons from assistive technology where appropriate. Verify exported names against the installed package before use.
