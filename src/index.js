import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import blogRoutes from './routes/blogRoutes';
import authRoutes from './routes/authRoutes';
import queryRoutes from './routes/queryRoutes';
import commentRoutes from './routes/commentRoutes';


// express app
const app = express();

// connect to mongoDB
const DATABASE_URL = config.DATABASE_URL;
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log(`Error at mongo: ${err}`);
})

// add middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/blogs', blogRoutes);
app.use('/users', authRoutes);
app.use('/queries', queryRoutes);
app.use('/comments', commentRoutes);
app.use('/', (req, res) => {
    res.status(200).json(`Welcome to Samuel-mybrand Website!`)
});

// app listening
const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

export default app;