const Joi = require('joi');
const communityValidate = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
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