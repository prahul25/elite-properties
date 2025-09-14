import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PropertyModel from "@/models/Property";

export async function GET() {
  try {
    await dbConnect();

    // ✅ Fetch all properties with broker details
    const properties = await PropertyModel.find()
      .populate("brokerId", "name email phone") // only return broker fields you need
      .lean();

    return NextResponse.json(properties, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("GET /api/properties/all error:", err.message);
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      );
    }
    console.error("GET /api/properties/all unknown error:", err);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
