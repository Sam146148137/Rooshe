const mailer = require('../../sendMailer/nodemailer')
const communityModel = require('../../models/community');
const {communityValidate} = require('../../validation/communityValidate')

exports.getCommunity = (req, res) => {
    res.render('community', {
        staticData:req.staticData,
        lang: req.session.language || 'en',
    })
};

exports.postAddCommunity = async (req, res, next) => {
try {
    const {value} = communityValidate(req.body);
    const message = {

        to: req.body.email,
        subject: 'Congratulations! You are successfuly registred on our site',
        text: `Congratulations! You are successfuly registred on our site
       
       your account details
       
                login: ${req.body.email}
                password: ${req.body.pass}`
    }
    mailer(message)
    const cookContent = new communityModel({
        ...value
    })

   await cookContent.save()
    await setTimeout(function(){ res.redirect(`/${req.session.language || 'en'}`) }, 2000);

} catch (err) {
    next(err)
}
};
