import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import PropertyModel from "@/models/Property";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
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

    // ✅ Extract pagination params
    const { searchParams } = new URL(req.url);
    // console.log(searchParams,"SEARCH PARAMS")
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const skip = (page - 1) * limit;

    // ✅ Fetch properties of that broker only
    const [properties, total] = await Promise.all([
      PropertyModel.find({ brokerId: id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      PropertyModel.countDocuments({ brokerId: id }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
      properties,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
