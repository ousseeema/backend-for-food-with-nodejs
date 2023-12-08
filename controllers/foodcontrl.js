
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




  }
});
