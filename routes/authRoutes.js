const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);


router.get('/adsignup', authController.adsignup_get);
router.post('/adsignup', authController.adsignup_post);
router.get('/adlogin', authController.adlogin_get);
router.post('/adlogin', authController.adlogin_post);




module.exports = router;