import mongoose, { Document } from "mongoose";
import { FileInput } from "./File";

enum RessourceType {
  InProgress = "In Progress",
  Completed = "Completed",
  NotStarted = "Not Started",
}

interface IRessource extends Document {
  title: string;
  content: string;
  type: RessourceType;
  createdBy: string;
  categoryId: mongoose.Types.ObjectId;
  image?: string;
  file?: Object;
  quiz?: any;
}

interface ResourceInput {
  title: string;
  content: string;
  type?: RessourceType;
  createdBy: string;
  categoryId: mongoose.Types.ObjectId;
  image?: string;
  file?: FileInput;
  quiz?: any;
}

const RessourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, default: "Not Started" },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: { type: String },
  file: {
    originalName: String,
    mimeType: String,
    size: Number,
    path: String,
    ressourceId: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  quiz: [
    {
      text: { type: String, required: true },
      options: [
        {
          text: { type: String, required: true },
          isCorrect: { type: Boolean, required: true },
        },
      ],
    },
  ],
});

export { IRessource, ResourceInput, RessourceType };

export default mongoose.model<IRessource>("Ressource", RessourceSchema);
