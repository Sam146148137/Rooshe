const changeLanguage = async (req,res,next) =>{
    try{
        req.session.language = req.body.language;
        console.log(req.body);
        console.log('barev');
        res.end();
    }catch (e) {
        next(e)
    }
}
module.exports = {
    changeLanguage
}