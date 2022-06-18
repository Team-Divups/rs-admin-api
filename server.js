const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const Subscription = db.subscription;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  initialRole();
  initialSubscription();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to rs-admin-api application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/subcription.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initialRole() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

  Role.create({
    id: 4,
    name: "client",
  });
}

function initialSubscription() {
  Subscription.create({
    id: 1,
    subscription: "Platinum Member",
    category: "platinum",
  });

  Subscription.create({
    id: 2,
    subscription: "Gold Member",
    category: "gold",
  });

  Subscription.create({
    id: 3,
    subscription: "Silver Member",
    category: "silver",
  });
}
