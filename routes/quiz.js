import express from 'express';

import {getQuizzesByCategory, quizQuestionsController} from '../controllers/quiz.js'

const router = express.Router();

router.get('/:quizId/questions', quizQuestionsController);
router.get('/category/:category', getQuizzesByCategory)
export default router;
