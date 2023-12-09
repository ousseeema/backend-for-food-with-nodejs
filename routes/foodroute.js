const express= require("express");
const router = express.Router();
const preget = require("../middleware/preget")
const foodModel = require('../model/foodmodel');
const {protect }= require("../middleware/protect")
const{getallfoods,createfood}= require('../controllers/foodcontrl')
router.route('/').get(preget(foodModel),getallfoods ).post(protect, createfood);



module.exports = router;