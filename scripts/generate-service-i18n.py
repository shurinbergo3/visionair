#!/usr/bin/env python3
"""
Patches messages/{locale}.json with 7 new service namespaces.

Each service is defined in scripts/services/<slug>.py with a SLUG and DATA
dict keyed by locale. Shared common blocks (nav, trustStrip, CTA banner, etc)
are wrapped by scripts/services/_shared.build_ns.

Idempotent — re-running overwrites the namespaces.
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MSG_DIR = ROOT / "messages"

sys.path.insert(0, str(ROOT / "scripts"))
from services._shared import LOCALES, build_ns  # noqa: E402
from services import (  # noqa: E402
    wesela,
    eventy,
    fpv_teledyski,
    budownictwo,
    inspekcje_termowizyjne,
    inspekcje_techniczne,
    ortofotomapy_pomiary,
)

SERVICES = [
    wesela,
    eventy,
    fpv_teledyski,
    budownictwo,
    inspekcje_termowizyjne,
    inspekcje_techniczne,
    ortofotomapy_pomiary,
]


def patch_locale(locale: str) -> None:
    path = MSG_DIR / f"{locale}.json"
    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    for module in SERVICES:
        slug = module.SLUG
        if locale not in module.DATA:
            raise RuntimeError(f"Missing locale {locale} for service {slug}")
        # store under camelCase / kebab-keepsake key — but JSON keys with hyphens
        # require bracket notation in next-intl; we'll use the raw slug as key
        # since next-intl supports it through getTranslations(namespace).
        data[slug] = build_ns(locale, module.DATA[locale])

    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  patched {path.name}: +{len(SERVICES)} namespaces")


def main() -> None:
    print(f"Patching {len(SERVICES)} services × {len(LOCALES)} locales")
    for loc in LOCALES:
        patch_locale(loc)
    print("Done.")


if __name__ == "__main__":
    main()
