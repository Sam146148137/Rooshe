const Joi = require('joi');
const contactValidate = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().max(10).required(),
        surname: Joi.string().max(10).required(),
        address: Joi.number().integer().max(10).required(),
        phone: Joi.number().integer().min(9).max(9).required(),
        description: Joi.string().max(5000).required(),
    });
    return schema.validate(data);
};


module.exports = {
    contactValidate
};