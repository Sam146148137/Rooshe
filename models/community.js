const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
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
