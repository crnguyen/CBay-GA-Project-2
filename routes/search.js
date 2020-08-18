const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

router.get("/", (req, res) => {
  const searchInput = { product: req.query.product };

  db.product
    .findAll({
      where: {
        productName: {
          [Op.iLike]: `%${searchInput.product}%`,
        },
      },
    })
    .then((response) => {
      res.render("search", { products: response });
    })
    .catch((error) => {
      console.log("error", error);
      res.redirect("/");
    });
});

module.exports = router;
