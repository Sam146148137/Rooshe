const contentModel = require('../../models/contentModel');

exports.getHome = (req, res) => {
    contentModel.find({})
        .sort({'createDate': -1})
        .limit(3)
        .exec(function(err, blogs){
            res.render('index', {
                staticData:req.staticData,
                lang: req.session.language || 'en',
                item: blogs

            });
        })
};




