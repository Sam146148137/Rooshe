const languages = require('../config/language')
module.exports = (req, res, next) => {
    try{
        const {language} = req.params
        if (language === 'hy'){
            req.session.language = 'hy'
            req.staticData = languages[1]
        }else {
            req.session.language = 'en'
            req.staticData = languages[0]
        }
        next()
    }catch (e) {
        next(e)
    }
}