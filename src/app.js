import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import blogRoutes from './routes/blogRoutes';
import authRoutes from './routes/authRoutes';
import queryRoutes from './routes/queryRoutes';

// express app
const app = express();

// add middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/blogs', blogRoutes);
app.use('/users', authRoutes);
app.use('/queries', queryRoutes);


export default app;