import mongoose, { Document, Schema } from "mongoose";

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  options: Option[];
}

interface IQuiz extends Document {
  ressourceId: mongoose.Types.ObjectId;
  questions: Question[];
}

const OptionSchema = new Schema<Option>(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { _id: false }
);

const QuestionSchema = new Schema<Question>(
  {
    text: { type: String, required: true },
    options: {
      type: [OptionSchema],
      validate: [
        (val: Option[]) => val.length >= 2 && val.length <= 4,
        "Une question doit avoir entre 2 et 4 options.",
      ],
    },
  },
  { _id: false }
);

const QuizSchema = new Schema<IQuiz>(
  {
    ressourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ressource",
      required: true,
      unique: true,
    },
    questions: {
      type: [QuestionSchema],
      validate: [
        (val: Question[]) => val.length <= 4,
        "Maximum 4 questions autorisées.",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IQuiz>("Quiz", QuizSchema);
