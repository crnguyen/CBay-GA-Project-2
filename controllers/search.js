const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");


router.get("/", (req, res) => {
  const searchInput = { product: req.query.productType };

  db.product
    .findAll({
      include: [db.user],
      where: {
        productType: {
          [Op.iLike]: `%${searchInput.product}%`,
        },
      },
    })
    .then((product) => {
      res.render("search", { product: product });
    })
    .catch((error) => {
      console.log("error", error);
      res.redirect("/");
    });
});

module.exports = router;
