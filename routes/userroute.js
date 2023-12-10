const express = require('express')
const router=  express.Router()

const preget = require("../middleware/preget")
const{protect , role} = require("../middleware/protect")
const usermodel =require('../model/usermodel')
const{getalluser,getuser,deleteuser,updateuser}=require('../controllers/usercntrl')


router.route('/').get(preget,getalluser);
router.route('/:id').get(protect,getuser).delete(protect,deleteuser).put(protect,updateuser)


module.exports =router;