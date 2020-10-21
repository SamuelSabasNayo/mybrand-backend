import dotenv from 'dotenv';

dotenv.config();


export default {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    SECRET_KEY: process.env.SECRET_KEY
};


// const DATABASE_URL = process.env.DATABASE_URL;

// console.log(DATABASE_URL);

// const env = process.env.NODE_ENV || 'development';

// const development = {
//     DATABASE_URL: process.env.DATABASE_URL
// };
// const config = { development }

// export default config[env];