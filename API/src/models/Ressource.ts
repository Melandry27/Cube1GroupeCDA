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

const RessourceSchema = new Schema<IRessource>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(RessourceType),
      required: true,
    },
    createdBy: { type: String, required: true, ref: "User" },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export { IRessource, RessourceType };

export default mongoose.model<IRessource>("Ressource", RessourceSchema);