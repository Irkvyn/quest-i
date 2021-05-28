import mongoose from 'mongoose';

const quizSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
