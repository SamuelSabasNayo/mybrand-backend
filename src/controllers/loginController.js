import User from '../models/user';
import bcrypt from 'bcryptjs';
import generateToken from '../helpers/generateToken';

exports.user_login = async (req, res, next) => {
    const user = { email: req.body.email, password: req.body.password };
    
    try {
    const checkUser = await User.findOne({ email: user.email });
    //Error not displayed
    if (!checkUser) return res.status(404).json(`User not found.`);
    
        const verifyPassword = await bcrypt.compare(user.password, checkUser.password);
        // console.log(checkUser);
        
        if (!verifyPassword) return res.status(400).json(`Invalid password.`);
        const { _id, name } = checkUser;
        const token = generateToken.generate_token(user);
        
        return res.status(200).json({ Message: 'User logged in.', loggedUser: { _id, name }, token});
    }
    catch (error) {
        return res.status(500).json(`Internal server error. Error: ${ error.message }`);
    };
};