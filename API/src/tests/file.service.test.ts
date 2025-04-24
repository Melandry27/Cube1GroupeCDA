import * as FileService from "../services/FileService";
import * as FileDatabase from "../database/FileDatabase";
import fs from "fs/promises";
import path from "path";
import { IFile } from "../models/File";

jest.mock("../database/FileDatabase");
jest.mock("fs/promises");

const mockFile: IFile = {
  _id: "123" as any,
  originalName: "doc.pdf",
  mimeType: "application/pdf",
  size: 1000,
  path: "/uploads/tempfile.tmp",
  ressourceId: "res123",
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as IFile;

describe("FileService", () => {
  afterEach(() => jest.clearAllMocks());

  it("should create a file", async () => {
    (FileDatabase.create as jest.Mock).mockResolvedValue(mockFile);
    const result = await FileService.create(mockFile);
    expect(FileDatabase.create).toHaveBeenCalledWith(mockFile);
    expect(result).toEqual(mockFile);
  });

  it("should return all files", async () => {
    (FileDatabase.findAll as jest.Mock).mockResolvedValue([mockFile]);
    const result = await FileService.getAll();
    expect(FileDatabase.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockFile]);
  });

  it("should return file by id", async () => {
    (FileDatabase.findById as jest.Mock).mockResolvedValue(mockFile);
    const result = await FileService.getById("123");
    expect(FileDatabase.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockFile);
  });

  it("should update a file", async () => {
    (FileDatabase.update as jest.Mock).mockResolvedValue(mockFile);
    const result = await FileService.update("123", { path: "/uploads/newfile.pdf" });
    expect(FileDatabase.update).toHaveBeenCalledWith("123", { path: "/uploads/newfile.pdf" });
    expect(result).toEqual(mockFile);
  });

  it("should delete a file", async () => {
    (FileDatabase.remove as jest.Mock).mockResolvedValue(mockFile);
    const result = await FileService.remove("123");
    expect(FileDatabase.remove).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockFile);
  });

  it("should rename file on disk", async () => {
    const renameParams = {
      currentFilename: "/uploads/tempfile.tmp",
      newId: "123",
      originalName: "doc.pdf",
    };

    const updatedMock = { ...mockFile, path: "/uploads/123.pdf" };
    (fs.rename as jest.Mock).mockResolvedValue(undefined);
    (FileDatabase.update as jest.Mock).mockResolvedValue(updatedMock);

    const result = await FileService.renameFileOnDisk(renameParams);
    expect(fs.rename).toHaveBeenCalledWith(
      path.join(__dirname, "..", "..", renameParams.currentFilename),
      path.join(__dirname, "..", "..", "\\uploads\\123.pdf")
    );
    expect(FileDatabase.update).toHaveBeenCalledWith("123", { path: "/uploads/123.pdf" });
    expect(result).toEqual(updatedMock);
  });
});
