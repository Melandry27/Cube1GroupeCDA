import mongoose, { Document, Schema } from "mongoose";

enum RessourceType {
  InProgress = "In Progress",
  Completed = "Completed",
  NotStarted = "Not Started",
}

interface IRessource extends Document {
  id: number;
  title: string;
  content: string;
  type: RessourceType;
  createdBy: string;
}

const RessourceSchema = new Schema<IRessource>(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(RessourceType),
      required: true,
    },
    createdBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export { IRessource, RessourceType };

export default mongoose.model<IRessource>("Ressource", RessourceSchema);
