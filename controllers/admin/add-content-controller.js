// Including libs
const multer = require('multer');
const contentModel = require('../../models/contentModel');

// Create upload function that can be used in the router
// Using Multer
exports.upload = multer({
    // Use storage to store the files
    storage: multer.diskStorage ( {
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: function (req, file, callback) {
            callback(null, Date.now() + '--' + file.originalname)
        }
    })
});

// GetHome redirect to the home
exports.getHome = (req, res) => {
    res.render('admin/home')
};

exports.getAddContent = (req, res) => {
    res.render('admin/add-content');
};

exports.postAddContent = (req, res) => {
    console.log(req.file);
    const x = new contentModel ();
    x.title = req.body.title;
    x.url = req.body.url;
    x.desc = req.body.desc;
    x.image = req.file.filename;
    x.save((err, doc) => {
        if (!err) {
            console.log('saved successful');
            res.redirect('/admin/blogs');
        }else {
            console.log(err);
        }
    })
};

exports.getContent = (req, res) => {
    contentModel.find()
        .then(function (doc) {
            res.render('admin/content', {
                item: doc
            });
        })
};
