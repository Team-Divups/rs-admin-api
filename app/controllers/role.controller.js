const express = require("express");
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Subscription = db.subscription;

//Read All Subscription
exports.getRole = async (req, res) => {
  Role.findAll()
    .then((role) => {
      res.status(200).json(role);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.createRole = async (req, res) => {
  Role.create({
    idrole: req.body.idrole,
    roleName: req.body.roleName,
    description: req.body.description,
  }).then((role) => {
    console.log({ message: "created" });
  });
};
