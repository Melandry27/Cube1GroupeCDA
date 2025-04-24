import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { connectToTestDb, disconnectFromTestDb } from "./setup";
import Comment from "../models/Comment";
import { CommentStatus } from "../models/Comment";

const mockCommentData = {
  userId: "user123",
  ressourceId: "ressource123",
  content: "Ceci est un commentaire de test",
};

let createdCommentId: string;

beforeAll(async () => {
  await connectToTestDb();
});

afterAll(async () => {
  await disconnectFromTestDb();
});

describe("CommentController", () => {
  it("should create a comment", async () => {
    const res = await request(app).post("/api/comments").send(mockCommentData);
    expect(res.statusCode).toBe(201);
    expect(res.body.content).toBe(mockCommentData.content);
    createdCommentId = res.body._id;
  });

  it("should get all comments", async () => {
    const res = await request(app).get("/api/comments");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a comment by ID", async () => {
    const res = await request(app).get(`/api/comments/${createdCommentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdCommentId);
  });

  it("should update a comment", async () => {
    const updatedContent = "Commentaire mis à jour";
    const res = await request(app)
      .put(`/api/comments/${createdCommentId}`)
      .send({ content: updatedContent });

    expect(res.statusCode).toBe(200);
    expect(res.body.content).toBe(updatedContent);
  });

  it("should update the comment status", async () => {
    const res = await request(app)
      .put(`/api/comments/status/${createdCommentId}`)
      .send({ commentStatus: CommentStatus.Approved });

    expect(res.statusCode).toBe(200);
    expect(res.body.commentStatus).toBe(CommentStatus.Approved);
  });

  it("should return 400 for invalid status", async () => {
    const res = await request(app)
      .put(`/api/comments/status/${createdCommentId}`)
      .send({ commentStatus: "InvalidStatus" });

    expect(res.statusCode).toBe(400);
    expect(res.body.validValues).toContain(CommentStatus.Pending);
  });

  it("should delete a comment", async () => {
    const res = await request(app).delete(`/api/comments/${createdCommentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Comment deleted successfully");
  });

  it("should return 404 for non-existing comment", async () => {
    const res = await request(app).get(`/api/comments/${new mongoose.Types.ObjectId()}`);
    expect(res.statusCode).toBe(404);
  });
});
