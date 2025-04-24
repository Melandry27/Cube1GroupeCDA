import mongoose, { Document, Schema } from "mongoose";
import { FileInput } from "./File";
// import {IQuiz} from "./Quizz";

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
  quizId?: mongoose.Types.ObjectId; // Référence facultative à un quiz
  // quiz?: IQuiz;
}

interface ResourceInput {
  title: string;
  content: string;
  type?: RessourceType;
  createdBy: string;
  categoryId: mongoose.Types.ObjectId;
  image?: string;
  file?: FileInput;
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
    file: { type: Object, required: false },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: false, // Facultatif
    },
  },
  {
    timestamps: true,
  }
);

export { IRessource, ResourceInput, RessourceType };

export default mongoose.model<IRessource>("Ressource", RessourceSchema);
