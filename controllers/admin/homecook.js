const communityModel = require('../../models/community');

exports.gethomecook = (req, res) => {
    communityModel.find()
        .then(function (doc) {
            res.render('admin/homecooks', {
                item: doc
            });
        })
};