import express from 'express';

import {createSubmission, submitSubmission, 
    getUserSubmissions, showSubmission
} from '../controllers/submissions.js'
import auth from '../controllers/auth.js';

const router = express.Router();

router.post('/', auth, createSubmission);
router.get('/', auth, getUserSubmissions);
router.post('/:submissionId', auth, submitSubmission);
router.get('/:submissionId', auth, showSubmission);

export default router;
