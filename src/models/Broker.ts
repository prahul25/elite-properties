import mongoose, { Document, Schema } from "mongoose";

// ✅ Interface for Broker
export interface Broker extends Document {
  name: string;
  email: string;
  phone: string;
  password: string; // hashed password
  properties: mongoose.Types.ObjectId[]; // references to Property documents
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Mongoose schema
const BrokerSchema: Schema<Broker> = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Please provide a valid email address"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    // ✅ Reference to Property model
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true }
);

// ✅ Model export with hot-reload protection
const BrokerModel =
  (mongoose.models.Broker as mongoose.Model<Broker>) ||
  mongoose.model<Broker>("Broker", BrokerSchema);

export default BrokerModel;
