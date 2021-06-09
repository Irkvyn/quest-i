import User from '../models/users.js';
import Quiz from '../models/quiz.js';
import Question from '../models/question.js';
import Submission from '../models/submission.js'

async function homeController(req, res) {
    try {
        const user = await User.findOne({_id: req.userId});
        const sampleQuizzes = await Quiz.find({availability: 'sample'});
        res.render('index', {
            active: {home: true},
            authorized: true,
            user: {username: user.username},
            quizzes: sampleQuizzes
        });
    } catch (err) {
        console.log(err);
        res.redirect('/login');
    }
}

async function historyController(req, res) {
    try {
        const user = await User.findOne({_id: req.userId});
        res.render('history', {
            authorized: true,
            user: {username: user.username},
            active: {history:true}
        });
    } catch (err) {
        console.log(err);
        res.redirect('/login');
    }
}

function loginController(req, res) {
    res.render('login', {
        active: {login: true}
    });
}

function registerController(req, res) {
    res.render('register', {
        active: {register: true}
    });
}

async function takeController(req, res) {
    try {
        const user = await User.findOne({_id: req.userId});
        const quiz = await Quiz.findOne({_id: req.query.quiz});
        res.render('take', {
            authorized: true,
            user: user,
            quiz: quiz
        });
    } catch (err) {
        res.status(404).send(err.message);
    }
}

async function createController(req, res) {
    try {
        const user = await User.findOne({_id: req.userId});
        res.render('create', {
            authorized: true,
            user: {username: user.username}
        });
    } catch (err) {
        console.log(err);
    }
}

async function createControllerPost(req, res) {
    try {
        req.body.quiz.creator = req.userId;
        const quiz = Quiz(req.body.quiz);
        await quiz.save();
        for (let question of req.body.questions){
            question.quiz = quiz._id;
            console.log(question.questionType)
            await Question(question).save();
        }
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
        res.sendStatus(500);
    }
}

async function quizzesController(req, res) {
    try {
        const user = await User.findOne({_id: req.userId});
        const submissions = await Submission.find({user: user._id, active: true}).populate('quiz');
        console.log(submissions);
        res.render('quizzes', {
            authorized: true,
            user: {username: user.username},
            active: {quizzes:true},
            submissions: submissions
        });
    } catch (err) {
        console.log(err);
    }
}

async function creatorController(req, res) {
    try {
        const user = await User.findOne({_id: req.userId});
        const quizzes = await Quiz.find({creator: user._id});

        let quizzesObj = await Quiz.aggregate([
            {$match: {creator: user._id}},
            {$lookup:{
                from: Submission.collection.name,
                localField: '_id',
                foreignField: 'quiz',
                as: 'submissions'
            }},
            {$unwind: {
                path: '$submissions',
                preserveNullAndEmptyArrays: true
            }},
            {$match: {$or:[{"submissions.active":true}, {"submissions":{$exists:false}}]}},
            {$project:{
                title: 1,
                score: "$submissions.score",
                totalScore: "$submissions.totalScore",
                passed: {$cond:[{$eq:["$submissions.submStatus","passed"]},1,0]},
                count: {$cond: [{$not: ["$submissions"]}, 0, 1]},
            }},
            {$group: {
                _id: {_id: "$_id", title: "$title"},
                avgScore: {$avg: "$score"},
                totalScore: {$avg: "$totalScore"},
                participants: {$sum: "$count"},
                passed: {$sum: "$passed"}
            }},
            {$project: {
                _id: "$_id._id",
                title: "$_id.title",
                avgScore: 1,
                totalScore: 1,
                participants: 1,
                passed: 1,
            }},
            {$sort: {"participants":-1, "title":1}}
        ]);
        /*const user = await User.findOne({_id: req.userId});
        const quizzes = await Quiz.find({creator: user._id});
        let quizzesObj = [];
        for (let quiz of quizzes) {
            const passed = await Submission.find({quiz: quiz._id, active: true, submStatus: 'passed'}).countDocuments();
            const failed = await Submission.find({quiz: quiz._id, active: true, submStatus: 'failed'}).countDocuments();
            let avgScore = 0;
            for (let sub of await Submission.find({quiz: quiz._id, active: true})) {
                avgScore += sub.score;
                console.log(sub.score);
            }
            avgScore /= passed + failed;
            let newQuiz = quiz.toObject();
            newQuiz.passed = passed;
            newQuiz.failed = failed;
            newQuiz.avgScore = avgScore;
            quizzesObj.push(newQuiz);
        }*/
        res.render('creator', {
            authorized: true,
            user: {username: user.username},
            active: {creator: true},
            quizzes: quizzesObj
        })
    } catch (err) {
        console.log(err);
    }
}

export {homeController, takeController, 
    loginController, registerController, 
    historyController, createController,
    createControllerPost, quizzesController,
    creatorController
};
