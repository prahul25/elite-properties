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

    // ✅ Handle file uploads
    const files = formData.getAll("images") as File[];
    const imageUrls = await Promise.all(files.map(file => uploadImage(file)));
const status = formData.get("status") as "Active" | "Sold" | "Rented";
    // ✅ Required fields check
    if (
      !title ||
      !transactionType ||
      !propertyType ||
      !price ||
      !location?.city ||
      !location?.area ||
      !details?.carpetArea ||
      !details?.furnished ||
      !brokerId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    // ✅ Create new property
    const newProperty = await PropertyModel.create({
      title,
      transactionType,
      propertyType,
      price,
      location,
      details,
      images: imageUrls,
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
