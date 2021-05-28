import express from 'express';

import {homeController, takeController, loginController, registerController} from '../controllers/app.js'
import auth from '../controllers/auth.js';

const router = express.Router();

router.get('/', auth, homeController);
router.get('/take', auth, takeController);

router.get('/login', loginController);
router.get('/register', registerController); 

export default router;
