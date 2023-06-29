const createDb = require("../database/config")
const Jwt = require("jsonwebtoken")
var nodemailer = require("nodemailer");
var bcrypt = require("bcrypt");



const registerController = async function (req, res) {
    console.log("req data", req);
    console.log("register data", req.body);
    //return
    var name =
      req.body.name != null || req.body.name != undefined || req.body.name != ""
        ? req.body.name
        : "";
    var email =
      req.body.email != null ||
      req.body.email != undefined ||
      req.body.email != ""
        ? req.body.email
        : "";
    var password =
      req.body.password != null ||
      req.body.password != undefined ||
      req.body.password != ""
        ? req.body.password
        : "";
    var m_no =
      req.body.mobile != null ||
      req.body.mobile != undefined ||
      req.body.mobile != ""
        ? req.body.mobile
        : "";
    var hashpassword = await bcrypt.hash(password, 10);
  
    console.log("name,email,password,mobile", name, email, password, m_no);
    //  return
  
    var response = await createDb();
    console.log("response", response);
    if(name == "" || email == "" || password == "" || m_no == ""){
      res.send({message:"all data fields are required", status:0});
    }
  else{
    var data = await response.insertOne({
      name: name,
      email: email,
      password: hashpassword,
      m_no: m_no,
    });
    console.log("data", data);
    if (data) {
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0efffca2cc54c9",
          pass: "fa749161ad286c"
        }
      });
  
      let info = await transport.sendMail({
        from: '0efffca2cc54c9', // sender address
        to: email, // list of receivers
        subject: "welcome ✔", // Subject line
        text: "welcome to thev user", // plain text body
        html: "<b>welcome to the user</b>", // html body
      });
      if (info){
        res.send({ message: "user registered successfully and email send", status: 1 });
  
      }
      else{
        res.send({ message: "user registered successfully but unable to send mail", status: 0 });
  
      }
  
      // res.send({ message: "user registered successfully", status: 1 });
  
    } else {
      res.send({ message: "user registration failed", status: 0 });
    }
  }
   
  }














module.exports = {registerController}