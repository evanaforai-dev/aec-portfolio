#!/usr/bin/env python3
"""Fail the build on a malformed SVG in public/.

An SVG served through <img> is parsed as XML, not as HTML, so one stray "<"
anywhere in the file (a CSS comment mentioning a tag, an unescaped ampersand
in a URL) makes the whole document unparseable and the browser renders a
broken-image icon instead. Nothing in the Next build looks at these files, so
that ships silently. This runs before every build so it cannot.
"""
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

PUBLIC = Path(__file__).resolve().parent.parent / "public"

failures: list[str] = []
checked = 0

for svg in sorted(PUBLIC.rglob("*.svg")):
    rel = svg.relative_to(PUBLIC)
    checked += 1
    try:
        ET.parse(svg)
    except ET.ParseError as e:
        failures.append(f"{rel}: not well-formed XML — {e}")
        continue
    # A <style> block is the usual culprit: its contents are markup unless
    # wrapped, so require CDATA wherever one exists. Comments are stripped
    # first, since a comment that merely mentions the tag is harmless and
    # flagging it is a false positive.
    text = re.sub(r"<!--.*?-->", "", svg.read_text(encoding="utf-8", errors="replace"), flags=re.S)
    if "<style" in text and "CDATA" not in text:
        failures.append(
            f"{rel}: has a <style> block that is not wrapped in CDATA. "
            "Wrap it, or a later edit adding '<', '>' or '&' will break the file."
        )

if failures:
    print(f"\n  {len(failures)} SVG problem(s) in public/:\n", file=sys.stderr)
    for f in failures:
        print(f"    ✗ {f}", file=sys.stderr)
    print("", file=sys.stderr)
    sys.exit(1)

print(f"  svg check: {checked} file(s) OK")
