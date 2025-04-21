import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  userId: string;
  ressourceId: string;
  content: string;
  commentStatutsId?: mongoose.Types.ObjectId;
}

const CommentSchema = new Schema<IComment>(
  {
    userId: { type: String, required: true },
    ressourceId: { type: String, required: true },
    content: { type: String, required: true },
    commentStatutsId: { type: mongoose.Schema.Types.ObjectId, ref: "CommentStatus", required: false },
  },
  {
    timestamps: true,
  }
);

export { IComment };

export default mongoose.model<IComment>("Comment", CommentSchema);
