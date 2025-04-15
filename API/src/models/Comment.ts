import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  userId: string;
  ressourceId: string;
  content: string;
}

const CommentSchema = new Schema<IComment>(
  {
    userId: { type: String, required: true },
    ressourceId: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export { IComment };

export default mongoose.model<IComment>("Comment", CommentSchema);
