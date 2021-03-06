const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    // [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    // [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/user",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.getAllUser
  );
  app.delete(
    "/user/:id/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );
  app.delete("/user/", controller.deleteAllUser);
  app.get("/user/:id", controller.getUserID);
  app.patch("/user/:id", controller.editUser);
};
