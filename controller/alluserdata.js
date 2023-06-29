const createDb = require("../database/config")

const allUserDataController = async function (req, res) {
    console.log("user req",req.headers.authorization);
    //return;
      var response = await createDb();
      var data = await response.find().toArray();
      if(data){
        console.log("all user data", data);
        res.send({ message: "user fetched successfully", status: 1, data: data });
      }
      else{
             res.send({message:"user not fetched",status:0});
          }
    }

module.exports ={allUserDataController}    