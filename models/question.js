import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    }, 
    choices:[{
        text: String, 
        isCorrect: {
            type: Boolean,
            required: true
        }
    }],
    quiz: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quiz'
    },
    points: {
        type: Number,
        default: 1
    }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
