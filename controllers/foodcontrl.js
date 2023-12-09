const  asyncHandler = require("../middleware/asynchandler")
const foodmodel = require('../model/foodmodel');



exports.getallfoods = asyncHandler(async(req, res, next)=>{

res.status(200).send({
  success: true ,
  message :"success",
  data: res.preget
})

  
});
 
// private request 
// POST  : create a new food 

exports.createfood= asyncHandler(async(req, res, next)=>{
   
  if(!(req.user.role =="chef")){
     return res.status(401).send({
      success: false , 
      message : "you're not a chef to publish food"
     });
  }
 

   req.body.user = req.user.id;
    
   const food = await foodmodel.create(req.body);
    
   return res.status(200).send({
    success : true , 
    message : "done creating food",
    food : food
   })



});


// private request
// PUT : update food by id

exports.updatefood = asyncHandler(async(req, res, next)=>{
   const food_id = req.params.id;

   let food = await foodmodel.findById(food_id);

    if(!food){
      res.status(404).send({
        success: false ,
      message : " Food not found" 
         });
    }

    if(food.user.toString() != req.user.id) {

      return res.status(401).send({
        success: false ,
        message: "you're not authorized to update this food"
      });
    }



    //! updating food 

   food = await foodmodel.findByIdAndUpdate(food_id, req.body, {
    new: true, 
    runvalidators: true
   });












})