import mongoose, { Document, Schema, Types } from "mongoose";

interface IFile extends Document {
  _id: Types.ObjectId;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  ressourceId: string;
  uploadedBy?: mongoose.Types.ObjectId;
}

interface FileInput {
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

export { FileInput, IFile };

export default mongoose.model<IFile>("File", FileSchema);
