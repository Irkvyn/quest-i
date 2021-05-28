import User from '../models/users.js';
import bcrypt from 'bcrypt';
import Quiz from '../models/quiz.js';

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

export {homeController, takeController, loginController, registerController};
