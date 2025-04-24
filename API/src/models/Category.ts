import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
  description: string;
  color?: string;
  slug: string;
}

interface CategoryInput {
  name: string;
  description: string;
  color?: string;
  slug: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    color: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export { CategoryInput, ICategory };

export default mongoose.model<ICategory>("Category", CategorySchema);
