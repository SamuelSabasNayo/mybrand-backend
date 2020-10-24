import mongoose from 'mongoose';
import config from './config/config';
import app from './app';


// connect to mongoDB
export const DATABASE_URL = config.DATABASE_URL_TEST;
// const DATABASE_URL = config.DATABASE_URL;
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
});

// app listening
const PORT = config.PORT;
const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

export default server;