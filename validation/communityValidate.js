const Joi = require('joi');
const communityValidate = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().max(10).required(),
        surname: Joi.string().max(10).required(),
        address: Joi.number().integer().max(10).required(),
        email: Joi.string().email().max(25).required(),
        phone: Joi.number().integer().min(9).max(9).required(),
        subject: Joi.string(),
        facebook: Joi.string(),
        instagram: Joi.string(),
        youtube: Joi.string(),
        referral: Joi.string()
    });
    return schema.validate(data);
};


module.exports = {
    communityValidate
};