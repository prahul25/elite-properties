import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import BrokerModel from "@/models/Broker";
import PropertyModel from "@/models/Property";
import { uploadImage } from "@/utils/uploadImage";

// ✅ POST: Add new property
export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();

    // ✅ Extract text fields from formData
    const title = formData.get("title") as string;
    const transactionType = formData.get("transactionType") as string;
    const propertyType = formData.get("propertyType") as string;
    const price = Number(formData.get("price"));
    const brokerId = formData.get("brokerId") as string;

    // ✅ Parse nested objects (location, details)
    const location = JSON.parse(formData.get("location") as string || "{}");
    const details = JSON.parse(formData.get("details") as string || "{}");

const status = (formData.get("status") as
      | "Active"
      | "Sold"
      | "Rented") || "Active";
    // ✅ Required fields check
    const missingFields: string[] = [];

    if (!title) missingFields.push("title");
    if (!transactionType) missingFields.push("transactionType");
    if (!propertyType) missingFields.push("propertyType");
    if (!price) missingFields.push("price");
    if (!brokerId) missingFields.push("brokerId");

    if (!location?.city) missingFields.push("location.city");
    if (!location?.area) missingFields.push("location.area");

    if (!details?.carpetArea) missingFields.push("details.carpetArea");
    if (!details?.furnished) missingFields.push("details.furnished");

    // adding cover image
    const coverFile = formData.get("coverImage") as File | null;
    if (!coverFile) {
      missingFields.push("coverImage");
    }

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", fields: missingFields },
        { status: 400 }
      );
    }

    // ✅ Check if broker exists
    const broker = await BrokerModel.findById(brokerId);
    if (!broker) {
      return NextResponse.json(
        { error: "Broker not found" },
        { status: 404 }
      );
    }

    let coverImageUrl = "";
    if (coverFile) {
      coverImageUrl = await uploadImage(coverFile);
    }

    const galleryFiles = formData.getAll("images") as File[];
    if (galleryFiles.length > 5) {
      return NextResponse.json(
        { error: "You can upload up to 5 gallery images only" },
        { status: 400 }
      );
    }
    const galleryUrls = await Promise.all(
      galleryFiles.map((file) => uploadImage(file))
    );

    // ✅ Create new property
    const newProperty = await PropertyModel.create({
      title,
      transactionType,
      propertyType,
      price,
      location,
      details,
      coverImage: coverImageUrl,
      images: galleryUrls,
      brokerId,
      status
    });

    // ✅ Add property reference to broker
    broker.properties.push(newProperty.id);
    await broker.save();

    return NextResponse.json(
      { message: "Property added successfully", property: newProperty },
      { status: 201 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("POST /api/properties error:", err.message);
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      );
    }
    console.error("POST /api/properties unknown error:", err);
    return NextResponse.json(
      { error: "Failed to add property" },
      { status: 500 }
    );
  }
}
