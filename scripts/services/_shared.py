"""Shared i18n primitives reused across all 7 service namespaces."""

LOCALES = ["pl", "en", "ru", "uk"]

TRUST_STRIP = {
    "pl": [
        {"title": "ULC Operator",       "sub": "Operator zarejestrowany"},
        {"title": "EASA A1/A2/A3",      "sub": "+ STS-01 / STS-02"},
        {"title": "OC Compensa VIG",    "sub": "Ubezpieczenie"},
        {"title": "850+ godzin nalotu", "sub": "120+ projektów"},
        {"title": "CTR EPWA",           "sub": "Zgody po naszej stronie"},
    ],
    "en": [
        {"title": "ULC Operator",       "sub": "Registered operator"},
        {"title": "EASA A1/A2/A3",      "sub": "+ STS-01 / STS-02"},
        {"title": "Compensa VIG",       "sub": "Insurance"},
        {"title": "850+ flight hours",  "sub": "120+ projects"},
        {"title": "CTR EPWA",           "sub": "All permits on us"},
    ],
    "ru": [
        {"title": "ULC оператор",       "sub": "Зарегистрирован"},
        {"title": "EASA A1/A2/A3",      "sub": "+ STS-01 / STS-02"},
        {"title": "OC Compensa VIG",    "sub": "Страховка"},
        {"title": "850+ часов налёта",  "sub": "120+ проектов"},
        {"title": "CTR EPWA",           "sub": "Разрешения за нас"},
    ],
    "uk": [
        {"title": "ULC оператор",       "sub": "Зареєстрований"},
        {"title": "EASA A1/A2/A3",      "sub": "+ STS-01 / STS-02"},
        {"title": "OC Compensa VIG",    "sub": "Страхування"},
        {"title": "850+ годин нальоту", "sub": "120+ проєктів"},
        {"title": "CTR EPWA",           "sub": "Дозволи беремо на себе"},
    ],
}

NAV = {
    "pl": {"why": "Dlaczego", "deliverables": "Co dostajesz", "audience": "Dla kogo", "packages": "Pakiety", "faq": "FAQ", "contact": "Kontakt", "cta": "Wycena 24 h"},
    "en": {"why": "Why us",   "deliverables": "Deliverables",  "audience": "For whom",  "packages": "Packages", "faq": "FAQ", "contact": "Contact", "cta": "Quote in 24 h"},
    "ru": {"why": "Почему",   "deliverables": "Что входит",    "audience": "Кому",       "packages": "Пакеты",   "faq": "FAQ", "contact": "Контакт", "cta": "Расчёт 24 ч"},
    "uk": {"why": "Чому ми",  "deliverables": "Що входить",    "audience": "Кому",       "packages": "Пакети",   "faq": "FAQ", "contact": "Контакт", "cta": "Кошторис 24 год"},
}

HOME_LABEL = {"pl": "Start", "en": "Home", "ru": "Главная", "uk": "Головна"}

CTA_BANNER_TPL = {
    "pl": {"eyebrow": "Gotowi do startu",   "ctaPrimary": "Otrzymaj wycenę w 24 h", "ctaWhatsapp": "Napisz na WhatsApp"},
    "en": {"eyebrow": "Ready to start",     "ctaPrimary": "Get a quote in 24 h",    "ctaWhatsapp": "Message on WhatsApp"},
    "ru": {"eyebrow": "Готовы начать",      "ctaPrimary": "Получить смету за 24 ч", "ctaWhatsapp": "Написать в WhatsApp"},
    "uk": {"eyebrow": "Готові почати",      "ctaPrimary": "Кошторис за 24 год",     "ctaWhatsapp": "Написати у WhatsApp"},
}

CONTACT_TPL = {
    "pl": {"sectionLabel": "Kontakt / Wycena",   "lead": "Zostaw kontakt — odezwiemy się w ciągu 30 minut w godzinach roboczych. Wstępna wycena w 24 h, bez zobowiązań."},
    "en": {"sectionLabel": "Contact / Quote",    "lead": "Drop your contact — we reply within 30 minutes during business hours. Initial quote within 24 h, no strings attached."},
    "ru": {"sectionLabel": "Контакт / Смета",    "lead": "Оставьте контакт — ответим в течение 30 минут в рабочие часы. Предварительная смета за 24 ч, без обязательств."},
    "uk": {"sectionLabel": "Контакт / Кошторис", "lead": "Залиште контакт — відповімо протягом 30 хвилин у робочі години. Попередній кошторис за 24 год, без зобовʼязань."},
}


def build_ns(locale: str, payload: dict) -> dict:
    """Wrap service-specific payload with shared common blocks (nav/trust/etc)."""
    return {
        "meta": payload["meta"],
        "breadcrumbs": {
            "home": HOME_LABEL[locale],
            "current": payload["breadcrumbCurrent"],
        },
        "nav": NAV[locale],
        "hero": payload["hero"],
        "trustStrip": TRUST_STRIP[locale],
        "why": payload["why"],
        "deliverables": payload["deliverables"],
        "audience": payload["audience"],
        "packages": payload["packages"],
        "process": payload["process"],
        "faq": payload["faq"],
        "ctaBanner": {
            **CTA_BANNER_TPL[locale],
            "title": payload["ctaBanner"]["title"],
            "titleItalic": payload["ctaBanner"]["titleItalic"],
            "lead": payload["ctaBanner"]["lead"],
        },
        "contact": {
            "sectionLabel": CONTACT_TPL[locale]["sectionLabel"],
            "title": payload["contactTitle"],
            "titleItalic": payload["contactTitleItalic"],
            "lead": CONTACT_TPL[locale]["lead"],
        },
    }
