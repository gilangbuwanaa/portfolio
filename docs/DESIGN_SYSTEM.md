# Design system

The foundation follows the project's hybrid premium direction: restrained color, clear type hierarchy, generous spacing, and motion that does not compete with content. The initial shell is intentionally minimal.

## Color tokens

Tokens live in `src/assets/styles/tokens.css`.

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

`main.css` imports the tokens and motion styles, sets global box sizing, page defaults, link behavior, and focus visibility. Horizontal overflow is clipped at the page level to avoid accidental sideways scrolling; components still need to be laid out correctly. Motion is limited to an optional color transition utility. Reduced motion disables smooth scrolling and shortens animations and transitions.

## Icons

Use individual named imports from `@lucide/vue`, the current official Vue package. Lucide renamed the former `lucide-vue-next` package; do not add both. Prefer 16, 18, 20, or 24 px icons with a consistent 1.75–2 stroke. Label icon-only controls and hide decorative icons from assistive technology where appropriate. Verify exported names against the installed package before use.
