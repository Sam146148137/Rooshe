const contentModel = require('../../models/contentModel');


exports.findContent = (req, res) => {
    const {id} = req.params
    contentModel.findOne({url: id})
        .then(function (doc) {
            res.render('admin/finded-content', {
                item: doc
            });
        })
};