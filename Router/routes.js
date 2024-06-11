const router=require("express").Router();
const taskcontroller = require('../controller/taskcontroller');

router.get('/', taskcontroller.home);// to go to home page

router.get('/login',taskcontroller.loginpage);// to go to login page

router.post('/login',taskcontroller.login);// to login

router.post('/register',taskcontroller.register);// to register

router.get('/register',taskcontroller.registerpage);// to go to register page

router.post('/forgotpassword',taskcontroller.forgotpassword);// to reset password

router.get('/forgotpassword',taskcontroller.forgotpass);// to go to register page
//router.get('/forgotpassword',taskcontroller.forgotpass);// to go to forgot password page

router.get('/logout',taskcontroller.logout);// to logout 

router.post('/logout',taskcontroller.logout);// to logout

router.get('/logout',taskcontroller.logoutpage);// to logout

router.get('/getlocal',taskcontroller.getlocal);// to get local storage

module.exports = router;