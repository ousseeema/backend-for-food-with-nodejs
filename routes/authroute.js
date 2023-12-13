const express = require('express');

const router = express.Router();
const protect= require("../middleware/preget");

const {
register,
login,
getMe,
forgotpassword,
resettoken
}= require('../controllers/authcontroller')


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getMe").get(protect,getMe)
router.route('/forgotpassword').post(forgotpassword);
router.route('/forgotpassword/:resettoken').post(resettoken);

module.exports = router;