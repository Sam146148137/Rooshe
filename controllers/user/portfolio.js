const contentModel = require('../../models/contentModel');


exports.getPortfolio = async (req, res) => {
    const {id} = req.params
    const thisBlog = await contentModel.findOne({url: id})

    if (!thisBlog) {
        return res.status(404).render('404')
    }
            res.render('inner_portfolio', {
                staticData: req.staticData,
                lang: req.session.language || 'en',
                thisBlog
            });
};
