import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './config/config';
import bodyParser from 'body-parser';

import allRoutes from './routes/blogRoutes';

const basePath = '/blogs';

// express app
const app = express();

dotenv.config();


// connect to mongoDB
const dbURL = config.DATABASE_URL;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log(`Error at mongo: ${err}`);
})

// add middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// blog routes
app.use(basePath, allRoutes);

// error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
    // console.log(err);
});

// app listening
const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

export default app;