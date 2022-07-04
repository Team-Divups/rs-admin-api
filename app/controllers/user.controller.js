const express = require("express");
const db = require("../models");
const config = require("../config/auth.config");
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

exports.getAllUser = async (req, res) => {
  User.findAll()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Delete Subscription by ID
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
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((user) => {
      res.send({ message: "All Users Deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
