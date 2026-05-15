"""Thermal drone inspections & PV/photovoltaic farm inspections — i18n payload."""

SLUG = "inspekcje-termowizyjne"

DATA = {
"pl": {
    "meta": {
        "title": "Inspekcja termowizyjna dronem Warszawa — VisionAir | Fotowoltaika i dachy",
        "description": "Inspekcja termowizyjna dronem w Warszawie i całej Polsce: fotowoltaika, dachy, izolacja, ciepłownictwo. Kamera DJI H20T, raport PDF z hot-spotami GPS, certyfikat. EASA, OC Compensa, BVLOS.",
        "keywords": "termowizja z drona Warszawa, inspekcja fotowoltaiki dronem, inspekcja PV dron, termowizja dachu, kontrola farmy fotowoltaicznej, audyt termiczny dronem",
        "ogTitle": "Inspekcja termowizyjna dronem — VisionAir Warsaw",
        "ogDescription": "Termowizja PV, dachów i izolacji z dokładnym raportem hot-spotów i GPS.",
        "ogImageAlt": "Termowizyjny obraz farmy fotowoltaicznej z drona",
        "schemaServiceType": "Aerial thermographic inspection (drone thermography)",
        "schemaDescription": "Inspekcja termowizyjna dronem w Warszawie i całej Polsce: fotowoltaika, dachy, izolacja budynków, ciepłownictwo. Raporty PDF, certyfikat, EASA, OC Compensa VIG."
    },
    "breadcrumbCurrent": "Inspekcja termowizyjna dronem",
    "hero": {
        "eyebrow": "Warszawa · Polska · Europa",
        "h1": ["Termowizja z drona,", "raport z hot-spotami"],
        "sub": "Kamera DJI Zenmuse H20T, rozdzielczość termiczna 640×512, czułość 0,05 °C. <strong>Fotowoltaika · dachy · izolacja · ciepłownictwo</strong>. Raport PDF z lokalizacją GPS każdego defektu. EASA, OC, BVLOS.",
        "ctaPrimary": "Sprawdź pakiety",
        "ctaGhost": "Zobacz cennik",
        "meta": {"objectsKey": "skala", "objectsValue": "10 kW – 50 MW", "deliveryKey": "raport", "deliveryValue": "5 dni", "ratingKey": "kamera", "ratingValue": "Zenmuse H20T", "permitsKey": "kategoria", "permitsValue": "STS-02 / BVLOS"}
    },
    "why": {
        "sectionLabel": "001 / Dlaczego termowizja z drona",
        "title": "Hot-spot, który pozna",
        "titleItalic": "tylko termowizja",
        "lead": "Uszkodzony bypass diody w panelu PV, wnikająca wilgoć pod blachę dachu, mostek termiczny w izolacji — kamerą termowizyjną widzimy to z 50 metrów w 3 minuty.",
        "body1": "Pracujemy z kamerą DJI Zenmuse H20T (640×512 px termo, 0,05 °C czułość), kalibrowaną co rok. Każda inspekcja dostaje raport PDF z mapą GPS hot-spotów oraz miniaturą RGB + IR dla każdego defektu.",
        "body2": "Mamy STS-02 BVLOS i certyfikat operatora dronów termowizyjnych — to pozwala latać nad farmami PV powyżej 10 MW bez przerywania pracy instalacji. Raport spełnia wymagania UDT i ubezpieczycieli.",
        "stats": [
            {"v": "640", "k": "× 512 rozdz. termo",    "small": " px"},
            {"v": "0,05","k": "°C czułość",            "small": " °C"},
            {"v": "50",  "k": "MW dla PV",             "small": " MW"},
            {"v": "STS", "k": "02 BVLOS + cert.",      "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Co dostajesz",
        "title": "Mapa hot-spotów,",
        "titleItalic": "klasyfikacja, raport",
        "lead": "Każda inspekcja zamyka się raportem PDF z klasyfikacją defektów IEC TS 62446-3 dla fotowoltaiki lub PN-EN 13187 dla budynków.",
        "items": [
            {"tag": "Format A", "title": "Raport PDF zgodny z UDT",   "desc": "Klasyfikacja defektów wg IEC TS 62446-3 lub PN-EN 13187, akceptowany przez UDT, ubezpieczyciela i operatora sieci."},
            {"tag": "Format B", "title": "Mapa hot-spotów GPS",        "desc": "Każdy defekt ma współrzędne GPS, fotografię RGB i IR, klasę i sugerowaną akcję."},
            {"tag": "Format C", "title": "Ortotermowizja",            "desc": "Mozaika termowizyjna farmy PV nałożona na ortofoto — szybka identyfikacja stringów do diagnostyki."},
            {"tag": "Format D", "title": "Inspekcja dachów",          "desc": "Wnikająca wilgoć, mostki termiczne, uszkodzona izolacja. Format raportu pod audyt energetyczny."},
            {"tag": "Format E", "title": "Ciepłownictwo / preisolacja","desc": "Przecieki w sieci ciepłowniczej, wyciekająca para, uszkodzona izolacja preizolowanych rur."},
            {"tag": "Format F", "title": "Inspekcja kominów / wież",  "desc": "Termowizja kominów przemysłowych, wież chłodniczych, izolacji w zakładach przemysłowych."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Dla kogo",
        "title": "Operatorzy PV, EPC,",
        "titleItalic": "audytorzy energetyczni",
        "lead": "Typowy klient — operator farmy fotowoltaicznej w O&M, drugi — wykonawca EPC w okresie gwarancji, trzeci — audytor energetyczny budynku.",
        "items": [
            {"name": "Operator farmy PV",         "sub": "Inspekcja roczna w gwarancji, mapowanie strat"},
            {"name": "EPC / wykonawca PV",        "sub": "Inspekcja przed odbiorem, dokumentacja gwarancyjna"},
            {"name": "Audytor energetyczny",      "sub": "Termowizja izolacji, raport do certyfikatu energetycznego"},
            {"name": "Zarządca ciepłownictwa",    "sub": "Detekcja przecieków sieci ciepłowniczej z powietrza"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Pakiety",
        "title": "Cennik wg skali",
        "titleItalic": "instalacji",
        "lead": "Dla fotowoltaiki — cena zależna od mocy. Dla budynków — od powierzchni dachu.",
        "items": [
            {"name": "PV ≤ 200 kWp",   "tagline": "Mała farma / dach komercyjny", "price": "790 PLN",   "sub": "/ inspekcja",  "list": ["Termowizja całej instalacji", "Raport PDF wg IEC TS 62446-3", "Mapa hot-spotów GPS", "RGB + IR per defekt", "Dostawa 5 dni"], "featured": False},
            {"name": "PV 200 kWp – 5 MW","tagline": "Średnia farma",              "price": "2 500 PLN", "sub": "/ inspekcja",  "list": ["Termowizja + ortotermo", "Raport pełny + analiza strat", "Klasyfikacja defektów A/B/C", "Mapa stringów", "Konsultacja online"], "featured": True},
            {"name": "PV > 5 MW / dachy","tagline": "Wielkoskalowa / przemysłowa", "price": "od 4 200 PLN","sub": "/ inspekcja","list": ["BVLOS, możliwe wieczorne loty", "Pełna ortotermowizja", "Analiza strat produkcji", "Audit raportu przez certyfikowanego inżyniera", "Powtórzenie po naprawach"], "featured": False}
        ],
        "selectCta": "Wybierz pakiet",
        "note": "Coroczny abonament dla farm PV — 15% zniżki, terminy planowane w optymalnym oknie pogodowym."
    },
    "process": {
        "sectionLabel": "005 / Proces",
        "title": "Od briefu",
        "titleItalic": "do raportu certyfikowanego",
        "lead": "Inspekcja termowizyjna ma swoje warunki pogodowe — proces planuje pogodę z 7-dniowym wyprzedzeniem.",
        "steps": [
            {"n": "01", "title": "Brief i dokumentacja",     "body": "Plan farmy / budynku, dane stringów, gwarancje, historia awarii. Sprawdzamy dostępną dokumentację SCADA.",                "dur": "2-5 dni"},
            {"n": "02", "title": "Wybór okna pogodowego",    "body": "Termowizja PV — minimum 600 W/m² nasłonecznienia, bez chmur. Termowizja dachów — różnica temperatur > 10 °C wewnątrz/na zewnątrz.","dur": "5-14 dni"},
            {"n": "03", "title": "Lot inspekcyjny",           "body": "Latamy w siatce, automatyczne wykrywanie hot-spotów, paralelnie RGB + IR. Dla farmy 1 MW — około 25-40 minut.",         "dur": "30-90 min"},
            {"n": "04", "title": "Analiza i klasyfikacja",   "body": "Procesujemy w DJI Thermal Analysis Tool, klasyfikacja defektów wg IEC TS 62446-3 (A, B, C), oznaczenia GPS.",            "dur": "2-3 dni"},
            {"n": "05", "title": "Raport PDF",               "body": "Pełny raport z miniaturami, mapą GPS, sugerowanymi akcjami. Podpisany kwalifikowanym podpisem operatora termowizji.",   "dur": "5 dni"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Pytania operatorów",
        "titleItalic": "i audytorów",
        "lead": "Próbka raportu PDF, dane kamery i kalibracja — wysyłamy na żądanie.",
        "items": [
            {"q": "Jaką kamerę termowizyjną używacie?",              "a": "DJI Zenmuse H20T — wbudowana kamera termowizyjna 640×512 px, zoom 23x w paśmie widzialnym i sensor termiczny VOx z czułością 0,05 °C. Kalibracja co rok przez producenta."},
            {"q": "Czy raport jest akceptowany przez UDT?",          "a": "Tak — format zgodny z wytycznymi UDT-CERT dla inspekcji fotowoltaicznych. Klasyfikacja defektów wg IEC TS 62446-3. Współpracujemy z 3 firmami audytorskimi certyfikowanymi przez UDT."},
            {"q": "Jakie warunki pogodowe są potrzebne?",            "a": "PV: minimum 600 W/m² nasłonecznienia, bezchmurnie. Dachy: różnica temperatur min. 10 °C wewnątrz/zewnątrz, bez deszczu i wiatru > 30 km/h. Planujemy z 7-dniowym wyprzedzeniem."},
            {"q": "Czy farmę trzeba zatrzymywać na czas inspekcji?", "a": "Nie — przeciwnie, inspekcja musi być w trybie pracy pod obciążeniem. Latamy nad pracującymi panelami, niska wysokość lotu i niska prędkość pozwala bezpiecznie."},
            {"q": "Co po inspekcji, co z naprawami?",                "a": "Raport zawiera klasyfikację defektów (A/B/C) i sugerowane akcje. Mamy też ofertę powtórnej inspekcji po naprawie (cena 50% pierwszej) — żeby zweryfikować efekt."},
            {"q": "Czy działacie po Polsce, czy tylko Warszawa?",     "a": "Cała Polska. Dla farm PV > 1 MW dojazd jest w cenie inspekcji. Dla mniejszych — 2 PLN/km lub łączenie z innymi obiektami w okolicy."}
        ],
        "askMore": "Poproszę o próbkę raportu"
    },
    "ctaBanner": {"title": "Macie farmę PV", "titleItalic": "w gwarancji?", "lead": "Coroczna inspekcja termowizyjna w okresie gwarancji to standard branży — wykrywa wczesne defekty zanim staną się stratą produkcji."},
    "contactTitle": "Porozmawiajmy",
    "contactTitleItalic": "o inspekcji"
},
"en": {
    "meta": {
        "title": "Drone Thermal Inspection Warsaw — VisionAir | PV & Roofs",
        "description": "Drone thermography in Warsaw and across Poland: photovoltaics, roofs, building envelope, district heating. DJI H20T thermal camera, PDF report with GPS hot-spots, certified. EASA, Compensa, BVLOS.",
        "keywords": "drone thermal inspection Warsaw, PV inspection drone, photovoltaic drone Poland, thermal drone roof inspection, building thermography",
        "ogTitle": "Drone Thermal Inspection — VisionAir Warsaw",
        "ogDescription": "PV, roof and insulation thermography with a detailed hot-spot GPS report.",
        "ogImageAlt": "Thermal drone image of a PV farm",
        "schemaServiceType": "Aerial thermographic inspection (drone thermography)",
        "schemaDescription": "Drone thermal inspections in Warsaw and across Poland: PV, roofs, building envelope, district heating. PDF reports, certificate, EASA, Compensa VIG."
    },
    "breadcrumbCurrent": "Drone Thermal Inspection",
    "hero": {
        "eyebrow": "Warsaw · Poland · Europe",
        "h1": ["Drone thermography,", "hot-spot report included"],
        "sub": "DJI Zenmuse H20T, 640×512 thermal resolution, 0.05 °C sensitivity. <strong>Photovoltaics · roofs · insulation · district heating</strong>. PDF report with GPS coordinates per defect. EASA, insured, BVLOS.",
        "ctaPrimary": "See packages",
        "ctaGhost": "View pricing",
        "meta": {"objectsKey": "scale", "objectsValue": "10 kW – 50 MW", "deliveryKey": "report", "deliveryValue": "5 days", "ratingKey": "camera", "ratingValue": "Zenmuse H20T", "permitsKey": "category", "permitsValue": "STS-02 / BVLOS"}
    },
    "why": {
        "sectionLabel": "001 / Why drone thermography",
        "title": "Hot-spots only thermal",
        "titleItalic": "can see",
        "lead": "A failed bypass diode in a PV panel, moisture under roof flashing, a thermal bridge through insulation — thermal camera spots it from 50 metres in three minutes.",
        "body1": "DJI Zenmuse H20T (640×512 thermal, 0.05 °C sensitivity), recalibrated annually. Every inspection ships a PDF report with a GPS hot-spot map and RGB + IR thumbnails per defect.",
        "body2": "STS-02 BVLOS and a thermography operator certificate let us fly over PV farms above 10 MW without shutting down the installation. Reports satisfy UDT and insurer requirements.",
        "stats": [
            {"v": "640", "k": "× 512 thermal res.",   "small": " px"},
            {"v": "0.05","k": "°C sensitivity",       "small": " °C"},
            {"v": "50",  "k": "MW PV ceiling",        "small": " MW"},
            {"v": "STS", "k": "02 BVLOS + cert.",     "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / What you get",
        "title": "Hot-spot map,",
        "titleItalic": "classification, report",
        "lead": "Each inspection ships a PDF with defect classification per IEC TS 62446-3 (PV) or PN-EN 13187 (buildings).",
        "items": [
            {"tag": "Format A", "title": "UDT-compliant PDF report",  "desc": "Defect classification per IEC TS 62446-3 or PN-EN 13187, accepted by UDT, insurer and grid operator."},
            {"tag": "Format B", "title": "GPS hot-spot map",          "desc": "Each defect carries GPS coordinates, RGB and IR photo, class and recommended action."},
            {"tag": "Format C", "title": "Ortho-thermal mosaic",      "desc": "Thermal mosaic of the PV farm overlaid on orthophoto — quick string identification."},
            {"tag": "Format D", "title": "Roof inspection",           "desc": "Moisture intrusion, thermal bridges, damaged insulation. Report format for energy audits."},
            {"tag": "Format E", "title": "District heating",          "desc": "Underground heating network leaks, escaping steam, pre-insulated pipe failures."},
            {"tag": "Format F", "title": "Chimneys & towers",         "desc": "Industrial chimney thermography, cooling tower insulation, plant-grade reports."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / For whom",
        "title": "PV operators, EPCs,",
        "titleItalic": "energy auditors",
        "lead": "Typical client: PV farm operator in O&M. Second: EPC during warranty. Third: building energy auditor.",
        "items": [
            {"name": "PV farm operator",      "sub": "Annual warranty inspection, loss mapping"},
            {"name": "EPC / PV contractor",   "sub": "Handover inspection, warranty documentation"},
            {"name": "Energy auditor",        "sub": "Envelope thermography for energy certificate"},
            {"name": "DH network operator",   "sub": "Aerial detection of district-heating leaks"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Packages",
        "title": "Pricing by",
        "titleItalic": "installation scale",
        "lead": "PV — priced by capacity. Buildings — by roof area.",
        "items": [
            {"name": "PV ≤ 200 kWp",   "tagline": "Small farm / commercial roof",  "price": "790 PLN",   "sub": "/ inspection",  "list": ["Full thermography", "PDF report per IEC TS 62446-3", "GPS hot-spot map", "RGB + IR per defect", "5-day delivery"], "featured": False},
            {"name": "PV 200 kWp – 5 MW","tagline": "Mid-size farm",                "price": "2 500 PLN", "sub": "/ inspection",  "list": ["Thermal + ortho-thermal", "Full report + loss analysis", "Defect class A/B/C", "String map", "Online consultation"], "featured": True},
            {"name": "PV > 5 MW / roof","tagline": "Utility / industrial scale",    "price": "from 4 200 PLN","sub": "/ inspection","list": ["BVLOS, possible evening flights", "Full ortho-thermal", "Production loss analysis", "Certified engineer audit", "Free re-inspection after fix"], "featured": False}
        ],
        "selectCta": "Choose package",
        "note": "Annual PV subscription — 15% off, scheduled in the optimal weather window."
    },
    "process": {
        "sectionLabel": "005 / Process",
        "title": "From brief",
        "titleItalic": "to certified report",
        "lead": "Thermography has weather windows — we plan a week ahead.",
        "steps": [
            {"n": "01", "title": "Brief and docs",         "body": "Farm/building plan, string data, warranties, fault history. We review available SCADA data.",                          "dur": "2-5 days"},
            {"n": "02", "title": "Weather window",         "body": "PV: 600 W/m² irradiance, clear skies. Buildings: ≥10 °C indoor/outdoor delta, no rain, wind < 30 km/h.",                "dur": "5-14 days"},
            {"n": "03", "title": "Inspection flight",      "body": "Grid pattern flight, automated hot-spot detection, parallel RGB + IR. 1 MW PV farm — 25-40 minutes airborne.",        "dur": "30-90 min"},
            {"n": "04", "title": "Analysis & classification","body": "Processed in DJI Thermal Analysis Tool, defects classified per IEC TS 62446-3 (A/B/C) with GPS tags.",              "dur": "2-3 days"},
            {"n": "05", "title": "PDF report",             "body": "Full report with thumbnails, GPS map, recommended actions. Signed by certified thermography operator.",                "dur": "5 days"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Operator and auditor",
        "titleItalic": "questions",
        "lead": "Sample PDF report, camera spec and calibration certificate — on request.",
        "items": [
            {"q": "Which thermal camera do you fly?",            "a": "DJI Zenmuse H20T — built-in 640×512 px thermal sensor with 0.05 °C sensitivity, 23x visible-band zoom, VOx microbolometer. Annual factory recalibration."},
            {"q": "Does UDT accept your reports?",               "a": "Yes — format aligned with UDT-CERT guidelines for PV inspections. Defect classification per IEC TS 62446-3. We work with three UDT-certified audit firms."},
            {"q": "What weather do you need?",                   "a": "PV: 600 W/m² irradiance, clear skies. Roofs: ≥10 °C indoor/outdoor delta, no rain, wind < 30 km/h. We plan a week ahead."},
            {"q": "Do we need to shut the farm down?",           "a": "No — quite the opposite, inspection must happen under load. We fly above the operating panels, low altitude and speed keep it safe."},
            {"q": "What about repairs after the inspection?",    "a": "Report includes defect class (A/B/C) and recommended action. Re-inspection after repair — 50% of the first price — to verify the fix."},
            {"q": "Across Poland or only Warsaw?",               "a": "All of Poland. PV farms > 1 MW — travel included. Smaller — 2 PLN/km or bundled with nearby sites."}
        ],
        "askMore": "Send me a sample report"
    },
    "ctaBanner": {"title": "PV farm in warranty?", "titleItalic": "Annual inspection is industry standard", "lead": "Annual thermography during warranty catches early defects before they become production loss."},
    "contactTitle": "Let's talk",
    "contactTitleItalic": "about the inspection"
},
"ru": {
    "meta": {
        "title": "Тепловизионная инспекция дроном Варшава — VisionAir | Фотовольтаика и крыши",
        "description": "Тепловизионная инспекция дроном в Варшаве и по Польше: фотовольтаика, крыши, изоляция зданий, теплосети. Камера DJI H20T, PDF-отчёт с hot-spot GPS, сертификат. EASA, страховка Compensa.",
        "keywords": "термовизия с дрона Варшава, инспекция фотовольтаики дроном, инспекция PV дрон, термовизия крыши, аудит изоляции дроном",
        "ogTitle": "Тепловизионная инспекция дроном — VisionAir Warsaw",
        "ogDescription": "Термовизия PV, крыш и изоляции с подробным отчётом hot-spot и GPS.",
        "ogImageAlt": "Тепловизионное изображение солнечной фермы с дрона",
        "schemaServiceType": "Aerial thermographic inspection",
        "schemaDescription": "Тепловизионная инспекция дроном в Варшаве и Польше: фотовольтаика, крыши, изоляция, теплосети. PDF-отчёты, EASA, страховка Compensa VIG."
    },
    "breadcrumbCurrent": "Тепловизионная инспекция",
    "hero": {
        "eyebrow": "Варшава · Польша · Европа",
        "h1": ["Термовизия с дрона,", "отчёт с hot-spot"],
        "sub": "Камера DJI Zenmuse H20T, термо-разрешение 640×512, чувствительность 0,05 °C. <strong>Фотовольтаика · крыши · изоляция · теплосети</strong>. PDF-отчёт с GPS каждого дефекта. EASA, страховка, BVLOS.",
        "ctaPrimary": "Смотреть пакеты",
        "ctaGhost": "Открыть цены",
        "meta": {"objectsKey": "масштаб", "objectsValue": "10 кВт – 50 МВт", "deliveryKey": "отчёт", "deliveryValue": "5 дней", "ratingKey": "камера", "ratingValue": "Zenmuse H20T", "permitsKey": "категория", "permitsValue": "STS-02 / BVLOS"}
    },
    "why": {
        "sectionLabel": "001 / Зачем термовизия с дрона",
        "title": "Hot-spot, который видит",
        "titleItalic": "только термовизия",
        "lead": "Сгоревший байпасный диод в панели PV, проникающая влага под кровлю, тепловой мост в изоляции — тепловизор видит это с 50 метров за 3 минуты.",
        "body1": "Камера DJI Zenmuse H20T (640×512 термо, 0,05 °C чувствительность), калибровка раз в год у производителя. Каждая инспекция — PDF-отчёт с картой GPS hot-spot и парой RGB+IR на каждый дефект.",
        "body2": "STS-02 BVLOS и сертификат оператора термовизии позволяют летать над фермами PV > 10 МВт без остановки работы. Отчёт соответствует требованиям UDT и страховщиков.",
        "stats": [
            {"v": "640", "k": "× 512 термо",          "small": " px"},
            {"v": "0,05","k": "°C чувствительность",  "small": " °C"},
            {"v": "50",  "k": "МВт для PV",           "small": " МВт"},
            {"v": "STS", "k": "02 BVLOS + серт.",     "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Что входит",
        "title": "Карта hot-spot,",
        "titleItalic": "классификация, отчёт",
        "lead": "Каждая инспекция — PDF с классификацией дефектов по IEC TS 62446-3 для PV или PN-EN 13187 для зданий.",
        "items": [
            {"tag": "Формат A", "title": "PDF-отчёт по стандарту UDT", "desc": "Классификация дефектов по IEC TS 62446-3 или PN-EN 13187, принимается UDT, страховщиком и сетевым оператором."},
            {"tag": "Формат B", "title": "Карта hot-spot GPS",         "desc": "Каждый дефект — GPS-координаты, фото RGB и IR, класс, рекомендуемое действие."},
            {"tag": "Формат C", "title": "Орто-термо",                 "desc": "Тепловая мозаика PV-фермы на ортофото — быстрая идентификация стрингов."},
            {"tag": "Формат D", "title": "Инспекция крыш",             "desc": "Проникающая влага, тепловые мосты, повреждённая изоляция. Формат для энергоаудита."},
            {"tag": "Формат E", "title": "Теплосети",                 "desc": "Утечки в теплотрассе, выход пара, повреждённая преизоляция."},
            {"tag": "Формат F", "title": "Дымоходы и башни",           "desc": "Промышленные дымоходы, градирни, изоляция в промышленности."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Для кого",
        "title": "Операторы PV, EPC,",
        "titleItalic": "энергоаудиторы",
        "lead": "Типичный клиент — оператор PV-фермы в O&M, второй — EPC в гарантии, третий — энергоаудитор здания.",
        "items": [
            {"name": "Оператор PV-фермы",        "sub": "Ежегодная инспекция в гарантии, картирование потерь"},
            {"name": "EPC / подрядчик PV",       "sub": "Инспекция при сдаче, гарантийная документация"},
            {"name": "Энергоаудитор",            "sub": "Термовизия изоляции для энерго-сертификата"},
            {"name": "Оператор теплосети",       "sub": "Детекция утечек теплотрассы с воздуха"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Пакеты",
        "title": "Цены по",
        "titleItalic": "масштабу установки",
        "lead": "Для PV — по мощности. Для зданий — по площади кровли.",
        "items": [
            {"name": "PV ≤ 200 kWp",     "tagline": "Малая ферма / коммерческая крыша","price": "790 PLN",   "sub": "/ инспекция",  "list": ["Полная термовизия", "PDF-отчёт по IEC TS 62446-3", "Карта hot-spot GPS", "RGB + IR на каждый дефект", "Сдача 5 дней"], "featured": False},
            {"name": "PV 200 kWp – 5 МВт","tagline": "Средняя ферма",                  "price": "2 500 PLN", "sub": "/ инспекция",  "list": ["Термо + ортотермо", "Полный отчёт + анализ потерь", "Классификация A/B/C", "Карта стрингов", "Онлайн-консультация"], "featured": True},
            {"name": "PV > 5 МВт / крыши","tagline": "Промышленная / utility-scale",   "price": "от 4 200 PLN","sub": "/ инспекция","list": ["BVLOS, возможны вечерние полёты", "Полное ортотермо", "Анализ потерь производства", "Аудит сертифицированным инженером", "Повторная инспекция после ремонта"], "featured": False}
        ],
        "selectCta": "Выбрать пакет",
        "note": "Ежегодный абонемент для PV — скидка 15%, планирование в оптимальном окне погоды."
    },
    "process": {
        "sectionLabel": "005 / Процесс",
        "title": "От брифа",
        "titleItalic": "до сертифицированного отчёта",
        "lead": "Термовизия требует погодных условий — планируем за 7 дней.",
        "steps": [
            {"n": "01", "title": "Бриф и документация",     "body": "План фермы/здания, данные стрингов, гарантии, история аварий. Смотрим доступные данные SCADA.",                       "dur": "2-5 дней"},
            {"n": "02", "title": "Окно погоды",             "body": "PV: 600 Вт/м² инсоляции, без облаков. Крыши: ≥10 °C дельта внутри/снаружи, без дождя, ветер < 30 км/ч.",              "dur": "5-14 дней"},
            {"n": "03", "title": "Инспекционный полёт",     "body": "Сетка, автоматическая детекция hot-spot, параллельно RGB+IR. Ферма 1 МВт — 25-40 минут.",                              "dur": "30-90 мин"},
            {"n": "04", "title": "Анализ и классификация", "body": "Обработка в DJI Thermal Analysis Tool, классификация по IEC TS 62446-3 (A/B/C), GPS-метки.",                           "dur": "2-3 дня"},
            {"n": "05", "title": "PDF-отчёт",              "body": "Полный отчёт с миниатюрами, GPS-картой, рекомендациями. КЭП сертифицированного оператора термовизии.",                 "dur": "5 дней"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Вопросы операторов",
        "titleItalic": "и аудиторов",
        "lead": "Пример PDF-отчёта, спецификация камеры и сертификат калибровки — по запросу.",
        "items": [
            {"q": "Какая у вас тепловизионная камера?",          "a": "DJI Zenmuse H20T — встроенный сенсор 640×512 px с чувствительностью 0,05 °C, 23x зум в видимом диапазоне, VOx микроболометр. Ежегодная заводская калибровка."},
            {"q": "UDT принимает ваши отчёты?",                  "a": "Да — формат соответствует требованиям UDT-CERT для инспекций PV. Классификация по IEC TS 62446-3. Работаем с 3 аудит-фирмами, сертифицированными UDT."},
            {"q": "Какая погода нужна?",                         "a": "PV: 600 Вт/м² инсоляции, ясное небо. Крыши: дельта ≥10 °C внутри/снаружи, без дождя, ветер < 30 км/ч. Планируем за неделю."},
            {"q": "Надо ли останавливать ферму?",                "a": "Нет — наоборот, инспекция должна быть под нагрузкой. Летаем над работающими панелями, низкая высота и скорость обеспечивают безопасность."},
            {"q": "Что делать после инспекции, с ремонтами?",    "a": "Отчёт содержит классификацию A/B/C и рекомендуемые действия. Есть опция повторной инспекции после ремонта (50% от первой цены) — для верификации."},
            {"q": "По всей Польше или только Варшава?",           "a": "Вся Польша. Для PV > 1 МВт — выезд в цене. Для меньших — 2 PLN/км или объединение с соседними объектами."}
        ],
        "askMore": "Пришлите пример отчёта"
    },
    "ctaBanner": {"title": "PV-ферма в гарантии?", "titleItalic": "Ежегодная инспекция — стандарт", "lead": "Ежегодная термовизия в гарантийный период выявляет ранние дефекты до того, как они станут потерей производства."},
    "contactTitle": "Поговорим",
    "contactTitleItalic": "об инспекции"
},
"uk": {
    "meta": {
        "title": "Тепловізійна інспекція дроном Варшава — VisionAir | Фотовольтаїка та дахи",
        "description": "Тепловізійна інспекція дроном у Варшаві та по Польщі: фотовольтаїка, дахи, ізоляція, теплопостачання. Камера DJI H20T, PDF-звіт з hot-spot GPS, сертифікат. EASA, страхування Compensa.",
        "keywords": "термовізія з дрона Варшава, інспекція фотовольтаїки дроном, інспекція PV дрон, термовізія даху, аудит ізоляції дроном",
        "ogTitle": "Тепловізійна інспекція дроном — VisionAir Warsaw",
        "ogDescription": "Термовізія PV, дахів та ізоляції з детальним звітом hot-spot та GPS.",
        "ogImageAlt": "Тепловізійне зображення сонячної ферми з дрона",
        "schemaServiceType": "Aerial thermographic inspection",
        "schemaDescription": "Тепловізійна інспекція дроном у Варшаві та Польщі: фотовольтаїка, дахи, ізоляція, теплопостачання. PDF-звіти, EASA, страхування Compensa VIG."
    },
    "breadcrumbCurrent": "Тепловізійна інспекція",
    "hero": {
        "eyebrow": "Варшава · Польща · Європа",
        "h1": ["Термовізія з дрона,", "звіт з hot-spot"],
        "sub": "Камера DJI Zenmuse H20T, термо-роздільність 640×512, чутливість 0,05 °C. <strong>Фотовольтаїка · дахи · ізоляція · теплопостачання</strong>. PDF-звіт з GPS кожного дефекту. EASA, страхування, BVLOS.",
        "ctaPrimary": "Дивитися пакети",
        "ctaGhost": "Відкрити ціни",
        "meta": {"objectsKey": "масштаб", "objectsValue": "10 кВт – 50 МВт", "deliveryKey": "звіт", "deliveryValue": "5 днів", "ratingKey": "камера", "ratingValue": "Zenmuse H20T", "permitsKey": "категорія", "permitsValue": "STS-02 / BVLOS"}
    },
    "why": {
        "sectionLabel": "001 / Навіщо термовізія з дрона",
        "title": "Hot-spot, що бачить",
        "titleItalic": "лише термовізія",
        "lead": "Згорілий байпасний діод у панелі PV, волога під покрівлею, тепловий міст в ізоляції — тепловізор бачить це з 50 метрів за 3 хвилини.",
        "body1": "Камера DJI Zenmuse H20T (640×512 термо, 0,05 °C чутливість), калібрація раз на рік у виробника. Кожна інспекція — PDF-звіт з картою GPS hot-spot та парою RGB+IR на кожен дефект.",
        "body2": "STS-02 BVLOS та сертифікат оператора термовізії дозволяють літати над фермами PV > 10 МВт без зупинки роботи. Звіт відповідає вимогам UDT та страховиків.",
        "stats": [
            {"v": "640", "k": "× 512 термо",          "small": " px"},
            {"v": "0,05","k": "°C чутливість",        "small": " °C"},
            {"v": "50",  "k": "МВт для PV",           "small": " МВт"},
            {"v": "STS", "k": "02 BVLOS + серт.",     "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Що входить",
        "title": "Карта hot-spot,",
        "titleItalic": "класифікація, звіт",
        "lead": "Кожна інспекція — PDF з класифікацією дефектів за IEC TS 62446-3 для PV або PN-EN 13187 для будівель.",
        "items": [
            {"tag": "Формат A", "title": "PDF-звіт за стандартом UDT", "desc": "Класифікація дефектів за IEC TS 62446-3 або PN-EN 13187, приймається UDT, страховиком та оператором мережі."},
            {"tag": "Формат B", "title": "Карта hot-spot GPS",         "desc": "Кожен дефект — GPS-координати, фото RGB та IR, клас, рекомендована дія."},
            {"tag": "Формат C", "title": "Орто-термо",                 "desc": "Теплова мозаїка PV-ферми на ортофото — швидка ідентифікація стрингів."},
            {"tag": "Формат D", "title": "Інспекція дахів",            "desc": "Волога, теплові мости, пошкоджена ізоляція. Формат для енергоаудиту."},
            {"tag": "Формат E", "title": "Теплопостачання",           "desc": "Витоки у теплотрасі, вихід пари, пошкоджена преізоляція."},
            {"tag": "Формат F", "title": "Димарі та башти",            "desc": "Промислові димарі, градирні, ізоляція в промисловості."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Для кого",
        "title": "Оператори PV, EPC,",
        "titleItalic": "енергоаудитори",
        "lead": "Типовий клієнт — оператор PV-ферми в O&M, другий — EPC у гарантії, третій — енергоаудитор будівлі.",
        "items": [
            {"name": "Оператор PV-ферми",         "sub": "Щорічна інспекція у гарантії, картування втрат"},
            {"name": "EPC / підрядник PV",        "sub": "Інспекція при здачі, гарантійна документація"},
            {"name": "Енергоаудитор",             "sub": "Термовізія ізоляції для енерго-сертифіката"},
            {"name": "Оператор теплопостачання",  "sub": "Детекція витоків теплотраси з повітря"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Пакети",
        "title": "Ціни за",
        "titleItalic": "масштабом установки",
        "lead": "Для PV — за потужністю. Для будівель — за площею покрівлі.",
        "items": [
            {"name": "PV ≤ 200 kWp",     "tagline": "Мала ферма / комерційний дах",   "price": "790 PLN",   "sub": "/ інспекція",  "list": ["Повна термовізія", "PDF-звіт за IEC TS 62446-3", "Карта hot-spot GPS", "RGB + IR на кожен дефект", "Здача 5 днів"], "featured": False},
            {"name": "PV 200 kWp – 5 МВт","tagline": "Середня ферма",                  "price": "2 500 PLN", "sub": "/ інспекція",  "list": ["Термо + ортотермо", "Повний звіт + аналіз втрат", "Класифікація A/B/C", "Карта стрингів", "Онлайн-консультація"], "featured": True},
            {"name": "PV > 5 МВт / дахи","tagline": "Промислова / utility-scale",      "price": "від 4 200 PLN","sub": "/ інспекція","list": ["BVLOS, можливі вечірні польоти", "Повне ортотермо", "Аналіз втрат виробництва", "Аудит сертифікованим інженером", "Повторна інспекція після ремонту"], "featured": False}
        ],
        "selectCta": "Обрати пакет",
        "note": "Щорічний абонемент для PV — знижка 15%, планування в оптимальному вікні погоди."
    },
    "process": {
        "sectionLabel": "005 / Процес",
        "title": "Від брифу",
        "titleItalic": "до сертифікованого звіту",
        "lead": "Термовізія вимагає погодних умов — плануємо за 7 днів.",
        "steps": [
            {"n": "01", "title": "Бриф і документація",     "body": "План ферми/будівлі, дані стрингів, гарантії, історія аварій. Дивимось доступні дані SCADA.",                       "dur": "2-5 днів"},
            {"n": "02", "title": "Вікно погоди",            "body": "PV: 600 Вт/м² інсоляції, без хмар. Дахи: ≥10 °C дельта всередині/зовні, без дощу, вітер < 30 км/год.",            "dur": "5-14 днів"},
            {"n": "03", "title": "Інспекційний політ",      "body": "Сітка, автоматична детекція hot-spot, паралельно RGB+IR. Ферма 1 МВт — 25-40 хвилин.",                              "dur": "30-90 хв"},
            {"n": "04", "title": "Аналіз та класифікація", "body": "Обробка в DJI Thermal Analysis Tool, класифікація за IEC TS 62446-3 (A/B/C), GPS-мітки.",                           "dur": "2-3 дні"},
            {"n": "05", "title": "PDF-звіт",                "body": "Повний звіт з мініатюрами, GPS-картою, рекомендаціями. КЕП сертифікованого оператора термовізії.",                  "dur": "5 днів"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Питання операторів",
        "titleItalic": "та аудиторів",
        "lead": "Приклад PDF-звіту, специфікація камери та сертифікат калібрації — на запит.",
        "items": [
            {"q": "Яка у вас тепловізійна камера?",            "a": "DJI Zenmuse H20T — вбудований сенсор 640×512 px з чутливістю 0,05 °C, 23x зум у видимому діапазоні, VOx мікроболометр. Щорічна заводська калібрація."},
            {"q": "UDT приймає ваші звіти?",                   "a": "Так — формат відповідає вимогам UDT-CERT для інспекцій PV. Класифікація за IEC TS 62446-3. Працюємо з 3 аудит-фірмами, сертифікованими UDT."},
            {"q": "Яка погода потрібна?",                      "a": "PV: 600 Вт/м² інсоляції, ясне небо. Дахи: дельта ≥10 °C всередині/зовні, без дощу, вітер < 30 км/год. Плануємо за тиждень."},
            {"q": "Чи треба зупиняти ферму?",                  "a": "Ні — навпаки, інспекція має бути під навантаженням. Літаємо над працюючими панелями, низька висота та швидкість забезпечують безпеку."},
            {"q": "Що робити після інспекції, з ремонтами?",   "a": "Звіт містить класифікацію A/B/C та рекомендовані дії. Є опція повторної інспекції після ремонту (50% від першої) — для верифікації."},
            {"q": "По всій Польщі чи лише Варшава?",            "a": "Уся Польща. Для PV > 1 МВт — виїзд у ціні. Для менших — 2 PLN/км або обʼєднання з сусідніми обʼєктами."}
        ],
        "askMore": "Надішліть приклад звіту"
    },
    "ctaBanner": {"title": "PV-ферма у гарантії?", "titleItalic": "Щорічна інспекція — стандарт", "lead": "Щорічна термовізія в гарантійний період виявляє ранні дефекти до того, як вони стануть втратою виробництва."},
    "contactTitle": "Поговорімо",
    "contactTitleItalic": "про інспекцію"
}
}
