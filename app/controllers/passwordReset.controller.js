const express = require("express");
const db = require("../models");
const config = require("../config/auth.config");
const nodemailer = require("nodemailer");
const Op = require("sequelize").Op;
const User = db.user;
const passwordReset = db.passwordReset;
const crypto = require("crypto");

var bcrypt = require("bcryptjs");

const transpoter = nodemailer.createTransport({
  host: "0.0.0.0",
  port: 1025,
});

exports.forgotpassword = async (req, res) => {
  console.log(req.body.email);
  passwordReset
    .create({
      email: req.body.email,
        token: crypto.randomBytes(20).toString("hex"),
    //   token: bcrypt.hashSync(Math.random.toString(10).substr(2, 12)),
    })
    .then(async (passwordReset) => {
      passwordReset.save();
      const url = `http://localhost:3000/reset/${passwordReset.token}`;

      await transpoter.sendMail({
        from: "admin@example.com",
        to: passwordReset.email,
        subject: "Reset your account Password",
        html: `Click <a href="${url}">here</a> to reset password`,
      });

      res.send({
        message: "Check your mail",
      });
    });
};

exports.resetpassword = async (req, res) => {
  if (req.body.password !== req.body.password2) {
    return res.status(400).send({ message: "Passwords do not match" });
  }
  passwordReset.findOne({
    where: {
        token: req.params.token,
  }}).then((passwordReset) => {
    const createtime = passwordReset.createdAt;
    if (new Date(Date.now()) - new Date(createtime) > 1000*60*5) {
      return res.status(400).send({ message: "Token expired" });
    }
        const email = passwordReset.email;
        User.findOne({
            where: {
                email: email,
            },
        })
        .then((user) => {
            user.password = bcrypt.hashSync(req.body.password, 8);
            user.save();
            passwordReset.destroy();
            res.send({ message: "Password changed successfully" });
        })
    }
    ).catch((err) => {
        res.status(404).send({ message: "Invalid Token" });
    }
    )
}
