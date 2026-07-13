import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

function tokensMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);

  if (a.length !== b.length) {
    return false;
  }

  return timingSafeEqual(a, b);
}

function extractToken(request: NextRequest): string | null {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    const token = authorization.slice("Bearer ".length).trim();
    if (token) return token;
  }

  const apiKey = request.headers.get("x-api-key")?.trim();
  return apiKey || null;
}

/**
 * Requires a valid API token via `Authorization: Bearer <token>` or `x-api-key`.
 * Returns an error response when unauthorized; otherwise null.
 */
export function requireApiToken(request: NextRequest): NextResponse | null {
  const expected = process.env.API_TOKEN;

  if (!expected) {
    console.error("[api-auth] API_TOKEN is not configured");
    return NextResponse.json(
      { message: "API authentication is not configured" },
      { status: 500 },
    );
  }

  const provided = extractToken(request);

  if (!provided || !tokensMatch(provided, expected)) {
    return NextResponse.json(
      { message: "Unauthorized. Provide a valid API token." },
      {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Bearer realm="Eventour API"',
        },
      },
    );
  }

  return null;
}
