const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var router = express.Router();

const app = express();
// routes
// require('./routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);

// set port, listen for requests
const db = require("./models");
const Role = db.role;
var corsOptions = {
  origin: "http://localhost:3000"
};

/*
//If you want to re-initialize your database on every Express server start, you can add a condition to your sync method:
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  }); */

  function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application!!!!." });
});
app.get("/verifyToken", (req, res) => {
  res.json({ message: "Welcome to bezkoder application!!!!." });
});
var controller  = require('./controllers/auth.controller');

app.post(
  "/api/auth/signup",
 /*  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ], */
  controller.signup
);

app.post("/api/auth/signin", controller.signin);

/* router.post('/login', (req, res) => {
    controller.add(req.body).then(response => {
        res.status(response.status).send(response.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
}); */

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
