#!/usr/bin/env python3
"""
Replaces messages/{locale}.json `services.items` with the canonical 9 services
matching the new landing-page taxonomy. Each entry's `num` is the routing key
used by ServiceLanding/footer to build the link.

001 Real Estate              -> /real-estate
002 Reklama / Commercial     -> /promo
003 Wesela / Wedding         -> /wesela
004 Eventy / Events          -> /eventy
005 FPV / Music video        -> /fpv-teledyski
006 Budownictwo              -> /budownictwo
007 Inspekcje termowizyjne   -> /inspekcje-termowizyjne
008 Inspekcje techniczne     -> /inspekcje-techniczne
009 Ortofotomapy / Pomiary   -> /ortofotomapy-pomiary
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MSG_DIR = ROOT / "messages"

UNSPLASH_BASE = "https://images.unsplash.com"

ITEMS = {
"pl": [
    {"num": "001", "tag": "Real Estate",    "title": "Nieruchomości",          "subtitle": "Mieszkania · Domy · Inwestycje", "desc": "Zdjęcia i wideo z drona dla nieruchomości premium w Warszawie. 360° panoramy, walkthrough-touru, dostawa 48 h.",       "price": "900 PLN",         "alt": "Zdjęcia nieruchomości z drona", "img": "/assets/real-estate-card.jpg",                                                          "feature": True},
    {"num": "002", "tag": "Commercial",     "title": "Reklama z drona",         "subtitle": "TVC · Brand films · Reels",     "desc": "Produkcja spotów reklamowych z drona: TVC, brand films, teledyski, social. ProRes RAW, multi-cam day-rates.",         "price": "2 200 PLN / dzień","alt": "Reklama z drona",                "img": "/assets/promo-card.jpg",                                                                  "feature": True},
    {"num": "003", "tag": "Wedding",         "title": "Wesela",                 "subtitle": "Plener · Ceremonia · First dance","desc": "Cinematic 4K, integracja z Twoim wideografem. Lekki dron, cichy — nie przeszkadza gościom. Highlight 60 s.",        "price": "1 200 PLN",       "alt": "Filmowanie ślubu z drona",        "img": f"{UNSPLASH_BASE}/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "004", "tag": "Events",          "title": "Eventy i koncerty",      "subtitle": "Festiwale · Live · Sport",      "desc": "Live HD-SDI / NDI, multi-cam, FPV, same-day highlight w 24 h. Festiwale, koncerty, sport, konferencje.",              "price": "2 800 PLN / dzień","alt": "Filmowanie eventów dronem",       "img": f"{UNSPLASH_BASE}/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "005", "tag": "FPV",             "title": "Teledyski i FPV",        "subtitle": "Music video · Avata 2 · Cinema","desc": "DJI Avata 2 cinematic FPV, ProRes RAW, choreografia lotu. Music video, brand cinema, kampanie sportowe.",            "price": "3 200 PLN / dzień","alt": "FPV dron Avata 2",                "img": f"{UNSPLASH_BASE}/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=80",      "feature": False},
    {"num": "006", "tag": "Construction",   "title": "Monitoring budowy",      "subtitle": "RTK · Ortofotomapy · Timelapse",  "desc": "Drony RTK 2-3 cm dokładność, ortofotomapy w PL-2000, raporty bankowe. Abonament miesięczny dla deweloperów.",        "price": "900 PLN / wizyta", "alt": "Monitoring budowy dronem",        "img": f"{UNSPLASH_BASE}/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",         "feature": False},
    {"num": "007", "tag": "Thermography",    "title": "Inspekcje termowizyjne", "subtitle": "Fotowoltaika · Dachy · Izolacja","desc": "Termowizja PV z kamerą DJI H20T, raport PDF z hot-spotami GPS wg IEC TS 62446-3. Akceptowane przez UDT i banki.",  "price": "790 PLN",          "alt": "Termowizja z drona",              "img": f"{UNSPLASH_BASE}/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "008", "tag": "Inspection",      "title": "Inspekcje techniczne",   "subtitle": "Dachy · Kominy · Mosty",          "desc": "Inspekcja wizualna 4K + zoom 23x: dachy, kominy, mosty, linie energetyczne, wieże. Raport PDF z lokalizacją defektów.","price": "650 PLN",         "alt": "Inspekcja dachu dronem",          "img": f"{UNSPLASH_BASE}/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "009", "tag": "Surveying",       "title": "Ortofotomapy i pomiary","subtitle": "RTK · PL-2000 · Fotogrametria",    "desc": "Ortofotomapy 2-3 cm w układzie PL-2000, modele 3D, chmury punktów LAS. Dla geodetów i projektantów.",                  "price": "950 PLN",         "alt": "Ortofotomapa z drona",            "img": f"{UNSPLASH_BASE}/photo-1577086664693-894d8405334a?auto=format&fit=crop&w=1200&q=80",      "feature": False},
],
"en": [
    {"num": "001", "tag": "Real Estate",    "title": "Real estate",            "subtitle": "Apartments · Houses · Developments","desc": "Aerial photo and video for premium Warsaw real estate. 360° panoramas, walkthroughs, 48-h delivery.",                "price": "900 PLN",         "alt": "Aerial real estate photography",  "img": "/assets/real-estate-card.jpg",                                                          "feature": True},
    {"num": "002", "tag": "Commercial",     "title": "Drone commercials",       "subtitle": "TVC · Brand films · Reels",       "desc": "TVC, brand films, music videos and social-cut commercials from a drone. ProRes RAW, multi-cam day-rates.",          "price": "2 200 PLN / day", "alt": "Drone commercial production",     "img": "/assets/promo-card.jpg",                                                                  "feature": True},
    {"num": "003", "tag": "Wedding",         "title": "Weddings",               "subtitle": "Portraits · Ceremony · First dance","desc": "Cinematic 4K, full integration with your videographer. Lightweight, quiet drone — guests barely notice.",        "price": "1 200 PLN",       "alt": "Drone wedding videography",       "img": f"{UNSPLASH_BASE}/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "004", "tag": "Events",          "title": "Events & concerts",      "subtitle": "Festivals · Live · Sports",       "desc": "Live HD-SDI / NDI, multi-cam, FPV, same-day highlight in 24 h. Festivals, concerts, sport, conferences.",            "price": "2 800 PLN / day", "alt": "Event drone coverage",            "img": f"{UNSPLASH_BASE}/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "005", "tag": "FPV",             "title": "Music videos & FPV",      "subtitle": "Music video · Avata 2 · Cinema",  "desc": "DJI Avata 2 cinematic FPV, ProRes RAW, choreographed flight. Music videos, brand cinema, sports campaigns.",        "price": "3 200 PLN / day", "alt": "FPV drone Avata 2",                "img": f"{UNSPLASH_BASE}/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=80",      "feature": False},
    {"num": "006", "tag": "Construction",   "title": "Construction monitoring", "subtitle": "RTK · Orthophoto · Timelapse",     "desc": "RTK drones at 2-3 cm accuracy, PL-2000 orthophotos, bank-grade reports. Monthly subscription for developers.",      "price": "900 PLN / visit", "alt": "Construction drone monitoring",   "img": f"{UNSPLASH_BASE}/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",         "feature": False},
    {"num": "007", "tag": "Thermography",    "title": "Thermal inspections",    "subtitle": "PV · Roofs · Insulation",          "desc": "PV thermography with DJI H20T, PDF report with GPS hot-spots per IEC TS 62446-3. Accepted by UDT and banks.",         "price": "790 PLN",         "alt": "Drone thermal inspection",        "img": f"{UNSPLASH_BASE}/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "008", "tag": "Inspection",      "title": "Technical inspections",  "subtitle": "Roofs · Chimneys · Bridges",       "desc": "Visual inspection 4K + 23x zoom: roofs, chimneys, bridges, power lines, towers. PDF report with GPS defect location.","price": "650 PLN",         "alt": "Drone roof inspection",            "img": f"{UNSPLASH_BASE}/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "009", "tag": "Surveying",       "title": "Orthophotos & surveys",  "subtitle": "RTK · PL-2000 · Photogrammetry",    "desc": "Orthophoto maps at 2-3 cm in PL-2000, 3D models, LAS point clouds. For surveyors and designers.",                     "price": "950 PLN",         "alt": "Drone orthophoto map",             "img": f"{UNSPLASH_BASE}/photo-1577086664693-894d8405334a?auto=format&fit=crop&w=1200&q=80",      "feature": False},
],
"ru": [
    {"num": "001", "tag": "Real Estate",    "title": "Недвижимость",           "subtitle": "Квартиры · Дома · Девелопмент",   "desc": "Аэрофото и видео для премиум-недвижимости Варшавы. 360° панорамы, walkthrough-туры, доставка 48 ч.",                "price": "900 PLN",         "alt": "Аэрофото недвижимости",            "img": "/assets/real-estate-card.jpg",                                                          "feature": True},
    {"num": "002", "tag": "Commercial",     "title": "Рекламные ролики",        "subtitle": "TVC · Brand films · Reels",       "desc": "Производство рекламных роликов с дрона: TVC, brand films, клипы, social. ProRes RAW, multi-cam day-rates.",        "price": "2 200 PLN / день","alt": "Реклама с дрона",                  "img": "/assets/promo-card.jpg",                                                                  "feature": True},
    {"num": "003", "tag": "Wedding",         "title": "Свадьбы",                "subtitle": "Пленэр · Церемония · Первый танец","desc": "Cinematic 4K, интеграция с вашим видеографом. Лёгкий тихий дрон — гости не заметят. Highlight 60 с.",             "price": "1 200 PLN",       "alt": "Свадебная аэросъёмка",             "img": f"{UNSPLASH_BASE}/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "004", "tag": "Events",          "title": "События и концерты",     "subtitle": "Фестивали · Live · Спорт",        "desc": "Live HD-SDI / NDI, multi-cam, FPV, same-day highlight за 24 ч. Фестивали, концерты, спорт, конференции.",          "price": "2 800 PLN / день","alt": "Съёмка событий дроном",            "img": f"{UNSPLASH_BASE}/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "005", "tag": "FPV",             "title": "Клипы и FPV",            "subtitle": "Music video · Avata 2 · Cinema",  "desc": "DJI Avata 2 cinematic FPV, ProRes RAW, хореография полёта. Music video, brand cinema, спортивные кампании.",       "price": "3 200 PLN / день","alt": "FPV дрон Avata 2",                  "img": f"{UNSPLASH_BASE}/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=80",      "feature": False},
    {"num": "006", "tag": "Construction",   "title": "Мониторинг стройки",     "subtitle": "RTK · Ортофото · Timelapse",       "desc": "RTK-дроны 2-3 см точность, ортофотомапы PL-2000, банковские отчёты. Ежемесячный абонемент для девелоперов.",      "price": "900 PLN / визит", "alt": "Мониторинг стройки дроном",        "img": f"{UNSPLASH_BASE}/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",         "feature": False},
    {"num": "007", "tag": "Thermography",    "title": "Термовизия",             "subtitle": "PV · Крыши · Изоляция",            "desc": "Термовизия PV камерой DJI H20T, PDF-отчёт с GPS hot-spot по IEC TS 62446-3. Принимается UDT и банками.",            "price": "790 PLN",         "alt": "Тепловизионная инспекция",         "img": f"{UNSPLASH_BASE}/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "008", "tag": "Inspection",      "title": "Технические инспекции",  "subtitle": "Крыши · Дымоходы · Мосты",         "desc": "Визуальная инспекция 4K + zoom 23x: крыши, дымоходы, мосты, ЛЭП, вышки. PDF-отчёт с GPS дефектов.",                "price": "650 PLN",         "alt": "Инспекция крыши дроном",           "img": f"{UNSPLASH_BASE}/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "009", "tag": "Surveying",       "title": "Ортофотомапы и обмер",   "subtitle": "RTK · PL-2000 · Фотограмметрия",   "desc": "Ортофотомапы 2-3 см в PL-2000, 3D-модели, облака точек LAS. Для геодезистов и проектировщиков.",                     "price": "950 PLN",         "alt": "Ортофотомапа с дрона",             "img": f"{UNSPLASH_BASE}/photo-1577086664693-894d8405334a?auto=format&fit=crop&w=1200&q=80",      "feature": False},
],
"uk": [
    {"num": "001", "tag": "Real Estate",    "title": "Нерухомість",            "subtitle": "Квартири · Будинки · Девелопмент","desc": "Аерофото та відео для премʼюм-нерухомості Варшави. 360° панорами, walkthrough-тури, доставка 48 год.",              "price": "900 PLN",         "alt": "Аерофото нерухомості",             "img": "/assets/real-estate-card.jpg",                                                          "feature": True},
    {"num": "002", "tag": "Commercial",     "title": "Рекламні ролики",         "subtitle": "TVC · Brand films · Reels",       "desc": "Виробництво рекламних роликів з дрона: TVC, brand films, кліпи, social. ProRes RAW, multi-cam day-rates.",         "price": "2 200 PLN / день","alt": "Реклама з дрона",                  "img": "/assets/promo-card.jpg",                                                                  "feature": True},
    {"num": "003", "tag": "Wedding",         "title": "Весілля",                "subtitle": "Пленер · Церемонія · Перший танець","desc": "Cinematic 4K, інтеграція з вашим відеографом. Легкий тихий дрон — гості не помітять. Highlight 60 с.",          "price": "1 200 PLN",       "alt": "Весільна аерозйомка",              "img": f"{UNSPLASH_BASE}/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "004", "tag": "Events",          "title": "Події та концерти",      "subtitle": "Фестивалі · Live · Спорт",        "desc": "Live HD-SDI / NDI, multi-cam, FPV, same-day highlight за 24 год. Фестивалі, концерти, спорт, конференції.",        "price": "2 800 PLN / день","alt": "Зйомка подій дроном",              "img": f"{UNSPLASH_BASE}/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "005", "tag": "FPV",             "title": "Кліпи та FPV",           "subtitle": "Music video · Avata 2 · Cinema",  "desc": "DJI Avata 2 cinematic FPV, ProRes RAW, хореографія польоту. Music video, brand cinema, спортивні кампанії.",       "price": "3 200 PLN / день","alt": "FPV дрон Avata 2",                  "img": f"{UNSPLASH_BASE}/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=80",      "feature": False},
    {"num": "006", "tag": "Construction",   "title": "Моніторинг будівництва", "subtitle": "RTK · Ортофото · Timelapse",       "desc": "RTK-дрони 2-3 см точність, ортофотомапи PL-2000, банківські звіти. Щомісячний абонемент для девелоперів.",        "price": "900 PLN / виїзд", "alt": "Моніторинг будівництва дроном",   "img": f"{UNSPLASH_BASE}/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",         "feature": False},
    {"num": "007", "tag": "Thermography",    "title": "Термовізія",             "subtitle": "PV · Дахи · Ізоляція",             "desc": "Термовізія PV камерою DJI H20T, PDF-звіт з GPS hot-spot за IEC TS 62446-3. Приймається UDT та банками.",            "price": "790 PLN",         "alt": "Тепловізійна інспекція",           "img": f"{UNSPLASH_BASE}/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "008", "tag": "Inspection",      "title": "Технічні інспекції",     "subtitle": "Дахи · Димарі · Мости",            "desc": "Візуальна інспекція 4K + zoom 23x: дахи, димарі, мости, ЛЕП, вежі. PDF-звіт з GPS дефектів.",                       "price": "650 PLN",         "alt": "Інспекція даху дроном",            "img": f"{UNSPLASH_BASE}/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",      "feature": False},
    {"num": "009", "tag": "Surveying",       "title": "Ортофотомапи та обмір",  "subtitle": "RTK · PL-2000 · Фотограмметрія",   "desc": "Ортофотомапи 2-3 см у PL-2000, 3D-моделі, хмари точок LAS. Для геодезистів та проєктувальників.",                   "price": "950 PLN",         "alt": "Ортофотомапа з дрона",             "img": f"{UNSPLASH_BASE}/photo-1577086664693-894d8405334a?auto=format&fit=crop&w=1200&q=80",      "feature": False},
],
}

def main() -> None:
    for locale, items in ITEMS.items():
        path = MSG_DIR / f"{locale}.json"
        with path.open("r", encoding="utf-8") as f:
            data = json.load(f)
        data["services"]["items"] = items
        with path.open("w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"  updated {path.name}: services.items = {len(items)} entries")
    print("Done.")


if __name__ == "__main__":
    main()
