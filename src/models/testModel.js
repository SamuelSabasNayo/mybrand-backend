import mongoose from 'mongoose';

const userTestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: [true, 'Please enter an Email']
    },
    
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    
    admin: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const UserTest = mongoose.model('UserTest', userTestSchema);

export default UserTest;