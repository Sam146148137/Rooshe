const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const adminController = require('../controllers/admin/auth');
const adminContentController = require('../controllers/admin/add-content-controller');
const adminAddTeamController = require('../controllers/admin/add-team');
const findController = require('../controllers/admin/findBlog');
const editController = require('../controllers/admin/edit');
const editTeamController = require('../controllers/admin/edit_team_members');
const homecookController = require('../controllers/admin/homecook');

const upload = adminContentController.upload;
const uploadTeamMemberPhoto = adminAddTeamController.upload;

// router.get('/signup', adminController.signupGet);

// router.post('/signup', adminController.signupPost);

router.get('/admin/home', authMiddleware.requireAuth, adminAddTeamController.getHome);

router.get('/admin', adminController.loginGet);

router.post('/admin', adminController.loginPost);

router.get('/admin/add-content', authMiddleware.requireAuth, adminContentController.getAddContent);

router.get('/admin/add_team', authMiddleware.requireAuth, adminAddTeamController.getAddTeam);

router.post('/admin/add-content', authMiddleware.requireAuth, upload.single('image'), adminContentController.postAddContent);

router.post('/admin/add_team', authMiddleware.requireAuth, uploadTeamMemberPhoto.single('image'), adminAddTeamController.postAddTeam);

router.get('/admin/blogs', authMiddleware.requireAuth, adminContentController.getContent);

router.get('/admin/team', authMiddleware.requireAuth, adminAddTeamController.getTeam);

//homecooks get
router.get('/admin/homecooks', authMiddleware.requireAuth, homecookController.gethomecook);

router.get('/logout', adminController.logoutGet);

router.get('/admin/:id', authMiddleware.requireAuth, findController.findContent);

//Edit get
router.get('/admin/edit/:id', authMiddleware.requireAuth, editController.editBlog);

router.get('/admin/editt/:id', authMiddleware.requireAuth, editTeamController.editTeam);

// Update post
router.post('/admin/update/:id', authMiddleware.requireAuth, upload.single('image'), editController.updateBlog);

router.post('/admin/updatee/:id', authMiddleware.requireAuth, uploadTeamMemberPhoto.single('image'), editTeamController.updateTeam);
//Delete Blog
router.get('/admin/delete/:id', authMiddleware.requireAuth, editController.deleteBlog);

router.get('/admin/deletee/:id', authMiddleware.requireAuth, editTeamController.deleteTeamMember);


module.exports = router;
