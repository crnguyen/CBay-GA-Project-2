const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/:id", isLoggedIn, (req, res) => {
  db.product
    .findOne({
      where: { id: req.params.id },
    })
    .then((product) => {
      db.user
        .findOne({
          include: [db.userClaim],
          where: { id: req.user.id },
        })
        .then(product, user => {
          res.render("item/item", { product: product, user: user });
        })
        .catch((error) => {
          console.log("error", error);
        });
    })
    .catch((error) => {
      console.log("error", error);
    });
});

module.exports = router;
