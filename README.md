# Eventour

Discover, explore, and book developer events — hackathons, meetups, and conferences — in one place.

Eventour is a full-stack Next.js 16 app with a clean, layered architecture: domain logic stays framework-free, while MongoDB, Cloudinary, and API auth are plugged in through ports and adapters.

---

## Features

- **Event discovery** — Featured listing with SEO-friendly slug routes
- **Event details** — Venue, agenda, tags, mode (`online` / `offline` / `hybrid`), and similar-event recommendations
- **Email booking** — Server actions with validation and duplicate prevention
- **Authenticated REST API** — Token-protected endpoints for listing and creating events
- **Interactive API docs** — OpenAPI 3 spec + Swagger UI at `/api-docs`
- **Image uploads** — Event covers stored on Cloudinary
- **Caching** — Next.js `"use cache"` on the home page for fast reads

---

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4, Base UI / shadcn-style components |
| Database | MongoDB + Mongoose |
| Media | Cloudinary |
| API docs | OpenAPI 3 + Swagger UI |

---

## Architecture

```
domain/           # Entities, value objects, domain errors
application/      # Use cases, DTOs, server actions, ports
infrastructure/   # MongoDB, Cloudinary, composition root
app/              # Pages, layouts, API route handlers
components/       # UI (events, booking, layout, docs)
lib/              # OpenAPI spec, API auth helpers
shared/           # Cross-cutting utilities
```

Dependency flow: **app → application → domain ← infrastructure**  
Wiring lives in `infrastructure/composition/container.ts`.

---

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account (for event image uploads)

### 1. Clone

```bash
git clone https://github.com/laithrihan/eventour.git
cd eventour
```

### 2. Install

```bash
npm install
```

### 3. Environment

```bash
cp .env.example .env
```

Set the variables below, then start the app.

### 4. Develop

```bash
npm run dev
```

| URL | Purpose |
| --- | --- |
| [http://localhost:3000](http://localhost:3000) | App |
| [http://localhost:3000/api-docs](http://localhost:3000/api-docs) | Swagger UI |

### 5. Production

```bash
npm run build
npm start
```

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `CLOUDINARY_CLOUD_NAME` | Yes* | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes* | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes* | Cloudinary API secret |
| `CLOUDINARY_URL` | No | Optional single URL; cloud name can be derived from it |
| `NEXT_PUBLIC_BASE_URL` | Recommended | App origin (e.g. `http://localhost:3000`) |
| `API_TOKEN` | Yes (API) | Shared secret for REST auth — generate with `openssl rand -hex 32` |

\*Required when creating events with image upload.

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

---

## API

All `/api/events` routes require authentication. Send either:

```http
Authorization: Bearer <API_TOKEN>
```

or

```http
x-api-key: <API_TOKEN>
```

Interactive docs (try-it-out + auth persistence): **[/api-docs](http://localhost:3000/api-docs)**  
Raw OpenAPI JSON: **`GET /api/openapi`**

### Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/events` | List all events |
| `GET` | `/api/events/[slug]` | Get one event by slug |
| `POST` | `/api/events` | Create an event (`multipart/form-data`) |

### Create event fields

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | Max 100 chars |
| `description` | string | Max 1000 chars |
| `overview` | string | Max 500 chars |
| `venue`, `location`, `audience`, `organizer` | string | Required |
| `date` | string | e.g. `2026-09-15` |
| `time` | string | `HH:MM` or `HH:MM AM/PM` |
| `mode` | string | `online`, `offline`, or `hybrid` |
| `tags` | JSON string | Non-empty string array |
| `agenda` | JSON string | Non-empty string array |
| `image` | file | Cover image |

**Responses:** `201` on success · `400` / `422` validation · `401` missing/invalid token · `404` not found

### Example

```bash
curl -X GET http://localhost:3000/api/events \
  -H "Authorization: Bearer $API_TOKEN"
```

---

## Project Structure

```
app/
  (site)/                 # Public pages (home, event detail)
  api-docs/               # Swagger UI page
  api/events/             # Event REST handlers
  api/openapi/            # OpenAPI document endpoint
application/
  event/                  # List, get, create, similar events
  booking/                # Create booking, count bookings
domain/
  event/                  # Event entity, Slug, EventMode
  booking/                # Booking entity
infrastructure/
  composition/            # DI container
  persistence/            # Mongoose repos & mappers
  storage/                # Cloudinary uploader
lib/
  openapi.ts              # OpenAPI 3 specification
  api-auth.ts             # Bearer / x-api-key guard
components/
  events/ booking/ layout/ docs/
```

---

## License

For learning and personal use.
