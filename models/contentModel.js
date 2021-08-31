const mongoose = require('mongoose');

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy


const contentSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    getDate: {
        type: String,
        default: today,
    }
});

module.exports = mongoose.model ('content', contentSchema);
