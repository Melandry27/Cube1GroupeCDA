import mongoose, { Document, Schema } from "mongoose";

interface IFavorite extends Document {
  userId: string;
  ressourceId: string;
  isFavorited: boolean;
}

interface IFavoriteInput {
  userId: string;
  ressourceId: string;
  isFavorited: boolean;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    userId: { type: String, required: true },
    ressourceId: { type: String, required: true },
    isFavorited: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

FavoriteSchema.virtual("ressource", {
  ref: "Ressource",
  localField: "ressourceId",
  foreignField: "_id",
  justOne: true,
});

FavoriteSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

FavoriteSchema.set("toObject", { virtuals: true });
FavoriteSchema.set("toJSON", { virtuals: true });

export { IFavorite, IFavoriteInput };

export default mongoose.model<IFavorite>("Favorite", FavoriteSchema);
