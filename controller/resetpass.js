const createDb = require("../database/config")

const resetPasswordController =  async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var response = await createDb();
    var data = await response.find({ email: email }).toArray();
    console.log("data=", data.length);
    if (data.length > 0) {
      var result = await response.updateMany(
        { email: email },
        { $set: { email: email, password: password } }
      );
  
      if (result.modifiedCount == 1) {
        console.log("user data", data);
        res.send({ message: "password updated successfully", status: 1 });
      } else {
        res.send({ message: "password not updated successfully", status: 0 });
      }
    } else {
      res.send({ message: "user not found", status: 0 });
    }
  }

module.exports ={resetPasswordController}