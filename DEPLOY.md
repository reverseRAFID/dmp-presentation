# Deploying the presentation to GitHub Pages

The deck in `react/` is a static site. Once it is on GitHub, every push to `main`
rebuilds and republishes it automatically.

---

## Read this first

Publishing to GitHub Pages makes the site **public to anyone with the URL**, whether
or not the repository itself is public. Three things in this project deserve a
decision before you push.

**1. The IRB documents.** `irb.md` and `IRB_application_form_FILLED.pdf` contain the
full application, personal telephone numbers and email addresses, and the consent
arrangements. The supplied `.gitignore` **excludes both by default**. If you want
them tracked, make the repository private first and delete those two lines.

**2. `anon-before.jpg` shows two unblurred faces.** That is the whole point of the
before/after on the Privacy slide — but it means publishing an unblurred image of two
team members, which sits awkwardly next to the project's own commitment that every
face is blurred before release. Section W of the application also says a team member
appearing in an equipment photograph needs separate written permission for that image.
Before deploying publicly, either:

- get those two crew members to sign the Part B likeness release for this image, or
- swap the "before" panel for a version with detection boxes instead of visible faces, or
- keep the repository and the Pages site private (see *Private deployment* below).

**3. `research-vehicle.jpg` shows the vehicle and crew** and appears on the cover and
slide 5. Same consideration, lower exposure — the faces are small.

None of this blocks deployment. It is a decision for the PI, not for the build.

---

## One-time setup

### 1. Create the repository

```bash
cd "/media/rafid/New Volume/dmp-presentation"
git init -b main
git add .
git commit -m "Presentation to the Dhaka Metropolitan Police"
```

Check what you are about to publish before you push:

```bash
git status --short
git ls-files | head -50
```

`irb.md` and the PDF should **not** appear. If they do, the `.gitignore` was added
after they were staged — run `git rm --cached irb.md IRB_application_form_FILLED.pdf`.

Then create the repo on GitHub and push:

```bash
gh repo create dmp-presentation --private --source=. --push
```

Use `--public` instead if you have settled the questions above.

### 2. Turn on Pages

On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Do not pick "Deploy from a branch" — the workflow in
`.github/workflows/deploy.yml` uses the Actions path.

### 3. Push

```bash
git push
```

The workflow runs on every push that touches `react/`. Watch it under the **Actions**
tab. The first run takes about a minute; the URL appears on the workflow summary and
under Settings → Pages.

Your site will be at:

```
https://<your-username>.github.io/dmp-presentation/
```

Direct links to a slide work as usual — append `#7` for slide 7.

---

## Why no `base` change is needed

GitHub project sites live under a subpath (`/dmp-presentation/`), which normally
breaks absolute asset paths. `react/vite.config.js` already sets:

```js
base: './'
```

so every asset is referenced relatively and the build works at any subpath — the
repository root, a project subpath, or a custom domain — with no edit.

The deck navigates by URL hash (`#1`…`#13`), not by path, so there is no need for a
404 fallback or any SPA rewrite rule.

---

## Private deployment

Pages from a **private** repository requires GitHub Pro, Team or Enterprise. On those
plans, set **Settings → Pages → Visibility → Private**, and only people with
repository access can open the site.

On a free plan a private repository cannot serve Pages at all. Two alternatives:

- **Present from the built files.** `npm run build` in `react/`, then open
  `react/dist/index.html` directly, or serve it with `npm run preview`. No network
  needed — the Dhaka map is baked into the bundle. Only the web fonts are fetched
  remotely, and the deck falls back to system sans if they fail.
- **Share over Tailscale.** `npm run dev` in `react/` binds to all interfaces, so
  anyone on your tailnet can open `http://<your-tailscale-ip>:5180/`.

---

## Custom domain

Add a `CNAME` file containing the domain to `react/public/` (create the folder if it
is gone) so it is copied into the build, then set the domain under Settings → Pages
and add the DNS records GitHub shows you.

---

## Updating the deck

```bash
# edit slides in react/src/components/slides/
git add -A
git commit -m "Tighten the privacy slide"
git push
```

That is the whole loop. The workflow rebuilds and republishes.

To check a change before pushing:

```bash
cd react
npm run dev      # http://localhost:5180
```

---

## Troubleshooting

**Blank page, console shows 404s for `/assets/…`** — `base` was changed away from
`'./'`. Put it back.

**`npm ci` fails with a lockfile mismatch** — `package.json` and
`package-lock.json` disagree. Run `npm install` locally, commit the updated
lockfile, and push.

**Workflow fails at "Deploy to GitHub Pages" with a permissions error** — the Pages
source is still set to "Deploy from a branch". Change it to "GitHub Actions".

**Fonts look wrong on the deployed site** — Lato is loaded from Google Fonts. If the
presentation room has no internet, build and present locally instead, or self-host
the font files under `react/public/` and point `index.html` at them.

**The map is missing** — `react/src/data/dhakaMap.json` is required at build time. It
is checked in, so this only happens if it was deleted. Regenerating it needs the
Overpass API; the projection and simplification steps are described in
`react/README.md`.
