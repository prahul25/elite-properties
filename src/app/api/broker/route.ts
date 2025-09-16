import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import BrokerModel from "@/models/Broker";
import { generateTokens } from "@/utils/generateTokens";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: "All fields (name, email, phone, password) are required" },
        { status: 400 }
      );
    }

    const existingBroker = await BrokerModel.findOne({ $or: [{ email }, { phone }] });
    if (existingBroker) {
      return NextResponse.json(
        { error: "Broker with this email or phone already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const broker = await BrokerModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      properties: [],
    });

    // ✅ issue tokens on sign-up
    const { accessToken, refreshToken } = generateTokens(broker.id.toString());

    return NextResponse.json(
      {
        message: "Broker registered successfully",
        broker: {
          _id: broker._id,
          name: broker.name,
          email: broker.email,
          phone: broker.phone,
        },
        tokens: { accessToken, refreshToken },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to register broker" },
      { status: 500 }
    );
  }
}
