const express = require("express");
const db = require("../models");
const config = require("../config/auth.config");
const Op = require("sequelize").Op;
// const { where } = require("sequelize/types");
const User = db.user;
const Role = db.role;
const Subscription = db.subscription;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

//Get all users
exports.getAllUser = async (req, res) => {
  User.findAll({
    where: {
      id: { [Op.ne]: req.userId },
    },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Delete User by ID
exports.deleteUser = async (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.send({ message: "User Deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Edit User by ID
exports.editUser = async (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      user.role = req.body.role;
      user.status = req.body.status;
      user.save().then((user) => {
        Role.findAll({
          where: {
            roleName: {
              [Op.or]: [user.role],
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.status(200).json(user);
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Read Subscription by ID
exports.getUserID = async (req, res) => {
  User.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Delete All Users
exports.deleteAllUser = async (req, res) => {
  console.log(req.userId);
  User.destroy({
    where: {
      id: { [Op.ne]: req.userId },
    },
    truncate: false,
  })
    .then((user) => {
      res.send({ message: "All Users Deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
