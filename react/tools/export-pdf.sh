#!/usr/bin/env bash
# Export the deck to a single PDF, one slide per page, 16:9.
#
# Each slide is printed by headless Chrome, so the text stays selectable
# and the figures stay vector-sharp. Pages are then merged in order.
#
# Usage:  ./tools/export-pdf.sh [output.pdf]
set -euo pipefail

cd "$(dirname "$0")/.."
OUT="${1:-../dmp-presentation.pdf}"
SLIDES=$(node -e "import('./src/data/slides.js').then(m=>console.log(m.slides.length))" 2>/dev/null || echo 14)
PORT=4199
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"; [ -n "${PREVIEW_PID:-}" ] && kill "$PREVIEW_PID" 2>/dev/null || true' EXIT

# Find a Chromium-family browser.
BROWSER=""
for b in google-chrome google-chrome-stable chromium chromium-browser brave-browser microsoft-edge; do
  if command -v "$b" >/dev/null 2>&1; then BROWSER="$b"; break; fi
done
[ -z "$BROWSER" ] && { echo "No Chrome/Chromium found — install one to export."; exit 1; }

command -v pdfunite >/dev/null 2>&1 || { echo "pdfunite not found — install poppler-utils."; exit 1; }

echo "Building…"
npm run build >/dev/null

echo "Serving on :$PORT…"
npx vite preview --port "$PORT" --strictPort >/dev/null 2>&1 &
PREVIEW_PID=$!
for _ in $(seq 1 40); do
  curl -sf -o /dev/null "http://localhost:$PORT/" && break
  sleep 0.25
done

echo "Printing $SLIDES slides…"
for i in $(seq 1 "$SLIDES"); do
  printf '  %02d/%s\r' "$i" "$SLIDES"
  "$BROWSER" --headless=new --disable-gpu --no-sandbox \
    --window-size=1920,1080 --no-pdf-header-footer \
    --virtual-time-budget=10000 \
    --print-to-pdf="$TMP/$(printf '%02d' "$i").pdf" \
    "http://localhost:$PORT/?export=1#$i" >/dev/null 2>&1
done
echo

pdfunite "$TMP"/*.pdf "$OUT"
echo "Wrote $(cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")  ($(du -h "$OUT" | cut -f1))"
