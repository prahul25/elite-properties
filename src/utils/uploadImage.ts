import { v2 as cloudinary } from "cloudinary";

// ✅ configure cloudinary using env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
console.log([process.env.CLOUDINARY_CLOUD_NAME,process.env.CLOUDINARY_API_KEY,process.env.CLOUDINARY_API_SECRET])
export async function uploadImage(file: File): Promise<string> {
  try {
    // convert File/Blob to base64 string
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "properties", // keep images organized
    });

    return result.secure_url; // ✅ Cloudinary URL
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    throw new Error("Failed to upload image");
  }
}
