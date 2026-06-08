import { createFileRoute } from "@tanstack/react-router";
import { PatronsPage } from "@/components/mnc/PatronsPage";

export const Route = createFileRoute("/patrons")({
  head: () => ({
    meta: [
      { title: "Advisory & Patron Invitation — Maha NRI Connect" },
      {
        name: "description",
        content:
          "A personal invitation for respected leaders to guide, strengthen and inspire Maha NRI Connect — Maharashtra's global diaspora platform.",
      },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Advisory & Patron Invitation — Maha NRI Connect" },
      {
        property: "og:description",
        content:
          "A personal invitation for respected leaders to guide, strengthen and inspire Maha NRI Connect — Maharashtra's global diaspora platform.",
      },
      { property: "og:url", content: "/patrons" },
    ],
  }),
  component: PatronsPage,
});
