#!/usr/bin/env python3
"""Replace all package/service price values across messages/*.json with a locale-specific
'negotiable' phrase, and clear the paired `sub` currency suffix.

Heuristic: any object that has a `price` key is treated as a card/package entry.
- If it also has a `sub` key, clear `sub` to "" (it's a currency suffix like "PLN net / day").
- Otherwise leave other fields untouched.
"""
import json
from pathlib import Path

NEGOTIABLE = {
    "ru": "Договорная",
    "en": "On request",
    "pl": "Cena umowna",
    "uk": "Договірна",
}

ROOT = Path(__file__).resolve().parent.parent
MESSAGES = ROOT / "messages"


def walk(node, locale_phrase):
    if isinstance(node, dict):
        if "price" in node and isinstance(node["price"], str):
            node["price"] = locale_phrase
            if "sub" in node and isinstance(node["sub"], str):
                node["sub"] = ""
        for v in node.values():
            walk(v, locale_phrase)
    elif isinstance(node, list):
        for item in node:
            walk(item, locale_phrase)


def main():
    for locale, phrase in NEGOTIABLE.items():
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
