import mongoose, { Document, Schema } from "mongoose";

// ✅ Interface for TypeScript usage
export interface Property extends Document {
  title: string;

  transactionType: "Rent" | "Sell" | "Lease"; // strictly allowed values
  propertyType: string; // Apartment, House, Shop, Office etc.
  price: number;

  location: {
    city: string;
    area: string;
    state?: string;
  };

  details: {
    carpetArea: number;
    furnished: "Furnished" | "Semi-Furnished" | "Unfurnished";
    bhk?: number; // only for homes (optional for office/shop)
    description?: string; // optional text (cabins, pantry etc.)
  };

  coverImage: string;
  images: string[];
  brokerId: mongoose.Types.ObjectId;

  status: "Active" | "Sold" | "Rented";
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Mongoose schema
const PropertySchema: Schema<Property> = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },

    transactionType: {
      type: String,
      enum: ["Rent", "Sell", "Lease"],
      required: [true, "Transaction type is required"],
    },

    propertyType: { type: String, required: [true, "Property type is required"] },

    price: { type: Number, required: [true, "Price is required"] },

    location: {
      city: { type: String, required: [true, "City is required"] },
      area: { type: String, required: [true, "Area is required"] },
      state: { type: String },
    },

    details: {
      carpetArea: { type: Number, required: [true, "Carpet area is required"] },
      furnished: {
        type: String,
        enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
        required: [true, "Furnished status is required"],
      },
      bhk: { type: Number }, // only for homes
      description: { type: String }, // office/shop notes
    },
    coverImage: { type: String, required: [true, "Cover image is required"] },
    images: {
      type: [String],
      validate: {
        validator: function (arr: string[]) {
          return arr.length <= 5;
        },
        message: "You can upload up to 5 images only",
      },
    },

    brokerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Broker", // "Broker" model 
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Sold", "Rented"],
      default: "Active",
    },
  },
  { timestamps: true } // auto adds createdAt + updatedAt
);

// ✅ Model export with hot-reload protection (important for Next.js)
const PropertyModel =
  (mongoose.models.Property as mongoose.Model<Property>) ||
  mongoose.model<Property>("Property", PropertySchema);

export default PropertyModel;
