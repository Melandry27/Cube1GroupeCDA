import mongoose, { Document, Schema } from "mongoose";

interface IFavorite extends Document {
  userId: string;
  ressourceId: string;
  type: string;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    userId: { type: String, required: true },
    ressourceId: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export { IFavorite };

export default mongoose.model<IFavorite>("Favorite", FavoriteSchema);
