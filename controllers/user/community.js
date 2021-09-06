const mailer = require('../../sendMailer/nodemailer')
const communityModel = require('../../models/community');

exports.getCommunity = (req, res) => {
    res.render('community', {
        staticData:req.staticData,
        lang: req.session.language || 'en',
    })
};

exports.postAddCommunity = (req, res) => {
    const community = new communityModel();
    community.name = req.body.name;
    community.surname = req.body.surname;
    community.address = req.body.address;
    community.email = req.body.email;
    community.phone = req.body.phone;
    community.subject = req.body.subject;
    community.facebook = req.body.facebook;
    community.instagram = req.body.instagram;
    community.youtube = req.body.youtube;
    community.referral = req.body.referral;
    const message = {

        to: req.body.email,
        subject: 'Congratulations! You are successfuly registred on our site',
        text: `Congratulations! You are successfuly registred on our site
       
       your account details
       
                login: ${req.body.email}
                password: ${req.body.pass}`
    }
    mailer(message)
    community.save()
    res.redirect('/');
};
