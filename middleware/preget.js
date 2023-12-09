const asyncHandler = require("./asynchandler")


preget = (model) =>
  asyncHandler(async(req, res, next)=>{
   
  let query ;

  let  Query = {...req.query}
  const removeLst = ["select", "sort"];
  removeLst.forEach(element => {
    delete Query[element];
  });

   let strquery = JSON.stringify(Query);
   strquery = strquery.replace(/\b(gt|gte|lt|lte|in)\b/g,
   (match) => `$${match}`);

   query = model.find(JSON.parse(strquery));


    if(req.query.select){
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }
    if(req.query.sort){
      const soretedfiled = req.query.sort.split(",").join(' ')
      query = query.sort(soretedfiled)
    }
  
     const result = await query;
     res.preget=result;
     next();
});

module.exports = preget;