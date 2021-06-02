import Submission from '../models/submission.js';
import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import Quiz from '../models/quiz.js'

async function createSubmission(req, res) {
    try {
        const newSubmission = Submission({user: req.userId, quiz: req.body.quiz});
        if (!await User.findOne({_id: newSubmission.user})) res.status(404).send('User not found');
        await newSubmission.save();
        res.send(newSubmission._id);
    } catch (err) {
        res.send(err.message);
    }
}

async function submitSubmission(req, res) {
    try {
        const submission = await Submission.findOne({_id: req.params.submissionId});
        submission.answers = req.body.answers;
        submission.status ='submitted';
        submission.submitted_at = Date.now();
        await submission.save();
        setTimeout(async () => {
            const submission = await Submission.findOne({_id: req.params.submissionId});
            submission.evaluate()
        }, 3000);
        res.send('ok');
    } catch (err) {
        console.log(err);
    }
}

async function getUserSubmissions(req, res) {
    try {
        const resBody = [];
        const submissions = await Submission.find({user: req.userId}).sort({'submitted_at': 'desc'});
        for (let submission of submissions) {
            let resObj = {};
            let quiz = await Quiz.findOne({_id: submission.quiz});
            quiz = quiz.title;
            resObj['quiz'] = quiz;
            let created_date = new Date(submission.created_at);
            resObj['created'] = created_date.toLocaleString();
            if (submission.submitted_at) {
                let date = new Date(submission.submitted_at);
                resObj['submitted'] = date.toLocaleString();
            }
            resObj['status'] = submission.submStatus;
            if (submission.score !== null) resObj['score'] = `${submission.score}/${submission.totalScore}`;
            resBody.push(resObj);
        }
        res.json(resBody);
    } catch (err) {
        console.log(err);
    }
}

export {createSubmission, submitSubmission, getUserSubmissions};