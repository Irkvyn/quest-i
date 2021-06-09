import Quiz from '../models/quiz.js';
import Question from '../models/question.js'; 

async function getQuizzesByCategory(req, res) {
    try {
        const quizzes = await Quiz.find({category: req.params.category});
        res.json(quizzes);
    } catch (err) {
        res.status(404).send(err);
    }
}

async function quizQuestionsController(req, res) {
    try {
        const questions = await Question.find({quiz: req.params.quizId});
        res.json(questions);
    } catch (err) {
        res.status(404).send(err.message);
    }
}

export {quizQuestionsController, getQuizzesByCategory};
