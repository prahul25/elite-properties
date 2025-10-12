import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import BrokerModel from "@/models/Broker";
import PropertyModel from "@/models/Property";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      title,
      transactionType,
      propertyType,
      price,
      brokerId,
      location,
      details,
      coverImage,
      images,
      status,
    } = body;

    if (!title || !transactionType || !propertyType || !price || !brokerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const broker = await BrokerModel.findById(brokerId);
    if (!broker) {
      return NextResponse.json({ error: "Broker not found" }, { status: 404 });
    }

    const newProperty = await PropertyModel.create({
      title,
      transactionType,
      propertyType,
      price,
      location,
      details,
      coverImage,
      images,
      brokerId,
      status: status || "Active",
    });

    broker.properties.push(newProperty.id);
    await broker.save();

    return NextResponse.json(
      { message: "Property added successfully", property: newProperty },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
