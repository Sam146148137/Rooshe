const changeLanguage = async (req,res,next) =>{
    try{
        req.session.language = req.body.language;
        res.end();
    }catch (e) {
        next(e)
    }
}
module.exports = {
    changeLanguage
}