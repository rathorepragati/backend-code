var express = require("express");
var app = express();
var multer = require("multer");
const Jwt = require("jsonwebtoken")
var verify = require("./middleware/verify");
var register = require("./controller/register")
var login = require("./controller/login.js")
var alluserdata = require("./controller/alluserdata")
var specificuser = require("./controller/specificuser")
var deleteuser = require("./controller/delete")
var update = require("./controller/update")
var resetpass = require("./controller/resetpass")
var uploadimages =  require("./controller/uploadimage")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/harsh/OneDrive/Desktop/Ecommerce/frontend/public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + uniqueSuffix + ".png")
  }
})
// const status = require("statuses");

var upload = multer({ storage: storage });
var cors = require("cors");
app.use(cors());

//register API endpoint
app.post("/api/register", upload.array(),register.registerController);

//All users data endpoint(find all user data)
app.get("/api/users",verify, alluserdata.allUserDataController);

// login API endpoint
app.post("/api/login", upload.single(),login.loginController );

//specific user data endpoint
app.get("/api/users/:email",specificuser.specificUserDataController);

//delete user API endpoint
app.post("/api/delete/:email",verify,deleteuser.deleteUserController);
 

//Update user API endpoint
app.post("/api/update/:email", upload.single('image'),verify,update.updateUserController);

//Reset_Password API endpoint
app.post(
  "/api/user/reset_password", upload.single(),resetpass.resetPasswordController);

//image upload multer api endpoint
app.post("/api/image",upload.single("image"),uploadimages.uploadImageControlller);

app.listen("8000", function () {
  console.log("server run on http://localhost:8000");
});
