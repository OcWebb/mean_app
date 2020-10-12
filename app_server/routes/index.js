var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlblog = require('../controllers/blog');

/* Setup routes to pages */
router.get('/', ctrlHome.home);

router.get('/blogs', ctrlblog.blog_list);
// rendering
router.get('/blogs/add', ctrlblog.blog_add_view);
// adding a new blog
router.post('/blogs/add', ctrlblog.blog_add);

router.get('/blogs/edit/:blogid', ctrlblog.blog_edit_view);
router.post('/blogs/edit/:blogid', ctrlblog.blog_edit_put);

router.get('/blogs/delete/:blogid', ctrlblog.blog_delete_view);
router.post('/blogs/delete/:blogid', ctrlblog.blog_delete);

module.exports = router;
