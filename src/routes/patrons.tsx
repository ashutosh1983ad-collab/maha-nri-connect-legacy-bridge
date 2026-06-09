import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/patrons")({
  beforeLoad: () => {
    throw redirect({ to: "/advisory", replace: true });
  },
});
