const { authJwt } = require("../middleware");
const controller = require("../controllers/passwordReset.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/forgot", controller.forgotpassword);
  app.post("/reset/:token", controller.resetpassword);
};
