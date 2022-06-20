const express = require("express");
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Subscription = db.subscription;

//Read All Subscription
exports.getRole = async (req, res) => {
  Subscription.findAll()
    .then((role) => {
      res.status(200).json(role);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
