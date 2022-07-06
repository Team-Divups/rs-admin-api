const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    companyId: req.body.companyId,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    status: req.body.status,
    position: req.body.position,
    role: req.body.role,
  })
    .then((user) => {
      // res.send({ message: "User Created" });
      // Default Role Assign
      if (req.body.roles) {
        Role.findAll({
          where: {
            roleName: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }

      // Default SUbscription Assign
      // if (req.body.subscription) {
      //   Sub.findAll({
      //     where: {
      //       name: {
      //         [Op.or]: req.body.subscription,
      //       },
      //     },
      //   }).then((subscription) => {
      //     user.setRoles(subscription).then(() => {
      //       res.send({ message: "User registered successfully!" });
      //     });
      //   });
      // } else {
      //   // user role = 1
      //   user.setRoles([1]).then(() => {
      //     res.send({ message: "User registered successfully!" });
      //   });
      // }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          // authorities.push("ROLE_" + roles[i].name.toUpperCase());
          authorities.push("ROLE_" + roles[i].roleName);
        }

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
