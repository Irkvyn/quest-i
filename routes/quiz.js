import express from 'express';

import {getSampleQuizzes, quizQuestionsController} from '../controllers/quiz.js'

const router = express.Router();

router.get('/sample', getSampleQuizzes);
router.get('/:quizId/questions', quizQuestionsController);

export default router;
