import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  message: string;
  timestamp: Date;
  read: boolean;
}

const MessageSchema: Schema<IMessage> = new Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
