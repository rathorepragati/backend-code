const Jwt = require("jsonwebtoken")
async function verify(req,res,next){
    console.log("req in verify.js",req);
   // return;
    var token = req.headers.authorization;
    console.log("token in verify.js",token);
    //return;
        if(token){
      Jwt.verify(token,"universal",function(err,decode){
        if(err){
          res.send({message:"token not valid",status:0});
        }
        else{
          next();
        }
      });
  }
  else{
    res.send({message:"token not found",status:0});
  }
  }
  
  module.exports = verify;