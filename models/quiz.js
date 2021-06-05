import mongoose from 'mongoose';

const quizSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    passScore: {
        type: Number
    },
    availability: {
        type: String,
        enum: ['public', 'private', 'sample'],
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;