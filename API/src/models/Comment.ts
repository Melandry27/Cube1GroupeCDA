import mongoose, { Document, Schema } from "mongoose";

enum CommentStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

interface IComment extends Document {
  userId: string;
  ressourceId: string;
  content: string;
  commentStatus?: CommentStatus;
}

const CommentSchema = new Schema<IComment>(
  {
    userId: { type: String, required: true },
    ressourceId: { type: String, required: true },
    content: { type: String, required: true },
    commentStatus: { 
      type: String, 
      enum: Object.values(CommentStatus), 
      default: CommentStatus.Pending,
      required: false 
    },
  },
  {
    timestamps: true,
  }
);

export { IComment, CommentStatus };

export default mongoose.model<IComment>("Comment", CommentSchema);
