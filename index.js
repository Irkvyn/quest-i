import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';

import usersRoutes from './routes/users.js';
import appRoutes from './routes/app.js';
import quizzesRoutes from './routes/quiz.js';
import submissionsRoutes from './routes/submissions.js';

const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

app.use('/', appRoutes);
app.use('/users', usersRoutes);
app.use('/quizzes', quizzesRoutes);
app.use('/submissions', submissionsRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
    .catch((error) => console.log(error.message));
