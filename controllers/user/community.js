const mailer = require('../../sendMailer/nodemailer')
const communityModel = require('../../models/community');
const {communityValidate} = require('../../validation/communityValidate')

exports.getCommunity = (req, res) => {
    res.render('community', {
        staticData:req.staticData,
        lang: req.session.language || 'en',
    })
};

exports.postAddCommunity = (req, res) => {

    const {error, value} = communityValidate(req.body);
    if (error) {
        console.error('ValidationError', error.message);
        return res.status(404).json(error)
    }
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
    function myFunction() {
        setTimeout(function(){ return res.redirect('/'); }, 2000);
    }
    myFunction()

    cookContent.save()
};
