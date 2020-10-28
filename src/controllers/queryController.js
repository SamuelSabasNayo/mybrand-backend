/* eslint-disable no-undef */
import Query from '../models/query';

// get list of all users from db
exports.query_get = async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 });
        res.status(200).json({ queries });
        
    }
    catch (error) {
        res.status(400).json(`Error: ${err}`);
    }
};

// get a single query from db
exports.query_getOne = async (req, res) => {
    try {
        const id = req.params.id;
        
        const singleQuery = await Query.findById(id);
        res.status(200).json({ singleQuery });
    }
    catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
};

// add a query to the db
exports.query_post = async (req, res) => {
    try {
        const { _id, name } = req.user;
    
        const { query } = req.body;
        
        const newQuery = new Query({
            author: { _id, name },
            query
        });
        const addedQuery = await Query.create(newQuery);

        return res.status(201).json({ message: 'Query is added', addedQuery });
    }
    catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
};


// update a query is not necessary

// delete a query from the db
exports.query_delete = async (req, res) => {
    let { id } = req.params;
    if (id) {
        try {
        const existQuery = await Query.find({ _id: id });
        
        if (existQuery.length) {
                // eslint-disable-next-line no-unused-vars
                const deletedQuery = await Query.deleteOne({ _id: id });
                res.status(200).send(`Query is deleted ${existQuery}`);
            } else {
                res.status(404).json({ status: 403, error: 'Query Id does not exist' });
            }
        }
            catch (error) {
                throw new Error(error);
            }
    } else {
        res.status(403).json({ status: 403, error: 'Invalid query Id' });
    }
};