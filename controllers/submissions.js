import Submission from '../models/submission.js';
import User from '../models/users.js';
import Quiz from '../models/quiz.js';
import Question from '../models/question.js';

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
            submission.evaluate();
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
            resObj['id'] = submission.id;
            resBody.push(resObj);
        }
        res.json(resBody);
    } catch (err) {
        console.log(err);
    }
}

async function showSubmission(req, res) {
    try {
        const submission = await Submission.findOne({_id: req.params.submissionId}).populate(['answers.id','quiz']);
        const user = await User.findOne({_id: req.userId});

        res.render('submission', {
            authorized: true,
            user: {username: user.username},
            submission: submission,
            show: (submission.submStatus == 'passed' || submission.submStatus == 'failed') ? true : false
        });
    } catch (err) {
        console.log(err);
    }
}

async function getQuizSubmissions(req, res) {
    try {
        let resBody = [];
        const submissions = await Submission.find({user: req.userId, quiz: req.params.quizId}).sort('-submitted_at');
        for (let submission of submissions) {
            let resObj = {};
            resObj['id'] = submission._id;

            let created_date = new Date(submission.created_at);
            resObj['created'] = created_date.toLocaleString();

            let date = new Date(submission.submitted_at);
            resObj['submitted'] = date.toLocaleString();
            
            resObj['status'] = submission.submStatus;
            resObj['score'] = `${submission.score}/${submission.totalScore}`;
            resObj['active'] = submission.active;
            resBody.push(resObj);
        }
        res.json(resBody);
    } catch (err) {
        console.log(err);
    }
}

async function getAllActiveSubmissions(req, res) {
    try {
        let resBody = [];
        console.log('here');
        const submissions = await Submission.find({quiz: req.params.quizId, active: true}).populate('user').sort('-submitted_at');
        for (let submission of submissions) {
            let resObj = {};
            resObj['id'] = submission._id;

            resObj['user'] = submission.user.username;

            let created_date = new Date(submission.created_at);
            resObj['created'] = created_date.toLocaleString();

            let date = new Date(submission.submitted_at);
            resObj['submitted'] = date.toLocaleString();
            
            resObj['status'] = submission.submStatus;
            resObj['score'] = `${submission.score}/${submission.totalScore}`;
            resBody.push(resObj);
        }
        res.json(resBody);
    } catch(err) {
        console.log(err);
    }
}

export {createSubmission, submitSubmission, 
    getUserSubmissions, showSubmission,
    getQuizSubmissions, getAllActiveSubmissions
};