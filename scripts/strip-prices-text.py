#!/usr/bin/env python3
"""Strip explicit money amounts (PLN, zł, EUR, €) from free-text fields in messages/*.json.

We preserve insurance coverage references like '5 mln PLN' / '5 mln EUR' (those describe
liability limits, not prices the customer pays).

For everything else, replace amounts with a locale-specific 'negotiable' phrase, and also
swallow common leading words like 'От '/'Od '/'From '/'Від ' so the sentence still reads.
Trailing rate-units (/dzień, /день, /day, /mies, /мес, /h, /km, /ha, /m², /m2) are also removed
so we don't leave dangling fragments like '/day' after the amount.
"""
import json
import re
from pathlib import Path

LOCALES = {
    "ru": "по индивидуальной смете",
    "en": "on request",
    "pl": "wycena indywidualna",
    "uk": "за індивідуальною оцінкою",
}

ROOT = Path(__file__).resolve().parent.parent
MESSAGES = ROOT / "messages"

MLN_PATTERN = re.compile(
    r"(\d[\d  .,]*)\s*mln\s*(PLN|zł|EUR|€)",
    re.IGNORECASE,
)

# Leading filler words that often precede an amount: "From 900 PLN", "От 900 PLN", etc.
LEAD = r"(?:[Oo]d |[Oo]т |[Fr]rom |[Вв]ід |[Pp]rzy |\+)?"
# Number with optional thousands sep (space, nbsp, comma, period).
NUM = r"\d[\d  .,]*"
# Currency token.
CUR = r"(?:PLN|zł|EUR|€)"
# Optional rate unit suffix after the amount.
UNIT = r"(?:\s*/\s*\w+)?"

AMOUNT_PATTERN = re.compile(LEAD + NUM + r"\s*" + CUR + UNIT)

# Range like "800-2 500 PLN" or "2 800-3 500 PLN" - replace the whole span.
RANGE_PATTERN = re.compile(
    r"(?:[Oo]d |[Oo]т |[Fr]rom |[Вв]ід )?"
    + NUM
    + r"\s*-\s*"
    + NUM
    + r"\s*"
    + CUR
    + UNIT
)

SENTINEL = "␟"  # information separator one — won't appear in source text


def transform(text: str, phrase: str) -> str:
    if not isinstance(text, str):
        return text

    # 1. Protect 'X mln PLN' (insurance-coverage references) with a sentinel.
    placeholders: list[str] = []

    def stash(match: re.Match) -> str:
        placeholders.append(match.group(0))
        return f"{SENTINEL}{len(placeholders) - 1}{SENTINEL}"

    text = MLN_PATTERN.sub(stash, text)

    # 2. Replace ranges first (so "800-2 500 PLN" becomes the phrase, not "<phrase>-<phrase>").
    text = RANGE_PATTERN.sub(phrase, text)
    # 3. Replace single amounts.
    text = AMOUNT_PATTERN.sub(phrase, text)

    # 4. Restore protected mln-amounts.
    def restore(match: re.Match) -> str:
        return placeholders[int(match.group(1))]

    text = re.sub(SENTINEL + r"(\d+)" + SENTINEL, restore, text)

    # Collapse double spaces and stray punctuation left over.
    text = re.sub(r" {2,}", " ", text)
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    return text


SKIP_KEYS = {"price", "sub"}  # already handled by strip-prices.py


def walk(node, phrase):
    if isinstance(node, dict):
        for k, v in list(node.items()):
            if k in SKIP_KEYS:
                continue
            if isinstance(v, str):
                node[k] = transform(v, phrase)
            else:
                walk(v, phrase)
    elif isinstance(node, list):
        for i, item in enumerate(node):
            if isinstance(item, str):
                node[i] = transform(item, phrase)
            else:
                walk(item, phrase)


def main():
    for locale, phrase in LOCALES.items():
        path = MESSAGES / f"{locale}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        walk(data, phrase)
        path.write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"updated {path}")


if __name__ == "__main__":
    main()
