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
            subject: 'ROOSH GROUP',
            html:
                `
                <h3>congratulations! You are already a 'homecook'</h3>
                <p>your details</p>
                <ul>
                    <li>Name: ${req.body.name} Surname: ${req.body.surname}</li>
                    <li>Address: ${req.body.address} Phone: ${req.body.phone}</li>
                    <li>Cooking level: ${req.body.subject}</li>
                </ul>
                `
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
