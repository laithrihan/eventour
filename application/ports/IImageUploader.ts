export interface IImageUploader {
  upload(buffer: Buffer, folder?: string): Promise<{ url: string }>;
}
