const express = require('express');

const router = express.Router();

const {
register,
login
}= require('../controllers/authcontroller')

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getMe").get()
router.route('forgotpassword').post();
router.route('/forgotpassword/:resettoken').post();


module.exports = router;