import { ValidationError } from "../../shared/errors/DomainError";

/** Matches URL-friendly slugs produced by `Slug.fromTitle`. */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class Slug {
  private constructor(readonly value: string) {}

  /**
   * Builds a URL slug from an event title.
   * Example: "Next.js Meetup 2026!" → "nextjs-meetup-2026"
   */
  static fromTitle(title: string): Slug {
    const value = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!value) {
      throw new ValidationError("Unable to generate slug from title");
    }

    return new Slug(value);
  }

  /**
   * Normalizes and validates a slug from a URL or query param.
   * Decodes URI encoding, lowercases, and enforces length/format.
   */
  static parse(raw: string | undefined): Slug {
    if (raw === undefined || raw.trim() === "") {
      throw new ValidationError("Slug is required");
    }

    let decoded: string;
    try {
      decoded = decodeURIComponent(raw);
    } catch {
      throw new ValidationError("Slug contains invalid URL encoding");
    }

    const value = decoded.trim().toLowerCase();

    if (!value) {
      throw new ValidationError("Slug is required");
    }

    if (value.length > 100) {
      throw new ValidationError("Slug exceeds maximum length");
    }

    if (!SLUG_PATTERN.test(value)) {
      throw new ValidationError("Slug format is invalid");
    }

    return new Slug(value);
  }

  equals(other: Slug): boolean {
    return this.value === other.value;
  }
}
