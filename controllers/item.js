const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const isLoggedIn = require("../middleware/isLoggedIn");
const methodOverride = require("method-override");

router.use(methodOverride("_method"));

router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const findProduct = await db.product.findOne({
      where: { id: req.params.id },
    });

    const findUser = await db.user.findOne({
      where: { id: req.user.id },
    });

    res.render("item/item", { product: findProduct, user: findUser });

  } catch (error) {
    console.log("error", error);
  }
});

router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const productUpdate = await db.product.update(
      {
        available: false,
      },
      {
        where: { id: req.params.id },
      }
    );
    const findUser = await db.user.findByPk(req.user.id);
    const createClaim = await db.claimed.create({
      productId: req.params.id,
      userId: req.user.id,
    });
    res.redirect("/profile");
  } catch (error) {
    console.log("Error", error);
  }
});

module.exports = router;
