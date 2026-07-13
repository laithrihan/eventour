import { v2 as cloudinary } from "cloudinary";
import type { IImageUploader } from "@/application/ports/IImageUploader";

/**
 * Uploads image buffers to Cloudinary. Configures the SDK from env so
 * API routes/use-cases never touch cloudinary credentials directly.
 */
export class CloudinaryImageUploader implements IImageUploader {
  private configured = false;

  private ensureConfigured() {
    if (this.configured) return;

    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      this.cloudNameFromUrl(process.env.CLOUDINARY_URL);

    cloudinary.config({
      cloud_name: cloudName,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    this.configured = true;
  }

  private cloudNameFromUrl(url: string | undefined): string | undefined {
    if (!url) return undefined;
    // cloudinary://key:secret@cloud_name
    const match = url.match(/@([^/]+)/);
    return match?.[1];
  }

  async upload(buffer: Buffer, folder = "DevEvent"): Promise<{ url: string }> {
    this.ensureConfigured();

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image", folder }, (error, results) => {
          if (error || !results) return reject(error ?? new Error("Upload failed"));
          resolve(results as { secure_url: string });
        })
        .end(buffer);
    });

    return { url: result.secure_url };
  }
}
