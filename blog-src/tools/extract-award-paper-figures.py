#!/usr/bin/env python3
"""Build the Visual Evidence award-paper figure library.

Only figure regions are exported. The manifest keeps the competition, problem,
paper/team, page, and the nearby source caption so every public use can be
attributed and audited.
"""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

import pdfplumber
import pypdfium2 as pdfium
from PIL import Image, ImageChops


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "source/images/mathematical-modeling/visual-evidence/award"
MANIFEST = ROOT / "source/data/visual-evidence-award-figures.json"
LIBRARY = Path("/Users/gavin0576/Library/CloudStorage/OneDrive-个人")


def trim(im: Image.Image, margin: int = 14) -> Image.Image:
    rgb = im.convert("RGB")
    bg = Image.new("RGB", rgb.size, "white")
    box = ImageChops.difference(rgb, bg).getbbox()
    if not box:
        return rgb
    left, top, right, bottom = box
    return rgb.crop((max(0, left - margin), max(0, top - margin), min(rgb.width, right + margin), min(rgb.height, bottom + margin)))


def save_webp(im: Image.Image, index: int) -> str:
    name = f"award-{index:03d}.webp"
    path = OUT / name
    trim(im).save(path, "WEBP", quality=88, method=6)
    return f"/blog/images/mathematical-modeling/visual-evidence/award/{name}"


def render_figure_pdf(path: Path) -> Image.Image:
    doc = pdfium.PdfDocument(str(path))
    page = doc[0]
    bitmap = page.render(scale=2.4)
    return bitmap.to_pil().convert("RGB")


def caption_text(text: str, language: str) -> str:
    compact = " ".join(text.split())
    if language == "zh":
        matches = re.findall(r"(?:图|表)\s*[0-9一-十.-]+[^;。]{0,150}", compact)
    else:
        matches = re.findall(r"(?:Figure|Fig\.|Table)\s*\d+(?:[.-]\d+)?[^.]{0,180}", compact, re.I)
    return " / ".join(matches[:3]) if matches else "Figure excerpt from the cited award paper."


def add_direct(records: list[dict]) -> None:
    src = LIBRARY / "Previous Resources/2025国赛/COMAP-MCM-2024/Note/O奖得主分享材料/西电O奖-2020/2020年美赛D题源文件/img"
    category_by_name = {
        "comparison": "comparison", "flexibility": "time", "timeline": "time",
        "sensitive": "risk", "sensetive": "risk", "lowest": "diagnostic",
        "k-means": "diagnostic", "matrix": "diagnostic", "hotmap": "map",
        "formation": "map", "football_field": "map", "network": "network",
        "dyadic": "network", "coordination": "time", "gegenpressing": "framework",
    }
    for path in sorted(src.iterdir(), key=lambda p: p.name.lower()):
        if path.suffix.lower() not in {".pdf", ".png", ".jpg", ".jpeg", ".svg"}:
            continue
        key = path.stem.lower()
        category = next((value for token, value in category_by_name.items() if token in key), "framework")
        if path.suffix.lower() == ".pdf":
            im = render_figure_pdf(path)
        elif path.suffix.lower() == ".svg":
            # The two pitch SVGs are support drawings rather than analytical results.
            continue
        else:
            im = Image.open(path).convert("RGB")
        records.append({
            "image": save_webp(im, len(records) + 1),
            "competition": "2020 MCM",
            "problem": "Problem D — Teaming",
            "paper": "Team 2006782, Outstanding Winner paper",
            "page": None,
            "source_caption": path.stem.replace("_", " "),
            "category": category,
            "source_file": str(path),
        })


def add_embedded(records: list[dict], spec: dict) -> None:
    path = Path(spec["path"])
    allowed_pages = set(spec.get("pages", []))
    with pdfplumber.open(path) as doc:
        for page_index, page in enumerate(doc.pages, start=1):
            if allowed_pages and page_index not in allowed_pages:
                continue
            text = page.extract_text() or ""
            caption = caption_text(text, spec["language"])
            for image_index, item in enumerate(page.images, start=1):
                width = item["x1"] - item["x0"]
                height = item["y1"] - item["y0"]
                if width <= 80 or height <= 50:
                    continue
                pad = 7
                box = (
                    max(0, item["x0"] - pad),
                    max(0, item["top"] - pad),
                    min(page.width, item["x1"] + pad),
                    min(page.height, item["bottom"] + pad),
                )
                rendered = page.crop(box).to_image(resolution=190, antialias=True).original.convert("RGB")
                category = spec["category_by_page"].get(page_index, spec["default_category"])
                records.append({
                    "image": save_webp(rendered, len(records) + 1),
                    "competition": spec["competition"],
                    "problem": spec["problem"],
                    "paper": spec["paper"],
                    "page": page_index,
                    "source_caption": caption,
                    "category": category,
                    "source_file": str(path),
                    "source_image_index": image_index,
                })


