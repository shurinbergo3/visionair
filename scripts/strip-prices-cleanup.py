#!/usr/bin/env python3
"""Second pass: fix sentences left awkward by the first price-stripper.

After the first pass converted '900 PLN' -> 'on request', constructs like
'From 900 PLN' become 'From on request' or 'От по индивидуальной смете до
по индивидуальной смете'. We collapse those here.
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

LEADERS = ["От", "От", "Од", "Od", "od", "From", "from", "Від", "від", "Przy"]
RANGE_CONNECTORS = ["до", "до", "to", "do", "-", "–", "—"]

ROOT = Path(__file__).resolve().parent.parent
MESSAGES = ROOT / "messages"


def capitalize(s: str) -> str:
    return s[:1].upper() + s[1:] if s else s


def cleanup(text: str, phrase: str) -> str:
    if not isinstance(text, str):
        return text
    phrase_cap = capitalize(phrase)
    phrase_re = re.escape(phrase)
    cap_re = re.escape(phrase_cap)

    lead_alt = "|".join(re.escape(l) for l in LEADERS)
    conn_alt = "|".join(re.escape(c) for c in RANGE_CONNECTORS)

    # 1. "(От|Od|From|Від) <phrase> (до|to|do|-) <phrase>"  →  capitalized phrase
    text = re.sub(
        rf"\b({lead_alt})\s+({phrase_re}|{cap_re})\s*(?:{conn_alt})\s*({phrase_re}|{cap_re})\b",
        phrase_cap,
        text,
    )
    # 2a. "<phrase> (до|to|do|-) <phrase>" → phrase (adjacent)
    text = re.sub(
        rf"\b({phrase_re}|{cap_re})\s*(?:{conn_alt})\s*({phrase_re}|{cap_re})\b",
        phrase,
        text,
    )
    # 2b. Anywhere a (до|to|do|-) <phrase> turns up, drop the entire
    # range-tail. The phrase never appears organically, so this is safe.
    text = re.sub(
        rf"(?:\s+|^)(?:{conn_alt})\s+({phrase_re}|{cap_re})",
        "",
        text,
    )
    # 3. Leading "От <phrase>" / "From <phrase>" → capitalize phrase, drop leader
    text = re.sub(
        rf"\b({lead_alt})\s+({phrase_re}|{cap_re})",
        phrase_cap,
        text,
    )
    # 4. Sentence-initial lowercase phrase: capitalize after . ! ?
    text = re.sub(
        rf"([.!?])\s+{phrase_re}\b",
        lambda m: f"{m.group(1)} {phrase_cap}",
        text,
    )
    # 5. Start-of-string lowercase phrase: capitalize.
    text = re.sub(rf"^{phrase_re}\b", phrase_cap, text)

    # 6. Strip leftover bare number runs like "900 / 1 600 / <phrase>" — fold them in.
    text = re.sub(
        rf"(?:\d[\d  .,]*\s*[/]\s*)+({phrase_re}|{cap_re})",
        r"\1",
        text,
    )

    # 7. Strip stale net/netto/нетто that previously qualified a price amount.
    text = re.sub(
        rf"({phrase_re}|{cap_re})\s+(?:net|netto|нетто|нет)\b",
        r"\1",
        text,
    )
    # 7b. Strip orphan "нетто / net / netto" where the preceding amount was removed.
    text = re.sub(r"\s+(?:нетто|netto|net)\s+(?=за |for |dla |do |под |під )", " ", text)

    text = re.sub(r" {2,}", " ", text)
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    return text


def walk(node, phrase):
    if isinstance(node, dict):
        for k, v in list(node.items()):
            if isinstance(v, str):
                node[k] = cleanup(v, phrase)
            else:
                walk(v, phrase)
    elif isinstance(node, list):
        for i, item in enumerate(node):
            if isinstance(item, str):
                node[i] = cleanup(item, phrase)
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
