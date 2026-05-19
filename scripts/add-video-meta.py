#!/usr/bin/env python3
"""Inject videoName/videoDescription into each affected meta block across all 4
locale files. One-shot script for the GSC "video not on watch page" fix —
delete after running."""

import json
from pathlib import Path

MSG_DIR = Path(__file__).parent.parent / 'messages'

# {locale: {namespace_path: (videoName, videoDescription)}}
# namespace_path is the dotted key path into the JSON; '' = root meta.
TRANSLATIONS = {
    'pl': {
        '': (
            'Reel z drona — VisionAir Warsaw',
            'Krótka prezentacja kinowych ujęć z drona realizowanych przez VisionAir w Warszawie i całej Polsce — nieruchomości, reklamy, wesela, FPV.',
        ),
        'wesela': (
            'Filmowanie ślubu z drona — przykładowe ujęcia',
            'Przykładowe kinematograficzne ujęcia z drona z planu ślubnego: plener, ceremonia, pierwszy taniec. Realizacja VisionAir Warsaw.',
        ),
        'promo': (
            'Reklama z drona — przykładowy materiał',
            'Przykładowe kadry z reklamowej realizacji dronem: brand film, TVC, aerial b-roll. Produkcja VisionAir Warsaw.',
        ),
        'realEstate': (
            'Nieruchomości z lotu drona — przykład',
            'Przykład ujęć nieruchomości z drona dla deweloperów i agencji: domy, inwestycje, mieszkania. Realizacja VisionAir Warsaw.',
        ),
        'fpv-teledyski': (
            'Teledysk i FPV — przykład realizacji',
            'Przykładowe ujęcia FPV z teledysku: cinewhoop, ujęcia w przestrzeni, dynamika kamery. Realizacja VisionAir Warsaw, DJI Avata 2.',
        ),
        'budownictwo': (
            'Monitoring budowy z drona — przykład',
            'Przykład monitoringu budowy z drona: RTK, ortofotomapy, timelapse postępu prac. Realizacja VisionAir Warsaw.',
        ),
        'inspekcje-techniczne': (
            'Inspekcje techniczne z drona — przykład',
            'Przykład inspekcji technicznej z drona: dachy, kominy, mosty, dokumentacja stanu obiektu. Realizacja VisionAir Warsaw.',
        ),
    },
    'en': {
        '': (
            'VisionAir Warsaw aerial reel',
            'Short showreel of cinematic drone footage shot by VisionAir across Warsaw and Poland — real estate, commercials, weddings, FPV.',
        ),
        'wesela': (
            'Wedding aerial videography sample',
            'Sample cinematic drone footage from a wedding shoot: outdoor location, ceremony, first dance. Filmed by VisionAir Warsaw.',
        ),
        'promo': (
            'Drone commercial sample',
            'Sample frames from a brand commercial shot with a drone: brand film, TVC, aerial b-roll. Produced by VisionAir Warsaw.',
        ),
        'realEstate': (
            'Real estate aerial sample',
            'Sample aerial real estate footage for developers and agencies: houses, investments, apartments. Filmed by VisionAir Warsaw.',
        ),
        'fpv-teledyski': (
            'FPV music video sample',
            'Sample FPV footage from a music video shoot: cinewhoop, indoor passes, dynamic camerawork. Filmed by VisionAir Warsaw on DJI Avata 2.',
        ),
        'budownictwo': (
            'Construction monitoring sample',
            'Sample drone footage of construction monitoring: RTK, orthophoto maps, progress timelapse. Filmed by VisionAir Warsaw.',
        ),
        'inspekcje-techniczne': (
            'Technical inspection drone sample',
            'Sample drone inspection footage: roofs, chimneys, bridges, structural condition documentation. Filmed by VisionAir Warsaw.',
        ),
    },
    'uk': {
        '': (
            'Аеро-ріл VisionAir Warsaw',
            'Коротка демонстрація кінематографічних кадрів з дрона, знятих VisionAir у Варшаві та по всій Польщі — нерухомість, реклама, весілля, FPV.',
        ),
        'wesela': (
            'Аерозйомка весілля — приклад',
            'Приклад кінематографічних кадрів з дрона з весільної зйомки: пленер, церемонія, перший танець. Зйомка VisionAir Warsaw.',
        ),
        'promo': (
            'Реклама з дрона — приклад',
            'Приклад кадрів з рекламної зйомки з дрона: бренд-фільм, TVC, аеро b-roll. Виробництво VisionAir Warsaw.',
        ),
        'realEstate': (
            'Нерухомість з дрона — приклад',
            'Приклад аерокадрів нерухомості для забудовників і агенцій: будинки, інвестиції, квартири. Зйомка VisionAir Warsaw.',
        ),
        'fpv-teledyski': (
            'Кліп і FPV — приклад зйомки',
            'Приклад FPV-кадрів з музичного кліпу: cinewhoop, проліт у приміщенні, динамічна камера. Зйомка VisionAir Warsaw на DJI Avata 2.',
        ),
        'budownictwo': (
            'Моніторинг будівництва з дрона — приклад',
            'Приклад моніторингу будівництва з дрона: RTK, ортофотоплани, таймлапс прогресу. Зйомка VisionAir Warsaw.',
        ),
        'inspekcje-techniczne': (
            'Технічна інспекція з дрона — приклад',
            "Приклад технічної інспекції з дрона: дахи, димарі, мости, документація стану об'єкта. Зйомка VisionAir Warsaw.",
        ),
    },
    'ru': {
        '': (
            'Аэроролик VisionAir Warsaw',
            'Короткая демонстрация кинематографических кадров с дрона от VisionAir в Варшаве и по всей Польше — недвижимость, реклама, свадьбы, FPV.',
        ),
        'wesela': (
            'Аэросъёмка свадьбы — пример',
            'Пример кинематографических кадров с дрона со свадебной съёмки: пленэр, церемония, первый танец. Съёмка VisionAir Warsaw.',
        ),
        'promo': (
            'Реклама с дрона — пример',
            'Пример кадров с рекламной съёмки с дрона: бренд-фильм, TVC, аэро b-roll. Производство VisionAir Warsaw.',
        ),
        'realEstate': (
            'Недвижимость с дрона — пример',
            'Пример аэрокадров недвижимости для девелоперов и агентств: дома, инвестиции, квартиры. Съёмка VisionAir Warsaw.',
        ),
        'fpv-teledyski': (
            'Клип и FPV — пример съёмки',
            'Пример FPV-кадров с музыкального клипа: cinewhoop, пролёт в помещении, динамичная камера. Съёмка VisionAir Warsaw на DJI Avata 2.',
        ),
        'budownictwo': (
            'Мониторинг стройки с дрона — пример',
            'Пример мониторинга стройки с дрона: RTK, ортофотопланы, таймлапс прогресса. Съёмка VisionAir Warsaw.',
        ),
        'inspekcje-techniczne': (
            'Техническая инспекция с дрона — пример',
            'Пример технической инспекции с дрона: крыши, дымоходы, мосты, документация состояния объекта. Съёмка VisionAir Warsaw.',
        ),
    },
}


def patch(file_path: Path, table: dict) -> None:
    data = json.loads(file_path.read_text())
    for ns, (vname, vdesc) in table.items():
        if ns == '':
            target = data['meta']
        else:
            target = data[ns]['meta']
        target['videoName'] = vname
        target['videoDescription'] = vdesc
    file_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    print(f'patched {file_path.name}')


for locale, table in TRANSLATIONS.items():
    patch(MSG_DIR / f'{locale}.json', table)
