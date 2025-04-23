import mongoose, { Document, Schema } from "mongoose";

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
}

interface ResourceInput {
  title: string;
  content: string;
  type?: RessourceType;
  createdBy: string;
  categoryId: mongoose.Types.ObjectId;
  image?: string;
}

const RessourceSchema = new Schema<IRessource>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    type: {
      type: String,
      enum: Object.values(RessourceType),
      required: true,
      default: RessourceType.NotStarted,
    },
    createdBy: { type: String, required: true, ref: "User" },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IRessource, ResourceInput, RessourceType };

export default mongoose.model<IRessource>("Ressource", RessourceSchema);
