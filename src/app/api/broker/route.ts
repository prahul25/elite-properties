import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import BrokerModel, { Broker } from "@/models/Broker";
import { generateTokens } from "@/utils/generateTokens";
import SessionModel from "@/models/Session";
import { FilterQuery } from "mongoose";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name || !phone || !password) {
      return NextResponse.json(
        { error: "All fields (name, phone, password) are required" },
        { status: 400 }
      );
    }

    const query: FilterQuery<Broker> = { $or: [{ phone }] };
if (email) query.$or!.push({ email });

const existingBroker = await BrokerModel.findOne(query);

    if (existingBroker) {
  if (existingBroker.email === email) {
    return NextResponse.json(
      { error: "This email address is already registered. Please use a different email" },
      { status: 400 }
    );
  }
  if (existingBroker.phone === phone) {
    return NextResponse.json(
      { error: "This phone number is already registered. Please use a different phone number" },
      { status: 400 }
    );
  }
}

    const hashedPassword = await bcrypt.hash(password, 10);

    const broker = await BrokerModel.create({
      name,
      email : email || null,
      phone,
      password: hashedPassword,
      properties: [],
    });

    // ✅ issue tokens on sign-up
    const { accessToken, refreshToken } = generateTokens(broker.id.toString());

     await SessionModel.create({
      brokerId: broker._id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });
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
