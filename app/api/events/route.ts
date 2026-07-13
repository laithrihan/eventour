import { NextRequest, NextResponse } from "next/server";
import { getContainer } from "@/infrastructure/composition/container";
import {
  DomainError,
  ValidationError,
} from "@/domain/shared/errors/DomainError";

/**
 * POST creates an event from multipart form data:
 * 1) read scalar fields + JSON-encoded tags/agenda
 * 2) require an image file and buffer it for Cloudinary
 * 3) delegate validation + persistence to CreateEvent use-case
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );
    }

    const tagsRaw = formData.get("tags");
    const agendaRaw = formData.get("agenda");

    let tags: string[];
    let agenda: string[];

    try {
      tags = JSON.parse(String(tagsRaw));
      agenda = JSON.parse(String(agendaRaw));
    } catch {
      return NextResponse.json(
        { message: "Invalid tags or agenda JSON" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const { createEvent } = getContainer();
    const event = await createEvent({
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      overview: String(formData.get("overview") ?? ""),
      venue: String(formData.get("venue") ?? ""),
      location: String(formData.get("location") ?? ""),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      mode: String(formData.get("mode") ?? ""),
      audience: String(formData.get("audience") ?? ""),
      organizer: String(formData.get("organizer") ?? ""),
      tags,
      agenda,
      imageBuffer,
    });

    return NextResponse.json(
      { message: "Event created successfully", event },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);

    if (e instanceof ValidationError) {
      return NextResponse.json({ message: e.message }, { status: 400 });
    }

    if (e instanceof DomainError) {
      return NextResponse.json({ message: e.message }, { status: 422 });
    }

    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const { listEvents } = getContainer();
    const events = await listEvents();

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Event fetching failed", error: e },
      { status: 500 },
    );
  }
}
