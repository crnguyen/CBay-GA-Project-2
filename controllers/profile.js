const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
  const userId = req.user.id;
  db.user
    .findByPk(userId, {
      include: [db.product, db.shipment, { model: db.claimed, include: [db.product] }],
    })
    .then((user) => {
      console.log(user.get())
      res.render("profile/profile", { user });
    })
    .catch((error) => {
      console.log("error", error);
    });
});

router.post("/", isLoggedIn, (req, res) => {
  db.product
    .create({
      productName: req.body.productName,
      productDesc: req.body.productDesc,
      productType: req.body.productType,
      productWeight: req.body.productWeight,
      fullName: req.body.fullName,
      streetAddress: req.body.streetAddress,
      streetAddress2: req.body.streetAddress2,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.country,
      phoneNumber: req.body.phoneNumber,
      userId: req.user.id,
      
    })
    .then((product) => {
      res.redirect("/profile");
    });
  });

  router.delete('/', isLoggedIn, (req, res) => {
    console.log(req)
    db.product.destroy({
      where: { id: req.body.deleteProduct }
    })
    .then(() => {
      res.redirect('/profile')
    })
  })
  
module.exports = router;
