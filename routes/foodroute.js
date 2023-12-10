const express= require("express");
const router = express.Router();
const preget = require("../middleware/preget")
const foodModel = require('../model/foodmodel');
const {protect }= require("../middleware/protect")
const{getfood,getallfoods,createfood,updatefood,deletefood}= require('../controllers/foodcontrl')
router.route('/').get(preget(foodModel),getallfoods ).post(protect, createfood);
router.route("/:id").get(protect,getfood).put(protect, updatefood).delete(protect, deletefood)
module.exports = router;