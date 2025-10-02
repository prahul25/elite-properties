import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import SessionModel from "@/models/Session";
import { generateTokens } from "@/utils/generateTokens";
import { cookies } from "next/headers";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export async function POST() {
  try {
    await dbConnect();

 const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token required" }, { status: 400 });
    }

    // ✅ verify token using secret from ENV
    let decoded: string | JwtPayload;
    try {
      decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    }

    const brokerId = (decoded as JwtPayload).brokerId;

    // ✅ check if refresh token exists in DB
    const session = await SessionModel.findOne({ brokerId, refreshToken });
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 401 });
    }

    // ✅ check if expired
    if (session.expiresAt < new Date()) {
      return NextResponse.json({ error: "Refresh token expired" }, { status: 401 });
    }

    // ✅ issue new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(brokerId);

    // ✅ update session (rotation)
    session.refreshToken = newRefreshToken;
    session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await session.save();

    const response = NextResponse.json({ accessToken }, { status: 200 });
    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to refresh token" },
      { status: 500 }
    );
  }
}
