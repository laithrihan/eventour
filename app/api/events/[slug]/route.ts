import { NextRequest, NextResponse } from "next/server";
import { getContainer } from "@/infrastructure/composition/container";
import {
  NotFoundError,
  ValidationError,
} from "@/domain/shared/errors/DomainError";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const { slug: rawSlug } = await context.params;
    const { getEventBySlug } = getContainer();
    const event = await getEventBySlug(rawSlug);

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    console.error("[GET /api/events/[slug]]", error);

    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
