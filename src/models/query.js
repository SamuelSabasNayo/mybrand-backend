import mongoose from 'mongoose';

const querySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: [true, 'Please enter an Email']
    },
    
    query: {
        type: String,
        required: [true, 'Please enter a query']
    }
}, { timestamps: true });

const Query = mongoose.model('Query', querySchema);

export default Query;