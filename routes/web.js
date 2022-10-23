const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');
const DonationController = require('../app/controllers/DonationController');
const CommentsController = require('../app/controllers/CommentsController');
const DashboardController = require('../app/controllers/DashboardController');

//auth 
router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/sign-up', AuthController.signUpPage);
router.post('/sign-up', AuthController.signUp);

//Admin Routes
router.get('/donor_approval_list', DashboardController.approvalList);
router.post('/approve_reject_donor', DashboardController.approveDonation);



// home page
router.get('/', HomeController.homePage);
router.get('/admin', HomeController.adminPage);
// open routes
router.get('/about', HomeController.aboutPage);
router.get('/contact_us', HomeController.contactPage);
router.get('/all_posts', HomeController.allPosts);

//Comments Router
router.get('/comments', CommentsController.ViewComments);
router.post('/donation/:id/comment', CommentsController.PostComments);


router.get('/donation', DonationController.DonationPage);
router.get('/donation/:id', DonationController.DonationDetail);
router.post('/donation', DonationController.PostDonation);

router.get('/forgot-password', AuthController.forgotPasswordPage);
router.post('/forgot-password', AuthController.forgotPassword);

router.get('/donor_form', DonationController.donarForm);





module.exports = router;