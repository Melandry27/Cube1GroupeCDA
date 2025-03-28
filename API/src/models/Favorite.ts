import mongoose, { Document, Schema } from "mongoose";

interface IFavorite extends Document {
  id: number;
  userId: string;
  ressourceId: string;
  type: string;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    id: { type: Number, required: true },
    userId: { type: String, required: true },
    ressourceId: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFavorite>("Favorite", FavoriteSchema);
