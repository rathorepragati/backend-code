const createDb = require("../database/config")


const specificUserDataController =  async function (req, res) {
    console.log("req.params=", req.params);
    var email = req.params.email;
    console.log("email=", email);
    var response = await createDb();
    var data = await response.findOne({ email: email });
    // console.log("data=",data.length);
    if (data.email) {
      console.log("specific user data", data);
      res.send({ message: "user fetched successfully", status: 1, data: data });
    } else {
      res.send({ message: "user not found", status: 0 });
    }
  }

  module.exports ={specificUserDataController}