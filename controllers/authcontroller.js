const asynchandler = require('../middleware/asynchandler')
const usermodel = require("../model/usermodel");
const sendmail= require('../utils/mailtraper')

//register with email and password 
exports.register= asynchandler(async(req, res, next)=>{
   
  const { email, name, password, role } = req.body;

   
  const user = await usermodel.create({
    email,
    name,
    password,
    role,
  });
 
  const token =  user.sign();

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

   const passwordmatch = user.matchpassword(password);


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
 
  res.status(200).send({
    success : true ,
    message :" the current user is : " ,
    user : res.preget
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

   




})
