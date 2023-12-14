const usermodel = require("../model/usermodel")
const asynchandler = require("../middleware/asynchandler");
const jwt = require("jsonwebtoken")
exports.protect = asynchandler(async(req, res, next)=>{
  let token ;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
   token = req.headers.authorization.split(" ")[1];
   }
 

    if (!token){
      return res.status(403).send({
        success : false ,
        message:"you're not authorized"
      }) ;

    }

   
    
    
   try {
    const decoded = jwt.verify(token,"oussema");
    req.user = await usermodel.findById(decoded.id)
    next();
   } catch (err) {
    res.status(404).send({
      success : false,
      message : "user not found"
    })
   }

 
});
