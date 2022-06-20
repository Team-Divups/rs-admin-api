const { authJwt } = require("../middleware");
const controller = require("../controllers/role.controller");

app.get("/roles", controller.getRole);
