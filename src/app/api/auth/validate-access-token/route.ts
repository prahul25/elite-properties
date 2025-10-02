import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify JWT using secret
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    return NextResponse.json(
      { valid: true, decoded },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.log(err,'error while validating access token')
    return NextResponse.json(
      { valid: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
