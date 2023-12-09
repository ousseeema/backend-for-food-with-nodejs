const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const user = mongoose.Schema({
   
  name :{
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

user.pre('save',async ()=>{
  if(!user.isModified('password')){
    next();
  }
  const salt = bcrypt.genSalt(20);
  this.password = await bcrypt.hash(this.password,salt);

});

module.exports = mongoose.model("user",user);