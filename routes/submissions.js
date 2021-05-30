import express from 'express';

import {createSubmission, submitSubmission} from '../controllers/submissions.js'
import auth from '../controllers/auth.js';

const router = express.Router();

router.post('/', auth, createSubmission);
router.post('/:submissionId', auth, submitSubmission);

export default router;
