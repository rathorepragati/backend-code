const createDb = require("../database/config")

const uploadImageControlller = async(req,res) =>{
    console.log("req data:",req);
    const email = req.body.email;
    const image = req.file.filename;
  
    var response = await createDb();
    var data = await response.find({ email: email}).toArray();
    console.log("data:",data.length);
    if(data.length){
      var response = await response.updateMany({ email: email},{$set:{image:image}});
     console.log("data:",response) 
     if(response){
      res.send({message:"user updated with image successfully",status:1,data:data});
     }
     else{
      res.send({message:"user not updated with image",status:0,data:data});
     }
    }else{
      res.send({message:"user not found",status:0});
    }
    
  }

module.exports ={uploadImageControlller}  