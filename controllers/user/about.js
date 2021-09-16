const teamModel = require('../../models/team');

exports.getAboutUS = (req, res, next) => {
    try{
        const perPage = 6
        const page = req.query.page || 1
        teamModel.find({})
            .exec(function(err, teamMember) {
                teamModel.countDocuments().exec(function (err, count) {
                    if (err) return console.error(`${err}`);
                    res.render('about', {
                        staticData:req.staticData,
                        lang: req.session.language || 'en',
                        teamMember,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        magia: req.originalUrl.substring(3),
                    })
                });
            })
    }catch (e) {
        next(e)
    }
};