import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PropertyModel from "@/models/Property";
import mongoose from "mongoose";

import BrokerModel from "@/models/Broker";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
    }

    // ✅ Find and delete property
    const deletedProperty = await PropertyModel.findByIdAndDelete(id);

    if (!deletedProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // ✅ Also remove reference from Broker.properties
    await BrokerModel.findByIdAndUpdate(deletedProperty.brokerId, {
      $pull: { properties: deletedProperty._id },
    });

    return NextResponse.json(
      { message: "Property deleted successfully", property: deletedProperty },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("DELETE /api/properties/[id] error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.error("DELETE /api/properties/[id] unknown error:", err);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
