const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");

router.get("/", (req, res) => {
  const userId = req.user.id;
  db.user
    .findByPk(userId, {
      include: [db.product, { model: db.claimed, include: [db.product] }],
    })
    .then((user) => {
      res.render("profile/profile", { user });
    })
    .catch((error) => {
      console.log("error", error);
    });
});

router.post("/", (req, res) => {
  db.product
    .create({
      productName: req.body.productName,
      productDesc: req.body.productDesc,
      productType: req.body.productType,
      available: true,
      productWeight: req.body.productWeight,
      userId: req.user.id,
    })
    .then((product) => {
      res.redirect("/profile");
    });
});

module.exports = router;
