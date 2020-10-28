import mongoose from 'mongoose';

const querySchema = mongoose.Schema({
    author: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    
    query: {
        type: String,
        required: [true, 'Please enter a query']
    }
}, { timestamps: true });

const Query = mongoose.model('Query', querySchema);

export default Query;