var express = require("express");
var router = express.Router();
const passport = require("passport");

const controllers = require("../controllers/controllers");

router.get("/", controllers.rootGetRequest);

router.get(
  "/sign-up",
  controllers.isAuthenticated,
  controllers.signUpGetRequest
);
router.post("/sign-up", controllers.signUpPostRequest);

router.get("/login", controllers.isAuthenticated, controllers.loginGetRequest);
router.post("/login", controllers.loginPostRequest);

router.get("/logout", controllers.logoutGetRequest);

module.exports = router;
