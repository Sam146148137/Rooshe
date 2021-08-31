const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // Check json web token exist & is verified
    if(token) {
        jwt.verify(token, 'secret key', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/admin')
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/admin')
    }
}

module.exports = {requireAuth}
