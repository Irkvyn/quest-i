import User from '../models/users.js';
import bcrypt from 'bcrypt';
import Quiz from '../models/quiz.js';
import Question from '../models/question.js';

async function homeController(req, res) {
    try {
        const user = await User.findOne({_id: req.userId});
        res.render('index', {
            active: {home: true},
            authorized: true,
            user: {username: user.username}
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
        //await quiz.save();
        for (let question of req.body.questions){
            question.quiz = quiz._id;
            await Question(question).save();
        }
        res.send(quiz._id);
    } catch(err) {
        console.log(err.message);
    }
}

export {homeController, takeController, 
    loginController, registerController, 
    historyController, createController,
    createControllerPost
};
