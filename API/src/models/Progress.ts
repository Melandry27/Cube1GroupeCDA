import mongoose, { Document, Schema } from "mongoose";

enum ProgressStatus {
  InProgress = "In Progress",
  Completed = "Completed",
  NotStarted = "Not Started",
}

interface IProgress extends Document {
  id: number;
  userId: string;
  ressourceId: string;
  status: ProgressStatus;
}

const ProgressSchema = new Schema<IProgress>(
  {
    id: { type: Number, required: true },
    userId: { type: String, required: true },
    ressourceId: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ProgressStatus),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IProgress, ProgressStatus };

export default mongoose.model<IProgress>("Progress", ProgressSchema);
