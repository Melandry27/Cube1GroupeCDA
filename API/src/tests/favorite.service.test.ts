import * as FavoriteService from "../services/FavoriteService";
import * as FavoriteDatabase from "../database/FavoriteDatabase";
import { IFavorite } from "../models/Favorite";

jest.mock("../database/FavoriteDatabase");

const mockFavorite: IFavorite = {
  _id: "123" as any,
  userId: "user123",
  ressourceId: "res123",
  isFavorited: true,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as IFavorite;

describe("FavoriteService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a favorite", async () => {
    (FavoriteDatabase.create as jest.Mock).mockResolvedValue(mockFavorite);

    const result = await FavoriteService.createFavorite({
      userId: mockFavorite.userId,
      ressourceId: mockFavorite.ressourceId,
      isFavorited: true,
    });

    expect(FavoriteDatabase.create).toHaveBeenCalled();
    expect(result).toEqual(mockFavorite);
  });

  it("should get all favorites", async () => {
    (FavoriteDatabase.findAll as jest.Mock).mockResolvedValue([mockFavorite]);

    const result = await FavoriteService.getAllFavorites();
    expect(FavoriteDatabase.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockFavorite]);
  });

  it("should get a favorite by id", async () => {
    (FavoriteDatabase.findById as jest.Mock).mockResolvedValue(mockFavorite);

    const result = await FavoriteService.getFavoriteById("123");
    expect(FavoriteDatabase.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockFavorite);
  });

  it("should update a favorite", async () => {
    (FavoriteDatabase.update as jest.Mock).mockResolvedValue(mockFavorite);

    const result = await FavoriteService.updateFavorite("123", {
      isFavorited: false,
    });

    expect(FavoriteDatabase.update).toHaveBeenCalledWith("123", {
      isFavorited: false,
    });
    expect(result).toEqual(mockFavorite);
  });

  it("should delete a favorite", async () => {
    (FavoriteDatabase.remove as jest.Mock).mockResolvedValue(mockFavorite);

    const result = await FavoriteService.deleteFavorite("123");

    expect(FavoriteDatabase.remove).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockFavorite);
  });

  it("should get favorite by ressourceId and userId", async () => {
    (FavoriteDatabase.getFavoriteByRessourceId as jest.Mock).mockResolvedValue(mockFavorite);

    const result = await FavoriteService.getFavoriteByRessourceId("res123", "user123");

    expect(FavoriteDatabase.getFavoriteByRessourceId).toHaveBeenCalledWith("res123", "user123");
    expect(result).toEqual(mockFavorite);
  });
});