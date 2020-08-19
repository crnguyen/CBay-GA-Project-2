const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/:id", isLoggedIn, (req, res) => {
  db.product
    .findOne({
      include: [db.user],
      where: { id: req.params.id },
    })
    .then((product) => {
      const userClaim = { gpu: 0 };
      res.render("item/item", { product: product, userClaim: userClaim });
    })
    .catch((error) => {
      console.log("error", error);
    });
});



module.exports = router;
