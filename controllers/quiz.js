import Quiz from '../models/quiz.js';
import Question from '../models/question.js'; 

async function getSampleQuizzes(req, res) {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        console.log('Could not get sample quizzes');
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

export {getSampleQuizzes, quizQuestionsController};
