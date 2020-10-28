import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    author: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    
    comment: {
        type: String,
        required: [true, 'Please enter a comment']
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;