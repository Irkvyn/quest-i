import express from 'express';

import {homeController, takeController, 
    loginController, registerController, 
    historyController, createController, 
    createControllerPost, quizzesController,
    creatorController
} from '../controllers/app.js'
import auth from '../controllers/auth.js';

const router = express.Router();

router.get('/', auth, homeController);
router.get('/take', auth, takeController);
router.get('/history', auth, historyController);
router.get('/creator', auth, creatorController);
router.get('/creator/create', auth, createController);
router.post('/creator/create', auth, createControllerPost);
router.get('/quizzes', auth, quizzesController);

router.get('/login', loginController);
router.get('/register', registerController); 

export default router;
