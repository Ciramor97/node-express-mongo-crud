const express = require("express");
const {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
} = require("../controller/utilisateur");

const router = express.Router();

router.route("/utilisateurs").post(addUser);
router.route("/utilisateurs").get(getUsers);
router.route("/utilisateurs/:id").get(getUser);
router.route("/utilisateurs/:id").put(updateUser);
router.route("/utilisateurs/:id").delete(deleteUser);

module.exports = { router };
