from pathlib import Path

from PIL import Image, ImageOps


PROJECT = Path(__file__).resolve().parent.parent
IMAGE_DIRECTORY = PROJECT / "public" / "images"
MAX_EDGE = 1600


def optimize_story_image(source: Path) -> None:
    target = source.with_suffix(".webp")
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=82, method=6)


def optimize_social_card() -> None:
    target = PROJECT / "public" / "og.png"
    if not target.exists():
        return
    with Image.open(target) as image:
        image = ImageOps.fit(
            ImageOps.exif_transpose(image).convert("RGB"),
            (1200, 630),
            method=Image.Resampling.LANCZOS,
        )
        image.save(target, "PNG", optimize=True)


for png_file in sorted(IMAGE_DIRECTORY.glob("*.png")):
    optimize_story_image(png_file)

optimize_social_card()
print("Schweinis Bilder sind für Smartphones optimiert.")
