import User from '../models/users.js'

async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(404);
    }
}

async function createUser(req, res) {
    const newUser = User(req.body);
    try {
        await newUser.save();
        res.status(201);
        res.json(newUser);
    } catch {
        res.status(409);
    }
}

export {getUsers, createUser};
