const  asyncHandler = require("../middleware/asynchandler")

exports.getallfoods = asyncHandler(async(req, res, next)=>{

res.status(200).send({
  success: true ,
  message :"success",
  data: res.preget
})

  
})