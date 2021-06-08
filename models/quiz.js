import mongoose from 'mongoose';

const quizSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true,
        enum: ['Web', 'Python', 'C/C#/C++', 'Other'],
        defalult: 'Other'
    },
    availability: {
        type: String,
        enum: ['Public', 'Private', 'sample'],
    },
    start: {
        type: Date,
        default: Date.now
    },
    expiry: {
        type: Date,
        default: null
    },
    passScore: {
        type: Number
    },
    evaluation: {
        type: String,
        enum: ['Best', 'Latest']
    },
    timeLimit: {
        type: Number,
        default: null
    },
    submLimit: {
        type: Number,
        default: null
    },
    questionsLimit: {
        type: Number,
        default: null
    },
    shuffle: {
        type: Boolean,
        default: false
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;