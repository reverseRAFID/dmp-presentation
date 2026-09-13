# Permission to record Dhaka roads — presentation to the DMP

A 13-slide presentation asking the **Dhaka Metropolitan Police** for permission to
drive a marked BRAC University vehicle on public roads and record the street for a
research dataset.

Every claim in the deck comes from the IRB application (`../irb.md`) for
*Robust GPS-Denied Localization and Terrain-Aware Path Planning for Autonomous
Ground Robots in Unstructured Environments* — PI Dr. Md. Khalilur Rhaman,
Department of Computer Science and Engineering, School of Data and Sciences.

## Running it

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # static output in dist/
npm run preview  # serve the production build on :4180
```

The dev and preview servers bind to all interfaces, so the deck is reachable from
other machines on the same network at `http://<this machine's LAN IP>:5180/`.

## Navigating

| Input | Action |
| --- | --- |
| `→` `↓` `PageDown` `Space` | Next slide |
| `←` `↑` `PageUp` | Previous slide |
| `1`–`9`, `0` | Jump to a slide |
| `Home` / `End` | First / last slide |
| `F` | Toggle fullscreen (`Esc` exits) |
| Swipe, tick marks, arrow buttons | Also work |

`↑`/`↓` scroll a slide first when its content is taller than the window. The URL
hash tracks the current slide, so `#7` is a direct link.

## The argument

1. **Cover** — who is asking, and for what
2. **What we are asking** — one vehicle, two crew, four road types; and what we are *not* asking for
3. **The problem** — the two questions a ground robot must answer continuously
4. **The solution** — record, anonymise, develop, publish; and why Dhaka
5. **Existing work** — what South Asia has already built, and the modality it stops short of
6. **The vehicle** — the sensors, in plain words
7. **Recording** — what is recorded and what never is
8. **Conduct on the road** — how the vehicle behaves in traffic
9. **Privacy** — the blurring pipeline
10. **If something happens** — collisions, offences caught on camera, objections, lawful orders
11. **Where and when** — road types, hours, phasing
12. **Approvals** — IRB, departmental authorisation, the Personal Data Protection Ordinance 2025
13. **Our request** — the three asks, and contact details
14. **References** — the IRB application's reference list, plus the regional datasets cited

## Imagery

- **Privacy** — a real before/after anonymisation pair, generated from the project's
  own vehicle photograph. `tools/make-anon-pair.py` regenerates it; the face boxes
  are listed in that script.
- **Existing work** — figures from BadODD (arXiv:2401.10659) and IDD-3D
  (arXiv:2210.12878), both CC BY 4.0, reproduced with attribution in the caption. The
  attribution must stay with the image.
- **Where and when** — the Dhaka road network, drawn from OpenStreetMap. Geometry was
  fetched from the Overpass API, projected to Web Mercator and simplified offline into
  `src/data/dhakaMap.json` (50 KB), so the slide makes no network request at display
  time. Attribution — *Map data © OpenStreetMap contributors (ODbL)* — is printed in
  the legend and must stay there.

`src/components/slides/parts.jsx` still exports `<Placeholder>`; swap a `<Figure>` for
one if you want to mark a slot for artwork that is still coming.

## Structure

```
src/
  data/slides.js         slide order and section labels
  components/
    Deck.jsx             navigation, keyboard, chrome
    Reveal.jsx           the one entrance animation
    slides/              one component per slide
    viz/Charts.jsx       the two remaining data components
  motion.js              motion tokens
  styles/                tokens, base, deck, viz, slides
  assets/brand/          university logo and vehicle photograph
```

## Design

White ground, one accent — `#203890`, sampled from the university logo. **Lato**
throughout: 700 for headings, 400 for body, 300 for large numerals, 700 uppercase and
letterspaced for labels. Type is sized for projection: body lands around 23px at
1512px wide and 26px at 1920px. Motion is one language — a 12px rise and fade on a
short stagger, disabled under `prefers-reduced-motion`.

Verified: no overflow and no console errors at 1280×720, 1366×768, 1512×945,
1600×900 and 1920×1080.
