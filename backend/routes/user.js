//will contain all user related routes
const express = require("express");
const router = express.Router();
const mysql = require("mysql");

router.get("/users", (req, res) => {
  var users1 = {
    firstName: "Stephen",
    lastName: "Curry"
  };
  const user2 = {
    firstName: "Kevin",
    lastName: "Durant"
  };
  res.send([users1, user2]);
  console.log("Responding to users route");
});

module.exports = router;
