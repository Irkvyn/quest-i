import User from '../models/users.js';
import bcrypt from 'bcrypt';

async function getHome(req, res) {
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

function getLoginForm(req, res) {
    res.render('login', {
        active: {login: true}
    });
}

function getRegisterForm(req, res) {
    res.render('register', {
        active: {register: true}
    });
}

export {getHome, getLoginForm, getRegisterForm};
