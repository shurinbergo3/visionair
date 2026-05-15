// Maps the numeric `num` of a service item (from messages/{locale}.json
// services.items) to its dedicated landing-page path. Internal navigation
// uses next-intl <Link>; this is just the raw path.

export const SERVICE_NUM_TO_PATH: Record<string, string> = {
  '001': '/real-estate',
  '002': '/promo',
  '003': '/wesela',
  '004': '/eventy',
  '005': '/fpv-teledyski',
  '006': '/budownictwo',
  '007': '/inspekcje-termowizyjne',
  '008': '/inspekcje-techniczne',
};

export function getServicePath(num: string): string | null {
  return SERVICE_NUM_TO_PATH[num] ?? null;
}
