import mongoose, { Document, Schema } from "mongoose";

interface IFile extends Document {
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  ressourceId: string;
  uploadedBy?: mongoose.Types.ObjectId;
}

const FileSchema = new Schema<IFile>(
  {
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
    ressourceId: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export { IFile };

export default mongoose.model<IFile>("File", FileSchema);
