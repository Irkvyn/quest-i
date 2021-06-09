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
            user: {username: user.username},
            active: {create:true}
        });
    } catch (err) {
        console.log(err);
    }
}

async function createControllerPost(req, res) {
    try {
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

export {homeController, takeController, 
    loginController, registerController, 
    historyController, createController,
    createControllerPost, quizzesController
};
