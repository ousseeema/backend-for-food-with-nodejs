const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const user = mongoose.Schema({
   
  name:{
    type: String ,
    required : [true , "enter your name"],
    trim: true,
    maxlength : [50 , "name can't be more than 50 characters"],
    minlength : [3 , "name can't be less than 3 characters"],
  },

  email:{
    type : String,
    required: [true, "Please enter a your email address"],
    unique : true ,
    trim : true ,
    maxlength : [100 , "email can't be more than 50 characters"],
    match: [
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      " Please enter a valid email address",
    ]
  },
  password:{
    type: String ,
    required:[true, "Enter your password"],
    minlength: [5 , "password can't be less than 5 "],
    maxlength :[15, "password can't be more than 15 characters"],
    select : false,

  },
  role:{
    type: String,
    enum :["chef", "user", "admin"],
    default: "user"

  },
  createdAt:{
    type: Date,
    default: Date.now()
  },
   resettoken : String,
   resettokenexpire : Date,


});

user.pre('save',async function(next){
  if(!this.isModified('password')){
   next();
  }
  const salt = await bcrypt.genSalt(20);
  this.password = await bcrypt.hash(this.password,salt);

});
user.methods.matchpassword = async function(password){
  return await bcrypt.compare(this.password ,password);
}
user.methods.sign = function(){
 return jwt.sign({id: this._id} ,"oussema", {expiresIn:"30d"})
}
user.methods.getresetToken =async function(){
   const resettoken1 = await crypto.randomBytes(10).toString('hex');
   this.resettoken=  crypto.createHash('sha256').update(resettoken1).digest('hex')
    this.resettokenexpire = Date.now() + 10 * (60 * 1000);
   return resettoken1;
  }


module.exports = mongoose.model("user",user);