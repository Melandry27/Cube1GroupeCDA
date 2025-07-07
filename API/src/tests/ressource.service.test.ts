import * as RessourceService from "../services/RessourceService";
import * as RessourceDatabase from "../database/RessourceDatabase";
import { IRessource, RessourceType } from "../models/Ressource";

jest.mock("../database/RessourceDatabase");

const mockRessource = {
  _id: "mock-id",
  title: "Test Ressource",
  content: "Contenu de test",
  type: RessourceType.Completed,
  createdBy: "user123",
  categoryId: "category123" as any,
  image: "image.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
  file: {
    originalName: "test.pdf",
    mimeType: "application/pdf",
    size: 12345,
    path: "/tmp/test.pdf",
    ressourceId: "mock-id"
  }
};

describe("RessourceService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all ressources", async () => {
    (RessourceDatabase.getAllRessources as jest.Mock).mockResolvedValue([mockRessource]);

    const result = await RessourceService.getAll();

    expect(RessourceDatabase.getAllRessources).toHaveBeenCalled();
    expect(result).toEqual([mockRessource]);
  });

  it("should return ressource by id", async () => {
    (RessourceDatabase.getRessourceById as jest.Mock).mockResolvedValue(mockRessource);

    const result = await RessourceService.getById("mock-id");

    expect(RessourceDatabase.getRessourceById).toHaveBeenCalledWith("mock-id");
    expect(result).toEqual(mockRessource);
  });

  it("should return all resource types", () => {
    const types = RessourceService.getResourceTypes();
    expect(types).toContain(RessourceType.Completed);
    expect(types).toContain(RessourceType.InProgress);
    expect(types).toContain(RessourceType.NotStarted);
  });

  it("should create a ressource", async () => {
    (RessourceDatabase.createRessource as jest.Mock).mockResolvedValue(mockRessource);

    const result = await RessourceService.create(mockRessource);

    expect(RessourceDatabase.createRessource).toHaveBeenCalledWith(mockRessource);
    expect(result).toEqual(mockRessource);
  });

  it("should update a ressource", async () => {
    const update = { title: "Updated Title" };
    const updated = { ...mockRessource, ...update };

    (RessourceDatabase.updateRessource as jest.Mock).mockResolvedValue(updated);

    const result = await RessourceService.update("mock-id", update);

    expect(RessourceDatabase.updateRessource).toHaveBeenCalledWith("mock-id", update);
    expect(result).toEqual(updated);
  });

  it("should remove a ressource", async () => {
    (RessourceDatabase.removeRessource as jest.Mock).mockResolvedValue(mockRessource);

    const result = await RessourceService.remove("mock-id");

    expect(RessourceDatabase.removeRessource).toHaveBeenCalledWith("mock-id");
    expect(result).toEqual(mockRessource);
  });
});
