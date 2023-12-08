
const mongoose = require("mongoose");

const foodModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the name of the food "],
    maxlength: [50, "Please enter a valid name less than 50 characters "],
    trim: true,
    unique: true,
    minlength: [5, "Please enter a valid  name  "],
  },

  description:{
    type: String, 
    required : [true , "Please enter the description  for the food"],
    maxlength: [50, "Please enter a valid description for the food"],
    minlength:[5 , "Please enter a valid description for the food "],
    trim : true ,
    unique: true ,


  },
  the_chef:{
    type: String,
    required:[true , "please enter the name of the chef "],
    maxlength:[50, "please enter a valid name less than 50 characters "],
    minlength:[6, "please enter a valid name more than 6 characters "],

  },
  prix : {
    type : Number , 
    required : [true , "Please enter the price of the foo"],
    min : [0.5, "please enter a valid price for the food"],

  },
  image:{
    type: String ,
     default : "no-image.png",

  },
  stars:{
    type : Number ,
    default : 0 ,
    max: [10, "max rating is 5"],
    min :[0 , "min rating is 0"]
  },


  ingredients:{
    type: String , 
    required : [true, "Please enter the ingredients for the food"],
    maxlength:[600, "the are no such list of ingredients "],
    minlength :[20, "the are no such short list of ingredients like this"],
     trim : true
  }, 
  time_to_prepare:{
    type : Date,
    required :[true, "please enter the time of making it"]
  }
  



});
module.exports = mongoose.model("food", foodModel);
