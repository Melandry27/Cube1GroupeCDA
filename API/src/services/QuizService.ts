import Quiz from "../models/Quiz";

export const getByResourceId = async (resourceId: string) => {
  return Quiz.findOne({ resourceId });
};

export const calculateProgress = async (quizId: string, answers: { [key: string]: string }) => {
  // Fetch the quiz
  const quiz = await Quiz.findById(quizId) as QuizDocument;
  if (!quiz) throw new Error("Quiz not found");

  let correctAnswers = 0;
  quiz.questions.forEach((question) => {
    if (answers[question._id] === question.correctAnswer) {
      correctAnswers++;
    }
  });

  const progress = (Object.keys(answers).length / quiz.questions.length) * 100;
  const score = (correctAnswers / quiz.questions.length) * 100;

  quiz.progress = progress;
  quiz.score = score;
  await quiz.save();

  return { progress, score };
};