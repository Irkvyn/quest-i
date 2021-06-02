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
        value: [String],
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
        let question = await Question.findOne({_id: answer.id});
        let questionType = question.questionType;
        switch (questionType) {
            case 'text':
                let correctAnswers = [];
                for (let choice of question.choices) {
                    if (choice.isCorrect) correctAnswers.push(choice.text);
                }
                if (correctAnswers.includes(answer.value[0])) {
                    this.score += question.points;
                    answer.isCorrect = true;
                } else {
                    answer.isCorrect = false;
                }
                break;
            case 'single':
                let correctAnswer = question.choices.filter((choice) => choice.isCorrect)[0].text;
                if (answer.value[0] == correctAnswer) {
                    this.score += question.points;
                    answer.isCorrect = true;
                } else {
                    answer.isCorrect = false;
                }
                break;
            case 'multiple':
                answer.isCorrect = true;
                let correctAnswersAll = [];
                for (let choice of question.choices) {
                    if (choice.isCorrect) correctAnswersAll.push(choice.text);
                }
                for (let correctAnswer of correctAnswersAll) {
                    if (!answer.value.includes(correctAnswer)){
                        answer.isCorrect = false;
                        break;
                    }
                }
                if (answer.isCorrect) this.score += question.points;
                break;
        }
    }
    this.submStatus = 'evaluated';
    this.save();
}

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
