/* eslint-disable no-undef */
import User from '../models/user';
import Blog from '../models/blog';
import generateToken from '../helpers/generateToken';
import hashpassword from '../helpers/passwordHarsh';


// signup a user
exports.user_signup = async (req, res) => {
    const user = { name: req.body.name, email: req.body.email, password: req.body.password };
    
    const token = generateToken.generate_token(user);
    
    const existUser = await User.findOne({ email: user.email });
    
    if (existUser) return res.status(400).json({ error: 'User already exist.' });
    
    const hashedPassword = await hashpassword(user.password); 
    
    const readyUser = new User({
        name: user.name,
        email: user.email,
        password: hashedPassword
    });
    try {
        const addedUser = await User.create(readyUser);
        
        res.status(201).json({ 'Message': 'User created', 'user': addedUser, 'token': token});
    }
    catch (error) {
        res.status(400).json(`User not created. Error: ${ error.message }`);
    }
};

// get a single user from db
exports.user_getOne = async (req, res) => {
    try {
        const id = req.params.id;
        
        const singleUser = await User.findById(id);
        res.status(200).json({ singleUser });
    }
    catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
};

// get list of all users from db
exports.user_get = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({ users });
        
    }
    catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
};

// update a user from the db
exports.user_update = async (req, res) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
        const updatedUser = await User.findOne({ _id: req.params.id });
        res.status(200).send(updatedUser);
    }
    catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
};

// delete a user from the db
exports.user_delete = async (req, res) => {
    let { id } = req.params;
    
    try {
        const existUser = await User.find({ _id: id });
                
        if (existUser.length) {
            const deletedUser = await User.deleteOne({ _id: id });
            
            if (deletedUser) {
                const hisBlogs = await Blog.deleteMany().where({ 'author._id': { $eq: id } });
                
                res.status(200).send({ status: 200, 'User is deleted': existUser, 'His blogs are deleted': hisBlogs });
            }
        } 
        else {
            res.status(404).json({ status: 404, error: 'User Id does not exist' });
        }
        
    } catch (error) {
        throw new Error(error);
    }
};