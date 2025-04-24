import * as CommentService from "../services/CommentService";
import * as CommentDatabase from "../database/CommentDatabase";
import { IComment, CommentStatus } from "../models/Comment";

jest.mock("../database/CommentDatabase");

const mockComment: IComment = {
  _id: "123" as any,
  userId: "user1",
  ressourceId: "res1",
  content: "Ceci est un commentaire.",
  commentStatus: CommentStatus.Pending,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as IComment;

describe("CommentService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a comment", async () => {
    (CommentDatabase.create as jest.Mock).mockResolvedValue(mockComment);

    const result = await CommentService.createComment(mockComment);
    expect(CommentDatabase.create).toHaveBeenCalledWith(mockComment);
    expect(result).toEqual(mockComment);
  });

  it("should return all comments", async () => {
    (CommentDatabase.getAll as jest.Mock).mockResolvedValue([mockComment]);

    const result = await CommentService.getAllComments();
    expect(CommentDatabase.getAll).toHaveBeenCalled();
    expect(result).toEqual([mockComment]);
  });

  it("should return comment by id", async () => {
    (CommentDatabase.getById as jest.Mock).mockResolvedValue(mockComment);

    const result = await CommentService.getById("123");
    expect(CommentDatabase.getById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockComment);
  });

  it("should update a comment", async () => {
    (CommentDatabase.update as jest.Mock).mockResolvedValue(mockComment);

    const result = await CommentService.update("123", { content: "Updated" });
    expect(CommentDatabase.update).toHaveBeenCalledWith("123", { content: "Updated" });
    expect(result).toEqual(mockComment);
  });

  it("should update comment status", async () => {
    (CommentDatabase.updateStatus as jest.Mock).mockResolvedValue({
      ...mockComment,
      commentStatus: CommentStatus.Approved,
    });

    const result = await CommentService.updateStatus("123", CommentStatus.Approved);
    expect(CommentDatabase.updateStatus).toHaveBeenCalledWith("123", CommentStatus.Approved);
    expect(result?.commentStatus).toBe(CommentStatus.Approved);
  });

  it("should delete a comment", async () => {
    (CommentDatabase.remove as jest.Mock).mockResolvedValue(mockComment);

    const result = await CommentService.remove("123");
    expect(CommentDatabase.remove).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockComment);
  });

  it("should get comments by ressourceId", async () => {
    (CommentDatabase.getAllByRessourceId as jest.Mock).mockResolvedValue([mockComment]);

    const result = await CommentService.getAllByRessourceId("res1");
    expect(CommentDatabase.getAllByRessourceId).toHaveBeenCalledWith("res1");
    expect(result).toEqual([mockComment]);
  });
});