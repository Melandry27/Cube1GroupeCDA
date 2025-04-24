import * as CategoryService from "../services/CategoryService";
import * as CategoryDatabase from "../database/CategoryDatabase";
import { ICategory } from "../models/Category";

jest.mock("../database/CategoryDatabase");

const mockCategory: ICategory = {
  _id: "123" as any,
  name: "Éducation",
  description: "Tout ce qui concerne l'éducation",
  color: "#FFAA00",
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as ICategory;

describe("CategoryService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a category", async () => {
    (CategoryDatabase.create as jest.Mock).mockResolvedValue(mockCategory);

    const result = await CategoryService.create(mockCategory);
    expect(CategoryDatabase.create).toHaveBeenCalledWith(mockCategory);
    expect(result).toEqual(mockCategory);
  });

  it("should get all categories", async () => {
    (CategoryDatabase.findAll as jest.Mock).mockResolvedValue([mockCategory]);

    const result = await CategoryService.getAll();
    expect(CategoryDatabase.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockCategory]);
  });

  it("should get category by id", async () => {
    (CategoryDatabase.findById as jest.Mock).mockResolvedValue(mockCategory);

    const result = await CategoryService.getById("123");
    expect(CategoryDatabase.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockCategory);
  });

  it("should update a category", async () => {
    const updated = { name: "Culture" };
    (CategoryDatabase.update as jest.Mock).mockResolvedValue({
      ...mockCategory,
      ...updated,
    });

    const result = await CategoryService.update("123", updated);
    expect(CategoryDatabase.update).toHaveBeenCalledWith("123", updated);
    expect(result?.name).toBe("Culture");
  });

  it("should delete a category", async () => {
    (CategoryDatabase.remove as jest.Mock).mockResolvedValue(mockCategory);

    const result = await CategoryService.remove("123");
    expect(CategoryDatabase.remove).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockCategory);
  });
});
