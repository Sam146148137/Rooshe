const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const adminController = require('../controllers/admin/auth');
const adminContentController = require('../controllers/admin/add-content-controller');
const findController = require('../controllers/admin/findBlog');
const editController = require('../controllers/admin/edit');
const homecookController = require('../controllers/admin/homecook');

const upload = adminContentController.upload;

// router.get('/signup', adminController.signupGet);

// router.post('/signup', adminController.signupPost);

router.get('/admin', adminController.loginGet);

router.post('/admin', adminController.loginPost);

router.get('/admin/add-content', authMiddleware.requireAuth, adminContentController.getAddContent);

router.post('/admin/add-content', authMiddleware.requireAuth, upload.single('image'), adminContentController.postAddContent);

router.get('/admin/blogs', authMiddleware.requireAuth, adminContentController.getContent);

//homecooks get
router.get('/admin/homecooks', authMiddleware.requireAuth, homecookController.gethomecook);

router.get('/logout', adminController.logoutGet);

router.get('/admin/:id', authMiddleware.requireAuth, findController.findContent);

//Edit get
router.get('/admin/edit/:id', authMiddleware.requireAuth, editController.editBlog);

// Update post
router.post('/admin/update/:id', authMiddleware.requireAuth, upload.single('image'), editController.updateBlog);

//Delete Blog
router.get('/admin/delete/:id', authMiddleware.requireAuth, editController.deleteBlog);



module.exports = router;
