// models/Session.ts
import mongoose, { Schema, Document } from "mongoose";

export interface Session extends Document {
  brokerId: mongoose.Types.ObjectId; // link to broker
  refreshToken: string;              // store refresh token
  expiresAt: Date;                   // when it becomes invalid
}

const SessionSchema = new Schema<Session>(
  {
    brokerId: { type: Schema.Types.ObjectId, ref: "Broker", required: true },
    refreshToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const SessionModel =
  (mongoose.models.Session as mongoose.Model<Session>) ||
  mongoose.model<Session>("Session", SessionSchema);

export default SessionModel;
