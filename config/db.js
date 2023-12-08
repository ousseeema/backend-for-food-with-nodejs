const mongoose = require('mongoose')
 
const  connectDB = async () =>{
 
  const urldatabase = "mongodb+srv://oussamaferchichi01:97388536@cluster0.zefnkaj.mongodb.net/food?retryWrites=true&w=majority"
  const conn = await mongoose.connect(urldatabase);

  console.log(`connected on  data base `.green.underline.bold);
 }
 


 


module.exports= connectDB;