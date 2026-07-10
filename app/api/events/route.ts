import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

async function parseEventBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const formData = await request.formData();
    return Object.fromEntries(formData.entries());
  }

  return null;
}

async function POST(request: NextRequest) {
  try {
    await connectDB();

    let event;
    try {
      event = await parseEventBody(request);
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (!event) {
      return NextResponse.json(
        {
          error: "Unsupported Content-Type",
          message:
            'Use "application/json", "multipart/form-data", or "application/x-www-form-urlencoded".',
        },
        { status: 415 },
      );
    }

    const createdEvent = await Event.create(event);
    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event", message: (error as Error).message },
      { status: 500 },
    );
  }
}

export { POST };