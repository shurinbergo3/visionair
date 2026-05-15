"""Orthophoto maps & RTK drone surveying — i18n payload."""

SLUG = "ortofotomapy-pomiary"

DATA = {
"pl": {
    "meta": {
        "title": "Ortofotomapy i pomiary RTK dronem Warszawa — VisionAir | PL-2000",
        "description": "Ortofotomapy i pomiary RTK dronem w Warszawie i całej Polsce. Dokładność 2-3 cm, układ PL-2000, fotogrametria, modele 3D, eksport do GeoTIFF / .las. Dla geodetów, projektantów i deweloperów.",
        "keywords": "ortofotomapa z drona Warszawa, pomiary RTK dronem, fotogrametria dronem, model 3D dron, ortofotomapa PL-2000, drone surveying Poland",
        "ogTitle": "Ortofotomapy i pomiary RTK dronem — VisionAir Warsaw",
        "ogDescription": "Dokładność 2-3 cm, układ PL-2000, fotogrametria i modele 3D dla geodetów i projektantów.",
        "ogImageAlt": "Ortofotomapa terenu z drona w PL-2000",
        "schemaServiceType": "Aerial photogrammetry and RTK drone surveying",
        "schemaDescription": "Ortofotomapy i pomiary RTK dronem w Warszawie i Polsce. Dokładność 2-3 cm w układzie PL-2000, fotogrametria, modele 3D, EASA, OC Compensa VIG."
    },
    "breadcrumbCurrent": "Ortofotomapy i pomiary RTK",
    "hero": {
        "eyebrow": "Warszawa · Polska · Europa",
        "h1": ["Ortofotomapy i pomiary,", "dokładność 2-3 cm"],
        "sub": "Dron RTK z modułem PPK, ortofotomapy w układzie PL-2000, fotogrametria, modele 3D, eksport do GeoTIFF / .las / .obj. <strong>Geodeci · projektanci · deweloperzy</strong>. EASA, OC, zgody.",
        "ctaPrimary": "Sprawdź pakiety",
        "ctaGhost": "Zobacz cennik",
        "meta": {"objectsKey": "obszar", "objectsValue": "do 200 ha", "deliveryKey": "dostawa", "deliveryValue": "5-7 dni", "ratingKey": "dokładność", "ratingValue": "RTK 2-3 cm", "permitsKey": "układ", "permitsValue": "PL-2000 / WGS84"}
    },
    "why": {
        "sectionLabel": "001 / Dlaczego dron",
        "title": "Geodeta + dron",
        "titleItalic": "= 10× szybciej",
        "lead": "Inwentaryzacja działki 50 ha klasyczną tachimetrią — 3-4 dni i 2 geodetów. Dronem z RTK — 90 minut na placu i 3 dni przetwarzania. Dokładność porównywalna.",
        "body1": "Latamy z modułem RTK podpiętym do GNSS (Real-Time Kinematic). Każde zdjęcie jest geotagowane z dokładnością 2-3 cm w układzie PL-2000. Dla wymagań geodezyjnych < 1 cm — dodajemy 6-12 GCP (Ground Control Points).",
        "body2": "Procesujemy w Pix4D Mapper i Agisoft Metashape, eksport do GeoTIFF, .las, .e57, .obj. Modele 3D otwierają się w QGIS, AutoCAD, Revit, Civil 3D bez konwersji.",
        "stats": [
            {"v": "2-3",  "k": "cm dokładność RTK", "small": " cm"},
            {"v": "200",  "k": "ha za 1 lot",       "small": " ha"},
            {"v": "5-7",  "k": "dni do dostawy",    "small": " dni"},
            {"v": "GCP",  "k": "do 1 cm precyzji",  "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Co dostajesz",
        "title": "Ortofotomapa, model 3D",
        "titleItalic": "i pomiary objętości",
        "lead": "Standardowy zestaw: ortofotomapa w PL-2000, model 3D fotogrametryczny, chmura punktów LAS, raport PDF.",
        "items": [
            {"tag": "Format A", "title": "Ortofotomapa PL-2000",        "desc": "GeoTIFF + PDF, rozdzielczość 1-3 cm/piksel, układ państwowy PL-2000. Można importować do QGIS / ArcGIS."},
            {"tag": "Format B", "title": "Model 3D fotogrametryczny",   "desc": "Texturowana siatka 3D, eksport do .obj / .fbx. Pracownie importują do Revit, Rhino, Blender."},
            {"tag": "Format C", "title": "Chmura punktów LAS / LAZ",    "desc": "Klasyfikowana chmura punktów (teren, roślinność, budynki), eksport do .las / .e57 / .xyz."},
            {"tag": "Format D", "title": "DTM / DSM / DEM",             "desc": "Modele wysokościowe terenu (DTM), powierzchni (DSM) i pochodne (DEM). Format GeoTIFF z georeferencją."},
            {"tag": "Format E", "title": "Pomiar objętości",            "desc": "Wykopy, hałdy, składowiska — automatyczny obliczeniem m³ z błędem ± 1-3%. PDF z wynikami."},
            {"tag": "Format F", "title": "Inwentaryzacja działki",      "desc": "Mapy do projektu: zagospodarowanie, kolizje, profil terenu, długości przewodów napowietrznych."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Dla kogo",
        "title": "Geodeci, projektanci,",
        "titleItalic": "deweloperzy",
        "lead": "Typowy klient — pracownia geodezyjna, drugi — pracownia projektowa, trzeci — deweloper przed kupnem działki.",
        "items": [
            {"name": "Pracownia geodezyjna",  "sub": "Inwentaryzacja, pomiary objętości, fotogrametria pod-kontrakt"},
            {"name": "Pracownia projektowa",   "sub": "Inwentaryzacja działki, model 3D pod projekt"},
            {"name": "Deweloper",              "sub": "Skan działki przed kupnem, pomiar terenu do wyceny"},
            {"name": "Rolnictwo precyzyjne",   "sub": "Mapa pola NDVI, multispektralne, plan nawożenia"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Pakiety",
        "title": "Pakiety wg",
        "titleItalic": "wielkości obszaru",
        "lead": "Cena zależy od powierzchni i wymagań dokładności. Dla obszarów > 200 ha — projekt indywidualny.",
        "items": [
            {"name": "DZIAŁKA ≤ 5 ha",     "tagline": "Mała działka / inwestycja",     "price": "950 PLN",   "sub": "/ projekt",  "list": ["Ortofotomapa PL-2000", "Model 3D + DTM", "Raport PDF", "Dostawa 5 dni", "RTK 2-3 cm"], "featured": False},
            {"name": "TEREN 5–50 ha",       "tagline": "Inwestycja, gospodarstwo",      "price": "2 400 PLN", "sub": "/ projekt",  "list": ["Pełna fotogrametria", "Ortofoto + DTM + DSM", "Chmura LAS klasyfikowana", "Pomiar objętości", "Eksport do BIM / CAD"], "featured": True},
            {"name": "OBSZAR > 50 ha",      "tagline": "Duża inwestycja, farma PV",     "price": "od 4 500 PLN","sub": "/ projekt","list": ["BVLOS do 200 ha", "Pełen set deliverables", "GCP do 1 cm precyzji", "Inwentaryzacja drzew (LAS)", "Konsultacja z geodetą uprawnionym"], "featured": False}
        ],
        "selectCta": "Wybierz pakiet",
        "note": "Pomiar GCP do precyzji geodezyjnej < 1 cm — w pakiecie OBSZAR, jako add-on w mniejszych."
    },
    "process": {
        "sectionLabel": "005 / Proces",
        "title": "Od briefu",
        "titleItalic": "do gotowej mapy",
        "lead": "Pomiar dronem to 5 kroków: brief, plan lotu, lot, processing, dostawa. Łączny czas — 7-10 dni.",
        "steps": [
            {"n": "01", "title": "Brief i wymagania",      "body": "Format dostarczenia (GeoTIFF, .las, .obj), wymagana dokładność, układ współrzędnych, format raportu.",                       "dur": "1-3 dni"},
            {"n": "02", "title": "Plan lotu i GCP",        "body": "Plan lotu w siatce, overlap 80/70, ustawienie GCP jeśli precyzja < 1 cm wymagana.",                                          "dur": "2-5 dni"},
            {"n": "03", "title": "Lot fotogrametryczny",   "body": "Lot autopilotem, 600-2000 zdjęć w zależności od obszaru. Dla 50 ha — 90 minut, dla 200 ha — 3-4 godziny.",                  "dur": "60-240 min"},
            {"n": "04", "title": "Processing fotogrametrii","body": "Pix4D Mapper lub Agisoft Metashape, mozaikowanie, klasyfikacja chmury punktów, generacja DTM/DSM.",                       "dur": "2-3 dni"},
            {"n": "05", "title": "Dostawa",                 "body": "Pliki na chmurze (Frame.io lub WeTransfer), raport PDF z metadanymi, podgląd online (potree / WebGL).",                   "dur": "5-7 dni"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Pytania geodetów",
        "titleItalic": "i projektantów",
        "lead": "Próbka pliku GeoTIFF, dane techniczne RTK, certyfikaty kalibracji — na żądanie.",
        "items": [
            {"q": "Jaka dokładność jest rzeczywiście osiągalna?",  "a": "RTK bez GCP — horyzontalna 2-3 cm, wertykalna 3-5 cm w warunkach Open Sky. Z 6-12 GCP — do < 1 cm horyzontalnie. Dla geodezji uprawnionej zalecamy GCP."},
            {"q": "Jaki układ współrzędnych obsługujecie?",        "a": "Standard — PL-2000 (państwowy). Możemy dostarczać też w PL-1992, ETRS89, WGS84, UTM. Reprojekcja przez QGIS / Civil 3D bez problemu."},
            {"q": "Czy raport jest podpisywany przez geodetę?",    "a": "Sam fotogrametryczny raport — nie wymaga podpisu geodety uprawnionego. Jeśli ma być częścią dokumentacji geodezyjnej (np. mapa do celów projektowych) — łączymy z geodetą partnerskim. Możemy dostarczyć tylko raw."},
            {"q": "Co dostaję dokładnie w 'modelu 3D'?",            "a": "Texturowaną siatkę .obj/.fbx, chmurę punktów .las/.e57 i zdjęcia. Otwiera się w Revit, Rhino, Blender, AutoCAD Civil 3D. Można mierzyć odległości i objętości bezpośrednio."},
            {"q": "Czy macie kamerę multispektralną?",              "a": "Tak — DJI Phantom 4 Multispectral dla rolnictwa precyzyjnego (NDVI, NDRE, GNDVI). Standardowo pracujemy z RGB, multispektralna na zamówienie."},
            {"q": "Działacie poza Warszawą?",                       "a": "Cała Polska. Dla obszarów > 5 ha dojazd w cenie. Mniejsze obszary — 2 PLN/km lub łączenie z innymi w okolicy."}
        ],
        "askMore": "Poproszę o próbkę"
    },
    "ctaBanner": {"title": "Macie obszar do pomiaru?", "titleItalic": "Zaplanujmy lot", "lead": "Wyślij współrzędne obszaru i wymagany format dostawy — w 24 h podamy plan lotu i wycenę."},
    "contactTitle": "Porozmawiajmy",
    "contactTitleItalic": "o pomiarze"
},
"en": {
    "meta": {
        "title": "Drone Orthophoto Maps & RTK Surveying Warsaw — VisionAir | PL-2000",
        "description": "Drone orthophoto maps and RTK surveying in Warsaw and across Poland. 2-3 cm accuracy in PL-2000, photogrammetry, 3D models, export to GeoTIFF / .las. For surveyors, designers and developers.",
        "keywords": "drone orthophoto Warsaw, RTK drone surveying, drone photogrammetry Poland, drone 3D model, PL-2000 orthophoto, drone surveying Europe",
        "ogTitle": "Drone Orthophoto & RTK Surveying — VisionAir Warsaw",
        "ogDescription": "2-3 cm accuracy in PL-2000, photogrammetry and 3D models for surveyors and designers.",
        "ogImageAlt": "Drone orthophoto map of a site in PL-2000",
        "schemaServiceType": "Aerial photogrammetry and RTK drone surveying",
        "schemaDescription": "Drone orthophoto maps and RTK surveying in Warsaw and Poland. 2-3 cm accuracy in PL-2000, photogrammetry, 3D models, EASA, Compensa VIG."
    },
    "breadcrumbCurrent": "Orthophoto Maps & RTK Surveying",
    "hero": {
        "eyebrow": "Warsaw · Poland · Europe",
        "h1": ["Orthophoto maps & surveys,", "2-3 cm accuracy"],
        "sub": "RTK drone with PPK module, orthophotos in PL-2000, photogrammetry, 3D models, export to GeoTIFF / .las / .obj. <strong>Surveyors · designers · developers</strong>. EASA, insured, permits.",
        "ctaPrimary": "See packages",
        "ctaGhost": "View pricing",
        "meta": {"objectsKey": "area", "objectsValue": "up to 200 ha", "deliveryKey": "delivery", "deliveryValue": "5-7 days", "ratingKey": "accuracy", "ratingValue": "RTK 2-3 cm", "permitsKey": "datum", "permitsValue": "PL-2000 / WGS84"}
    },
    "why": {
        "sectionLabel": "001 / Why drone",
        "title": "Surveyor + drone",
        "titleItalic": "= 10× faster",
        "lead": "Classical total-station survey of a 50 ha plot — 3-4 days, two surveyors. With an RTK drone — 90 minutes on site, 3 days processing. Comparable accuracy.",
        "body1": "We fly with an RTK module tied to GNSS. Every photo is geotagged at 2-3 cm in PL-2000. For surveyor-grade < 1 cm — we add 6-12 Ground Control Points.",
        "body2": "Processed in Pix4D Mapper and Agisoft Metashape. Export to GeoTIFF, .las, .e57, .obj. 3D models open in QGIS, AutoCAD, Revit, Civil 3D without conversion.",
        "stats": [
            {"v": "2-3", "k": "cm RTK accuracy",   "small": " cm"},
            {"v": "200", "k": "ha per flight",     "small": " ha"},
            {"v": "5-7", "k": "days to delivery",  "small": " days"},
            {"v": "GCP", "k": "to 1 cm precision", "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / What you get",
        "title": "Orthophoto, 3D model",
        "titleItalic": "and volume measurements",
        "lead": "Default set: PL-2000 orthophoto, photogrammetric 3D model, classified LAS point cloud, PDF report.",
        "items": [
            {"tag": "Format A", "title": "PL-2000 orthophoto",         "desc": "GeoTIFF + PDF, 1-3 cm/pixel, Polish state datum. Imports into QGIS / ArcGIS."},
            {"tag": "Format B", "title": "Photogrammetric 3D model",   "desc": "Textured mesh, export to .obj / .fbx. Studios import into Revit, Rhino, Blender."},
            {"tag": "Format C", "title": "LAS / LAZ point cloud",      "desc": "Classified cloud (ground, vegetation, buildings), export to .las / .e57 / .xyz."},
            {"tag": "Format D", "title": "DTM / DSM / DEM",            "desc": "Terrain (DTM), surface (DSM) and derived models (DEM). GeoTIFF with georeferencing."},
            {"tag": "Format E", "title": "Volume measurement",         "desc": "Cuts, heaps, stockpiles — automated m³ with ± 1-3% error. PDF with results."},
            {"tag": "Format F", "title": "Site inventory",             "desc": "Maps for design: land use, clashes, terrain profile, overhead utility lengths."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / For whom",
        "title": "Surveyors, designers,",
        "titleItalic": "developers",
        "lead": "Typical client: surveying firm. Second: design studio. Third: developer scouting a plot.",
        "items": [
            {"name": "Surveying firm",          "sub": "Inventory, volume, photogrammetry sub-contract"},
            {"name": "Design studio",           "sub": "Plot inventory, 3D model for design"},
            {"name": "Developer",               "sub": "Plot scan before purchase, terrain for valuation"},
            {"name": "Precision agriculture",   "sub": "Field NDVI, multispectral, fertilisation plan"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Packages",
        "title": "Packages by",
        "titleItalic": "area size",
        "lead": "Pricing scales with area and accuracy requirements. Areas > 200 ha — bespoke project.",
        "items": [
            {"name": "PLOT ≤ 5 ha",     "tagline": "Small plot / investment",         "price": "950 PLN",   "sub": "/ project",  "list": ["PL-2000 orthophoto", "3D model + DTM", "PDF report", "5-day delivery", "RTK 2-3 cm"], "featured": False},
            {"name": "AREA 5–50 ha",     "tagline": "Investment, farm",                "price": "2 400 PLN", "sub": "/ project",  "list": ["Full photogrammetry", "Ortho + DTM + DSM", "Classified LAS cloud", "Volume measurement", "BIM / CAD export"], "featured": True},
            {"name": "AREA > 50 ha",     "tagline": "Large investment, PV farm",       "price": "from 4 500 PLN","sub": "/ project","list": ["BVLOS up to 200 ha", "Full deliverable set", "GCP for 1 cm precision", "Tree inventory (LAS)", "Licensed surveyor consultation"], "featured": False}
        ],
        "selectCta": "Choose package",
        "note": "GCP for surveyor-grade < 1 cm precision included in AREA, available as add-on for smaller packages."
    },
    "process": {
        "sectionLabel": "005 / Process",
        "title": "From brief",
        "titleItalic": "to delivered map",
        "lead": "Drone surveying is 5 steps: brief, flight plan, flight, processing, delivery. Total time — 7-10 days.",
        "steps": [
            {"n": "01", "title": "Brief and requirements", "body": "Delivery format (GeoTIFF, .las, .obj), required accuracy, coordinate datum, report format.",                              "dur": "1-3 days"},
            {"n": "02", "title": "Flight plan and GCPs",   "body": "Grid flight plan, 80/70 overlap, GCP setup if < 1 cm precision is required.",                                              "dur": "2-5 days"},
            {"n": "03", "title": "Photogrammetric flight", "body": "Autopilot flight, 600-2000 photos depending on area. 50 ha — 90 minutes, 200 ha — 3-4 hours.",                            "dur": "60-240 min"},
            {"n": "04", "title": "Processing",             "body": "Pix4D Mapper or Agisoft Metashape, mosaicking, point cloud classification, DTM/DSM generation.",                          "dur": "2-3 days"},
            {"n": "05", "title": "Delivery",               "body": "Cloud delivery (Frame.io or WeTransfer), PDF report with metadata, online preview (potree / WebGL).",                     "dur": "5-7 days"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Surveyor and designer",
        "titleItalic": "questions",
        "lead": "Sample GeoTIFF, RTK spec, calibration certificates — on request.",
        "items": [
            {"q": "What accuracy is actually achievable?",       "a": "RTK without GCP — 2-3 cm horizontal, 3-5 cm vertical in Open Sky. With 6-12 GCPs — under 1 cm horizontal. Licensed surveying — we recommend GCPs."},
            {"q": "Which datums do you support?",                 "a": "Default — PL-2000 (Polish state). We also deliver in PL-1992, ETRS89, WGS84, UTM. Reprojection via QGIS / Civil 3D is trivial."},
            {"q": "Is the report signed by a licensed surveyor?", "a": "The photogrammetric report alone — no licensed surveyor signature required. If it must be part of licensed surveyor documentation, we partner with a surveying firm. We can also deliver raw only."},
            {"q": "What exactly is the '3D model'?",              "a": "Textured mesh .obj/.fbx, point cloud .las/.e57 and photos. Opens in Revit, Rhino, Blender, AutoCAD Civil 3D. Direct distance and volume measurement."},
            {"q": "Do you have a multispectral camera?",          "a": "Yes — DJI Phantom 4 Multispectral for precision agriculture (NDVI, NDRE, GNDVI). RGB by default, multispectral on request."},
            {"q": "Do you operate outside Warsaw?",               "a": "All of Poland. Areas > 5 ha — travel included. Smaller areas — 2 PLN/km or bundled with nearby projects."}
        ],
        "askMore": "Send me a sample"
    },
    "ctaBanner": {"title": "Got an area to survey?", "titleItalic": "Let's plan the flight", "lead": "Send the area coordinates and required delivery format — within 24 h we'll quote the flight plan and price."},
    "contactTitle": "Let's talk",
    "contactTitleItalic": "about the survey"
},
"ru": {
    "meta": {
        "title": "Ортофотомапы и пирометры RTK дроном Варшава — VisionAir | PL-2000",
        "description": "Ортофотомапы и RTK-пирометрия дроном в Варшаве и по Польше. Точность 2-3 см в системе PL-2000, фотограмметрия, 3D-модели, экспорт в GeoTIFF / .las. Для геодезистов, проектировщиков, девелоперов.",
        "keywords": "ортофотомапа с дрона Варшава, RTK дрон пирометрия, фотограмметрия дроном, 3D модель дрон, ортофото PL-2000, геодезия дроном Польша",
        "ogTitle": "Ортофотомапы и RTK дроном — VisionAir Warsaw",
        "ogDescription": "Точность 2-3 см в PL-2000, фотограмметрия и 3D-модели для геодезистов и проектировщиков.",
        "ogImageAlt": "Ортофотомапа территории с дрона в PL-2000",
        "schemaServiceType": "Aerial photogrammetry and RTK drone surveying",
        "schemaDescription": "Ортофотомапы и RTK-пирометрия дроном в Варшаве и Польше. Точность 2-3 см в PL-2000, фотограмметрия, 3D-модели, EASA, страховка Compensa VIG."
    },
    "breadcrumbCurrent": "Ортофотомапы и RTK-пирометрия",
    "hero": {
        "eyebrow": "Варшава · Польша · Европа",
        "h1": ["Ортофотомапы и обмеры,", "точность 2-3 см"],
        "sub": "RTK-дрон с PPK-модулем, ортофотомапы в PL-2000, фотограмметрия, 3D-модели, экспорт в GeoTIFF / .las / .obj. <strong>Геодезисты · проектировщики · девелоперы</strong>. EASA, страховка, разрешения.",
        "ctaPrimary": "Смотреть пакеты",
        "ctaGhost": "Открыть цены",
        "meta": {"objectsKey": "площадь", "objectsValue": "до 200 га", "deliveryKey": "сдача", "deliveryValue": "5-7 дней", "ratingKey": "точность", "ratingValue": "RTK 2-3 см", "permitsKey": "система", "permitsValue": "PL-2000 / WGS84"}
    },
    "why": {
        "sectionLabel": "001 / Зачем дрон",
        "title": "Геодезист + дрон",
        "titleItalic": "= в 10 раз быстрее",
        "lead": "Классическая тахеометрия 50 га — 3-4 дня, 2 геодезиста. С RTK-дроном — 90 минут на месте, 3 дня обработки. Точность сопоставима.",
        "body1": "Летаем с RTK-модулем, привязанным к GNSS. Каждое фото геотегировано с точностью 2-3 см в PL-2000. Для геодезической точности < 1 см — добавляем 6-12 GCP.",
        "body2": "Обработка в Pix4D Mapper и Agisoft Metashape. Экспорт в GeoTIFF, .las, .e57, .obj. 3D-модели открываются в QGIS, AutoCAD, Revit, Civil 3D без конверсии.",
        "stats": [
            {"v": "2-3", "k": "см точность RTK",     "small": " см"},
            {"v": "200", "k": "га за вылет",         "small": " га"},
            {"v": "5-7", "k": "дней до сдачи",       "small": " дн."},
            {"v": "GCP", "k": "до 1 см точности",    "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Что входит",
        "title": "Ортофотомапа, 3D-модель,",
        "titleItalic": "измерение объёмов",
        "lead": "Стандартный набор: ортофотомапа в PL-2000, фотограмметрическая 3D-модель, классифицированное LAS-облако, PDF-отчёт.",
        "items": [
            {"tag": "Формат A", "title": "Ортофотомапа PL-2000",       "desc": "GeoTIFF + PDF, разрешение 1-3 см/пиксель, польская государственная система. Импорт в QGIS / ArcGIS."},
            {"tag": "Формат B", "title": "Фотограмметрическая 3D",     "desc": "Текстурированная сетка, экспорт в .obj / .fbx. Импорт в Revit, Rhino, Blender."},
            {"tag": "Формат C", "title": "Облако точек LAS / LAZ",     "desc": "Классифицированное облако (поверхность, растительность, здания), экспорт в .las / .e57 / .xyz."},
            {"tag": "Формат D", "title": "DTM / DSM / DEM",            "desc": "Цифровая модель местности (DTM), поверхности (DSM) и производные (DEM). GeoTIFF с геопривязкой."},
            {"tag": "Формат E", "title": "Измерение объёмов",          "desc": "Котлованы, отвалы, склады — автоматический расчёт м³ с ошибкой ± 1-3%. PDF с результатами."},
            {"tag": "Формат F", "title": "Инвентаризация участка",    "desc": "Карты для проекта: использование земли, коллизии, профиль рельефа, длины воздушных коммуникаций."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Для кого",
        "title": "Геодезисты, проектировщики,",
        "titleItalic": "девелоперы",
        "lead": "Типичный клиент — геодезическая фирма, второй — проектное бюро, третий — девелопер при поиске участка.",
        "items": [
            {"name": "Геодезическая фирма",     "sub": "Инвентаризация, измерение объёмов, фотограмметрия на субподряд"},
            {"name": "Проектное бюро",          "sub": "Инвентаризация участка, 3D-модель для проекта"},
            {"name": "Девелопер",               "sub": "Скан участка перед покупкой, измерение для оценки"},
            {"name": "Точное земледелие",       "sub": "Карта поля NDVI, мультиспектральная, план удобрений"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Пакеты",
        "title": "Пакеты по",
        "titleItalic": "размеру площади",
        "lead": "Цена зависит от площади и требований точности. Для площадей > 200 га — индивидуальный проект.",
        "items": [
            {"name": "УЧАСТОК ≤ 5 га",     "tagline": "Малый участок / инвестиция",     "price": "950 PLN",   "sub": "/ проект",  "list": ["Ортофотомапа PL-2000", "3D-модель + DTM", "PDF-отчёт", "Сдача 5 дней", "RTK 2-3 см"], "featured": False},
            {"name": "ТЕРРИТОРИЯ 5–50 га",  "tagline": "Инвестиция, ферма",              "price": "2 400 PLN", "sub": "/ проект",  "list": ["Полная фотограмметрия", "Ортофото + DTM + DSM", "Классифицированное LAS", "Измерение объёмов", "Экспорт в BIM / CAD"], "featured": True},
            {"name": "ПЛОЩАДЬ > 50 га",     "tagline": "Большая инвестиция, ферма PV",   "price": "от 4 500 PLN","sub": "/ проект","list": ["BVLOS до 200 га", "Полный набор deliverable", "GCP до 1 см точности", "Инвентаризация деревьев (LAS)", "Консультация лицензированного геодезиста"], "featured": False}
        ],
        "selectCta": "Выбрать пакет",
        "note": "GCP для геодезической точности < 1 см включён в ПЛОЩАДЬ, как опция для меньших."
    },
    "process": {
        "sectionLabel": "005 / Процесс",
        "title": "От брифа",
        "titleItalic": "до готовой карты",
        "lead": "Дрон-обмер — 5 шагов: бриф, план полёта, полёт, обработка, сдача. Общее время — 7-10 дней.",
        "steps": [
            {"n": "01", "title": "Бриф и требования",      "body": "Формат сдачи (GeoTIFF, .las, .obj), требуемая точность, система координат, формат отчёта.",                              "dur": "1-3 дня"},
            {"n": "02", "title": "План полёта и GCP",      "body": "Сеточный план, overlap 80/70, установка GCP если требуется точность < 1 см.",                                              "dur": "2-5 дней"},
            {"n": "03", "title": "Фотограмметрический полёт","body": "Автопилот, 600-2000 фото в зависимости от площади. Для 50 га — 90 минут, для 200 га — 3-4 часа.",                       "dur": "60-240 мин"},
            {"n": "04", "title": "Обработка",              "body": "Pix4D Mapper или Agisoft Metashape, мозаикование, классификация облака, генерация DTM/DSM.",                              "dur": "2-3 дня"},
            {"n": "05", "title": "Сдача",                  "body": "Облако (Frame.io или WeTransfer), PDF-отчёт с метаданными, превью онлайн (potree / WebGL).",                              "dur": "5-7 дней"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Вопросы геодезистов",
        "titleItalic": "и проектировщиков",
        "lead": "Пример файла GeoTIFF, технические данные RTK, сертификаты калибровки — по запросу.",
        "items": [
            {"q": "Какая точность реально достижима?",         "a": "RTK без GCP — 2-3 см горизонтально, 3-5 см вертикально при Open Sky. С 6-12 GCP — < 1 см горизонтально. Для лицензированной геодезии рекомендуем GCP."},
            {"q": "Какие системы координат поддерживаете?",    "a": "Стандарт — PL-2000 (государственная). Также сдаём в PL-1992, ETRS89, WGS84, UTM. Репроекция через QGIS / Civil 3D — без проблем."},
            {"q": "Отчёт подписывает лицензированный геодезист?","a": "Сам фотограмметрический отчёт — без подписи лицензированного геодезиста. Если нужен в составе геодезической документации — партнёримся с геодезической фирмой. Можем сдать только raw."},
            {"q": "Что именно в '3D модели'?",                  "a": "Текстурированная сетка .obj/.fbx, облако точек .las/.e57 и фото. Открывается в Revit, Rhino, Blender, AutoCAD Civil 3D. Прямое измерение расстояний и объёмов."},
            {"q": "Есть мультиспектральная камера?",            "a": "Да — DJI Phantom 4 Multispectral для точного земледелия (NDVI, NDRE, GNDVI). RGB по умолчанию, мультиспектральная — на заказ."},
            {"q": "Работаете за пределами Варшавы?",            "a": "Вся Польша. Для площадей > 5 га — выезд в цене. Меньше — 2 PLN/км или объединение с соседними проектами."}
        ],
        "askMore": "Пришлите пример"
    },
    "ctaBanner": {"title": "Есть площадь для обмера?", "titleItalic": "Спланируем полёт", "lead": "Пришлите координаты площади и требуемый формат сдачи — за 24 часа подадим план полёта и стоимость."},
    "contactTitle": "Поговорим",
    "contactTitleItalic": "об обмере"
},
"uk": {
    "meta": {
        "title": "Ортофотомапи та обміри RTK дроном Варшава — VisionAir | PL-2000",
        "description": "Ортофотомапи та RTK-обміри дроном у Варшаві та по Польщі. Точність 2-3 см у системі PL-2000, фотограмметрія, 3D-моделі, експорт у GeoTIFF / .las. Для геодезистів, проєктувальників, девелоперів.",
        "keywords": "ортофотомапа з дрона Варшава, RTK дрон обмір, фотограмметрія дроном, 3D модель дрон, ортофото PL-2000, геодезія дроном Польща",
        "ogTitle": "Ортофотомапи та RTK дроном — VisionAir Warsaw",
        "ogDescription": "Точність 2-3 см у PL-2000, фотограмметрія та 3D-моделі для геодезистів та проєктувальників.",
        "ogImageAlt": "Ортофотомапа території з дрона у PL-2000",
        "schemaServiceType": "Aerial photogrammetry and RTK drone surveying",
        "schemaDescription": "Ортофотомапи та RTK-обміри дроном у Варшаві та Польщі. Точність 2-3 см у PL-2000, фотограмметрія, 3D-моделі, EASA, страхування Compensa VIG."
    },
    "breadcrumbCurrent": "Ортофотомапи та RTK-обміри",
    "hero": {
        "eyebrow": "Варшава · Польща · Європа",
        "h1": ["Ортофотомапи та обміри,", "точність 2-3 см"],
        "sub": "RTK-дрон з PPK-модулем, ортофотомапи в PL-2000, фотограмметрія, 3D-моделі, експорт у GeoTIFF / .las / .obj. <strong>Геодезисти · проєктувальники · девелопери</strong>. EASA, страхування, дозволи.",
        "ctaPrimary": "Дивитися пакети",
        "ctaGhost": "Відкрити ціни",
        "meta": {"objectsKey": "площа", "objectsValue": "до 200 га", "deliveryKey": "здача", "deliveryValue": "5-7 днів", "ratingKey": "точність", "ratingValue": "RTK 2-3 см", "permitsKey": "система", "permitsValue": "PL-2000 / WGS84"}
    },
    "why": {
        "sectionLabel": "001 / Навіщо дрон",
        "title": "Геодезист + дрон",
        "titleItalic": "= у 10 разів швидше",
        "lead": "Класична тахеометрія 50 га — 3-4 дні, 2 геодезисти. З RTK-дроном — 90 хвилин на місці, 3 дні обробки. Точність порівняна.",
        "body1": "Літаємо з RTK-модулем, привʼязаним до GNSS. Кожне фото геотеговане з точністю 2-3 см у PL-2000. Для геодезичної точності < 1 см — додаємо 6-12 GCP.",
        "body2": "Обробка у Pix4D Mapper та Agisoft Metashape. Експорт у GeoTIFF, .las, .e57, .obj. 3D-моделі відкриваються у QGIS, AutoCAD, Revit, Civil 3D без конверсії.",
        "stats": [
            {"v": "2-3", "k": "см точність RTK",     "small": " см"},
            {"v": "200", "k": "га за виліт",         "small": " га"},
            {"v": "5-7", "k": "днів до здачі",       "small": " дн."},
            {"v": "GCP", "k": "до 1 см точності",    "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Що входить",
        "title": "Ортофотомапа, 3D-модель,",
        "titleItalic": "вимірювання обʼємів",
        "lead": "Стандартний набір: ортофотомапа у PL-2000, фотограмметрична 3D-модель, класифіковане LAS-облако, PDF-звіт.",
        "items": [
            {"tag": "Формат A", "title": "Ортофотомапа PL-2000",       "desc": "GeoTIFF + PDF, роздільність 1-3 см/піксель, польська державна система. Імпорт у QGIS / ArcGIS."},
            {"tag": "Формат B", "title": "Фотограмметрична 3D",        "desc": "Текстурована сітка, експорт у .obj / .fbx. Імпорт у Revit, Rhino, Blender."},
            {"tag": "Формат C", "title": "Хмара точок LAS / LAZ",      "desc": "Класифікована хмара (поверхня, рослинність, будівлі), експорт у .las / .e57 / .xyz."},
            {"tag": "Формат D", "title": "DTM / DSM / DEM",            "desc": "Цифрова модель місцевості (DTM), поверхні (DSM) та похідні (DEM). GeoTIFF з геопривʼязкою."},
            {"tag": "Формат E", "title": "Вимірювання обʼємів",        "desc": "Котловани, відвали, склади — автоматичний розрахунок м³ з похибкою ± 1-3%. PDF з результатами."},
            {"tag": "Формат F", "title": "Інвентаризація ділянки",    "desc": "Карти для проєкту: використання землі, колізії, профіль рельєфу, довжини повітряних комунікацій."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Для кого",
        "title": "Геодезисти, проєктувальники,",
        "titleItalic": "девелопери",
        "lead": "Типовий клієнт — геодезична фірма, другий — проєктне бюро, третій — девелопер при пошуку ділянки.",
        "items": [
            {"name": "Геодезична фірма",       "sub": "Інвентаризація, вимірювання обʼємів, фотограмметрія на субпідряд"},
            {"name": "Проєктне бюро",          "sub": "Інвентаризація ділянки, 3D-модель для проєкту"},
            {"name": "Девелопер",              "sub": "Скан ділянки перед покупкою, вимірювання для оцінки"},
            {"name": "Точне землеробство",     "sub": "Карта поля NDVI, мультиспектральна, план добрив"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Пакети",
        "title": "Пакети за",
        "titleItalic": "розміром площі",
        "lead": "Ціна залежить від площі та вимог точності. Для площ > 200 га — індивідуальний проєкт.",
        "items": [
            {"name": "ДІЛЯНКА ≤ 5 га",      "tagline": "Мала ділянка / інвестиція",     "price": "950 PLN",   "sub": "/ проєкт",  "list": ["Ортофотомапа PL-2000", "3D-модель + DTM", "PDF-звіт", "Здача 5 днів", "RTK 2-3 см"], "featured": False},
            {"name": "ТЕРИТОРІЯ 5–50 га",    "tagline": "Інвестиція, ферма",             "price": "2 400 PLN", "sub": "/ проєкт",  "list": ["Повна фотограмметрія", "Ортофото + DTM + DSM", "Класифіковане LAS", "Вимірювання обʼємів", "Експорт у BIM / CAD"], "featured": True},
            {"name": "ПЛОЩА > 50 га",        "tagline": "Велика інвестиція, ферма PV",   "price": "від 4 500 PLN","sub": "/ проєкт","list": ["BVLOS до 200 га", "Повний набір deliverable", "GCP до 1 см точності", "Інвентаризація дерев (LAS)", "Консультація ліцензованого геодезиста"], "featured": False}
        ],
        "selectCta": "Обрати пакет",
        "note": "GCP для геодезичної точності < 1 см включено у ПЛОЩА, як опція для менших."
    },
    "process": {
        "sectionLabel": "005 / Процес",
        "title": "Від брифу",
        "titleItalic": "до готової мапи",
        "lead": "Дрон-обмір — 5 кроків: бриф, план польоту, політ, обробка, здача. Загальний час — 7-10 днів.",
        "steps": [
            {"n": "01", "title": "Бриф та вимоги",          "body": "Формат здачі (GeoTIFF, .las, .obj), необхідна точність, система координат, формат звіту.",                                "dur": "1-3 дні"},
            {"n": "02", "title": "План польоту та GCP",     "body": "Сітковий план, overlap 80/70, встановлення GCP якщо потрібна точність < 1 см.",                                          "dur": "2-5 днів"},
            {"n": "03", "title": "Фотограмметричний політ","body": "Автопілот, 600-2000 фото залежно від площі. Для 50 га — 90 хвилин, для 200 га — 3-4 години.",                              "dur": "60-240 хв"},
            {"n": "04", "title": "Обробка",                 "body": "Pix4D Mapper або Agisoft Metashape, мозаювання, класифікація хмари, генерація DTM/DSM.",                                  "dur": "2-3 дні"},
            {"n": "05", "title": "Здача",                   "body": "Хмара (Frame.io або WeTransfer), PDF-звіт з метаданими, превʼю онлайн (potree / WebGL).",                                "dur": "5-7 днів"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Питання геодезистів",
        "titleItalic": "та проєктувальників",
        "lead": "Приклад файлу GeoTIFF, технічні дані RTK, сертифікати калібрації — на запит.",
        "items": [
            {"q": "Яка точність реально досяжна?",                "a": "RTK без GCP — 2-3 см горизонтально, 3-5 см вертикально при Open Sky. З 6-12 GCP — < 1 см горизонтально. Для ліцензованої геодезії рекомендуємо GCP."},
            {"q": "Які системи координат підтримуєте?",           "a": "Стандарт — PL-2000 (державна). Також здаємо у PL-1992, ETRS89, WGS84, UTM. Репроєкція через QGIS / Civil 3D — без проблем."},
            {"q": "Звіт підписує ліцензований геодезист?",        "a": "Сам фотограмметричний звіт — без підпису ліцензованого геодезиста. Якщо потрібен у складі геодезичної документації — партнеримось з геодезичною фірмою. Можемо здати лише raw."},
            {"q": "Що саме у '3D моделі'?",                       "a": "Текстурована сітка .obj/.fbx, хмара точок .las/.e57 та фото. Відкривається у Revit, Rhino, Blender, AutoCAD Civil 3D. Пряме вимірювання відстаней та обʼємів."},
            {"q": "Є мультиспектральна камера?",                  "a": "Так — DJI Phantom 4 Multispectral для точного землеробства (NDVI, NDRE, GNDVI). RGB за замовчуванням, мультиспектральна — на замовлення."},
            {"q": "Працюєте поза Варшавою?",                      "a": "Уся Польща. Для площ > 5 га — виїзд у ціні. Менші — 2 PLN/км або обʼєднання з сусідніми проєктами."}
        ],
        "askMore": "Надішліть приклад"
    },
    "ctaBanner": {"title": "Є площа для обміру?", "titleItalic": "Сплануємо політ", "lead": "Надішліть координати площі та необхідний формат здачі — за 24 години подамо план польоту та вартість."},
    "contactTitle": "Поговорімо",
    "contactTitleItalic": "про обмір"
}
}
