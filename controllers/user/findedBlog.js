const contentModel = require('../../models/contentModel');


exports.findContent = async (req, res) => {
    const {id} = req.params
    const thisBlog = await contentModel.findOne({url:id})
    if (!thisBlog) {
        return res.status(404).render('404')
    }
    res.render('news_inner', {
        staticData: req.staticData,
        lang: req.session.language || 'en',
        magia: req.originalUrl.substring(3),
        thisBlog
    });
};