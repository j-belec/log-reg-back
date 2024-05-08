const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userControllers");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/actual-user", usersController.actualUser);
router.put("/editUser", usersController.editUser);
router.put("/editUser/change-password", usersController.changePassword);

module.exports = router;
