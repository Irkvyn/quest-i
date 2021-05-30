import Submission from '../models/submission.js';
import User from '../models/users.js';
import jwt from 'jsonwebtoken';

async function createSubmission(req, res) {
    try {
        const newSubmission = Submission({user: req.userId, quiz: req.body.quiz});
        console.log(newSubmission.user);
        if (!await User.findOne({_id: newSubmission.user})) res.status(404).send('User not found');
        await newSubmission.save();
        res.status(200).send(newSubmission._id);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function submitSubmission(req, res) {
    try {
        const submission = await Submission.findOne({_id: req.params.submissionId});
        submission.answers = req.body.answers;
        submission.status ='submitted';
        submission.save();
        submission.evaluate();
        res.send(200);
    } catch (err) {
        console.log(err);
    }
}

export {createSubmission, submitSubmission};
