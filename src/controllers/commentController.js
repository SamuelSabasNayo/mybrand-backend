/* eslint-disable no-undef */
import Comment from '../models/comment';

// get list of all comment from db
exports.comment_get = async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.status(200).json({ comments });
        
    }
    catch (error) {
        res.status(400).json(`Error: ${err}`);
    }
};

// get a single comment from db
exports.comment_getOne = async (req, res) => {
    try {
        const id = req.params.id;
        
        const singleComment = await Comment.findById(id);
        res.status(200).json({ singleComment });
    }
    catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
};

// add a comment to the db
exports.comment_post = async (req, res) => {
    try {
        const { _id, name } = req.user;
    
        const { comment } = req.body;

        
        const newComment = new Comment({
            author: { _id, name },
            comment
        });
        const addedComment = await Comment.create(newComment);

        return res.status(201).json({ message: 'Comment is added', addedComment });
    }
    catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
};

// update a comment is not necessary

// delete a comment from the db
exports.comment_delete = async (req, res) => {
    let { id } = req.params;
    if (id) {
        try {
        const existComment = await Comment.find({ _id: id });
        
        if (existComment.length) {
                // eslint-disable-next-line no-unused-vars
                const deletedComment = await Comment.deleteOne({ _id: id });
                res.status(200).send(`Comment is deleted ${existComment}`);
            } else {
                res.status(404).json({ status: 403, error: 'Comment Id does not exist' });
            }
        }
            catch (error) {
                throw new Error(error);
            }
    } else {
        res.status(403).json({ status: 403, error: 'Invalid comment Id' });
    }
};