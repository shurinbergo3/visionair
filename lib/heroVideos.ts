import { SITE_URL } from './siteUrl';

// Hero video metadata. Durations come from ffprobe on the 1080p source; upload
// dates are the day each video shipped. The shape mirrors what Google needs in
// a VideoObject ld+json to lift the GSC "video not on a watch page" warning.
export type HeroVideoKey =
  | 'home'
  | 'real-estate'
  | 'promo'
  | 'wesela'
  | 'eventy'
  | 'fpv-teledyski'
  | 'budownictwo'
  | 'inspekcje-techniczne';

type HeroVideoEntry = {
  file: string;
  poster: string;
  /** ISO 8601 duration (e.g. PT31S). */
  duration: string;
  /** ISO date the video was first published. */
  uploadDate: string;
};

const sec = (s: number) => `PT${Math.round(s)}S`;

const VIDEOS: Record<HeroVideoKey, HeroVideoEntry> = {
  home: {
    file: 'home-hero-1080.mp4',
    poster: 'home-hero-poster.jpg',
    duration: sec(31),
    uploadDate: '2026-05-16',
  },
  'real-estate': {
    file: 'real-estate-hero-1080.mp4',
    poster: 'real-estate-hero-poster.jpg',
    duration: sec(13),
    uploadDate: '2026-05-14',
  },
  promo: {
    file: 'promo-hero-1080.mp4',
    poster: 'promo-hero-poster.jpg',
    duration: sec(12),
    uploadDate: '2026-05-18',
  },
  wesela: {
    file: 'wedding-hero-1080.mp4',
    poster: 'wedding-hero-poster.jpg',
    duration: sec(9),
    uploadDate: '2026-05-16',
  },
  // Eventy reuses the construction hero clip (per ServiceLanding history); when
  // it gets its own footage, update both fields here and only here.
  eventy: {
    file: 'construction-hero-1080.mp4',
    poster: 'construction-hero-poster.jpg',
    duration: sec(10),
    uploadDate: '2026-05-16',
  },
  'fpv-teledyski': {
    file: 'fpv-hero-1080.mp4',
    poster: 'fpv-hero-poster.jpg',
    duration: sec(18),
    uploadDate: '2026-05-17',
  },
  budownictwo: {
    file: 'construction-hero-1080.mp4',
    poster: 'construction-hero-poster.jpg',
    duration: sec(10),
    uploadDate: '2026-05-16',
  },
  'inspekcje-techniczne': {
    file: 'inspekcje-hero-1080.mp4',
    poster: 'inspekcje-hero-poster.jpg',
    duration: sec(20),
    uploadDate: '2026-05-18',
  },
};

export function getHeroVideo(key: HeroVideoKey) {
  return VIDEOS[key];
}

export type BuildVideoLdInput = {
  key: HeroVideoKey;
  name: string;
  description: string;
  locale: string;
  pageUrl: string;
};

export function buildVideoLd({
  key,
  name,
  description,
  locale,
  pageUrl,
}: BuildVideoLdInput) {
  const v = VIDEOS[key];
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${pageUrl}#hero-video`,
    name,
    description,
    contentUrl: `${SITE_URL}/video/${v.file}`,
    thumbnailUrl: `${SITE_URL}/video/${v.poster}`,
    uploadDate: v.uploadDate,
    duration: v.duration,
    inLanguage: locale,
    isFamilyFriendly: true,
    regionsAllowed: 'PL,EU',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'WatchAction',
      target: pageUrl,
    },
  };
}
