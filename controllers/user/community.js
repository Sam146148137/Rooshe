const mailer = require('../../sendMailer/nodemailer')
const communityModel = require('../../models/community');
const {communityValidate} = require('../../validation/communityValidate')

const {validationResult} = require("express-validator");

exports.getCommunity = (req, res) => {
    res.render('community', {
        staticData:req.staticData,
        lang: req.session.language || 'en',
        magia: req.originalUrl.substring(3),
    })
};

exports.postAddCommunity = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: "ivalid validation Sam"
            });
        }

        res.status(200)
        const {value} = communityValidate(req.body);
        const message = {
            to: req.body.email,
            subject: 'ROOSH GROUP',
            html:
                `
                <h3>congratulations! You are already a 'homecook'</h3>
                <p>your details</p>
                <ul>
                    <li>Name: ${req.body.name} </li>
                    <li>Surname: ${req.body.surname} </li>
                    <li>Address: ${req.body.address} </li>
                    <li>Phone: ${req.body.phone}</li>
                    <li>Cooking level: ${req.body.subject}</li>
                </ul>
                `
        }
        mailer(message)
        const cookContent = new communityModel({
            ...value
        })

        await cookContent.save()
        res.redirect(`/${req.session.language || 'en'}`)

    } catch (err) {
        next(err)
    }
};
