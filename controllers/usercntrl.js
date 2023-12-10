const asynchandler = require("../middleware/asynchandler")
const usermodel = require('../model/usermodel');



// Get : get all user 
// access : Private  (if you're an admin )

exports.getalluser = asynchandler(async(req, res, next)=>{
  

   return res.status(200).send({
    success : true ,
    message :"List of users",
    users : res.preget
   });



});


// Get : get a specifique user from database
// access : Private (if you're an admin)
 exports.getuser = asynchandler(async(req, res, next)=>{
  const user = await usermodel.findById(req.params.id);
    
  if(!user){
    return res.status(404).send({
      success : false ,
      message : "user not found "
    });
  }

  res.status(200).send({
    success : true ,
    message : "user been found",
    user : user 
  })

 })
 

 //






