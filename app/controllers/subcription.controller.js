const express = require("express");
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Subscription = db.subscription;

const Op = db.Sequelize.Op;

//Create Subscription
exports.createSub = (req, res) => {
  // Save Subscription to Database
  Subscription.create({
    subId: req.body.subId,
    name: req.body.name,
    // appLogo: req.body.appLogo,
    owner: req.body.owner,
    // description: req.body.description,
    // WebsiteURL: req.body.WebsiteURL,
    // email: req.body.email,
    // contactNo: req.body.contactNo,
    // LinkedIn: req.body.LinkedIn,
    // facebook: req.body.facebook,
    // Instagram: req.body.Instagram,
    category: req.body.category,
    type: req.body.type,
    location: req.body.location,
  })
    .then((subscription) => {
      res.send({ message: "Subcription Created" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Read Subscription by Category
exports.getSubCategory = async (req, res) => {
  Subscription.findAll({
    where: {
      category: req.body.category,
    },
  })
    .then((subscription) => {
      res.status(200).json(subscription);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Read Subscription by ID
exports.getSubCategoryID = async (req, res) => {
  Subscription.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((subscription) => {
      res.status(200).json(subscription);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Read All Subscription
exports.getSubAllCategory = async (req, res) => {
  Subscription.findAll()
    .then((subscription) => {
      res.status(200).json(subscription);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Delete Subscription by ID
exports.deleteSub = async (req, res) => {
  Subscription.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((subscription) => {
      res.send({ message: "Subcription Deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
