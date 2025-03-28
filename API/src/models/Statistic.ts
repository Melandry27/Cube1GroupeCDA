import mongoose, { Document, Schema } from "mongoose";

interface IStatistic extends Document {
  id: number;
  ressourceId: string;
  views: number;
  favorites: number;
  shares: number;
}

const StatisticSchema = new Schema<IStatistic>(
  {
    id: { type: Number, required: true },
    ressourceId: { type: String, required: true },
    views: { type: Number, required: true },
    favorites: { type: Number, required: true },
    shares: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStatistic>("Statistic", StatisticSchema);
