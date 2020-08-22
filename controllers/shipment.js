require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");
const Easypost = require("@easypost/api");
const EASYPOST_API_KEY_TEST = process.env.EASYPOST_API_KEY_TEST;
const api = new Easypost(EASYPOST_API_KEY_TEST);

router.get("/:id", isLoggedIn, (req, res) => {
  let toUserAddress = req.user.dataValues;
  db.product
    .findByPk(req.params.id)
    .then((product) => {
      res.render("shipment/shipment", {
        user: toUserAddress,
        product: product,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/:id/success", isLoggedIn, async (req, res) => {
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
  shipment
    .save()
    .then((shipmentData) => {
      api.Shipment.retrieve(shipmentData.id)
        .then((s) => {
          s.buy(s.lowestRate(), 0.0)
            .then((builtShipment) => {
              console.log(builtShipment);
              db.shipment.create({
                userId: toUserAddress.id,
                productId: fromProductAddress.id,
                trackingNumber: builtShipment.tracking_code,
                label: builtShipment.postage_label.label_url,
                trackingEmbed: builtShipment.tracker.public_url
              })
              res.render("shipment/success", { builtShipment });
            })

            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log("error", error);
    });
});

module.exports = router;
