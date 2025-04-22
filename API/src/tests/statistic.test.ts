import mongoose from "mongoose";
import * as StatisticDB from "../database/StatisticDatabase";
import { IStatistic } from "../models/Statistic";
import * as StatisticService from "../services/StatisticService";

jest.mock("../database/StatisticDatabase");

describe("StatisticService", () => {
  const mongoUri =
    process.env.MONGO_URI_TEST || "mongodb://localhost:21017/testdb";

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  const fakeStatistic: IStatistic = {
    _id: "6603b4a8e3cf0e26cfc12345",
    id: "stat1",
    ressourceId: "res1",
    views: 10,
    favorites: 2,
    shares: 1,
  } as IStatistic;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all statistics", async () => {
    (StatisticDB.getAllStatistics as jest.Mock).mockResolvedValue([
      fakeStatistic,
    ]);

    const result = await StatisticService.getAll();
    expect(result).toEqual([fakeStatistic]);
    expect(StatisticDB.getAllStatistics).toHaveBeenCalledTimes(1);
  });

  it("should get a statistic by id", async () => {
    (StatisticDB.getStatisticById as jest.Mock).mockResolvedValue(
      fakeStatistic
    );

    const result = await StatisticService.getById("stat1");
    expect(result).toEqual(fakeStatistic);
    expect(StatisticDB.getStatisticById).toHaveBeenCalledWith("stat1");
  });

  it("should create a new statistic", async () => {
    (StatisticDB.createStatistic as jest.Mock).mockResolvedValue(fakeStatistic);

    const result = await StatisticService.create(fakeStatistic);
    expect(result).toEqual(fakeStatistic);
    expect(StatisticDB.createStatistic).toHaveBeenCalledWith(fakeStatistic);
  });

  it("should update a statistic", async () => {
    const updatedStatistic = { ...fakeStatistic, views: 99 };
    (StatisticDB.updateStatistic as jest.Mock).mockResolvedValue(
      updatedStatistic
    );

    const result = await StatisticService.update("stat1", { views: 99 });
    expect(result).toEqual(updatedStatistic);
    expect(StatisticDB.updateStatistic).toHaveBeenCalledWith("stat1", {
      views: 99,
    });
  });

  it("should delete a statistic", async () => {
    (StatisticDB.deleteStatistic as jest.Mock).mockResolvedValue(fakeStatistic);

    const result = await StatisticService.remove("stat1");
    expect(result).toEqual(fakeStatistic);
    expect(StatisticDB.deleteStatistic).toHaveBeenCalledWith("stat1");
  });
});
