const contacttModel = require('../../models/contact');
const {contactValidate} = require('../../validation/contactValidate')

const {validationResult} = require("express-validator");

exports.getContact = (req, res) => {
    res.render('contact_us', {
        staticData:req.staticData,
        lang: req.session.language || 'en',
        magia: req.originalUrl.substring(3),
    })
};

exports.postAddContact = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: "ivalid validation Sam"
            });
        }

        res.status(200)
        const {value} = contactValidate(req.body);

        const Contact = new contacttModel({
            ...value
        })

        await Contact.save()
        res.redirect(`/${req.session.language || 'en'}`)

    } catch (err) {
        next(err)
    }
};
