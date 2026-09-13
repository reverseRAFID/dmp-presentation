#!/usr/bin/env python3
"""Regenerate the before/after anonymisation pair on the Privacy slide.

Produces src/assets/brand/anon-before.jpg and anon-after.jpg from the
project's own vehicle photograph. Face boxes are in full-image coordinates
of research-vehicle.jpg (2400x1800); adjust them if the source changes.
"""
from PIL import Image, ImageDraw, ImageFilter
import pathlib

HERE = pathlib.Path(__file__).resolve().parent.parent / "src" / "assets" / "brand"
CROP = (1480, 200, 2320, 1040)          # region holding both crew members
FACES = [(1700, 405, 1795, 515), (1960, 775, 2040, 862)]
BLUR_RADIUS = 26
OUT_SIZE = (900, 900)


def blur_ellipse(img, box, radius):
    """Blur confined to a feathered ellipse — no hard rectangle edge."""
    pad = int(max(box[2] - box[0], box[3] - box[1]) * 0.35)
    region = (box[0] - pad, box[1] - pad, box[2] + pad, box[3] + pad)
    patch = img.crop(region)
    blurred = patch.filter(ImageFilter.GaussianBlur(radius))
    mask = Image.new("L", patch.size, 0)
    ImageDraw.Draw(mask).ellipse(
        (pad, pad, patch.size[0] - pad, patch.size[1] - pad), fill=255
    )
    mask = mask.filter(ImageFilter.GaussianBlur(pad * 0.45))
    patch.paste(blurred, (0, 0), mask)
    img.paste(patch, region)


def main():
    src = Image.open(HERE / "research-vehicle.jpg").convert("RGB")
    panel = src.crop(CROP)
    before, after = panel.copy(), panel.copy()
    for x0, y0, x1, y1 in FACES:
        blur_ellipse(after, (x0 - CROP[0], y0 - CROP[1], x1 - CROP[0], y1 - CROP[1]), BLUR_RADIUS)
    for name, im in [("anon-before.jpg", before), ("anon-after.jpg", after)]:
        im.resize(OUT_SIZE, Image.LANCZOS).save(HERE / name, quality=84, optimize=True)
        print("wrote", name)


if __name__ == "__main__":
    main()
