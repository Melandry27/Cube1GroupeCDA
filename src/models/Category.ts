import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  id: number;
  name: string;
  description: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>("Statistic", CategorySchema);
