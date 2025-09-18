// models/Inquiry.ts
import mongoose, { Schema, Document } from "mongoose";

export interface Inquiry extends Document {
  propertyId: mongoose.Types.ObjectId;
  brokerId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: Date;
}

const InquirySchema = new Schema<Inquiry>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    brokerId: { type: Schema.Types.ObjectId, ref: "Broker", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

const InquiryModel =
  (mongoose.models.Inquiry as mongoose.Model<Inquiry>) ||
  mongoose.model<Inquiry>("Inquiry", InquirySchema);

export default InquiryModel;
