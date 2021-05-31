import express from 'express';

import {homeController, takeController, loginController, registerController, historyController} from '../controllers/app.js'
import auth from '../controllers/auth.js';

const router = express.Router();

router.get('/', auth, homeController);
router.get('/take', auth, takeController);
router.get('/history', auth, historyController);

router.get('/login', loginController);
router.get('/register', registerController); 

export default router;
