var request = require('request');
var apiOptions = {
    server : "http://3.81.94.231"  // Change as needed
};  

/* GET books lists */      
module.exports.blog_list = function(req, res){
    var requestOptions, path;
    path = '/api/blogs';
    requestOptions = { 
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            renderListPage(req, res, body);
        }
    );
};

/* Render the blog list page */
var renderListPage = function(req, res, responseBody){
    res.render('blogs', {blogEntries: responseBody});
};  


module.exports.blog_add_view = function(req, res) {
    res.render('blog_add');
};   

module.exports.blog_add = function(req, res) {
    var requestOptions, path, postdata;
    path = '/api/blogs/add';

    postdata = {
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
        author: req.body.author
    }; 
    requestOptions = {
      url : apiOptions.server + path,
      method : "POST",
      json : postdata
    };
    
    request(
      requestOptions,
      function(err, response, body) {
         if (response.statusCode === 201) {
              res.redirect('/blogs');
         } else {
              _showError(req, res, response.statusCode);
         } 
      }
    ); 
};   

module.exports.blog_edit_view = function(req, res) {
    var requestOptions, path;
    path = "/api/blogs/" + req.params.blogid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    }; 
    request(
        requestOptions,
        function(err, response, body) {
            renderEditPage(req, res, body);
        }
    );
};

/* Render the book show page */
var renderEditPage = function(req, res, responseBody){
    res.render('blog_edit', {blog: responseBody});
};

module.exports.blog_edit_put = function(req, res){
    var requestOptions, path, postdata;
    var id = req.params.blogid;
    path = '/api/blogs/edit/' + id;

    postdata = {
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
        author: req.body.author
    };

    requestOptions = {
        url : apiOptions.server + path,
        method : "PUT",
        json : postdata
    };

    request(
	requestOptions,
        function(err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/blogs');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};


/* blog Delete */
module.exports.blog_delete_view = function(req, res) {
    var requestOptions, path;
    path = "/api/blogs/" + req.params.blogid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
	requestOptions,
        function(err, response, body) {
            renderDeletePage(req, res, body);
        }
    );
};

/* Render the blog delete page */
var renderDeletePage = function(req, res, responseBody){
        res.render('blog_delete', { blog: responseBody });
};

/* blog Delete Post */
module.exports.blog_delete = function(req, res){
    var requestOptions, path, postdata;
    var id = req.params.blogid;
    path = '/api/blogs/' + id;

    requestOptions = {
	    url : apiOptions.server + path,
        method : "DELETE",
        json : {}
    };

    request(
        requestOptions,
        function(err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/blogs');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};                    

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status); 
    res.render('generic-text', {
        title : title,
        content : content
    });
};