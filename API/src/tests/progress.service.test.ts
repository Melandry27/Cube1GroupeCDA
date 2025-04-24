import * as ProgressService from "../services/ProgressService";
import * as ProgressDatabase from "../database/ProgressDatabase";
import { IProgress, ProgressStatus } from "../models/Progress";

jest.mock("../database/ProgressDatabase");

const mockProgress: IProgress = {
  _id: "123",
  userId: "user123",
  ressourceId: "ressource123",
  status: ProgressStatus.InProgress,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as IProgress;

describe("ProgressService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a progress", async () => {
    (ProgressDatabase.create as jest.Mock).mockResolvedValue(mockProgress);

    const result = await ProgressService.createProgress(mockProgress);

    expect(ProgressDatabase.create).toHaveBeenCalledWith(mockProgress);
    expect(result).toEqual(mockProgress);
  });

  it("should fetch all progress", async () => {
    (ProgressDatabase.findAll as jest.Mock).mockResolvedValue([mockProgress]);

    const result = await ProgressService.getAllProgress();

    expect(ProgressDatabase.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockProgress]);
  });

  it("should fetch progress by id", async () => {
    (ProgressDatabase.findById as jest.Mock).mockResolvedValue(mockProgress);

    const result = await ProgressService.getProgressById("123");

    expect(ProgressDatabase.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockProgress);
  });

  it("should update progress", async () => {
    const updateData = { status: ProgressStatus.Completed };
    (ProgressDatabase.update as jest.Mock).mockResolvedValue({
      ...mockProgress,
      ...updateData,
    });

    const result = await ProgressService.updateProgress("123", updateData);

    expect(ProgressDatabase.update).toHaveBeenCalledWith("123", updateData);
    expect(result).toEqual({ ...mockProgress, ...updateData });
  });

  it("should delete progress", async () => {
    (ProgressDatabase.remove as jest.Mock).mockResolvedValue(mockProgress);

    const result = await ProgressService.deleteProgress("123");

    expect(ProgressDatabase.remove).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockProgress);
  });
});
