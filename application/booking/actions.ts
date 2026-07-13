"use server";

import { getContainer } from "@/infrastructure/composition/container";

export async function createBookingAction({
  eventId,
  email,
}: {
  eventId: string;
  email: string;
}) {
  const { createBooking } = getContainer();
  return createBooking({ eventId, email });
}
