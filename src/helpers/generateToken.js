import jwt from 'jsonwebtoken';
import config from '../config/config';


exports.generate_token = (userDetails) => {
    const SECRET_KEY = config.SECRET_KEY;
    const { name, _id, isAdmin } = userDetails;

    try {
        return jwt.sign(userDetails, SECRET_KEY, {expiresIn: '1d'});
    }
    catch (error) {
        throw new Error(`Token in not generated.`);
    }
};