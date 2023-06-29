const createDb = require("../database/config")


const deleteUserController = async function (req, res) {
    console.log("req.params=", req.params);
    var email = req.params.email;
    var response = await createDb();
    var data = await response.find({ email: email }).toArray();
    console.log("data=", data.length);
    if (data.length) {
      var data = await response.deleteOne({ email: email });
      if (data) {
        console.log("all user data", data);
        res.send({
          messages: "user deleted successfully",
          status: 1,
          data: data,
        });
      } else {
        res.send({ messages: "user not deleted successfully", status: 0 });
      }
    } else {
      res.send({ messages: "user not found", status: 0 });
    }
  }
  module.exports ={deleteUserController}