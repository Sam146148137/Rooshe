const contentModel = require('../../models/contentModel');
const fs = require('fs');

exports.editBlog = (req, res) => {
    let id = req.params.id;
    contentModel.findById(id, (err, content) => {
        if (err) {
            res.redirect('/admin/home');
        }else {
            if(content == null) {
                res.redirect('/admin/home');
            }else {
                res.render('admin/edit_blogs', {
                    title: 'Edit Blog',
                    content: content
                });
            }
        }
    });
};


exports.updateBlog = (req, res) => {
    let id = req.params.id;
    let new_image = '';

    if(req.file) {
        new_image = req.file.filename
        try {
            fs.unlinkSync('./uploads/' + req.body.old_image);
        }catch (err) {
            console.log(err);
        }
    }else {
        new_image = req.body.old_image;
    }

    contentModel.findByIdAndUpdate(
        id,
        {
            title: req.body.title,
            url: req.body.url,
            desc: req.body.desc,
            image: new_image,
        },
        (err, result) => {
        if (err) {
            res.json('chdarav')
        }else {
            res.redirect('/admin/blogs');
        }
    });
};

exports.deleteBlog = (req, res) => {
    let id = req.params.id;
    contentModel.findByIdAndRemove(id, (err, result) => {
        if (result.image !== '') {
            try {
                fs.unlinkSync('./uploads/'+result.image);
            }catch (err) {
                console.log(err)
            }
        }
        if(err) {
            console.log('Remove error');
        }else {
            res.redirect('/admin/blogs');
        }
    });
};
