import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import BrokerModel from "@/models/Broker";

import { generateTokens } from "@/utils/generateTokens";

// ✅ POST: Login broker
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { emailOrPhone, password } = body;

    if (!emailOrPhone || !password) {
      return NextResponse.json(
        { error: "Email/Phone and password are required" },
        { status: 400 }
      );
    }

    // ✅ Find broker by email OR phone
    const broker = await BrokerModel.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!broker) {
      return NextResponse.json(
        { error: "Invalid email/phone or password" },
        { status: 401 }
      );
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, broker.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email/phone or password" },
        { status: 401 }
      );
    }

    // ✅ Generate tokens
    const { accessToken, refreshToken } = generateTokens(broker.id.toString());

    // ✅ Save refresh token in Session collection
    // await SessionModel.create({
    //   brokerId: broker._id,
    //   refreshToken,
    //   userAgent: req.headers.get("user-agent") || undefined,
    //   ipAddress: req.headers.get("x-forwarded-for") || undefined,
    //   expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    // });

    return NextResponse.json(
      {
        message: "Login successful",
        broker: {
          _id: broker._id,
          name: broker.name,
          email: broker.email,
          phone: broker.phone,
        },
        tokens: { accessToken, refreshToken },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Login failed" },
      { status: 500 }
    );
  }
}
