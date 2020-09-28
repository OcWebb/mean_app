module.exports.blog_list = function(req, res) {
    res.render('blogs', {blogEntries: [{
        author: 'Ryan Webster',
        blogTitle: 'One reason to switch to a dark-mode theme in your IDE',
        blogText: 'It is simply the superior theme choice'
    },
    {
        author: 'Bill Gates',
        blogTitle: 'My favorite website',
        blogText: 'Oh man, this blog website is my favorite bit of software ever!  I like it more than windows!'
    },
    {
        author: 'Nvidia',
        blogTitle: 'Free stuff',
        blogText: 'Wow this website is so impressive that we are going to send the creator a free 3090 GPU!'
    }]
})
};   

module.exports.blog_add = function(req, res) {
    res.render('blog_add');
};   

module.exports.blog_edit = function(req, res) {
    res.render('blog_edit');
};   

module.exports.blog_delete = function(req, res) {
    res.render('blog_delete');
};   