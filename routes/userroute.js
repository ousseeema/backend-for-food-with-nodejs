const express = require('express')
const router=  express.Router()

const preget = require("../middleware/preget")
const{protect} = require("../middleware/protect")
const usermodel =require('../model/usermodel')
const{getalluser,getuser,deleteuser,updateuser,uploadsphoto}=require('../controllers/usercntrl')


router.route('/').get(preget(usermodel),getalluser);
router.route('/:id').get(protect,getuser).delete(protect,deleteuser).put(protect,updateuser)
router.route("/fileupload").post(protect,uploadsphoto)

module.exports =router;