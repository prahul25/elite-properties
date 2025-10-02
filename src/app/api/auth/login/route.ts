import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import BrokerModel from "@/models/Broker";

import { generateTokens } from "@/utils/generateTokens";
import SessionModel from "@/models/Session";

// ✅ POST: Login broker
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
     const { email, phone, password } = body;

    if ((!email && !phone) || !password) {
      return NextResponse.json(
        { error: "Email or phone and password are required" },
        { status: 400 }
      );
    }

    // ✅ Find broker by email OR phone
    const broker = await BrokerModel.findOne(
      email ? { email } : { phone }
    )

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

// ✅ new - update if exists, otherwise create
await SessionModel.findOneAndUpdate(
  { brokerId: broker._id }, // match existing session
  {
    refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  { upsert: true, new: true } // create if not exists
);


    // ✅ Response with HttpOnly cookie for refreshToken
    const response = NextResponse.json(
      {
        message: "Login successful",
        broker: {
          _id: broker._id,
          name: broker.name,
          email: broker.email,
          phone: broker.phone,
        },
        accessToken ,
      },
      { status: 200 }
    );

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Login failed" },
      { status: 500 }
    );
  }
}
