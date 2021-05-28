import User from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function getHome(req, res) {
    const token = req.cookies["auth-token"];
    if (!token) return res.redirect('/login');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = verified;
        console.log(verified._id);
        const user = await User.findOne({_id: verified._id});
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
