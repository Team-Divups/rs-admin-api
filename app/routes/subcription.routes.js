const { authJwt } = require("../middleware");
const controller = require("../controllers/subcription.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all/sub/cat", controller.getSubCategory);
  app.get("/api/test/all/sub", controller.getSubAllCategory);

  app.post(
    "/api/test/all/sub/create",
    // [authJwt.verifyToken],
    controller.createSub
  );
};
