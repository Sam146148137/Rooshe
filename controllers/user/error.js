exports.getError = (req, res) => {
    res.render('404', {
        staticData: req.staticData,
        lang: req.session.language || 'en',
    });
};