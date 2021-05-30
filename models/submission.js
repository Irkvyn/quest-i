import mongoose from 'mongoose';
import Question from './question.js';

const submissionSchema = mongoose.Schema({
    quiz: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quiz', 
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    submStatus: {
        type: String,
        default: 'pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    }, 
    submitted_at: {
        type: Date,
        default: null
    },
    answers: [{
        id: {
            type: mongoose.Schema.ObjectId,
            ref: 'Question'
        },
        value: String,
        isCorrect: {
            type: Boolean
        }
    }],
    totalScore: {
        type: Number,
        default: null
    },
    score: {
        type: Number,
        default: null
    }
});

submissionSchema.pre('save', async function(next) {
    if (this.isNew) {
        let questions = await Question.find({quiz: this.quiz});
        let totalScore = 0;
        for (let question of questions) {
            this.totalScore += question.points;
        }
    }
    next();
});

submissionSchema.methods.evaluate = async function() {
    this.score = 0;
    for (let answer of this.answers) {
        let question = await Question.findOne({_id: answer.id})
        let correctAnswer = null;
        for (let choice of question.choices) {
            if (choice.isCorrect) correctAnswer = {'text': choice.text, 'points': question.points};
        }
        if (answer.value == correctAnswer.text) {
            this.score += correctAnswer.points;
            answer.isCorrect = true;
        } else {
            answer.isCorrect = false;
        }
    }
    this.submStatus = 'evaluated';
    this.save();
}

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
