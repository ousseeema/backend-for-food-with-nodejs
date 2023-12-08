const express = require('express');
const colors = require("colors");
const app = express();
const connectDB = require("./config/db");
const foodrouter = require("./routes/foodroute")








app.use("api/v0/food",foodrouter);
connectDB();
const PORT = 2000;
app.listen(PORT, ()=>{
  console.log(`serveur is runnning on port ${PORT}`.yellow.bold);
})






