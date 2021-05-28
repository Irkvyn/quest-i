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
    }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
