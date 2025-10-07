import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import BrokerModel from "@/models/Broker";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid broker id" },
        { status: 400 }
      );
    }

    // Pull only the fields we care about
    const broker = await BrokerModel.findById(id).select("name phone email");
    if (!broker) {
      return NextResponse.json(
        { success: false, message: "Broker not found" },
        { status: 404 }
      );
    }

    // Build a minimal payload and omit email if not present
    const payload: {
      _id: string;
      name: string;
      phone: string;
      email?: string;
    } = {
      _id: broker.id.toString(),
      name: broker.name,
      phone: broker.phone,
    };
    if (broker.email) payload.email = broker.email;

    return NextResponse.json({ success: true, broker: payload });
  } catch (err: unknown) {
  const message =
    err instanceof Error ? err.message : "Server error";

  return NextResponse.json(
    { success: false, message },
    { status: 500 }
  );
}
}
