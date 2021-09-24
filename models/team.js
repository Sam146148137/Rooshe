const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema ({
    name: {
        en: { type: String, required:true },
        hy: { type: String, required:true },
    },
    desc: {
        en: { type: String, required:true },
        hy: { type: String, required:true },
    },
    image: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model ('team', teamSchema);
