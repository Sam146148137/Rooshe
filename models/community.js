const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema ({
    name: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
    surname: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true
    },
    address: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
    email: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
    phone: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
        default: '',
    },
    instagram: {
        type: String,
        default: '',
    },
    youtube: {
        type: String,
        default: '',
    },
    referral: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model ('community', communitySchema);
