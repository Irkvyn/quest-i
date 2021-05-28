import express from 'express';

import {getHome, getLoginForm, getRegisterForm} from '../controllers/app.js'
import auth from '../controllers/auth.js';

const router = express.Router();

router.get('/', auth, getHome);
router.get('/login', getLoginForm);
router.get('/register', getRegisterForm); 

export default router;
