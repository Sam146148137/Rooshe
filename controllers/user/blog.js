const contentModel = require('../../models/contentModel');

exports.getBlog = (req, res, next) => {
    try{
        const perPage = 6
        const page = req.query.page || 1
        contentModel.find({})
            .sort({'createDate': -1})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function(err, blogs) {
                contentModel.countDocuments().exec(function (err, count) {
                    if (err) return console.error(`${err}`);
                    res.render('blog', {
                        staticData:req.staticData,
                        lang: req.session.language || 'en',
                        blogs,
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