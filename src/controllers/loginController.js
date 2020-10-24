import User from '../models/user';
import bcrypt from 'bcryptjs';
import generateToken from '../helpers/generateToken';

class authUser {
    static async user_login(req, res) {
        try {
            const user = { email: req.body.email, password: req.body.password };
            const checkUser = await User.findOne({ email: user.email });
        //Error not displayed
        if (!checkUser) return res.status(404).json(`User not found.`);
        
            const verifyPassword = await bcrypt.compare(user.password, checkUser.password);
            
            if (!verifyPassword) return res.status(400).json(`Invalid password.`);
            
            const token = generateToken.generate_token(checkUser);
            const { _id, name } = checkUser;
            
            return res.status(200).json({ Message: 'User logged in.', loggedUser: { _id, name }, token});
        }
        catch (error) {
            return res.status(500).json(`Internal server error. Error: ${ error.message }`);
        };
    }
}

export default authUser;