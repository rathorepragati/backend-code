const createDb = require("../database/config")
const Jwt = require("jsonwebtoken")
var bcrypt = require("bcrypt");


const loginController = async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var response = await createDb();
    var data = await response.find({ email: email }).toArray();
    console.log("data", data);
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password,async function (err, result) {
        if (err) {
          console.log("error in comparing the password", err);
          res.send({ message: "password did not matched", status: 0 });
        } else if (result) {
          if (email == data[0].email) {
            var token = Jwt.sign({email: data[0].email},"universal");
            console.log("token", token);
            var updateToken = await response.updateMany({ email: data[0].email},{$set:{token: token}});
         if(updateToken ){ 
            res.send({
              message: "user logged in successfully",
              status: 1,
              email: data[0].email,
              token: data[0].token,
            });
          }else{
            res.send({
              message: "user find but user token not updated",
              status: 0,
            });
          }
        } else {
            res.send({
              message: "Please enter correct email or password ",
              status: 0,
            });
          }
        } else {
          res.send({ message: "Password not matched ", status: 0 });
        }
      });
    } else {
      res.send({
        message: "you are not registered with us please register first",
        status: 0,
      });
    }
  }

  module.exports ={loginController}