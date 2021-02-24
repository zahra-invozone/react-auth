const db = require("../models");
const config = require("../config/config.json");
const User = db.User;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require('dotenv').config();




//*****Sign up api******//
exports.signup = async(req, res) => {


  if(req.body.firstName == "" || req.body.firstName == undefined){
    res.status(500).send({ status:false,message:"please enter first Name" });
  }

  if(req.body.lastName == '' || req.body.lastName == undefined){
    res.status(500).send({ status:false,message:"please enter last Name" });
  }

  if(req.body.email == '' || req.body.email == undefined){//req.body.email.trim().length === 0
    res.status(500).send({ status:false,message:"please enter email" });
  }

  if(req.body.password == '' || req.body.password == undefined){
    res.status(500).send({ status:false,message:"please enter password" });
  }
   const user = await User.findOne({
        where: {
            email: req.body.email       
        }
      });
     
      if(user == null){
  // Save User to Database
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
        res.send({ message: "User was registered successfully!" });
  
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}else{
    res.status(500).send({ status:false,message: "This email is already been taken." });
}
};
//*****Sign In api******//

exports.signin = (req, res) => {

  if(req.body.email == '' || req.body.email == undefined){//req.body.email.trim().length === 0
    res.status(500).send({ status:false,message:"please enter email" });
  }

  if(req.body.password == '' || req.body.password == undefined){
    res.status(500).send({ status:false,message:"please enter password" });
  }


  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "This Email is Not Exist." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
    
      var token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
        expiresIn: 86400 // 24 hours
      });

        res.status(200).send({
          id: user.id,
          email: user.email,
          user: user.firstName+ " " + user.lastName,
          accessToken: token,
            status:true,
            token:token,
        });
    //   });
    })
    .catch(err => {
      res.status(500).send({ status:false,message: err.message });
    });
};
