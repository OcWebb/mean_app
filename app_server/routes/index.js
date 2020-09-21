var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlblog = require('../controllers/blog');

/* Setup routes to pages */
router.get('/', ctrlHome.home);

router.get('/blogs', ctrlblog.blog_list);
router.get('/blogs/add', ctrlblog.blog_add);

module.exports = router;
