import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Property from "@/models/Property";
import mongoose from "mongoose";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Property ID is required in params" },
        { status: 400 }
      );
    }

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
    }

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { success: false, message: "Property not found" },
        { status: 404 }
      );
    }

    // Toggle Active <-> Disabled
    property.status = property.status === "Disabled" ? "Active" : "Disabled";
    await property.save();

    return NextResponse.json(
      {
        success: true,
        message: `Property status updated to ${property.status}`,
        property,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("DELETE /api/properties/[id] error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("Error updating property status:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error,
      },
      { status: 500 }
    );
  }
}
