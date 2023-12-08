const express = require('express');
const colors = require("colors");
const app = express();
const connectDB = require("./config/db");







connectDB();
const PORT = 2000;
app.listen(PORT, ()=>{
  console.log(`serveur is runnning on port ${PORT}`.yellow.bold);
})






