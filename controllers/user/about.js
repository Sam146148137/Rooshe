
exports.getAboutUS = (req, res) => {
    res.render('about', {
        staticData:req.staticData,
        lang: req.session.language || 'en',
        magia: req.originalUrl.substring(3),
    })
};