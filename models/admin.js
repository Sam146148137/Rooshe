const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        // validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [5, 'Minimum password length is 6 symbols'],
    }
});

//function before doc saved to db
adminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})



// static method to login user
adminSchema.statics.login = async function(name, password) {
    const admin = await this.findOne({ name });
    if (admin) {
        const auth = await bcrypt.compare(password, admin.password);
        if (auth) {
            return admin;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect name');
};

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
