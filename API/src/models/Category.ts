import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
    name: string;
    description: string;
    color?: string;
}

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        color: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

export { ICategory };

export default mongoose.model<ICategory>("Category", CategorySchema);