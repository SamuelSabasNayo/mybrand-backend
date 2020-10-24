import User from '../models/user';
import Blog from '../models/blog';
import generateToken from '../helpers/generateToken';
import hashpassword from '../helpers/passwordHarsh';


// signup a user
exports.user_signup = async (req, res, next) => {
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
    };
};

// get a single user from db
exports.user_getOne = async (req, res, next) => {
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
exports.user_get = async (req, res, next) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({ users });
        
    }
    catch (error) {
        res.status(400).json(`Error: ${err}`);
    }
};

// delete a user from the db
exports.user_delete = async (req, res, next) => {
    let { id } = req.params;
    if (id) {
        const existUser = await User.find({ _id: id });
        if (existUser.length) {
            try {
                // const deletedUser = await User.deleteOne({ _id: id });
                
                const hisBlogs = await Blog.find({ author: { _id: '5f91212187e7db03c2782c44' } }).sort({ createdAt: -1 });
                // const hisBlogs = await Blog.find({ _id: "5f9120880d2ec0037514381d" }).sort({ createdAt: -1 });
                
                // hisBlogs.forEach((blogs) => {
                //     const blogAuthor = blogs.author;
                //     const authorId = blogAuthor._id;
                    
                //     if (!authorId === id) return res.status(404).json(`No corresponding blogs.`)
                //     console.log(blogs)
                //     // const deleteBlogs = await Blog.deleteOne({  });
                //     console.log(authorId);
                // });
                
                    console.log(hisBlogs);
                res.status(200).send({ 'User is deleted': existUser, hisBlogs});
            }
            catch (error) {
                throw new Error(error);
            };
        } else {
            res.status(404).json({ status: 403, error: 'User Id does not exist' });
        };
    } else {
        res.status(403).json({ status: 403, error: 'Invalid user Id' });
    };
    
};