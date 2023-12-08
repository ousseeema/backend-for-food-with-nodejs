const express= require("express");
const router = express.Router();
const preget = require("../middleware/preget")
const foodModel = require('../model/foodmodel');
const{getallfoods}= require('../controllers/foodcontrl')
router.route('/').get(preget(foodModel),getallfoods );



module.exports = router;