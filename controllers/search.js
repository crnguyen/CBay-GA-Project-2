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
      include: [db.user],
      where: {
        productName: {
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
