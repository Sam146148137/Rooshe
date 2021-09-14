const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema ({
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
    phone: {
        type: Number,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
});

module.exports = mongoose.model ('contact', contactSchema);
