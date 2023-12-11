//! this methode sahla naadiha fi catch mtaa try w naadilha params mtaaha 
//! w hiya taaml el filter mtaaha haseb el error name eli jeha mn catch
//! ken mesh mawjoud fi list heki naaml error khw 
//! feme methode okhra eli mawjoudda fi async.js 
//! eli hiya deja talgeha fi internet juste taamlha copier 
 

const errorhandler = (err,req, res, next) => {
  console.log(err.message);
  console.log(err);
  if (err.name === "CastError") {
    res.send({ message: ` resource not found ` });
  }
  else if (err.code === 11000) {
    res.send({ message: "Duplicate key entered" });
  }
  else if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
      res.status(400).send({success: false, message:messages})
  }
  else if(err.name==="SyntaxError"){
    res.status(400).send({
      success : false,
      message: "error syntax in the body"
    })
  }
  else{
    res.status(400).send({
      success : false ,
      message: "error"
    })
  }
  
};

module.exports = errorhandler;
