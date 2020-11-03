var ctrlBlog = require('../controllers/blog');
var ctrlAuth = require('../controllers/authentication');
var express = require('express');
var router = express.Router();

var jwt = require('express-jwt'); 
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});


/* Setup routes to pages */
router.get('/blogs', ctrlBlog.blog_list);
router.get('/blogs/:blogid', ctrlBlog.blog_single);
router.post('/blogs/add', auth, ctrlBlog.blog_create);
router.put('/blogs/edit/:blogid', auth, ctrlBlog.blog_update)
router.delete('/blogs/delete/:blogid', auth, ctrlBlog.blog_delete)

router.post('/login', ctrlAuth.login);
router.post('/register', ctrlAuth.register);

module.exports = router;
