import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PropertyModel, { Property } from "@/models/Property";
import mongoose from "mongoose";
import { uploadImage } from "@/utils/uploadImage";

// ✅ PUT: Update property by form-data
export async function PUT(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();

    // ✅ Extract fields
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const transactionType = formData.get("transactionType") as "Rent" | "Sell" | "Lease";
    const propertyType = formData.get("propertyType") as string;
    const price = Number(formData.get("price"));


    // ✅ Parse nested objects
    const location = JSON.parse(formData.get("location") as string || "{}");
    const details = JSON.parse(formData.get("details") as string || "{}");

    // ✅ Handle new images (optional)
    const files = formData.getAll("images") as File[];
    const imageUrls = await Promise.all(files.map(file => uploadImage(file)));
// ✅ Handle status safely
const rawStatus = formData.get("status");
let status: "Active" | "Sold" | "Rented" | undefined;

if (typeof rawStatus === "string" && ["Active", "Sold", "Rented"].includes(rawStatus)) {
  status = rawStatus as "Active" | "Sold" | "Rented";
}

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
    }

    // ✅ Prepare update object
    const updateData: Partial<Property> = {
      title,
      transactionType,
      propertyType,
      price,
      location,
      details,
      images:imageUrls,
    
    };

if (status) {
  updateData.status = status;
}

    // ✅ Find and update property
    const updatedProperty = await PropertyModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("brokerId", "name email phone");

    if (!updatedProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Property updated successfully", property: updatedProperty },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("PUT /api/properties error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.error("PUT /api/properties unknown error:", err);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}


