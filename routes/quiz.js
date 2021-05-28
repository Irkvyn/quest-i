import express from 'express';

import {getSampleQuizzes} from '../controllers/quiz.js'

const router = express.Router();

router.get('/sample', getSampleQuizzes);

export default router;
