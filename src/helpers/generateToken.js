import jwt from 'jsonwebtoken';
import config from '../config/config';


exports.generate_token = (userDetails) => {
    const SECRET_KEY = config.SECRET_KEY;
    const { name, email, _id, admin } = userDetails;
    // console.log(userDetails);

    try {
        return jwt.sign({ name, email, _id, admin }, SECRET_KEY, {expiresIn: '1d'});
    }
    catch (error) {
        throw new Error(`Token is not generated.`);
    }
};