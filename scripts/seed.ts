import { readFileSync } from "fs";
import { resolve } from "path";
import mongoose from "mongoose";
import EventModel from "../infrastructure/persistence/mongoose/models/event.model";
import { seedEvents } from "../data/seed-events";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  const contents = readFileSync(envPath, "utf8");

  for (const line of contents.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function seed() {
  loadEnv();

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set in .env");
  }

  await mongoose.connect(uri);

  let created = 0;
  let updated = 0;

  for (const event of seedEvents) {
    const exists = await EventModel.exists({ slug: event.slug });

    await EventModel.findOneAndUpdate(
      { slug: event.slug },
      { $set: event },
      { upsert: true, setDefaultsOnInsert: true },
    );

    if (exists) {
      updated += 1;
      console.log(`Updated: ${event.slug}`);
    } else {
      created += 1;
      console.log(`Created: ${event.slug}`);
    }
  }

  console.log(`\nSeed complete. Created ${created}, updated ${updated}.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
