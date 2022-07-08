const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const Subscription = db.subscription;
const user = db.user;
const passwordReset = db.passwordReset;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  initialRole();
  initialSubscription();
  initialUser();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to rs-admin-api application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/subcription.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/passwordResr.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Reset Password start
// app.get("/forgot-password", (req, res, next) => {});
// app.post("/forgot-password", (req, res, next) => {});
// app.get("/reset-password", (req, res, next) => {});
// app.post("/reset-password", (req, res, next) => {});
//Reset Password End

function initialRole() {
  Role.create({
    idrole: 1,
    roleName: "user",
    description: "User Access",
  });

  Role.create({
    idrole: 2,
    roleName: "moderator",
    description: "moderator Access",
  });

  Role.create({
    idrole: 3,
    roleName: "admin",
    description: "admin Access",
  });
}

function initialSubscription() {
  Subscription.create({
    id: 1,
    subId: 1,
    name: "Platinum Member",
    appLogo: "Platinum Member",
    owner: "Platinum Member",
    description: "Platinum Member",
    WebsiteURL: "Platinum Member",
    email: "Platinum Member",
    contactNo: "Platinum Member",
    LinkedIn: "Platinum Member",
    facebook: "Platinum Member",
    Instagram: "Platinum Member",
    category: "Platinum",
    type: "Platinum Member",
    location: "Platinum Member",
  });

  Subscription.create({
    id: 3,
    subId: 3,
    name: "Platinum Member",
    appLogo: "Platinum Member",
    owner: "Platinum Member",
    description: "Platinum Member",
    WebsiteURL: "Platinum Member",
    email: "Platinum Member",
    contactNo: "Platinum Member",
    LinkedIn: "Platinum Member",
    facebook: "Platinum Member",
    Instagram: "Platinum Member",
    category: "Silver",
    type: "Platinum",
    location: "Platinum Member",
  });

  Subscription.create({
    id: 2,
    subId: 2,
    name: "Platinum Member",
    appLogo: "Platinum Member",
    owner: "Platinum Member",
    description: "Platinum Member",
    WebsiteURL: "Platinum Member",
    email: "Platinum Member",
    contactNo: "Platinum Member",
    LinkedIn: "Platinum Member",
    facebook: "Platinum Member",
    Instagram: "Platinum Member",
    category: "Gold",
    type: "Gold",
    location: "Platinum Member",
  });
}

function initialUser() {
  user
    .create({
      id: 1,
      companyId: 1,
      username: "admin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("admin1234", 8),
      firstname: "Admin FN",
      lastname: "Admin LN",
      status: "Active",
      position: "Tech Lead",
      userImg: "jhfsvjhdf",
      role: "Admin",
      roles: ["admin"],
    })
    .then((user) => {
      user.setRoles([3]).then(() => {
        console.log("Admin registered successfully!");
      });
    });

  user
    .create({
      id: 2,
      companyId: 2,
      username: "moderator",
      email: "moderator@gmail.com",
      password: bcrypt.hashSync("mod1234", 8),
      firstname: "Moderator FN",
      lastname: "Moderator LN",
      status: "Active",
      position: "SE",
      userImg: "jhfsvjhdf",
      role: "Moderator",
      roles: ["moderator"],
    })
    .then((user) => {
      user.setRoles([2]).then(() => {
        console.log("moderator registered successfully!");
      });
    });

  user
    .create({
      id: 3,
      companyId: 3,
      username: "userActive",
      email: "user@gmail.com",
      password: bcrypt.hashSync("user1234", 8),
      firstname: "User FN",
      lastname: "User LN",
      status: "Active",
      position: "Sales",
      userImg: "jhfsvjhdf",
      role: "user",
      roles: ["user"],
    })
    .then((user) => {
      user.setRoles([1]).then(() => {
        console.log("Active User registered successfully!");
      });
    });

      user
        .create({
          id: 4,
          companyId: 4,
          username: "userInactive",
          email: "user@gmail.com",
          password: bcrypt.hashSync("user1234", 8),
          firstname: "User FN",
          lastname: "User LN",
          status: "Invited",
          position: "Sales",
          userImg: "jhfsvjhdf",
          role: "user",
          roles: ["user"],
        })
        .then((user) => {
          user.setRoles([1]).then(() => {
            console.log("Invited User registered successfully!");
          });
        });
}
