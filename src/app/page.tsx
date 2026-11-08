import { WeddingExperience } from "@/components/experience/WeddingExperience";

/**
 * Invitation film is build-time static content.
 * Serve from CDN — do not SSR per request.
 * Animations still hydrate as Client Components after the HTML arrives.
 */
export const ensureStatic = "navigation";

export default function RootPage() {
  return <WeddingExperience />;
}
