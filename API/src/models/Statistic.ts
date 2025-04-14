import mongoose, { Document, Schema } from "mongoose";

interface IStatistic extends Document {
  id: string;
  ressourceId: string;
  views: number;
  favorites: number;
  shares: number;
}

const StatisticSchema = new Schema<IStatistic>(
  {
    id: { type: String, required: true },
    ressourceId: { type: String, required: true },
    views: { type: Number, required: true },
    favorites: { type: Number, required: true },
    shares: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Statistic =
  mongoose.models.Statistic ||
  mongoose.model<IStatistic>("Statistic", StatisticSchema);

export { IStatistic };

export default Statistic;
