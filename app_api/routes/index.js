var ctrlblog = require('../controllers/blog');
var express = require('express');
var router = express.Router();


/* Setup routes to pages */
router.get('/blogs', ctrlblog.blog_list);
router.get('/blogs/:blogid', ctrlblog.blog_single);
router.post('/blogs/add', ctrlblog.blog_create);
router.put('/blogs/edit/:blogid', ctrlblog.blog_update)
router.delete('/blogs/delete/:blogid', ctrlblog.blog_delete)


module.exports = router;
