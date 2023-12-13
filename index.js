const express = require('express');
const colors = require("colors");
const app = express();

const connectDB = require("./config/db");
const foodrouter = require("./routes/foodroute");
const userrouter = require('./routes/userroute');
const authrouter = require('./routes/authroute');
const errorhandler= require("./middleware/errorhandler");
const fileupload = require("express-fileupload");




app.use(express.json());

app.use("/api/v0/food",foodrouter);
app.use("/api/v0/user",userrouter);
app.use('/api/v0/auth',authrouter);
app.use(errorhandler);
app.use(fileupload());
connectDB();
const PORT = 2000;
app.listen(PORT, ()=>{
  console.log(`serveur is runnning on port ${PORT}`.yellow.bold);
})
process.on('unhandledRejection',(err,promise)=>{
  console.log(`error : ${err.message}`.red.underline);
});








