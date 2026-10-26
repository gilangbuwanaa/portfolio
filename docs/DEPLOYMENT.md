# GitHub Pages deployment

## Current configuration

The Vite base path is configured by `VITE_BASE_PATH`. It defaults to `/` for local development, user or organization Pages sites, and custom domains. The configured Git remote is `gilangbuwanaa/portfolio`, so this repository's project-site base path is `/portfolio/`.

The Pages workflow derives the base path from GitHub's repository name when it runs. Repositories named `<owner>.github.io` use `/`; project repositories use `/<repository-name>/`. An optional repository Actions variable named `VITE_BASE_PATH` overrides this derivation, for example `/` for a custom domain. This is a configuration value, not a secret. Public images are built with `import.meta.env.BASE_URL`, the favicon uses Vite's `%BASE_URL%` HTML replacement, and Vue Router history already uses `import.meta.env.BASE_URL`.

To build locally for the current project-site path in PowerShell:

```powershell
$env:VITE_BASE_PATH = '/portfolio/'
npm run build
npm run preview
```

For a user or organization Pages site, or a configured custom domain, set the base to `/` instead. The configured value must begin and end with a slash. The environment variable only affects the current shell session.

## Test the production build locally

Install the lockfile dependencies and build using the intended deployment base:

```powershell
npm ci
$env:VITE_BASE_PATH = '/portfolio/'
npm run build
npm run preview
```

Open the local Vite preview at the project base path shown in the terminal, typically `http://localhost:4173/portfolio/`. Check that the favicon, project screenshots, organization photographs, employer logos, and tool icons load. After testing, clear the session override with `Remove-Item Env:VITE_BASE_PATH` if you want later commands to use the default root base.

For other shells, set `VITE_BASE_PATH=/portfolio/` in the environment before running `npm run build`.

## Configure and run GitHub Pages

The prepared workflow is `.github/workflows/pages.yml`. It is manual-only, limited to the repository's `main` branch, and uses GitHub's Pages configure, artifact upload, and deployment actions. Adding this file does not enable Pages or publish the site.

Before the first publication:

1. Commit and push the reviewed changes to `main` when you choose to release them.
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. If deploying through a custom domain, add the repository Actions variable `VITE_BASE_PATH` with the value `/`. Leave it unset for automatic repository-path detection.
4. Open the **Actions** tab, select **Publish GitHub Pages**, and choose **Run workflow** with `main` selected.
5. Wait for both the build/deploy job and the `github-pages` environment deployment to complete successfully.
6. Verify the published address shown by the workflow and in **Settings → Pages**. Do not infer or hardcode that address; GitHub supplies it after Pages is configured.

The workflow does not run automatically on pushes. A manual run from a branch other than `main` is skipped.

## Troubleshooting

- **Images or favicon missing on a project site:** build with `VITE_BASE_PATH` set to the repository path, including both slashes (currently `/portfolio/`). Keep public image references routed through the shared helper and the favicon through `%BASE_URL%`; avoid root-relative `/images/...` URLs.
- **Built JavaScript or CSS returns 404:** confirm the workflow derived the correct repository name and that the configured base matches the site's path. For a user site or custom domain, the base should be `/`.
- **Direct route refresh returns 404:** the application currently has no Vue routes. If routes are added later, keep the router history base aligned with Vite's `BASE_URL` and account for GitHub Pages' static-host behavior before introducing deep links.
- **Spotify or YouTube embed does not play:** provider embeds load at runtime and may be affected by network access, browser privacy settings, account requirements, or provider availability. Use the visible external track link as a fallback. No provider credentials or secrets are required by this static site.
- **Preview uses the wrong path:** restart the preview after setting or clearing `VITE_BASE_PATH`; the production base is baked into the build output.

## Release state

The Vite base-path support, local asset paths, favicon reference, and manual GitHub Actions workflow are prepared in the repository. No Pages setting has been changed and no live deployment has been run or verified.
