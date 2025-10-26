import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PropertyModel from "@/models/Property";
import mongoose from "mongoose";

// ✅ GET: Fetch single property by ID (clean RESTful pattern)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // ✅ Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid property ID format" },
        { status: 400 }
      );
    }

    // ✅ Fetch property with broker info
    const property = await PropertyModel.findById(id);

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Property fetched successfully", property },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("GET /api/properties/[propertyId] error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.error("GET /api/properties/[propertyId] unknown error:", err);
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}
