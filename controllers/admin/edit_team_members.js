const teamModel = require('../../models/team');
const fs = require('fs');

exports.editTeam = (req, res) => {
    let id = req.params.id;
    teamModel.findById(id, (err, content) => {
        if (err) {
            res.redirect('/admin/home');
        }else {
            if(content == null) {
                res.redirect('/admin/home');
            }else {
                res.render('admin/edit_team', {
                    title: 'Edit Blog',
                    content: content
                });
            }
        }
    });
};


exports.updateTeam = (req, res) => {
    let id = req.params.id;
    let new_image = '';

    if(req.file) {
        new_image = req.file.filename
        try {
            fs.unlinkSync('public/images/' + req.body.old_image1);
        }catch (err) {
            console.log(err);
        }
    }else {
        new_image = req.body.old_image1;
    }

    teamModel.findByIdAndUpdate(
        id,
        {
            name: {
                en: req.body.nameEn,
                hy: req.body.nameHy,
            },
            desc: {
                en: req.body.descEn,
                hy: req.body.descHy,
            },
            image: new_image,
        },
        (err, result) => {
        if (err) {
            res.json('chdarav')
        }else {
            res.redirect('/admin/team');
        }
    });
};

exports.deleteTeamMember = (req, res) => {
    let id = req.params.id;
    teamModel.findByIdAndRemove(id, (err, result) => {
        if (result.image !== '') {
            try {
                fs.unlinkSync('public/images/'+result.image);
            }catch (err) {
                console.log(err)
            }
        }
        if(err) {
            console.log('Remove error');
        }else {
            res.redirect('/admin/team');
        }
    });
};
