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
  app.get("/subscription", controller.getSubAllCategory);
  app.get("/subscription/:id", controller.getSubCategoryID);
  app.delete("/subscription/:id", controller.deleteSub);
  app.post(
    "/subscriptions/new",
    // [authJwt.verifyToken],
    controller.createSub
  );
};
