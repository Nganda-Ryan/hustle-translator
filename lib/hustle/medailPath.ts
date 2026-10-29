import { getCdnBaseUrl } from "@/lib/env/cdnBaseUrl";

export function getMedailPath(level: number): string {
  const base = getCdnBaseUrl();
  if (base) {
    return `${base}/hustle/${level}.png`;
  }
  return `/medails/${level}.png`;
}