def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    records: list[dict] = []
    add_direct(records)

    specs = [
        {
            "path": LIBRARY / "Previous Resources/2025国赛/国赛资料/1.国赛：高教社杯全国大学生数学建模竞赛优秀论文/2016数模国赛优秀论文/2016优秀论文/2016国赛国一B题优秀论文-小区开放道路通行影响.pdf",
            "competition": "2016 CUMCM", "problem": "Problem B — The Traffic Impact of Opening Gated Communities",
            "paper": "National First Prize paper: 小区开放道路通行影响", "language": "zh",
            "pages": [9, 14, 16, 17, 19], "default_category": "map",
            "category_by_page": {9: "framework", 14: "map", 16: "map", 17: "network", 19: "risk"},
        },
        {
            "path": LIBRARY / "Previous Resources/2025国赛/国赛资料/1.国赛：高教社杯全国大学生数学建模竞赛优秀论文/2016数模国赛优秀论文/2016优秀论文/2016国赛国一D题优秀论文-风电场运行状况分析及优化研究.pdf",
            "competition": "2016 CUMCM", "problem": "Problem D — Wind-Farm Operation Analysis and Optimization",
            "paper": "National First Prize paper: 风电场运行状况分析及优化研究", "language": "zh",
            "pages": [4, 6, 7, 9, 10, 11, 12, 13], "default_category": "time",
            "category_by_page": {4: "framework", 6: "time", 7: "distribution", 9: "framework", 10: "diagnostic", 11: "diagnostic", 12: "framework", 13: "comparison"},
        },
        {
            "path": LIBRARY / "Previous Resources/2025国赛/国赛资料/1.国赛：高教社杯全国大学生数学建模竞赛优秀论文/2015数模国赛优秀论文/2015优秀论文/2015国赛一等奖优秀论文A4题太阳影子定位.pdf",
            "competition": "2015 CUMCM", "problem": "Problem A — Solar-Shadow Positioning",
            "paper": "National First Prize paper A4: 太阳影子定位", "language": "zh",
            "pages": [5, 6, 7, 14, 15], "default_category": "scientific",
            "category_by_page": {5: "scientific", 6: "time", 7: "scientific", 14: "map", 15: "map"},
        },
        {
            "path": LIBRARY / "Previous Resources/2023 Winter/【数学建模北海整理】2019-2023年数学建模美赛获奖论文/2023/A/2321860.pdf",
            "competition": "2023 MCM", "problem": "Problem A — Drought-Tolerant Plant Communities",
            "paper": "Team 2321860 award paper", "language": "en",
            "pages": [10, 13, 16, 18, 20], "default_category": "scientific",
            "category_by_page": {10: "framework", 13: "map", 16: "time", 18: "time", 20: "risk"},
        },
        {
            "path": LIBRARY / "Previous Resources/2023 Winter/【数学建模北海整理】2019-2023年数学建模美赛获奖论文/2023/F/2315018.pdf",
            "competition": "2023 ICM", "problem": "Problem F — Green GDP",
            "paper": "Team 2315018 award paper", "language": "en",
            "pages": [9, 16, 17, 19], "default_category": "comparison",
            "category_by_page": {9: "map", 16: "diagnostic", 17: "comparison", 19: "framework"},
        },
        {
            "path": LIBRARY / "Previous Resources/2023 Winter/【数学建模北海整理】2019-2023年数学建模美赛获奖论文/2023/C/2309397.pdf",
            "competition": "2023 MCM", "problem": "Problem C — Wordle",
            "paper": "Team 2309397 award paper", "language": "en",
            "pages": [3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 16, 21], "default_category": "diagnostic",
            "category_by_page": {3: "framework", 4: "framework", 6: "time", 7: "framework", 8: "diagnostic", 9: "diagnostic", 10: "distribution", 12: "distribution", 13: "distribution", 14: "framework", 16: "risk", 21: "diagnostic"},
        },
    ]
    for spec in specs:
        add_embedded(records, spec)

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Exported {len(records)} award-paper figure crops to {OUT}")
    print(f"Manifest: {MANIFEST}")


if __name__ == "__main__":
    main()
