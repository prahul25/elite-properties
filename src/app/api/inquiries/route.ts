import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PropertyModel from "@/models/Property";
import InquiryModel from "@/models/Inquiry";


export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { propertyId, name, email, phone, message } = body;

    if (!propertyId || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Property, name, email, and phone are required" },
        { status: 400 }
      );
    }

    // ✅ check if property exists
    const property = await PropertyModel.findById(propertyId).populate("brokerId");
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // ✅ create inquiry
    const inquiry = await InquiryModel.create({
      propertyId,
      brokerId: property.brokerId,
      name,
      email,
      phone,
      message,
    });

    return NextResponse.json(
      { message: "Inquiry submitted successfully", inquiry },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
