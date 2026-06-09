import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/mnc/LandingPage";
import { ROLE_CONFIG } from "@/lib/mnc/role-data";
import heroImage from "@/assets/mnc-hero-patrons.jpg";

const config = ROLE_CONFIG.advisory;

export const Route = createFileRoute("/advisory")({
  head: () => ({
    meta: [
      { title: config.metaTitle },
      { name: "description", content: config.metaDescription },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: config.metaTitle },
      { property: "og:description", content: config.metaDescription },
      { property: "og:url", content: "/advisory" },
    ],
  }),
  component: AdvisoryPage,
});

function AdvisoryPage() {
  return <LandingPage config={config} heroImage={heroImage} />;
}
