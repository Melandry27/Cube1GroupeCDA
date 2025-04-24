import * as StatisticService from "../services/StatisticService";
import * as StatisticDB from "../database/StatisticDatabase";
import { IStatistic } from "../models/Statistic";

jest.mock("../database/StatisticDatabase");

const mockStatistic: IStatistic = {
  _id: "mockid" as any,
  id: "stat-001",
  ressourceId: "res-001",
  views: 100,
  favorites: 25,
  shares: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as IStatistic;

describe("StatisticService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all statistics", async () => {
    (StatisticDB.getAllStatistics as jest.Mock).mockResolvedValue([mockStatistic]);

    const result = await StatisticService.getAll();
    expect(StatisticDB.getAllStatistics).toHaveBeenCalled();
    expect(result).toEqual([mockStatistic]);
  });

  it("should fetch statistic by id", async () => {
    (StatisticDB.getStatisticById as jest.Mock).mockResolvedValue(mockStatistic);

    const result = await StatisticService.getById("stat-001");
    expect(StatisticDB.getStatisticById).toHaveBeenCalledWith("stat-001");
    expect(result).toEqual(mockStatistic);
  });

  it("should create a new statistic", async () => {
    (StatisticDB.createStatistic as jest.Mock).mockResolvedValue(mockStatistic);

    const result = await StatisticService.create(mockStatistic);
    expect(StatisticDB.createStatistic).toHaveBeenCalledWith(mockStatistic);
    expect(result).toEqual(mockStatistic);
  });

  it("should update a statistic", async () => {
    const updateData = { views: 150 };
    (StatisticDB.updateStatistic as jest.Mock).mockResolvedValue({ ...mockStatistic, ...updateData });

    const result = await StatisticService.update("stat-001", updateData);
    expect(StatisticDB.updateStatistic).toHaveBeenCalledWith("stat-001", updateData);
    expect(result?.views).toBe(150);
  });

  it("should delete a statistic", async () => {
    (StatisticDB.deleteStatistic as jest.Mock).mockResolvedValue(mockStatistic);

    const result = await StatisticService.remove("stat-001");
    expect(StatisticDB.deleteStatistic).toHaveBeenCalledWith("stat-001");
    expect(result).toEqual(mockStatistic);
  });
});
