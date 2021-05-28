import express from 'express';

import {getHome, getLoginForm, getRegisterForm} from '../controllers/app.js'

const router = express.Router();

router.get('/', getHome);
router.get('/login', getLoginForm);
router.get('/register', getRegisterForm); 

export default router;
