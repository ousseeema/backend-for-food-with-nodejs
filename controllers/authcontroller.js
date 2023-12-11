const asynchandler = require('../middleware/asynchandler')
const usermodel = require("../model/usermodel");


//register with email and password 
exports.register= asynchandler(async(req, res, next)=>{
   
  const { email, name, password, role } = req.body;

   
  const user = await usermodel.create({
    email,
    name,
    password,
    role,
  });
  console.log(user);


  
  



  const token =  user.sign();
 console.log(token);
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


})



