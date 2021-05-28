import Quiz from '../models/quiz.js';

async function getSampleQuizzes(req, res) {
    console.log('here');
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        console.log('Could not get sample quizzes');
    }
}

export {getSampleQuizzes};
