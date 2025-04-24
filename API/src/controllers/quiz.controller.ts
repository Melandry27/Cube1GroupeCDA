import { Request, Response } from "express";
import QuizService from "../services/QuizService";

export const create = async (req: Request, res: Response) => {
  try {
    const quiz = await QuizService.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const quiz = await QuizService.getById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};

export const getByResourceId = async (req: Request, res: Response) => {
  try {
    const quiz = await QuizService.getByResourceId(req.params.resourceId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const updatedQuiz = await QuizService.update(req.params.id, req.body);
    res.status(200).json(updatedQuiz);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await QuizService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const updatedQuiz = await QuizService.addQuestion(req.params.id, req.body);
    res.status(200).json(updatedQuiz);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};

export const submitAnswers = async (req: Request, res: Response) => {
  try {
    const result = await QuizService.submitAnswers(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};