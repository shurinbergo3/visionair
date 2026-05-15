"""Event, concert and festival drone coverage + live streaming — i18n payload."""

SLUG = "eventy"

DATA = {
"pl": {
    "meta": {
        "title": "Filmowanie eventów dronem Warszawa — VisionAir | Live HD-SDI/NDI",
        "description": "Filmowanie eventów, koncertów, festiwali i sportu dronem w Warszawie. Live streaming HD-SDI / NDI, multi-cam, FPV, highlight w 24 h. EASA, OC Compensa, zgody CTR EPWA. Wycena 24 h.",
        "keywords": "filmowanie eventów dronem Warszawa, dron na koncert, transmisja live z drona, livestream dron, festiwal dron, dron sportowy, multi-cam dron",
        "ogTitle": "Filmowanie eventów z drona — VisionAir Warsaw",
        "ogDescription": "Live streaming HD-SDI/NDI, multi-cam, FPV i highlight 24 h dla koncertów, festiwali i sportu.",
        "ogImageAlt": "Ujęcie z drona koncertu pod sceną w Warszawie",
        "schemaServiceType": "Aerial event coverage and live streaming",
        "schemaDescription": "Filmowanie eventów dronem w Warszawie i całej Polsce: koncerty, festiwale, sport, eventy korporacyjne. Live HD-SDI / NDI, multi-cam, FPV, EASA, OC Compensa VIG."
    },
    "breadcrumbCurrent": "Filmowanie eventów dronem",
    "hero": {
        "eyebrow": "Warszawa · Polska · Europa",
        "h1": ["Eventy z drona", "i live streaming"],
        "sub": "Multi-cam dron, transmisja live HD-SDI / NDI do reżyserki, FPV dla dynamiki, highlight w 24 h. <strong>Koncerty · festiwale · sport · konferencje</strong>. EASA, OC, zgody CTR po naszej stronie.",
        "ctaPrimary": "Sprawdź pakiety",
        "ctaGhost": "Zobacz cennik",
        "meta": {"objectsKey": "format eventu", "objectsValue": "1-3 dni", "deliveryKey": "highlight", "deliveryValue": "24 h", "ratingKey": "transmisja", "ratingValue": "HD-SDI / NDI", "permitsKey": "zgody i OC", "permitsValue": "po naszej stronie"}
    },
    "why": {
        "sectionLabel": "001 / Dlaczego dron na evencie",
        "title": "Dron, który podaje sygnał",
        "titleItalic": "prosto do reżyserki",
        "lead": "Większość firm dronowych zrobi Ci jedynie nagranie offline. My podajemy sygnał HD-SDI / NDI live, masz dron jako pełnoprawną kamerę w mixie obok kamer naziemnych.",
        "body1": "Latamy parami: DJI Mini 4 Pro do szerokich panoram i Avata 2 FPV do dynamicznych ujęć w tłumie. Dwa zestawy oznaczają zero przerw na wymianę baterii — sygnał idzie nieprzerwanie.",
        "body2": "Same-day highlight 60-90 sekund dostajesz w 24 h od eventu — gotowy do publikacji na Reels, TikTok i Stories, w pionie i poziomie. Surowe pliki 4K — w 5 dni.",
        "stats": [
            {"v": "2",   "k": "drony równolegle",     "small": ""},
            {"v": "NDI", "k": "live do reżyserki",    "small": ""},
            {"v": "24",  "k": "godzin do highlight",  "small": " h"},
            {"v": "FPV", "k": "Avata 2 cinematic",    "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Co dostajesz",
        "title": "Live, highlight",
        "titleItalic": "i pełne archiwum",
        "lead": "Trzy warstwy dostaw: sygnał live podczas eventu, highlight do social mediów w 24 h, pełne archiwum 4K w 5 dni.",
        "items": [
            {"tag": "Live",       "title": "HD-SDI / NDI live",         "desc": "Sygnał z drona prosto do reżyserki TV lub mixera streamingowego. Latencja < 80 ms."},
            {"tag": "Multi-cam",  "title": "2 drony + FPV",             "desc": "Dwa zestawy: DJI Mini 4 Pro do szerokich panoram + Avata 2 FPV do ujęć w tłumie."},
            {"tag": "Highlight",  "title": "Same-day clip 60-90 s",     "desc": "Gotowy clip z muzyką w 24 h od eventu. Format 9:16 + 16:9 + 1:1 pod social."},
            {"tag": "Archiwum",   "title": "4K Cinematic raw",          "desc": "Pełne archiwum w 4K D-Log M, do montażu aftermovie lub use w przyszłych kampaniach."},
            {"tag": "Foto",       "title": "Zdjęcia z drona 24 Mpx",    "desc": "100-200 zdjęć w wysokiej rozdzielczości: panoramy 360°, top-down, zdjęcia VIP."},
            {"tag": "Nocne loty", "title": "STS-02 BVLOS, loty nocne",  "desc": "Latamy po zachodzie słońca i w sektorach BVLOS — koncerty, festiwale, oświetlone areny."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Dla kogo",
        "title": "Koncerty, festiwale",
        "titleItalic": "sport i konferencje",
        "lead": "Zlecenia dzielą się głównie między event agencje, organizatorów festiwali, firmy produkcji TV i sponsorów sportowych.",
        "items": [
            {"name": "Event agencja",      "sub": "Koncerty, gale, eventy firmowe pod klucz"},
            {"name": "Organizator festiwalu","sub": "Aftermovie, real-time content, sygnał na ekrany"},
            {"name": "Produkcja TV",       "sub": "HD-SDI do wozu transmisyjnego, multi-cam"},
            {"name": "Sponsor sportowy",   "sub": "Maratony, kolarstwo, sporty wodne, motorsport"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Pakiety",
        "title": "Trzy pakiety eventowe,",
        "titleItalic": "skalowane od jednodniowych",
        "lead": "Każdy pakiet to ostateczna cena za dzień. Dla wieloletnich kontraktów festiwali — indywidualne warunki.",
        "items": [
            {"name": "EVENT",     "tagline": "1 dzień, 1 dron",            "price": "2 800 PLN", "sub": "/ dzień",   "list": ["1 dron 4K Cinematic", "Do 6 h pracy", "Highlight 60 s w 24 h", "Surowe 4K 60p", "Zgody i OC w cenie"], "featured": False},
            {"name": "MULTI-CAM", "tagline": "1 dzień, 2 drony + FPV",     "price": "4 800 PLN", "sub": "/ dzień",   "list": ["2 drony równolegle", "Avata 2 FPV cinematic", "Do 8 h pracy", "Highlight 90 s w 24 h", "Zdjęcia 100+ kadrów", "Zgody, OC, STS-02"], "featured": True},
            {"name": "LIVE",      "tagline": "Live HD-SDI / NDI",          "price": "od 6 500 PLN","sub": "/ dzień",   "list": ["Sygnał live do reżyserki", "1-2 drony + technik", "HD-SDI / NDI / wozu TX", "Pełne archiwum 4K", "Aftermovie 2-3 min"], "featured": False}
        ],
        "selectCta": "Wybierz pakiet",
        "note": "Festiwale wielodniowe i tournée — cennik na zapytanie, faktura VAT B2B."
    },
    "process": {
        "sectionLabel": "005 / Proces",
        "title": "Od umowy",
        "titleItalic": "do live transmisji",
        "lead": "Eventy są nieprzesuwalne, więc proces jest twardo zaplanowany na 5 kroków.",
        "steps": [
            {"n": "01", "title": "Brief i scenariusz",   "body": "Harmonogram eventu co do 15 minut, lista ujęć, integracja z reżyserią TV jeśli live.",                          "dur": "3-7 dni"},
            {"n": "02", "title": "Zgody, STS, OC",       "body": "Składamy wniosek do PAŻP, w razie BVLOS — STS-02, polisa Compensa rozszerzona o ryzyko widowni.",              "dur": "7-21 dni"},
            {"n": "03", "title": "Day-of",               "body": "Przyjazd 2 h wcześniej, test sygnału NDI / HD-SDI, kalibracja kolorów z kamerami naziemnymi.",                  "dur": "2 h"},
            {"n": "04", "title": "Highlight w 24 h",     "body": "Same-day edit 60-90 s z eventu, montaż, korekcja kolorów, format social. Dostawa rano dnia następnego.",      "dur": "24 h"},
            {"n": "05", "title": "Archiwum 4K",          "body": "Pełne pliki D-Log M na dysku, opcjonalnie aftermovie 2-3 minuty.",                                                "dur": "5 dni"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Najczęstsze pytania",
        "titleItalic": "organizatorów",
        "lead": "Pełna techniczna dokumentacja, polisy OC i certyfikaty — wysyłamy PDF na żądanie.",
        "items": [
            {"q": "Czy macie polisę OC pokrywającą ryzyko widowni?",   "a": "Tak, polisa Compensa Vienna Insurance Group z sumą gwarancyjną do 5 mln PLN, pokrywa ryzyko osób trzecich w tłumie. Kopię polisy wysyłamy z umową."},
            {"q": "Jak dostarczacie sygnał do naszej reżyserki?",       "a": "Najczęściej NDI po sieci LAN lub HD-SDI po kablu BNC. Mamy własny LiveU / Teradek encoder, podajemy sygnał z latencją < 80 ms. Możemy też dawać RTMP do streamera."},
            {"q": "Czy latacie w nocy i nad tłumem?",                  "a": "Tak. Mamy STS-02 BVLOS i zgodę na loty nocne. Nad tłumem latamy w kategorii specjalnej z osobnym wnioskiem do ULC, dystans i prędkość ograniczone."},
            {"q": "Co jeśli event się przeciąga?",                     "a": "Każda dodatkowa godzina ponad pakiet — 350 PLN/h dla EVENT, 500 PLN/h dla MULTI-CAM. Bez naliczania za czekanie między blokami."},
            {"q": "Macie własne baterie i co z czasem lotu?",          "a": "Mamy 12 baterii na każdy dron, ładujemy stacją 100 W na miejscu. Efektywny czas lotu — 25-30 minut, wymiana baterii w 60 sekund, bez przerw w sygnale."},
            {"q": "Czy współpracujecie z firmami produkcyjnymi TV?",   "a": "Tak, regularnie. Mamy doświadczenie z TVN, Polsat Music, Aston Martin Racing, Red Bull. NDA i faktura VAT B2B — standard."}
        ],
        "askMore": "Zadaj inne pytanie"
    },
    "ctaBanner": {"title": "Macie datę eventu?", "titleItalic": "Sprawdźmy logistykę", "lead": "Eventy z transmisją live wymagają minimum 21 dni na zgody. Im wcześniej napiszesz, tym pewniej."},
    "contactTitle": "Porozmawiajmy",
    "contactTitleItalic": "o Twoim evencie"
},
"en": {
    "meta": {
        "title": "Event Drone Coverage Warsaw — VisionAir | Live HD-SDI/NDI",
        "description": "Drone coverage of events, concerts, festivals and sports in Warsaw and across Poland. Live HD-SDI/NDI streaming, multi-cam, FPV, 24-h highlight. EASA, Compensa insurance. Quote in 24 h.",
        "keywords": "drone event coverage Warsaw, concert drone Poland, festival drone, live drone streaming, NDI drone, FPV event Warsaw, sports drone",
        "ogTitle": "Event Drone Coverage — VisionAir Warsaw",
        "ogDescription": "Live HD-SDI/NDI streaming, multi-cam, FPV and 24-h highlight for concerts, festivals and sports.",
        "ogImageAlt": "Aerial drone shot of a concert crowd in Warsaw",
        "schemaServiceType": "Aerial event coverage and live streaming",
        "schemaDescription": "Drone coverage for events in Warsaw and Poland: concerts, festivals, sports, corporate events. Live HD-SDI/NDI, multi-cam, FPV, EASA, Compensa VIG insurance."
    },
    "breadcrumbCurrent": "Event Drone Coverage",
    "hero": {
        "eyebrow": "Warsaw · Poland · Europe",
        "h1": ["Event drone coverage", "and live streaming"],
        "sub": "Multi-cam drone, live HD-SDI/NDI feed to your gallery, FPV for dynamics, highlight in 24 h. <strong>Concerts · festivals · sports · conferences</strong>. EASA, insured, CTR permits on us.",
        "ctaPrimary": "See packages",
        "ctaGhost": "View pricing",
        "meta": {"objectsKey": "event format", "objectsValue": "1-3 days", "deliveryKey": "highlight", "deliveryValue": "24 h", "ratingKey": "live feed", "ratingValue": "HD-SDI / NDI", "permitsKey": "permits & ins.", "permitsValue": "on us"}
    },
    "why": {
        "sectionLabel": "001 / Why drone on events",
        "title": "A drone that feeds",
        "titleItalic": "straight into your gallery",
        "lead": "Most drone vendors only deliver offline footage. We hand you a live HD-SDI/NDI feed — your drone becomes a full camera in the mix.",
        "body1": "We fly in pairs: DJI Mini 4 Pro for wide panoramas, Avata 2 FPV for dynamic crowd shots. Two rigs means zero downtime for battery swaps — the feed never breaks.",
        "body2": "Same-day 60-90 second highlight ready 24 h after the event, formatted for Reels, TikTok and Stories. Raw 4K archive in 5 days.",
        "stats": [
            {"v": "2",   "k": "drones in parallel",    "small": ""},
            {"v": "NDI", "k": "live to gallery",       "small": ""},
            {"v": "24",  "k": "h to highlight",        "small": " h"},
            {"v": "FPV", "k": "Avata 2 cinematic",     "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / What you get",
        "title": "Live, highlight",
        "titleItalic": "and full archive",
        "lead": "Three layers: live feed during the event, social-ready highlight in 24 h, full 4K archive in 5 days.",
        "items": [
            {"tag": "Live",      "title": "HD-SDI / NDI live feed",      "desc": "Direct feed into your TV gallery or streaming mixer. Latency under 80 ms."},
            {"tag": "Multi-cam", "title": "2 drones + FPV",              "desc": "Two rigs: DJI Mini 4 Pro for wide panoramas + Avata 2 FPV for crowd shots."},
            {"tag": "Highlight", "title": "Same-day 60-90 s clip",       "desc": "Music-cut clip ready 24 h after the event. 9:16, 16:9 and 1:1 social formats."},
            {"tag": "Archive",   "title": "4K Cinematic raw",            "desc": "Full archive in 4K D-Log M for aftermovie editing or future campaigns."},
            {"tag": "Stills",    "title": "24 MP drone stills",          "desc": "100-200 high-res frames: 360° panoramas, top-downs, VIP coverage."},
            {"tag": "Night ops", "title": "STS-02 BVLOS, night flights", "desc": "We fly after sunset and in BVLOS — concerts, festivals, lit arenas."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / For whom",
        "title": "Concerts, festivals,",
        "titleItalic": "sports and conferences",
        "lead": "Bookings split mainly between event agencies, festival organisers, TV production houses and sports sponsors.",
        "items": [
            {"name": "Event agency",       "sub": "Concerts, galas, corporate events end-to-end"},
            {"name": "Festival organiser", "sub": "Aftermovie, real-time content, screen feed"},
            {"name": "TV production",      "sub": "HD-SDI into the OB truck, multi-cam mix"},
            {"name": "Sports sponsor",     "sub": "Marathons, cycling, watersports, motorsport"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Packages",
        "title": "Three event packages,",
        "titleItalic": "from one-day to live",
        "lead": "Each package is a final per-day price. Multi-year festival contracts — bespoke terms.",
        "items": [
            {"name": "EVENT",     "tagline": "1 day, 1 drone",            "price": "2 800 PLN", "sub": "/ day",  "list": ["1 drone 4K Cinematic", "Up to 6 h work", "60-s highlight in 24 h", "Raw 4K 60p", "Permits & insurance included"], "featured": False},
            {"name": "MULTI-CAM", "tagline": "1 day, 2 drones + FPV",     "price": "4 800 PLN", "sub": "/ day",  "list": ["2 drones in parallel", "Avata 2 FPV cinematic", "Up to 8 h work", "90-s highlight in 24 h", "100+ drone stills", "Permits, insurance, STS-02"], "featured": True},
            {"name": "LIVE",      "tagline": "Live HD-SDI / NDI",         "price": "from 6 500 PLN","sub": "/ day","list": ["Live feed to your gallery", "1-2 drones + technician", "HD-SDI / NDI / OB truck", "Full 4K archive", "Aftermovie 2-3 min"], "featured": False}
        ],
        "selectCta": "Choose package",
        "note": "Multi-day festivals and tours — quote on request, VAT B2B invoice."
    },
    "process": {
        "sectionLabel": "005 / Process",
        "title": "From contract",
        "titleItalic": "to live broadcast",
        "lead": "Events don't reschedule, so the process is locked into 5 steps.",
        "steps": [
            {"n": "01", "title": "Brief and runsheet",  "body": "Event schedule down to 15-minute slots, shot list, integration with TV directing if live.",                          "dur": "3-7 days"},
            {"n": "02", "title": "Permits, STS, insurance","body": "PAŻP application, BVLOS-grade STS-02 if needed, Compensa policy extended to spectator liability.",              "dur": "7-21 days"},
            {"n": "03", "title": "Day-of",              "body": "On site 2 h before, NDI / HD-SDI signal test, colour-match with ground cameras.",                                    "dur": "2 h"},
            {"n": "04", "title": "Highlight in 24 h",   "body": "Same-day 60-90 s edit, colour, social format. Delivered the morning after.",                                        "dur": "24 h"},
            {"n": "05", "title": "4K archive",          "body": "Full D-Log M files on a drive, optional 2-3 min aftermovie.",                                                       "dur": "5 days"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Organiser questions",
        "titleItalic": "answered",
        "lead": "Full technical docs, liability policies and certificates — PDF on request.",
        "items": [
            {"q": "Do you carry liability covering the crowd?",            "a": "Yes — Compensa Vienna Insurance Group with cover up to 5 M PLN, third-party in crowds included. Policy PDF shared with the contract."},
            {"q": "How do you feed our gallery?",                          "a": "NDI over LAN or HD-SDI over BNC. We bring our own LiveU/Teradek encoder, sub-80 ms latency. RTMP to your streamer also possible."},
            {"q": "Do you fly at night and over crowds?",                  "a": "Yes. We hold STS-02 BVLOS and night-flight clearance. Crowd overflight is filed as a special-category mission with ULC; distance and speed are constrained."},
            {"q": "What if the event runs long?",                          "a": "Each extra hour above package — 350 PLN/h for EVENT, 500 PLN/h for MULTI-CAM. No charge for downtime between blocks."},
            {"q": "Do you have enough batteries?",                         "a": "12 batteries per drone, 100 W on-site charging station. Effective flight time 25-30 min with 60-second swaps — feed never breaks."},
            {"q": "Do you work with TV production houses?",                "a": "Yes, regularly. Past collabs: TVN, Polsat Music, Aston Martin Racing, Red Bull. NDA + VAT B2B invoice — default."}
        ],
        "askMore": "Ask another question"
    },
    "ctaBanner": {"title": "Got an event date?", "titleItalic": "Let's plan logistics", "lead": "Events with live broadcast need 21+ days for permits. Earlier is safer."},
    "contactTitle": "Let's talk",
    "contactTitleItalic": "about your event"
},
"ru": {
    "meta": {
        "title": "Съёмка событий дроном Варшава — VisionAir | Live HD-SDI/NDI",
        "description": "Съёмка концертов, фестивалей, спорта и корпоративных событий дроном в Варшаве и по Польше. Live HD-SDI/NDI, multi-cam, FPV, highlight за 24 часа. EASA, страховка Compensa. Смета за 24 часа.",
        "keywords": "съёмка событий дроном Варшава, дрон на концерт, прямая трансляция с дрона, фестиваль дрон, NDI дрон, FPV ивент Варшава",
        "ogTitle": "Съёмка событий с дрона — VisionAir Warsaw",
        "ogDescription": "Live HD-SDI/NDI, multi-cam, FPV и highlight 24 ч для концертов, фестивалей и спорта.",
        "ogImageAlt": "Аэросъёмка концерта в Варшаве",
        "schemaServiceType": "Aerial event coverage and live streaming",
        "schemaDescription": "Съёмка событий дроном в Варшаве и Польше: концерты, фестивали, спорт, корпоративы. Live HD-SDI/NDI, multi-cam, FPV, EASA, страховка Compensa VIG."
    },
    "breadcrumbCurrent": "Съёмка событий с дрона",
    "hero": {
        "eyebrow": "Варшава · Польша · Европа",
        "h1": ["События с дрона", "и live трансляция"],
        "sub": "Multi-cam дрон, прямая трансляция HD-SDI/NDI в режиссёрскую, FPV для динамики, highlight за 24 часа. <strong>Концерты · фестивали · спорт · конференции</strong>. EASA, страховка, разрешения за нас.",
        "ctaPrimary": "Смотреть пакеты",
        "ctaGhost": "Открыть цены",
        "meta": {"objectsKey": "формат", "objectsValue": "1-3 дня", "deliveryKey": "highlight", "deliveryValue": "24 ч", "ratingKey": "сигнал", "ratingValue": "HD-SDI / NDI", "permitsKey": "разрешения", "permitsValue": "на нас"}
    },
    "why": {
        "sectionLabel": "001 / Зачем дрон на событии",
        "title": "Дрон, который подаёт сигнал",
        "titleItalic": "прямо в режиссёрскую",
        "lead": "Большинство дрон-команд отдадут вам только офлайн-запись. Мы подаём HD-SDI/NDI сигнал live — дрон становится полноценной камерой в миксе наравне с наземными.",
        "body1": "Летаем парами: DJI Mini 4 Pro для широких панорам и Avata 2 FPV для динамики в толпе. Две машины — нулевой простой на смену батарей, сигнал не прерывается.",
        "body2": "Same-day highlight 60-90 секунд готов через 24 часа после события, под Reels, TikTok и Stories. Сырое 4K — за 5 дней.",
        "stats": [
            {"v": "2",   "k": "дрона параллельно",     "small": ""},
            {"v": "NDI", "k": "live в режиссёрскую",   "small": ""},
            {"v": "24",  "k": "часа до highlight",     "small": " ч"},
            {"v": "FPV", "k": "Avata 2 cinematic",     "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Что входит",
        "title": "Live, highlight",
        "titleItalic": "и полный архив",
        "lead": "Три слоя: live-сигнал во время события, highlight для соцсетей через 24 часа, полный архив 4K через 5 дней.",
        "items": [
            {"tag": "Live",       "title": "HD-SDI / NDI live",            "desc": "Сигнал прямо в ТВ-режиссёрскую или стрим-микшер. Задержка < 80 мс."},
            {"tag": "Multi-cam",  "title": "2 дрона + FPV",                "desc": "Две машины: DJI Mini 4 Pro для широких планов + Avata 2 FPV для толпы."},
            {"tag": "Highlight",  "title": "Same-day клип 60-90 с",        "desc": "Готовый клип с музыкой через 24 часа. Форматы 9:16, 16:9, 1:1."},
            {"tag": "Архив",      "title": "4K Cinematic raw",             "desc": "Полный архив в 4K D-Log M для afterMovie или будущих кампаний."},
            {"tag": "Фото",       "title": "Фото с дрона 24 Мп",           "desc": "100-200 кадров высокого разрешения: панорамы 360°, top-down, VIP."},
            {"tag": "Ночные",     "title": "STS-02 BVLOS, ночные полёты",  "desc": "Летаем после захода солнца и в BVLOS — концерты, фестивали, арены."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Для кого",
        "title": "Концерты, фестивали,",
        "titleItalic": "спорт и конференции",
        "lead": "Основные клиенты — ивент-агентства, организаторы фестивалей, ТВ-продакшены и спортивные спонсоры.",
        "items": [
            {"name": "Ивент-агентство",         "sub": "Концерты, гала, корпоративы под ключ"},
            {"name": "Организатор фестиваля",   "sub": "Aftermovie, real-time контент, на экраны"},
            {"name": "ТВ-продакшн",             "sub": "HD-SDI в ПТС, multi-cam микс"},
            {"name": "Спортивный спонсор",      "sub": "Марафоны, велогонки, водный, motorsport"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Пакеты",
        "title": "Три пакета,",
        "titleItalic": "от одного дня до live",
        "lead": "Каждый пакет — конечная цена за день. Многолетние контракты фестивалей — индивидуальные условия.",
        "items": [
            {"name": "EVENT",     "tagline": "1 день, 1 дрон",            "price": "2 800 PLN", "sub": "/ день", "list": ["1 дрон 4K Cinematic", "До 6 часов работы", "Highlight 60 с за 24 ч", "Сырое 4K 60p", "Разрешения и страховка"], "featured": False},
            {"name": "MULTI-CAM", "tagline": "1 день, 2 дрона + FPV",     "price": "4 800 PLN", "sub": "/ день", "list": ["2 дрона параллельно", "Avata 2 FPV cinematic", "До 8 часов работы", "Highlight 90 с за 24 ч", "100+ фото с дрона", "Разрешения, страховка, STS-02"], "featured": True},
            {"name": "LIVE",      "tagline": "Live HD-SDI / NDI",         "price": "от 6 500 PLN","sub": "/ день","list": ["Live в режиссёрскую", "1-2 дрона + техник", "HD-SDI / NDI / ПТС", "Полный архив 4K", "Aftermovie 2-3 мин"], "featured": False}
        ],
        "selectCta": "Выбрать пакет",
        "note": "Многодневные фестивали и туры — расчёт по запросу, счёт VAT B2B."
    },
    "process": {
        "sectionLabel": "005 / Процесс",
        "title": "От договора",
        "titleItalic": "до live-трансляции",
        "lead": "События нельзя перенести — поэтому процесс жёстко разложен на 5 шагов.",
        "steps": [
            {"n": "01", "title": "Бриф и сценарий",     "body": "Расписание события по 15-минутным блокам, шот-лист, интеграция с ТВ-режиссурой если live.",                       "dur": "3-7 дней"},
            {"n": "02", "title": "Разрешения и STS",    "body": "Заявка в PAŻP, при BVLOS — STS-02, страховка Compensa, расширенная на риск зрителей.",                            "dur": "7-21 день"},
            {"n": "03", "title": "День события",         "body": "Приезжаем за 2 часа, тест NDI/HD-SDI, цветовая калибровка с наземными камерами.",                                   "dur": "2 ч"},
            {"n": "04", "title": "Highlight за 24 часа", "body": "Same-day edit 60-90 с, цветокоррекция, форматы под соцсети. Сдача утром следующего дня.",                          "dur": "24 ч"},
            {"n": "05", "title": "Архив 4K",             "body": "Полные D-Log M файлы на диске, опционально aftermovie 2-3 мин.",                                                    "dur": "5 дней"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Вопросы организаторов",
        "titleItalic": "и ответы",
        "lead": "Полная техническая документация, страховки, сертификаты — PDF по запросу.",
        "items": [
            {"q": "Страховка покрывает риск зрителей?",            "a": "Да — Compensa Vienna Insurance Group с покрытием до 5 млн PLN, риск третьих лиц в толпе включён. PDF полиса высылаем с договором."},
            {"q": "Как подаёте сигнал в нашу режиссёрскую?",       "a": "Чаще всего NDI по LAN или HD-SDI по BNC. Свой LiveU/Teradek энкодер, задержка < 80 мс. RTMP к вашему стримеру — тоже можем."},
            {"q": "Летаете ночью и над толпой?",                   "a": "Да. Есть STS-02 BVLOS и разрешение на ночные полёты. Полёты над толпой — отдельная заявка в ULC, дистанция и скорость ограничены."},
            {"q": "Если событие затянется?",                        "a": "Дополнительный час сверх пакета — 350 PLN/ч для EVENT, 500 PLN/ч для MULTI-CAM. Без оплаты за простой между блоками."},
            {"q": "Хватит ли батарей?",                             "a": "12 батарей на каждый дрон, зарядная станция 100 W на месте. Эффективное время полёта 25-30 минут, смена за 60 секунд — без перерывов в сигнале."},
            {"q": "Работаете с ТВ-продакшенами?",                  "a": "Да, регулярно. Опыт с TVN, Polsat Music, Aston Martin Racing, Red Bull. NDA + счёт VAT B2B — стандарт."}
        ],
        "askMore": "Задать другой вопрос"
    },
    "ctaBanner": {"title": "Дата события есть?", "titleItalic": "Спланируем логистику", "lead": "События с live требуют минимум 21 дня на разрешения. Чем раньше — тем спокойнее."},
    "contactTitle": "Поговорим",
    "contactTitleItalic": "о вашем событии"
},
"uk": {
    "meta": {
        "title": "Зйомка подій дроном Варшава — VisionAir | Live HD-SDI/NDI",
        "description": "Зйомка концертів, фестивалів, спорту та корпоративів дроном у Варшаві та по Польщі. Live HD-SDI/NDI, multi-cam, FPV, highlight за 24 години. EASA, страхування Compensa.",
        "keywords": "зйомка подій дроном Варшава, дрон на концерт, пряма трансляція з дрона, фестиваль дрон, NDI дрон, FPV івент Варшава",
        "ogTitle": "Зйомка подій з дрона — VisionAir Warsaw",
        "ogDescription": "Live HD-SDI/NDI, multi-cam, FPV та highlight 24 год для концертів, фестивалів та спорту.",
        "ogImageAlt": "Аерозйомка концерту у Варшаві",
        "schemaServiceType": "Aerial event coverage and live streaming",
        "schemaDescription": "Зйомка подій дроном у Варшаві та Польщі: концерти, фестивалі, спорт, корпоративи. Live HD-SDI/NDI, multi-cam, FPV, EASA, страхування Compensa VIG."
    },
    "breadcrumbCurrent": "Зйомка подій з дрона",
    "hero": {
        "eyebrow": "Варшава · Польща · Європа",
        "h1": ["Події з дрона", "та live трансляція"],
        "sub": "Multi-cam дрон, пряма трансляція HD-SDI/NDI у режисерську, FPV для динаміки, highlight за 24 години. <strong>Концерти · фестивалі · спорт · конференції</strong>. EASA, страхування, дозволи на нас.",
        "ctaPrimary": "Дивитися пакети",
        "ctaGhost": "Відкрити ціни",
        "meta": {"objectsKey": "формат", "objectsValue": "1-3 дні", "deliveryKey": "highlight", "deliveryValue": "24 год", "ratingKey": "сигнал", "ratingValue": "HD-SDI / NDI", "permitsKey": "дозволи", "permitsValue": "на нас"}
    },
    "why": {
        "sectionLabel": "001 / Чому дрон на події",
        "title": "Дрон, що подає сигнал",
        "titleItalic": "прямо в режисерську",
        "lead": "Більшість дрон-команд віддасть лише офлайн-запис. Ми подаємо HD-SDI/NDI live — дрон стає повноцінною камерою в міксі.",
        "body1": "Літаємо парами: DJI Mini 4 Pro для широких панорам та Avata 2 FPV для динаміки в натовпі. Дві машини — нульовий простой на зміну батарей.",
        "body2": "Same-day highlight 60-90 секунд готовий за 24 години після події, під Reels, TikTok та Stories. Сире 4K — за 5 днів.",
        "stats": [
            {"v": "2",   "k": "дрони паралельно",       "small": ""},
            {"v": "NDI", "k": "live у режисерську",     "small": ""},
            {"v": "24",  "k": "год до highlight",       "small": " год"},
            {"v": "FPV", "k": "Avata 2 cinematic",      "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Що входить",
        "title": "Live, highlight",
        "titleItalic": "та повний архів",
        "lead": "Три шари: live-сигнал під час події, highlight для соцмереж за 24 години, повний архів 4K за 5 днів.",
        "items": [
            {"tag": "Live",       "title": "HD-SDI / NDI live",            "desc": "Сигнал прямо в ТВ-режисерську або стрім-мікшер. Затримка < 80 мс."},
            {"tag": "Multi-cam",  "title": "2 дрона + FPV",                "desc": "Дві машини: DJI Mini 4 Pro для широких планів + Avata 2 FPV для натовпу."},
            {"tag": "Highlight",  "title": "Same-day кліп 60-90 с",        "desc": "Готовий кліп з музикою за 24 години. Формати 9:16, 16:9, 1:1."},
            {"tag": "Архів",      "title": "4K Cinematic raw",             "desc": "Повний архів у 4K D-Log M для aftermovie або майбутніх кампаній."},
            {"tag": "Фото",       "title": "Фото з дрона 24 Мп",           "desc": "100-200 кадрів високої роздільності: панорами 360°, top-down, VIP."},
            {"tag": "Нічні",      "title": "STS-02 BVLOS, нічні польоти",  "desc": "Літаємо після заходу сонця та у BVLOS — концерти, фестивалі, арени."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Для кого",
        "title": "Концерти, фестивалі,",
        "titleItalic": "спорт та конференції",
        "lead": "Основні клієнти — івент-агенції, організатори фестивалів, ТВ-продакшени та спортивні спонсори.",
        "items": [
            {"name": "Івент-агенція",          "sub": "Концерти, гала, корпоративи під ключ"},
            {"name": "Організатор фестивалю",  "sub": "Aftermovie, real-time контент, на екрани"},
            {"name": "ТВ-продакшн",            "sub": "HD-SDI у ПТС, multi-cam мікс"},
            {"name": "Спортивний спонсор",     "sub": "Марафони, велоперегони, водний, motorsport"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Пакети",
        "title": "Три пакети,",
        "titleItalic": "від одного дня до live",
        "lead": "Кожен пакет — кінцева ціна за день. Багаторічні контракти фестивалів — індивідуальні умови.",
        "items": [
            {"name": "EVENT",     "tagline": "1 день, 1 дрон",            "price": "2 800 PLN", "sub": "/ день", "list": ["1 дрон 4K Cinematic", "До 6 годин роботи", "Highlight 60 с за 24 год", "Сире 4K 60p", "Дозволи і страхування"], "featured": False},
            {"name": "MULTI-CAM", "tagline": "1 день, 2 дрона + FPV",     "price": "4 800 PLN", "sub": "/ день", "list": ["2 дрона паралельно", "Avata 2 FPV cinematic", "До 8 годин роботи", "Highlight 90 с за 24 год", "100+ фото з дрона", "Дозволи, страхування, STS-02"], "featured": True},
            {"name": "LIVE",      "tagline": "Live HD-SDI / NDI",         "price": "від 6 500 PLN","sub": "/ день","list": ["Live у режисерську", "1-2 дрона + технік", "HD-SDI / NDI / ПТС", "Повний архів 4K", "Aftermovie 2-3 хв"], "featured": False}
        ],
        "selectCta": "Обрати пакет",
        "note": "Багатоденні фестивалі та тури — кошторис на запит, рахунок VAT B2B."
    },
    "process": {
        "sectionLabel": "005 / Процес",
        "title": "Від договору",
        "titleItalic": "до live-трансляції",
        "lead": "Події не переносять — тому процес жорстко розкладений на 5 кроків.",
        "steps": [
            {"n": "01", "title": "Бриф та сценарій",     "body": "Розклад події по 15-хвилинних блоках, шот-лист, інтеграція з ТВ-режисурою якщо live.",                       "dur": "3-7 днів"},
            {"n": "02", "title": "Дозволи та STS",       "body": "Заявка в PAŻP, за потреби STS-02, страхування Compensa, розширене на ризик глядачів.",                       "dur": "7-21 день"},
            {"n": "03", "title": "День події",            "body": "Приїжджаємо за 2 години, тест NDI/HD-SDI, кольорова калібрація з наземними камерами.",                       "dur": "2 год"},
            {"n": "04", "title": "Highlight за 24 год",   "body": "Same-day edit 60-90 с, кольорокорекція, формати під соцмережі. Здача вранці наступного дня.",                "dur": "24 год"},
            {"n": "05", "title": "Архів 4K",              "body": "Повні D-Log M файли на диску, опційно aftermovie 2-3 хв.",                                                    "dur": "5 днів"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Питання організаторів",
        "titleItalic": "та відповіді",
        "lead": "Повна технічна документація, страхування, сертифікати — PDF на запит.",
        "items": [
            {"q": "Страхування покриває ризик глядачів?",          "a": "Так — Compensa Vienna Insurance Group з покриттям до 5 млн PLN, ризик третіх осіб у натовпі включено. PDF поліса надсилаємо з договором."},
            {"q": "Як подаєте сигнал у нашу режисерську?",         "a": "Найчастіше NDI по LAN або HD-SDI по BNC. Власний LiveU/Teradek енкодер, затримка < 80 мс. RTMP до вашого стрімера — теж можемо."},
            {"q": "Літаєте вночі та над натовпом?",                "a": "Так. Є STS-02 BVLOS та дозвіл на нічні польоти. Польоти над натовпом — окрема заявка в ULC, дистанція та швидкість обмежені."},
            {"q": "Якщо подія затягнеться?",                       "a": "Додаткова година понад пакет — 350 PLN/год для EVENT, 500 PLN/год для MULTI-CAM. Без оплати за простой між блоками."},
            {"q": "Чи вистачить батарей?",                         "a": "12 батарей на кожен дрон, зарядна станція 100 W на місці. Ефективний час польоту 25-30 хв, заміна за 60 секунд — без перерв у сигналі."},
            {"q": "Працюєте з ТВ-продакшенами?",                   "a": "Так, регулярно. Досвід з TVN, Polsat Music, Aston Martin Racing, Red Bull. NDA + рахунок VAT B2B — стандарт."}
        ],
        "askMore": "Поставити інше питання"
    },
    "ctaBanner": {"title": "Дата події є?", "titleItalic": "Сплануємо логістику", "lead": "Події з live потребують мінімум 21 дня на дозволи. Чим раніше — тим спокійніше."},
    "contactTitle": "Поговорімо",
    "contactTitleItalic": "про вашу подію"
}
}
