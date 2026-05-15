"""Construction monitoring & RTK drone surveys — i18n payload."""

SLUG = "budownictwo"

DATA = {
"pl": {
    "meta": {
        "title": "Monitoring budowy dronem Warszawa — VisionAir | RTK 2-3 cm",
        "description": "Monitoring budowy dronem w Warszawie i Mazowieckim. RTK 2-3 cm dokładność, ortofotomapy w układzie PL-2000, timelapse, raporty PDF. Abonamenty dla deweloperów i banków. EASA, OC Compensa.",
        "keywords": "monitoring budowy dronem Warszawa, inspekcja budowy z powietrza, RTK dron, ortofotomapa budowa, timelapse budowy, dron dla dewelopera, dron geodezja",
        "ogTitle": "Monitoring budowy dronem — VisionAir Warsaw",
        "ogDescription": "RTK 2-3 cm, ortofotomapy PL-2000, timelapse i raporty PDF dla deweloperów i banków.",
        "ogImageAlt": "Ortofotomapa budowy z drona w Warszawie",
        "schemaServiceType": "Aerial construction monitoring and RTK surveying",
        "schemaDescription": "Monitoring postępu budowy dronem w Warszawie i całej Polsce. RTK 2-3 cm, ortofotomapy PL-2000, timelapse, raporty PDF, EASA, OC Compensa VIG."
    },
    "breadcrumbCurrent": "Monitoring budowy dronem",
    "hero": {
        "eyebrow": "Warszawa · Mazowieckie · Polska",
        "h1": ["Monitoring budowy z drona,", "raporty co miesiąc"],
        "sub": "RTK 2-3 cm dokładność, ortofotomapy w PL-2000, timelapse postępu, raporty PDF dla banku i inwestora. <strong>Abonamenty miesięczne</strong> dla deweloperów. EASA, OC, zgody CTR po naszej stronie.",
        "ctaPrimary": "Sprawdź pakiety",
        "ctaGhost": "Zobacz cennik",
        "meta": {"objectsKey": "skala", "objectsValue": "do 50 ha", "deliveryKey": "raport", "deliveryValue": "5 dni", "ratingKey": "dokładność", "ratingValue": "RTK 2-3 cm", "permitsKey": "układ", "permitsValue": "PL-2000 / WGS84"}
    },
    "why": {
        "sectionLabel": "001 / Dlaczego dron na budowie",
        "title": "Cała budowa w jednym ujęciu,",
        "titleItalic": "co miesiąc",
        "lead": "Bank chce raportu postępu, inwestor chce ortofotomapy, kierownik chce timelapse'a. Z jednej wizyty dronem na budowie wszystkie trzy są gotowe.",
        "body1": "Latamy dronem z modułem RTK (Real-Time Kinematic), który daje dokładność horyzontalną 2-3 cm. To wystarczająco precyzyjne, by mierzyć ilość urobku z hałdy lub objętość wykopu — bez geodety.",
        "body2": "Mamy doświadczenie z bankami: raporty PDF z porównaniem do harmonogramu, znacznikami GPS, datami i prognozą do następnego etapu. Wystarczy podpisać NDA i wpisać nas do listy zaufanych podwykonawców.",
        "stats": [
            {"v": "2-3", "k": "cm dokładność RTK", "small": " cm"},
            {"v": "50",  "k": "hektarów na lot",   "small": " ha"},
            {"v": "5",   "k": "dni do raportu",    "small": " dni"},
            {"v": "B2B", "k": "abonament dla devów","small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Co dostajesz",
        "title": "Ortofotomapy, modele 3D",
        "titleItalic": "i raport postępu",
        "lead": "Każda wizyta dronem zamyka się trzema deliverable'ami: ortofotomapa, model 3D, raport PDF do banku.",
        "items": [
            {"tag": "Format A", "title": "Ortofotomapa PL-2000",        "desc": "Mozaika georeferencowana w państwowym układzie współrzędnych, rozdzielczość 1-2 cm/piksel. GeoTIFF + PDF."},
            {"tag": "Format B", "title": "Model 3D / fotogrametria",   "desc": "Texturowana siatka 3D budowy, eksport do .obj / .fbx / .las. Importujemy do BIM / Revit / AutoCAD."},
            {"tag": "Format C", "title": "Pomiar objętości",            "desc": "Hałdy, wykopy, składowiska — automatyczne obliczenie objętości, raport PDF z m³."},
            {"tag": "Format D", "title": "Timelapse postępu",           "desc": "Stała pozycja, identyczna godzina — montaż 12-30 miesięcy w 60-sekundowy film inwestycyjny."},
            {"tag": "Format E", "title": "Raport PDF do banku",         "desc": "Standardowy format akceptowany przez polskie banki, porównanie z harmonogramem, znaczniki GPS."},
            {"tag": "Format F", "title": "Inspekcja termowizyjna",      "desc": "Opcjonalnie — termowizja izolacji, dachów, ciepłownictwa w pakiecie z pomiarem."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Dla kogo",
        "title": "Deweloperzy, banki,",
        "titleItalic": "GW i pracownie",
        "lead": "Standardowy klient — deweloper z 2-5 inwestycjami w realizacji. Drugie miejsce — generalny wykonawca, trzecie — bank finansujący.",
        "items": [
            {"name": "Deweloper mieszkaniowy",  "sub": "Abonament: miesięczna wizyta, raport, timelapse"},
            {"name": "Generalny wykonawca",     "sub": "Pomiary objętości, postęp, kontrola jakości"},
            {"name": "Bank finansujący",        "sub": "Raporty PDF do uwolnienia transz finansowania"},
            {"name": "Pracownia architektoniczna","sub": "Inwentaryzacja, model 3D do projektowania"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Pakiety",
        "title": "Wizyta jednorazowa",
        "titleItalic": "lub abonament",
        "lead": "Wizyta jednorazowa to pomiar pod konkretne potrzeby. Abonament dla deweloperów — 12 miesięcy z miesięcznym raportem.",
        "items": [
            {"name": "WIZYTA",     "tagline": "Jednorazowa, do 5 ha",        "price": "900 PLN",    "sub": "/ wizyta",  "list": ["Do 5 ha skanowanie", "Ortofotomapa PL-2000", "Raport PDF podstawowy", "Dostawa 5 dni", "RTK 2-3 cm"], "featured": False},
            {"name": "ABONAMENT",  "tagline": "12 miesięcy, 1 wizyta / msc", "price": "850 PLN",    "sub": "/ msc",     "list": ["1 wizyta miesięcznie", "Ortofotomapa + model 3D", "Raport bankowy", "Timelapse roczny", "Faktura miesięczna", "Stały operator"], "featured": True},
            {"name": "PROJEKT",    "tagline": "Do 50 ha + fotogrametria",    "price": "od 3 200 PLN","sub": "/ wizyta",  "list": ["Do 50 ha skanowanie", "Model 3D + .las / .obj", "Pomiar objętości", "Termowizja opcjonalnie", "Eksport do BIM"], "featured": False}
        ],
        "selectCta": "Wybierz pakiet",
        "note": "Abonament 12 miesięcy — 10% zniżki, dwie inwestycje na jednej fakturze."
    },
    "process": {
        "sectionLabel": "005 / Proces",
        "title": "Od kick-off",
        "titleItalic": "do comiesięcznego raportu",
        "lead": "Pierwsza wizyta jest dłuższa — ustalamy punkty kontrolne i punkty startowe lotu. Kolejne — to powtarzalna procedura.",
        "steps": [
            {"n": "01", "title": "Kick-off i punkty GCP",   "body": "Pierwsza wizyta: ustalenie 6-12 punktów Ground Control, kalibracja RTK do układu PL-2000, foto bazowe.",          "dur": "2-4 h"},
            {"n": "02", "title": "Comiesięczna wizyta",     "body": "Powtarzamy ten sam plan lotu o tej samej godzinie — kluczowe dla timelapse'a i porównania. 60-90 minut na placu.","dur": "60-90 min"},
            {"n": "03", "title": "Processing fotogrametrii","body": "Mozaika ortofoto + model 3D w Pix4D / Agisoft, eksport do GeoTIFF, .las, .obj.",                                  "dur": "2-3 dni"},
            {"n": "04", "title": "Raport PDF",              "body": "Porównanie z poprzednim miesiącem, postęp w %, pomiary objętości, znaczniki problemów do uwagi banku.",          "dur": "2 dni"},
            {"n": "05", "title": "Dostawa",                 "body": "Pliki na chmurze (Frame.io lub klientowski OneDrive), raport PDF mailem, podgląd online.",                       "dur": "5 dni"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Pytania",
        "titleItalic": "deweloperów i banków",
        "lead": "Pełna dokumentacja techniczna, polisy OC, certyfikaty RTK — PDF na żądanie.",
        "items": [
            {"q": "Jaką dokładność daje RTK na budowie?",         "a": "Horyzontalna 2-3 cm, wertykalna 3-5 cm w warunkach Open Sky. To wystarczające do raportowania postępu, pomiaru objętości hałd, wykrywania odchyleń od projektu. Dla precyzji geodezyjnej < 1 cm — używamy GCP."},
            {"q": "Czy raport jest akceptowany przez banki?",     "a": "Tak. Pracujemy regularnie z PKO BP, mBank, Pekao, Millennium. Format raportu jest dostosowany do uwolnienia transz finansowania, zawiera znaczniki GPS, daty, podpis kwalifikowany operatora."},
            {"q": "Co z BIM-em i Revitem?",                       "a": "Eksportujemy model 3D do .obj, .fbx, .las i .e57. Pracownie najczęściej importują przez Revit lub Rhino. Texturowana siatka pozwala mierzyć odległości i objętości bezpośrednio w pracowni."},
            {"q": "Czy można zmierzyć objętość urobku?",          "a": "Tak — to standardowy deliverable. Skanujemy hałdę, porównujemy z poprzednim skanem, dajemy raport z m³ i błędem ± 1-3%. Dla bilansu masowego — w sam raz."},
            {"q": "Jak działa abonament miesięczny?",             "a": "Wybierasz dzień (zwykle pierwszy poniedziałek miesiąca), my pojawiamy się sami, latamy, raportujemy. Faktura miesięczna VAT, dwie inwestycje można połączyć — zniżka 10%."},
            {"q": "Co jeśli plac jest w strefie CTR EPWA?",       "a": "Załatwiamy zgodę przez PAŻP w 5-14 dni. To w cenie pakietu, nie naliczamy oddzielnie. Mamy historię zgód z 20+ inwestycji w strefie EPWA i EPBC."}
        ],
        "askMore": "Mam inne pytanie"
    },
    "ctaBanner": {"title": "Macie nową inwestycję?", "titleItalic": "Zacznijmy od kick-off", "lead": "Pierwsza wizyta z kalibracją RTK do układu lokalnego zajmuje 2-4 godziny. Później miesięczna procedura w 90 minut."},
    "contactTitle": "Porozmawiajmy",
    "contactTitleItalic": "o Waszej inwestycji"
},
"en": {
    "meta": {
        "title": "Construction Drone Monitoring Warsaw — VisionAir | RTK 2-3 cm",
        "description": "Construction drone monitoring in Warsaw and across Poland. RTK 2-3 cm accuracy, orthophoto maps in PL-2000, timelapse, PDF reports. Monthly subscriptions for developers and banks. EASA, Compensa insurance.",
        "keywords": "construction drone monitoring Warsaw, RTK drone Poland, construction site survey, drone orthophoto, construction timelapse, developer drone services",
        "ogTitle": "Construction Drone Monitoring — VisionAir Warsaw",
        "ogDescription": "RTK 2-3 cm, PL-2000 orthophotos, timelapse and PDF reports for developers and banks.",
        "ogImageAlt": "Aerial orthophoto of a construction site in Warsaw",
        "schemaServiceType": "Aerial construction monitoring and RTK surveying",
        "schemaDescription": "Construction progress monitoring by drone in Warsaw and across Poland. RTK 2-3 cm, PL-2000 orthophoto, timelapse, PDF reports, EASA, Compensa VIG."
    },
    "breadcrumbCurrent": "Construction Drone Monitoring",
    "hero": {
        "eyebrow": "Warsaw · Mazovia · Poland",
        "h1": ["Construction progress", "from above, monthly"],
        "sub": "RTK 2-3 cm accuracy, PL-2000 orthophotos, progress timelapse, PDF reports for the bank and investor. <strong>Monthly subscriptions</strong> for developers. EASA, insured, CTR permits on us.",
        "ctaPrimary": "See packages",
        "ctaGhost": "View pricing",
        "meta": {"objectsKey": "scale", "objectsValue": "up to 50 ha", "deliveryKey": "report", "deliveryValue": "5 days", "ratingKey": "accuracy", "ratingValue": "RTK 2-3 cm", "permitsKey": "datum", "permitsValue": "PL-2000 / WGS84"}
    },
    "why": {
        "sectionLabel": "001 / Why drone on a build",
        "title": "Whole site in one frame,",
        "titleItalic": "every month",
        "lead": "The bank wants a progress report, the investor wants an orthophoto, the site manager wants a timelapse. One drone visit produces all three.",
        "body1": "We fly drones with Real-Time Kinematic (RTK), 2-3 cm horizontal accuracy. Precise enough to measure spoil heap volume or excavation cut — no surveyor needed.",
        "body2": "Bank experience: PDF reports comparing schedule vs. actual, GPS markers, dates, next-stage forecast. NDA and you're on the trusted-vendor list.",
        "stats": [
            {"v": "2-3", "k": "cm RTK accuracy",   "small": " cm"},
            {"v": "50",  "k": "hectares per flight","small": " ha"},
            {"v": "5",   "k": "days to report",    "small": " days"},
            {"v": "B2B", "k": "developer subscription","small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / What you get",
        "title": "Orthophotos, 3D models",
        "titleItalic": "and a progress report",
        "lead": "Every drone visit produces three deliverables: orthophoto, 3D model, bank-grade PDF report.",
        "items": [
            {"tag": "Format A", "title": "PL-2000 orthophoto",         "desc": "Georeferenced mosaic in the Polish state grid, 1-2 cm/pixel. GeoTIFF + PDF."},
            {"tag": "Format B", "title": "3D model / photogrammetry", "desc": "Textured mesh, export to .obj / .fbx / .las. Imports into BIM / Revit / AutoCAD."},
            {"tag": "Format C", "title": "Volume measurement",         "desc": "Spoil heaps, cuts, stockpiles — automated volume, PDF with m³."},
            {"tag": "Format D", "title": "Progress timelapse",         "desc": "Same position, same hour — 12-30 months edited into a 60-second investor film."},
            {"tag": "Format E", "title": "Bank-grade PDF report",      "desc": "Standard format accepted by Polish banks, schedule comparison, GPS markers."},
            {"tag": "Format F", "title": "Thermal inspection",         "desc": "Optional — thermal of insulation, roofs, district heating bundled with the survey."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / For whom",
        "title": "Developers, banks,",
        "titleItalic": "GCs and design studios",
        "lead": "Typical client: developer with 2-5 active investments. Second: general contractor. Third: financing bank.",
        "items": [
            {"name": "Residential developer", "sub": "Subscription: monthly visit, report, timelapse"},
            {"name": "General contractor",    "sub": "Volume measurement, progress, quality control"},
            {"name": "Financing bank",        "sub": "PDF reports to release financing tranches"},
            {"name": "Architecture studio",   "sub": "Survey + 3D model for design"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Packages",
        "title": "Single visit",
        "titleItalic": "or subscription",
        "lead": "One-off visit for specific needs. Subscription for developers — 12 months with a monthly report.",
        "items": [
            {"name": "SINGLE",       "tagline": "One-off, up to 5 ha",       "price": "900 PLN",    "sub": "/ visit",  "list": ["Up to 5 ha scan", "PL-2000 orthophoto", "Basic PDF report", "5-day delivery", "RTK 2-3 cm"], "featured": False},
            {"name": "SUBSCRIPTION", "tagline": "12 months, monthly visit",  "price": "850 PLN",    "sub": "/ month",  "list": ["1 visit per month", "Orthophoto + 3D model", "Bank-grade report", "Annual timelapse", "Monthly invoice", "Dedicated operator"], "featured": True},
            {"name": "PROJECT",      "tagline": "Up to 50 ha + photogrammetry","price": "from 3 200 PLN","sub": "/ visit","list": ["Up to 50 ha scan", "3D model + .las / .obj", "Volume measurement", "Optional thermal", "BIM export"], "featured": False}
        ],
        "selectCta": "Choose package",
        "note": "12-month subscription — 10% off, two investments on one invoice."
    },
    "process": {
        "sectionLabel": "005 / Process",
        "title": "From kick-off",
        "titleItalic": "to monthly report",
        "lead": "The first visit is longer — we set GCPs and the flight plan. Subsequent visits are a repeatable procedure.",
        "steps": [
            {"n": "01", "title": "Kick-off and GCPs",       "body": "First visit: 6-12 Ground Control Points, RTK calibration to local datum, baseline photos.",                       "dur": "2-4 h"},
            {"n": "02", "title": "Monthly visit",           "body": "Same flight plan, same hour — critical for timelapse and comparison. 60-90 minutes on site.",                     "dur": "60-90 min"},
            {"n": "03", "title": "Photogrammetry processing","body": "Mosaic + 3D in Pix4D / Agisoft, export to GeoTIFF, .las, .obj.",                                                "dur": "2-3 days"},
            {"n": "04", "title": "PDF report",              "body": "Month-over-month delta, % progress, volume measurements, flags for the bank.",                                  "dur": "2 days"},
            {"n": "05", "title": "Delivery",                "body": "Cloud delivery (Frame.io or your OneDrive), PDF report via email, online preview.",                              "dur": "5 days"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Developer and bank",
        "titleItalic": "questions",
        "lead": "Full technical docs, liability policies, RTK certificates — PDF on request.",
        "items": [
            {"q": "What accuracy does RTK deliver on a build?",   "a": "2-3 cm horizontal, 3-5 cm vertical under Open Sky. Enough for progress reporting, spoil heap volume, deviation detection. Surveyor-grade < 1 cm — we add GCPs."},
            {"q": "Do banks accept your reports?",               "a": "Yes. Regular work with PKO BP, mBank, Pekao, Millennium. Report format aligns with tranche-release requirements, includes GPS markers, dates, qualified operator signature."},
            {"q": "BIM and Revit?",                              "a": "3D model exports to .obj, .fbx, .las and .e57. Studios usually import via Revit or Rhino. Textured mesh supports direct measurement of distances and volumes."},
            {"q": "Can you measure spoil volume?",               "a": "Yes — standard deliverable. We scan the heap, compare to the previous scan, deliver m³ with ± 1-3% error. Good enough for mass balance."},
            {"q": "How does the monthly subscription work?",     "a": "Pick a day (usually first Monday), we show up on our own, fly, report. Monthly VAT invoice, two investments can share one invoice — 10% discount."},
            {"q": "What if the site is in CTR EPWA?",            "a": "We process PAŻP clearance in 5-14 days. Included in the package, no separate billing. 20+ approvals in EPWA and EPBC zones."}
        ],
        "askMore": "I have another question"
    },
    "ctaBanner": {"title": "New project on the way?", "titleItalic": "Let's start with kick-off", "lead": "First visit with RTK calibration to local datum takes 2-4 hours. Monthly visits drop to 90 minutes."},
    "contactTitle": "Let's talk",
    "contactTitleItalic": "about your project"
},
"ru": {
    "meta": {
        "title": "Мониторинг стройки дроном Варшава — VisionAir | RTK 2-3 см",
        "description": "Мониторинг стройки дроном в Варшаве и по Польше. RTK 2-3 см точность, ортофотомапы в PL-2000, timelapse, PDF-отчёты. Абонементы для девелоперов и банков. EASA, страховка Compensa.",
        "keywords": "мониторинг стройки дроном Варшава, RTK дрон Польша, инспекция стройки с воздуха, ортофотомапа стройка, timelapse стройки, дрон для девелопера",
        "ogTitle": "Мониторинг стройки дроном — VisionAir Warsaw",
        "ogDescription": "RTK 2-3 см, ортофотомапы PL-2000, timelapse и PDF-отчёты для девелоперов и банков.",
        "ogImageAlt": "Ортофотомапа стройки с дрона в Варшаве",
        "schemaServiceType": "Aerial construction monitoring and RTK surveying",
        "schemaDescription": "Мониторинг стройки дроном в Варшаве и по Польше. RTK 2-3 см, ортофотомапы PL-2000, timelapse, PDF-отчёты, EASA, страховка Compensa VIG."
    },
    "breadcrumbCurrent": "Мониторинг стройки",
    "hero": {
        "eyebrow": "Варшава · Мазовия · Польша",
        "h1": ["Мониторинг стройки с дрона,", "отчёты каждый месяц"],
        "sub": "RTK 2-3 см точность, ортофотомапы в PL-2000, timelapse прогресса, PDF-отчёты для банка и инвестора. <strong>Месячные абонементы</strong> для девелоперов. EASA, страховка, разрешения за нас.",
        "ctaPrimary": "Смотреть пакеты",
        "ctaGhost": "Открыть цены",
        "meta": {"objectsKey": "масштаб", "objectsValue": "до 50 га", "deliveryKey": "отчёт", "deliveryValue": "5 дней", "ratingKey": "точность", "ratingValue": "RTK 2-3 см", "permitsKey": "система", "permitsValue": "PL-2000 / WGS84"}
    },
    "why": {
        "sectionLabel": "001 / Зачем дрон на стройке",
        "title": "Вся стройка в одном кадре,",
        "titleItalic": "ежемесячно",
        "lead": "Банк хочет отчёт о прогрессе, инвестор — ортофотомапу, прораб — timelapse. Одна выезд дрона = все три deliverable.",
        "body1": "Летаем с модулем RTK (Real-Time Kinematic), горизонтальная точность 2-3 см. Достаточно для измерения объёма отвалов или котлованов без геодезиста.",
        "body2": "Опыт с банками: PDF-отчёты с сравнением план/факт, GPS-метками, датами, прогнозом следующего этапа. NDA — и вы в списке доверенных подрядчиков.",
        "stats": [
            {"v": "2-3", "k": "см точность RTK",       "small": " см"},
            {"v": "50",  "k": "гектаров за вылет",     "small": " га"},
            {"v": "5",   "k": "дней до отчёта",        "small": " дн."},
            {"v": "B2B", "k": "абонемент для девов",   "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Что входит",
        "title": "Ортофотомапы, 3D-модели",
        "titleItalic": "и отчёт прогресса",
        "lead": "Каждый выезд дрона закрывается тремя deliverable: ортофотомапа, 3D-модель, банковский PDF-отчёт.",
        "items": [
            {"tag": "Формат A", "title": "Ортофотомапа PL-2000",       "desc": "Геопривязанная мозаика в польской системе координат, 1-2 см/пиксель. GeoTIFF + PDF."},
            {"tag": "Формат B", "title": "3D-модель / фотограмметрия", "desc": "Текстурированная сетка, экспорт в .obj / .fbx / .las. Импорт в BIM / Revit / AutoCAD."},
            {"tag": "Формат C", "title": "Измерение объёмов",          "desc": "Отвалы, котлованы, склады — автоматический расчёт м³ с погрешностью ± 1-3%."},
            {"tag": "Формат D", "title": "Timelapse прогресса",        "desc": "Одна позиция, тот же час — 12-30 месяцев в 60-секундный инвестиционный фильм."},
            {"tag": "Формат E", "title": "PDF-отчёт для банка",         "desc": "Стандартный формат, принимаемый польскими банками, сравнение с графиком, GPS-метки."},
            {"tag": "Формат F", "title": "Термовизия",                 "desc": "Опционально — термовизия изоляции, крыш, теплосетей в пакете с измерением."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Для кого",
        "title": "Девелоперы, банки,",
        "titleItalic": "ГП и архбюро",
        "lead": "Стандартный клиент — девелопер с 2-5 объектами в работе. Второе место — генподрядчик, третье — финансирующий банк.",
        "items": [
            {"name": "Жилой девелопер",  "sub": "Абонемент: ежемесячный выезд, отчёт, timelapse"},
            {"name": "Генподрядчик",     "sub": "Измерения объёма, прогресс, контроль качества"},
            {"name": "Финансирующий банк","sub": "PDF-отчёты для разблокировки траншей"},
            {"name": "Архбюро",          "sub": "Обмер + 3D-модель для проектирования"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Пакеты",
        "title": "Разовый выезд",
        "titleItalic": "или абонемент",
        "lead": "Разовый — под конкретную задачу. Абонемент для девелоперов — 12 месяцев с ежемесячным отчётом.",
        "items": [
            {"name": "ВЫЕЗД",      "tagline": "Разовый, до 5 га",            "price": "900 PLN",    "sub": "/ выезд", "list": ["До 5 га скан", "Ортофотомапа PL-2000", "Базовый PDF-отчёт", "Сдача 5 дней", "RTK 2-3 см"], "featured": False},
            {"name": "АБОНЕМЕНТ",  "tagline": "12 месяцев, 1 выезд / мес",   "price": "850 PLN",    "sub": "/ мес",   "list": ["1 выезд в месяц", "Ортофото + 3D-модель", "Банковский отчёт", "Годовой timelapse", "Ежемесячный счёт", "Закреплённый оператор"], "featured": True},
            {"name": "ПРОЕКТ",     "tagline": "До 50 га + фотограмметрия",    "price": "от 3 200 PLN","sub": "/ выезд","list": ["До 50 га скан", "3D-модель + .las / .obj", "Измерение объёмов", "Опция термовизии", "Экспорт в BIM"], "featured": False}
        ],
        "selectCta": "Выбрать пакет",
        "note": "Абонемент 12 мес — скидка 10%, две стройки в одном счёте."
    },
    "process": {
        "sectionLabel": "005 / Процесс",
        "title": "От kick-off",
        "titleItalic": "до ежемесячного отчёта",
        "lead": "Первый выезд длиннее — ставим GCP и план полёта. Последующие — повторяемая процедура.",
        "steps": [
            {"n": "01", "title": "Kick-off и GCP",         "body": "Первый выезд: 6-12 точек Ground Control, калибровка RTK к локальной системе, базовые фото.",                      "dur": "2-4 ч"},
            {"n": "02", "title": "Ежемесячный выезд",     "body": "Тот же план полёта, тот же час — критично для timelapse и сравнения. 60-90 минут на площадке.",                  "dur": "60-90 мин"},
            {"n": "03", "title": "Обработка",              "body": "Мозаика + 3D в Pix4D / Agisoft, экспорт в GeoTIFF, .las, .obj.",                                                  "dur": "2-3 дня"},
            {"n": "04", "title": "PDF-отчёт",              "body": "Дельта месяц-к-месяцу, % прогресса, объёмы, метки проблем для банка.",                                            "dur": "2 дня"},
            {"n": "05", "title": "Сдача",                  "body": "Облако (Frame.io или ваш OneDrive), PDF-отчёт по почте, превью онлайн.",                                         "dur": "5 дней"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Вопросы",
        "titleItalic": "девелоперов и банков",
        "lead": "Полная техдокументация, страховки, сертификаты RTK — PDF по запросу.",
        "items": [
            {"q": "Какую точность даёт RTK на стройке?",         "a": "Горизонтальная 2-3 см, вертикальная 3-5 см при Open Sky. Достаточно для отчётов прогресса, объёмов отвалов, выявления отклонений. Для геодезической точности < 1 см — добавляем GCP."},
            {"q": "Банки принимают ваши отчёты?",                "a": "Да. Регулярно работаем с PKO BP, mBank, Pekao, Millennium. Формат отчёта соответствует требованиям для разблокировки траншей, содержит GPS-метки, даты, КЭП оператора."},
            {"q": "BIM и Revit?",                                "a": "Экспорт 3D в .obj, .fbx, .las и .e57. Архбюро чаще импортируют через Revit или Rhino. Текстурированная сетка позволяет измерять расстояния и объёмы напрямую."},
            {"q": "Можно измерить объём отвала?",                "a": "Да — стандартный deliverable. Сканируем отвал, сравниваем с предыдущим, даём м³ с погрешностью ± 1-3%. Достаточно для массового баланса."},
            {"q": "Как работает месячный абонемент?",            "a": "Выбираете день (обычно первый понедельник), мы приезжаем сами, летаем, отчитываемся. Месячный счёт VAT, две стройки в один счёт — скидка 10%."},
            {"q": "Если стройка в зоне CTR EPWA?",                "a": "Оформляем разрешение в PAŻP за 5-14 дней. Это в пакете, не выставляется отдельно. 20+ согласований в зонах EPWA и EPBC."}
        ],
        "askMore": "У меня есть другой вопрос"
    },
    "ctaBanner": {"title": "Новый объект на старте?", "titleItalic": "Начнём с kick-off", "lead": "Первый выезд с калибровкой RTK к локальной системе — 2-4 часа. Дальше ежемесячный визит за 90 минут."},
    "contactTitle": "Поговорим",
    "contactTitleItalic": "о вашей стройке"
},
"uk": {
    "meta": {
        "title": "Моніторинг будівництва дроном Варшава — VisionAir | RTK 2-3 см",
        "description": "Моніторинг будівництва дроном у Варшаві та по Польщі. RTK 2-3 см точність, ортофотомапи в PL-2000, timelapse, PDF-звіти. Абонементи для девелоперів та банків. EASA, страхування Compensa.",
        "keywords": "моніторинг будівництва дроном Варшава, RTK дрон Польща, інспекція будівництва з повітря, ортофотомапа, timelapse будови, дрон для девелопера",
        "ogTitle": "Моніторинг будівництва дроном — VisionAir Warsaw",
        "ogDescription": "RTK 2-3 см, ортофотомапи PL-2000, timelapse та PDF-звіти для девелоперів та банків.",
        "ogImageAlt": "Ортофотомапа будівництва з дрона у Варшаві",
        "schemaServiceType": "Aerial construction monitoring and RTK surveying",
        "schemaDescription": "Моніторинг будівництва дроном у Варшаві та по Польщі. RTK 2-3 см, ортофотомапи PL-2000, timelapse, PDF-звіти, EASA, страхування Compensa VIG."
    },
    "breadcrumbCurrent": "Моніторинг будівництва",
    "hero": {
        "eyebrow": "Варшава · Мазовія · Польща",
        "h1": ["Моніторинг будови з дрона,", "звіти щомісяця"],
        "sub": "RTK 2-3 см точність, ортофотомапи в PL-2000, timelapse прогресу, PDF-звіти для банку та інвестора. <strong>Місячні абонементи</strong> для девелоперів. EASA, страхування, дозволи на нас.",
        "ctaPrimary": "Дивитися пакети",
        "ctaGhost": "Відкрити ціни",
        "meta": {"objectsKey": "масштаб", "objectsValue": "до 50 га", "deliveryKey": "звіт", "deliveryValue": "5 днів", "ratingKey": "точність", "ratingValue": "RTK 2-3 см", "permitsKey": "система", "permitsValue": "PL-2000 / WGS84"}
    },
    "why": {
        "sectionLabel": "001 / Навіщо дрон на будові",
        "title": "Уся будова в одному кадрі,",
        "titleItalic": "щомісяця",
        "lead": "Банк хоче звіт прогресу, інвестор — ортофотомапу, виконроб — timelapse. Один виїзд дрона = усі три deliverable.",
        "body1": "Літаємо з модулем RTK, горизонтальна точність 2-3 см. Достатньо для вимірювання обʼєму відвалів або котлованів без геодезиста.",
        "body2": "Досвід з банками: PDF-звіти з порівнянням план/факт, GPS-мітками, датами, прогнозом наступного етапу. NDA — і ви у списку довірених підрядників.",
        "stats": [
            {"v": "2-3", "k": "см точність RTK",        "small": " см"},
            {"v": "50",  "k": "гектарів за виліт",      "small": " га"},
            {"v": "5",   "k": "днів до звіту",          "small": " дн."},
            {"v": "B2B", "k": "абонемент для девів",    "small": ""}
        ]
    },
    "deliverables": {
        "sectionLabel": "002 / Що входить",
        "title": "Ортофотомапи, 3D-моделі",
        "titleItalic": "та звіт прогресу",
        "lead": "Кожен виїзд дрона закривається трьома deliverable: ортофотомапа, 3D-модель, банківський PDF-звіт.",
        "items": [
            {"tag": "Формат A", "title": "Ортофотомапа PL-2000",       "desc": "Геопривʼязана мозаїка у польській системі координат, 1-2 см/піксель. GeoTIFF + PDF."},
            {"tag": "Формат B", "title": "3D-модель / фотограмметрія", "desc": "Текстурована сітка, експорт у .obj / .fbx / .las. Імпорт у BIM / Revit / AutoCAD."},
            {"tag": "Формат C", "title": "Вимірювання обʼємів",        "desc": "Відвали, котловани, склади — автоматичний розрахунок м³ з похибкою ± 1-3%."},
            {"tag": "Формат D", "title": "Timelapse прогресу",         "desc": "Одна позиція, той самий час — 12-30 місяців у 60-секундний інвестиційний фільм."},
            {"tag": "Формат E", "title": "PDF-звіт для банку",          "desc": "Стандартний формат, що приймається польськими банками, порівняння з графіком, GPS-мітки."},
            {"tag": "Формат F", "title": "Термовізія",                 "desc": "Опційно — термовізія ізоляції, дахів, теплосіток у пакеті з вимірюванням."}
        ]
    },
    "audience": {
        "sectionLabel": "003 / Для кого",
        "title": "Девелопери, банки,",
        "titleItalic": "ГП та архбюро",
        "lead": "Стандартний клієнт — девелопер з 2-5 обʼєктами. Друге місце — генпідрядник, третє — фінансуючий банк.",
        "items": [
            {"name": "Житловий девелопер", "sub": "Абонемент: щомісячний виїзд, звіт, timelapse"},
            {"name": "Генпідрядник",       "sub": "Вимірювання обʼєму, прогрес, контроль якості"},
            {"name": "Фінансуючий банк",   "sub": "PDF-звіти для розблокування траншей"},
            {"name": "Архбюро",            "sub": "Обмір + 3D-модель для проєктування"}
        ]
    },
    "packages": {
        "sectionLabel": "004 / Пакети",
        "title": "Разовий виїзд",
        "titleItalic": "або абонемент",
        "lead": "Разовий — під конкретну задачу. Абонемент для девелоперів — 12 місяців із щомісячним звітом.",
        "items": [
            {"name": "ВИЇЗД",      "tagline": "Разовий, до 5 га",             "price": "900 PLN",    "sub": "/ виїзд", "list": ["До 5 га скан", "Ортофотомапа PL-2000", "Базовий PDF-звіт", "Здача 5 днів", "RTK 2-3 см"], "featured": False},
            {"name": "АБОНЕМЕНТ",  "tagline": "12 місяців, 1 виїзд / міс",    "price": "850 PLN",    "sub": "/ міс",   "list": ["1 виїзд на місяць", "Ортофото + 3D-модель", "Банківський звіт", "Річний timelapse", "Щомісячний рахунок", "Закріплений оператор"], "featured": True},
            {"name": "ПРОЄКТ",     "tagline": "До 50 га + фотограмметрія",    "price": "від 3 200 PLN","sub": "/ виїзд","list": ["До 50 га скан", "3D-модель + .las / .obj", "Вимірювання обʼємів", "Опція термовізії", "Експорт у BIM"], "featured": False}
        ],
        "selectCta": "Обрати пакет",
        "note": "Абонемент 12 міс — знижка 10%, дві будови в одному рахунку."
    },
    "process": {
        "sectionLabel": "005 / Процес",
        "title": "Від kick-off",
        "titleItalic": "до щомісячного звіту",
        "lead": "Перший виїзд довший — ставимо GCP та план польоту. Подальші — повторювана процедура.",
        "steps": [
            {"n": "01", "title": "Kick-off та GCP",         "body": "Перший виїзд: 6-12 точок Ground Control, калібрація RTK до локальної системи, базові фото.",                      "dur": "2-4 год"},
            {"n": "02", "title": "Щомісячний виїзд",       "body": "Той самий план польоту, той самий час — критично для timelapse та порівняння. 60-90 хвилин на майданчику.",      "dur": "60-90 хв"},
            {"n": "03", "title": "Обробка",                 "body": "Мозаїка + 3D у Pix4D / Agisoft, експорт у GeoTIFF, .las, .obj.",                                                   "dur": "2-3 дні"},
            {"n": "04", "title": "PDF-звіт",                "body": "Дельта місяць-до-місяця, % прогресу, обʼєми, мітки проблем для банку.",                                            "dur": "2 дні"},
            {"n": "05", "title": "Здача",                   "body": "Хмара (Frame.io або ваш OneDrive), PDF-звіт поштою, превʼю онлайн.",                                              "dur": "5 днів"}
        ]
    },
    "faq": {
        "sectionLabel": "006 / FAQ",
        "title": "Питання",
        "titleItalic": "девелоперів та банків",
        "lead": "Повна техдокументація, страхування, сертифікати RTK — PDF на запит.",
        "items": [
            {"q": "Яку точність дає RTK на будові?",            "a": "Горизонтальна 2-3 см, вертикальна 3-5 см при Open Sky. Достатньо для звітів прогресу, обʼємів відвалів, виявлення відхилень. Для геодезичної точності < 1 см — додаємо GCP."},
            {"q": "Банки приймають ваші звіти?",                "a": "Так. Регулярно працюємо з PKO BP, mBank, Pekao, Millennium. Формат звіту відповідає вимогам для розблокування траншей, містить GPS-мітки, дати, КЕП оператора."},
            {"q": "BIM та Revit?",                              "a": "Експорт 3D у .obj, .fbx, .las та .e57. Архбюро частіше імпортують через Revit або Rhino. Текстурована сітка дозволяє вимірювати відстані та обʼєми безпосередньо."},
            {"q": "Чи можна виміряти обʼєм відвалу?",           "a": "Так — стандартний deliverable. Скануємо відвал, порівнюємо з попереднім, даємо м³ з похибкою ± 1-3%. Достатньо для масового балансу."},
            {"q": "Як працює місячний абонемент?",              "a": "Обираєте день (зазвичай перший понеділок), ми приїжджаємо самі, літаємо, звітуємо. Місячний рахунок VAT, дві будови в один рахунок — знижка 10%."},
            {"q": "Якщо будова в зоні CTR EPWA?",                "a": "Оформлюємо дозвіл у PAŻP за 5-14 днів. Це в пакеті, не виставляється окремо. 20+ погоджень у зонах EPWA та EPBC."}
        ],
        "askMore": "У мене інше питання"
    },
    "ctaBanner": {"title": "Новий обʼєкт на старті?", "titleItalic": "Почнемо з kick-off", "lead": "Перший виїзд з калібрацією RTK до локальної системи — 2-4 години. Далі щомісячний візит за 90 хвилин."},
    "contactTitle": "Поговорімо",
    "contactTitleItalic": "про вашу будову"
}
}
