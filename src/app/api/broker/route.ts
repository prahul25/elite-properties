import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

import bcrypt from "bcryptjs";
import BrokerModel from "@/models/Broker";

// ✅ POST: Register a new broker
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, phone, password } = body;

    // ✅ Basic validation
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: "All fields (name, email, phone, password) are required" },
        { status: 400 }
      );
    }

    // ✅ Check if broker already exists
    const existingBroker = await BrokerModel.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingBroker) {
      return NextResponse.json(
        { error: "Broker with this email or phone already exists" },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new broker
    const broker = await BrokerModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      properties: [],
    });

    return NextResponse.json(
      { message: "Broker registered successfully", broker },
      { status: 201 }
    );
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("POST /api/brokers error:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
  // fallback for non-Error cases
  console.error("POST /api/brokers unknown error:", err);
  return NextResponse.json(
    { error: "Failed to register broker" },
    { status: 500 }
  );
}

}
