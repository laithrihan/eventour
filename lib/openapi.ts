import type { OpenAPIV3 } from "openapi-types";

const eventSchema: OpenAPIV3.SchemaObject = {
  type: "object",
  required: [
    "id",
    "title",
    "slug",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "agenda",
    "organizer",
    "tags",
  ],
  properties: {
    id: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0d1" },
    title: { type: "string", example: "Next.js Conf 2026" },
    slug: { type: "string", example: "nextjs-conf-2026" },
    description: { type: "string", example: "A full-day conference on modern web development." },
    overview: { type: "string", example: "Join developers from around the world." },
    image: {
      type: "string",
      format: "uri",
      example: "https://res.cloudinary.com/example/image/upload/v1/events/dev-event.jpg",
    },
    venue: { type: "string", example: "Convention Center Hall A" },
    location: { type: "string", example: "San Francisco, CA" },
    date: { type: "string", example: "2026-09-15" },
    time: { type: "string", example: "09:00" },
    mode: { type: "string", enum: ["online", "offline", "hybrid"], example: "hybrid" },
    audience: { type: "string", example: "Developers and tech enthusiasts" },
    agenda: {
      type: "array",
      items: { type: "string" },
      example: ["Keynote", "Workshops", "Networking"],
    },
    organizer: { type: "string", example: "Eventour Team" },
    tags: {
      type: "array",
      items: { type: "string" },
      example: ["nextjs", "react", "web"],
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

const errorSchema: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    message: { type: "string" },
    error: { type: "string" },
  },
  required: ["message"],
};

export function getOpenApiSpec(baseUrl: string): OpenAPIV3.Document {
  return {
    openapi: "3.0.3",
    info: {
      title: "Eventour API",
      version: "1.0.0",
      description:
        "REST API for browsing and creating developer events on Eventour.",
    },
    servers: [
      {
        url: baseUrl,
        description: "Current environment",
      },
    ],
    tags: [
      {
        name: "Events",
        description: "List, create, and retrieve events",
      },
    ],
    paths: {
      "/api/events": {
        get: {
          tags: ["Events"],
          summary: "List all events",
          operationId: "listEvents",
          responses: {
            "200": {
              description: "Events fetched successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["message", "events"],
                    properties: {
                      message: { type: "string", example: "Events fetched successfully" },
                      events: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Event" },
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
        post: {
          tags: ["Events"],
          summary: "Create a new event",
          operationId: "createEvent",
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: [
                    "title",
                    "description",
                    "overview",
                    "venue",
                    "location",
                    "date",
                    "time",
                    "mode",
                    "audience",
                    "organizer",
                    "tags",
                    "agenda",
                    "image",
                  ],
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    overview: { type: "string" },
                    venue: { type: "string" },
                    location: { type: "string" },
                    date: { type: "string", description: "Event date (e.g. 2026-09-15)" },
                    time: { type: "string", description: "Event time (e.g. 09:00)" },
                    mode: {
                      type: "string",
                      enum: ["online", "offline", "hybrid"],
                    },
                    audience: { type: "string" },
                    organizer: { type: "string" },
                    tags: {
                      type: "string",
                      description: "JSON-encoded array of tag strings",
                      example: '["nextjs","react"]',
                    },
                    agenda: {
                      type: "string",
                      description: "JSON-encoded array of agenda items",
                      example: '["Keynote","Workshops"]',
                    },
                    image: {
                      type: "string",
                      format: "binary",
                      description: "Event cover image",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Event created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["message", "event"],
                    properties: {
                      message: { type: "string", example: "Event created successfully" },
                      event: { $ref: "#/components/schemas/Event" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Validation error or missing image",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            "422": {
              description: "Domain validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
      "/api/events/{slug}": {
        get: {
          tags: ["Events"],
          summary: "Get event by slug",
          operationId: "getEventBySlug",
          parameters: [
            {
              name: "slug",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "nextjs-conf-2026",
            },
          ],
          responses: {
            "200": {
              description: "Event fetched successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["message", "event"],
                    properties: {
                      message: { type: "string", example: "Event fetched successfully" },
                      event: { $ref: "#/components/schemas/Event" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid slug",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            "404": {
              description: "Event not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Event: eventSchema,
        Error: errorSchema,
      },
    },
  };
}
