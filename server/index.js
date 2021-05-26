import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from 'morgan';
import path from 'path';

import usersRoutes from './routes/users.js'

const port = process.env.PORT || 5000;
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

app.use('/users', usersRoutes);
app.use('/', express.static('../client/build'));

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
    .catch((error) => console.log(error.message));
