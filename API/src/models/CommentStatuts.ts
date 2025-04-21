import mongoose, { Document, Schema } from "mongoose";

interface ICommentStatus extends Document {
  name: string;
}

const CommentStatusSchema = new Schema<ICommentStatus>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export { ICommentStatus };

export default mongoose.model<ICommentStatus>("CommentStatus", CommentStatusSchema);