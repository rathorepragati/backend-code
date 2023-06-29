const createDb = require("../database/config")


const updateUserController =  async function (req, res) {
    console.log("req.params=", req.params);
    console.log("req.file", req.file);
    var email = req.params.email;
    var newEmail = req.body.email1;
    console.log("newEmail=", newEmail);
     var name = req.body.name;
     console.log("name=", name);
     var m_no = req.body.m_no;
     console.log("m_no=", m_no);
     var image = req.file.filename;
     console.log("image=", image);
    var response = await createDb();
    var data = await response.find({ email: email }).toArray();
    console.log("data=", data.length);
   
    if (data.length) {
      var data = await response.updateMany(
        { email: email},
        { $set: { email: newEmail ,name:name,m_no:m_no,image:image} }
      );
      if (data) {
        console.log("all user data=", data);
        res.send({ message: "user updated successfully", status: 1, data: data });
      } else {
        res.send({ message: "user not updated successfully", status: 0 });
      }
    } else {
      res.send({ message: "user not found", status: 0 });
    }
  }

module.exports ={updateUserController}