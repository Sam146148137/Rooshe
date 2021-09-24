const teamModel = require('../../models/team');

exports.getAboutUS = (req, res, next) => {
    try{
        teamModel.find({})
            .exec(function(err, teamMember) {
                teamModel.countDocuments().exec(function (err, count) {
                    if (err) return console.error(`${err}`);
                    res.render('about', {
                        staticData:req.staticData,
                        lang: req.session.language || 'en',
                        teamMember,
                        magia: req.originalUrl.substring(3),

                    })
                });
            })
    }catch (e) {
        next(e)
    }
};