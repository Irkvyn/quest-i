import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name: String,
    surname: String,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
