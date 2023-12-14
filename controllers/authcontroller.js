const asynchandler = require('../middleware/asynchandler')
const usermodel = require("../model/usermodel");
const sendmail= require('../utils/mailtraper')
const mailtraper = require('../utils/mailtraper')
const crypto =require('crypto')
//register with email and password 
exports.register= asynchandler(async(req, res, next)=>{
   
  const { email, name, password, role } = req.body;

  const user = await usermodel.create({
    email,
    name,
    password,
    role,
  });
 
  const token = await user.sign();

 res.status(200).send({
  success: true , 
  message : "user have been registered",
  token : token 
 });



});



// login request

exports.login = asynchandler(async(req, res, next)=>{
  const {email , password} = req.body;

  if(!email || !password){
    return res.status(400).send({
     success: false ,
     message : "inavalid input"
    });
  }


   const user = await usermodel.findOne({email:email}).select("+password")
   
   if(!user){
    return res.status(400).send({
      success: false ,
      message : "inavalid credentials"
     });
   }

   const passwordmatch = await user.matchpassword(password);


   if(!passwordmatch){
    return res.status(400).send({
      success: false ,
      message : "inavalid credentials"
     });
   }
 

   const token = await user.sign();
     

   res.status(200).send({
    success: true, 
    message : "logged in",
    token : token
   })


});


// get : get current user 
// return current user 

exports.getMe = asynchandler(async(req, res, next)=>{
 
   const user  = await usermodel.findOne({email : req.user.email})
    
    
   
  res.status(200).send({
    success : true ,
    message :" the current user is : " ,
    user : user
  });



});

// post : forgot password
// return reset token

exports.forgotpassword = asynchandler(async(req, res, next)=>{

 const {email }= req.body;
 if(!email){
  return res.status(401).send({
    sccess: false,
    message: "verify  your email",

  })
 }   

 const user = await usermodel.findOne({email: email})


 if(!user){
  return res.status(401).send({
    sccess: false,
    message: "verify  your email",

  });
 }

 const resettoken = await user.getresetToken();

  const message =  {
    mailto : user.email,
    subject:"Your password has been reset",
    text: `use this token to reset your password ${resettoken}`
  }


  try {
   await  mailtraper(message);
   user.save();
   res.status(200).send({
    success: true,
    message: "check your email for the reset token"
   });
    
  } catch (err) {
    user.resettoken=undefined;
    user.resettokenexpire=undefined;
    user.save({validateBeforeSave:false});
    res.status(500).send({
      success: false ,
      message:"Ops ! we couldn't send email "
    })
  }
     



})




// post reset token 
// verification si le token envoyer dans le req.body 
//est egale a la reset token dans le user account in the data bas e$

exports.resettoken = asynchandler(async(req, res, next)=>{
         const{
          newpassword ,
     
         }  = req.body;
         const reset =  crypto.createHash("sha256").update(req.params.resettoken).digest("hex")
 if(!newpassword){

     return res.status(401).send({
     sccess: false,
     message: "verify  your coordinates",
      })
  }

  const user = await usermodel.findOne({
    resettoken:reset ,
    resettokenexpire:{$gte:Date.now()}
  
  }).select("+password")
   if(!user){
    return res.status(401).send({
      sccess: false,
      message: "verify  your token",
     });
   }

    
     
  

  
    user.password = newpassword;
    user.resettoken = undefined;
    user.resettokenexpire =undefined;
     user.save({validateBeforeSave:true});
     res.status(200).send({
      success: true ,
      message : "password has been reset",

     })
  
   
  






})

