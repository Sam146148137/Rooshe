// Including libs
const multer = require('multer');
const teamModel = require('../../models/team');

// Create upload function that can be used in the router
// Using Multer
exports.upload = multer({
    // Use storage to store the files
    storage: multer.diskStorage ( {
        destination: (req, file, cb) => {
            cb(null, 'public/images');
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

exports.getAddTeam = (req, res) => {
    res.render('admin/add_team');
};

exports.postAddTeam = (req, res) => {
    console.log(req.file);
    const x = new teamModel ();
    x.name.en = req.body.nameEn;
    x.name.hy = req.body.nameHy;
    x.desc.en = req.body.descEn;
    x.desc.hy = req.body.descHy;
    x.image = req.file.filename;
    x.save((err, doc) => {
        if (!err) {
            console.log('Team Member is saved successfully');
            res.redirect('/admin/team');
        }else {
            console.log(err);
        }
    })
};

exports.getTeam = (req, res) => {
    teamModel.find()
        .then(function (doc) {
            res.render('admin/team', {
                item: doc
            });
        })
};

