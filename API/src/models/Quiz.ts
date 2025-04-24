import mongoose, { Schema, Document } from "mongoose";

interface Question {
  title: string;
  choices: string[];
  correctAnswer: number;
}

export interface IQuiz extends Document {
  resourceId: mongoose.Types.ObjectId;
  questions: Question[];
  progress: number;
  score: number;
}

const QuestionSchema = new Schema<Question>(
  {
    title: { type: String, required: true },
    choices: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
  },
  { _id: false }
);

const QuizSchema = new Schema<IQuiz>(
  {
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ressource",
      required: true,
      unique: true,
    },
    questions: [QuestionSchema],
    progress: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IQuiz>("Quiz", QuizSchema);
