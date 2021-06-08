import express from 'express';

import {homeController, takeController, 
    loginController, registerController, 
    historyController, createController, 
    createControllerPost, quizzesController
} from '../controllers/app.js'
import auth from '../controllers/auth.js';

const router = express.Router();

router.get('/', auth, homeController);
router.get('/take', auth, takeController);
router.get('/history', auth, historyController);
router.get('/create', auth, createController);
router.post('/create', auth, createControllerPost);
router.get('/quizzes', auth, quizzesController);

router.get('/login', loginController);
router.get('/register', registerController); 

export default router;
