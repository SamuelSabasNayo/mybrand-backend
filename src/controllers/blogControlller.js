import Blog from '../database/models/blog';

// get list of all blogs from db
const blog_index = (req, res, next) => {
    Blog.find().sort({ createdAt: -1 })
        .then((blogs) => {
            res.status(200).json({ blogs });
        })
        .catch((err) => {
        res.status(400).json(`Error: ${err}`);
    });
};

// get list of all blogs from db

// add a blog to the db
const blog_create_post = (req, res, next) => {
    Blog.create(req.body)
        .then((blog) => {
            res.send(blog)
        })
        .catch(err => {
            res.json(`Error: ${err}`);
        })
}

// update a blog in the db
const blog_update = (req, res, next) => {
    Blog.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
            Blog.findOne({ _id: req.params.id })
                .then((blog) => {
                    res.send(blog);
                });
        })
        .catch(err => {
            res.json(`Error: ${err}`);
        });
}

// delete a blog from the db
const blog_delete = (req, res, next) => {
        Blog.findByIdAndRemove({ _id: req.params.id })
            .then((blog) => {
                res.send(blog);
            })
            .catch(err => {
                res.json(`Error: ${err}`);
            });
}

export default {
    blog_index,
    blog_create_post,
    blog_update,
    blog_delete
};