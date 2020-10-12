var mongoose = require('mongoose');
var blog_model = mongoose.model('Blog');

/*
router.get('/blogs', ctrlblog.blog_list);
router.get('/blogs/:blogid', ctrlblog.blog_single);
router.post('/blogs', ctrlblog.blog_create);
router.put('/blogs/:blogid', ctrlblog.blog_update);
router.delete('/blogs/:blogid', ctrlblog.blog_delete);
*/

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.blog_list = function (req, res) {
    console.log('Getting blogs list');
    blog_model
    .find()
    .exec(function(err, results) {
        if (!results) {
            sendJSONresponse(res, 404, {
                "message": "no blogs found"
            });
            return;
        } else if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        console.log(results);
        sendJSONresponse(res, 200, buildBlogList(req, res, results));
    }); 
};

var buildBlogList = function(req, res, results) {
  var blogs = [];
  results.forEach(function(obj) {
    blogs.push({
      author: obj.author,
      blogTitle: obj.blogTitle,
      blogText: obj.blogText,
      _id: obj._id
    });
  });
  return blogs;
};

module.exports.blog_single = function (req, res) {
    console.log('Finding blog post', req.params);
    if (req.params && req.params.blogid) {
        blog_model
        .findById(req.params.blogid)
        .exec(function(err, blog) {
            if (!blog) {
                sendJSONresponse(res, 404, {
                "message": "blogid not found"
            });
            return;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            console.log(blog);
            sendJSONresponse(res, 200, blog);
        });
    } else {
        console.log('No blogid specified');
        sendJSONresponse(res, 404, {
        "message": "No blogid in request"
        });
    }
};

module.exports.blog_create = function (req, res) {
    console.log(req.body);
    blog_model
    .create({
            author: req.body.author,
            blogTitle: req.body.blogTitle,
            blogText: req.body.blogText,
        }, 
        function(err, blog) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(blog);
            sendJSONresponse(res, 201, blog);
        }
        }
    );
};

module.exports.blog_update = function (req, res) {
    console.log("Updating blog entry with id of " + req.params.blogid);
    console.log(req.body);
    blog_model
    .findOneAndUpdate(
        { _id: req.params.blogid },
        { $set: {"author": req.body.author, "blogTitle": req.body.blogTitle, "blogText": req.body.blogText}},
        function(err, response) {
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                sendJSONresponse(res, 201, response);
            }
        }
    );
};

module.exports.blog_delete = function (req, res) {
    console.log("Deleting book entry with id of " + req.params.blogid);
    console.log(req.body);
    blog_model
    .findByIdAndRemove(req.params.blogid)
    .exec (
        function(err, response) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 204, null);
            }
        }
    );
};