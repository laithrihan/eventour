"use server";

import { getContainer } from "@/infrastructure/composition/container";

export async function getSimilarEventsAction(slug: string) {
  const { getSimilarEvents } = getContainer();
  return getSimilarEvents(slug);
}
