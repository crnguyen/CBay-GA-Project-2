require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");
const Easypost = require("@easypost/api");
const EASYPOST_API_KEY_TEST = process.env.EASYPOST_API_KEY_TEST;
const api = new Easypost(EASYPOST_API_KEY_TEST);

router.get("/:id", async (req, res) => {
  const toUserAddress = await req.user.dataValues;
  const fromProductAddress = await db.product.findByPk(req.params.id);

  res.render("shipment/shipment", {
    user: toUserAddress,
    product: fromProductAddress,
  });
});

router.get("/:id/success", async (req, res) => {
  const toUserAddress = await req.user.dataValues;
  const fromProductAddress = await db.product.findByPk(req.params.id);

  const toAddress = await new api.Address({
    street1: toUserAddress.streetAddress,
    city: toUserAddress.city,
    state: toUserAddress.state,
    zip: toUserAddress.zipCode,
    country: toUserAddress.country,
  });
  toAddress.save();

  const fromAddress = await new api.Address({
    street1: fromProductAddress.streetAddress,
    city: fromProductAddress.city,
    state: fromProductAddress.state,
    zip: fromProductAddress.zipCode,
    country: fromProductAddress.country,
  });
  fromAddress.save();

  const parcel = await new api.Parcel({
    weight: fromProductAddress.productWeight,
  });
  parcel.save();

  const shipment = await new api.Shipment({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel,
  });
  shipment.save().then((shipmentData) => {
    api.Shipment.retrieve(shipmentData.id).then((s) => {
      s.buy(s.lowestRate(), 0.0)
        .then(console.log)
        .catch((error) => {
          console.log(error);
        });
    });
  });

  res.redirect("/");
});

module.exports = router;
