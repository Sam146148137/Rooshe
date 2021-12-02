const jwt = require('jsonwebtoken');

const Admin = require('../../models/admin');

//HandleErrors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {name: '', password: ''};

    //incorrect name
    if(err.message === 'incorrect name') {
        errors.name = 'that name is not registered'
    }

    if(err.message === 'incorrect password') {
        errors.password = 'that password is incorrect'
    }

    // dublicate error code
    if(err.code === 11000) {
        errors.name = 'that name is already registered';
        return errors
    }

    // validation errors
    if (err.message.includes('admin validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        });
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'secret key', {
        expiresIn: maxAge
    })
}

exports.signupGet = (req, res) => {
    res.render('admin/signup')
};

exports.loginGet = (req, res) => {
    res.render('admin/login')
};

// admin registracia
// exports.signupPost = async (req, res) => {
//
//     console.log(req.body)
//     const admin = new Admin();
//     admin.name = req.body.name;
//     admin.password = req.body.password;
//     await admin.save( (err) => {
//         if(!err) {
//             console.log('saved successful')
//
//         }else {
//             console.log(err);
//         }
//     })jwt
//     res.json("some text")
// }

// admin registracia original tarberak
exports.signupPost = async (req, res) => {
    const {name, password} = req.body;
    try {
        const admin = await Admin.create({name, password});
        const token = createToken(admin._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({admin: admin._id})
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

exports.loginPost = async (req, res) => {
    const {name, password} = req.body;

    try {
        const admin = await Admin.login(name, password);
        const token = createToken(admin._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({admin: admin._id})
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
};

exports.logoutGet = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/admin')
}



