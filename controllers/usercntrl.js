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
    message : "user",
    user : user 
  })

 })
 

 // PUT : updating a user with specifique id 
 // access : Private 


 exports.updateuser = asynchandler(async(req, res, next)=>{
   let userinfo = await usermodel.findById(req.params.id);
   
   if(!userinfo){
    return res.status(404).send({
      success : false ,
      message :'no such user'
     });
   }
  
  
   if (req.user.role!= "admin" || req.user.id != userinfo.id){
   return res.status(404).send({
    success : false ,
    message :'you are not authorized'
   })
   }
  
   userinfo = await usermodel.findByIdAndDelete(req.params.id , req.body,{
    new: true,
    runvalidators : true 
   });  
  
  
   res.status(200).send({
  success : true ,
  message :'Done updating'
 });
});


exports.deleteuser = asynchandler(async(req, res, next)=>{
  
  let user = await usermodel.findById(req.params.id);

  if(!user){
    return res.status(404).send({
      success : false , 
      message : "user not found"
    });
  }


  if(req.user.id != user.id || req.user.role != "admin" ) {
    return res.status(301).send({
      success : false , 
      message : "you're not authorized to delete this user"
    });

  }


  user = await usermodel.findByIdAndDelete(req.params.id);

  if(!user)
{
  return res.status(404).send({
    success : false , 
    message : "error while deleting "
  });

}


res.status(200).send({
  success : true ,
  message : "done deleting user "
})


})







