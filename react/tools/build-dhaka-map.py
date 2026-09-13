#!/usr/bin/env python3
"""Regenerate src/data/dhakaMap.json from OpenStreetMap.

Fetches the Dhaka road network and rivers from the Overpass API, projects
them to Web Mercator, simplifies them with Douglas-Peucker and writes a
compact set of SVG path strings. The deck then draws the map inline, so
presenting needs no network connection.

Map data © OpenStreetMap contributors, ODbL. The attribution is printed in
the map legend and must stay there.

Usage:  python3 tools/build-dhaka-map.py
Needs:  network access to overpass-api.de (only when regenerating)
"""
import json
import math
import pathlib
import urllib.parse
import urllib.request

# Frame on the built-up core: south, west, north, east.
BBOX = (23.715, 90.345, 23.855, 90.452)
WIDTH = 1000.0
ROAD_EPS = 0.6          # simplification tolerance, in projected units
RIVER_EPS = 1.2
BASE_STATION = (23.7733146, 90.4243710)   # BRAC University, Merul Badda

OVERPASS = "https://overpass-api.de/api/interpreter"
ROAD_CLASSES = ("motorway", "trunk", "primary", "secondary")
OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "data" / "dhakaMap.json"


def overpass(query):
    """Overpass rejects urllib's default User-Agent with a 406, so set one."""
    data = urllib.parse.urlencode({"data": query}).encode()
    req = urllib.request.Request(
        OVERPASS,
        data=data,
        headers={"User-Agent": "dmp-presentation/1.0 (BRAC University, academic)"},
    )
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)["elements"]


def mercator(lat, lon):
    return math.radians(lon), math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))


x0, y0 = mercator(BBOX[0], BBOX[1])
x1, y1 = mercator(BBOX[2], BBOX[3])
SCALE = WIDTH / (x1 - x0)
HEIGHT = (y1 - y0) * SCALE


def project(lat, lon):
    x, y = mercator(lat, lon)
    return (x - x0) * SCALE, HEIGHT - (y - y0) * SCALE      # flip y for SVG


def simplify(points, eps):
    """Douglas-Peucker. The map draws at a few hundred pixels, so anything
    finer than a pixel is bytes with no picture behind them."""
    if len(points) < 3:
        return points
    ax, ay = points[0]
    bx, by = points[-1]
    dx, dy = bx - ax, by - ay
    norm = math.hypot(dx, dy) or 1e-9
    worst, index = 0.0, 0
    for i in range(1, len(points) - 1):
        px, py = points[i]
        d = abs(dy * px - dx * py + bx * ay - by * ax) / norm
        if d > worst:
            worst, index = d, i
    if worst <= eps:
        return [points[0], points[-1]]
    return simplify(points[: index + 1], eps)[:-1] + simplify(points[index:], eps)


def in_frame(points):
    return any(-25 <= x <= WIDTH + 25 and -25 <= y <= HEIGHT + 25 for x, y in points)


def to_path(points):
    return "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in points)


def ways(elements, eps):
    for element in elements:
        geometry = element.get("geometry") or []
        if len(geometry) < 2:
            continue
        points = [project(g["lat"], g["lon"]) for g in geometry]
        if not in_frame(points):
            continue
        points = simplify(points, eps)
        if len(points) >= 2:
            yield element.get("tags", {}), to_path(points)


def main():
    south, west, north, east = BBOX
    box = f"{south},{west},{north},{east}"

    print("fetching roads…")
    road_elements = overpass(
        f'[out:json][timeout:150];'
        f'(way["highway"~"^({"|".join(ROAD_CLASSES)})$"]({box}););out geom;'
    )
    print("fetching rivers…")
    river_elements = overpass(
        f'[out:json][timeout:150];(way["waterway"="river"]({box}););out geom;'
    )

    roads = {cls: [] for cls in ROAD_CLASSES}
    for tags, path in ways(road_elements, ROAD_EPS):
        cls = tags.get("highway")
        if cls in roads:
            roads[cls].append(path)

    rivers = [path for _, path in ways(river_elements, RIVER_EPS)]

    ux, uy = project(*BASE_STATION)
    payload = {
        "viewBox": f"0 0 {WIDTH:.0f} {HEIGHT:.0f}",
        "rivers": rivers,
        "roads": roads,
        "university": [round(ux, 1), round(uy, 1)],
        "universityPct": [round(ux / WIDTH * 100, 2), round(uy / HEIGHT * 100, 2)],
    }
    OUT.write_text(json.dumps(payload, separators=(",", ":")))

    print(f"viewBox {payload['viewBox']}")
    print({k: len(v) for k, v in roads.items()}, f"rivers={len(rivers)}")
    print(f"wrote {OUT.relative_to(OUT.parent.parent.parent)} "
          f"({OUT.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
