const express = require('express');

const router = express.Router();

const language = require('../middleware/language')
const contentController = require('../controllers/user/user');
const blogController = require('../controllers/user/blog');
const aboutController = require('../controllers/user/about');
const findController = require('../controllers/user/findedBlog');
const communityController = require('../controllers/user/community');
const portfolioController = require('../controllers/user/portfolio');
const {changeLanguage} = require('../controllers/user/language')

const errorController = require('../controllers/user/error')

const { check } = require('express-validator');

router.get('/', (req, res) => {
    res.redirect('/en')
})

router.get('/:language', language, contentController.getHome);

router.get('/:language/blog',language, blogController.getBlog);

router.get('/:language/blog/:id', language, findController.findContent);

router.get('/:language/community',language, communityController.getCommunity);

//post community
router.post('/community', router.post('/community', [check('email').
isEmail()
    .normalizeEmail()], communityController.postAddCommunity));

// get AboutUs
router.get('/:language/about',language, aboutController.getAboutUS);

// get portfolio
router.get('/:language/portfolio/:id', language, portfolioController.getPortfolio);

router.post('/language', changeLanguage);

router.get('/:language/*', language, errorController.getError)

// router.get('/add-content', contentController.getAddContent);



module.exports = router;
