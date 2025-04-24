import mongoose, { Document, Schema } from "mongoose";

enum ProgressStatus {
  InProgress = "In Progress",
  Completed = "Completed",
  NotStarted = "Not Started",
}

interface IProgress extends Document {
  userId: string;
  ressourceId: string;
  status: ProgressStatus;
}

const ProgressSchema = new Schema<IProgress>(
  {
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
