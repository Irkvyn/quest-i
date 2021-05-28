import User from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function createUser(req, res) {
    const newUser = User(req.body);
    try {
        if (await User.findOne({username: newUser.username})) res.send('Username is not available!');
        await newUser.save();
        res.send('Registered successfully!');
    } catch {
        res.status(409);
    }
}

async function loginUser(req, res) {
    const user = User(req.body);
    const dbUser = await User.findOne({username: user.username});
    if (!dbUser) return res.send('Username does not exist');
    if (!await bcrypt.compare(user.password, dbUser.password)) return res.send('Wrong password');
    const token = jwt.sign({_id: dbUser._id}, process.env.TOKEN_SECRET);
    res.cookie('auth-token', token);
    res.send('Success');
}

export {createUser, loginUser};
