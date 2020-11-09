var mongoose = require('mongoose');

// At a minimum, a blog entry should have a blog-title, blog-text and a created-on date.

var blogSchema = new mongoose.Schema({
    author: String,
    email: String,
    blogTitle: String,
    blogText: String,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

mongoose.model('Blog', blogSchema)