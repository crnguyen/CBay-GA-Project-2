require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");
const Easypost = require('@easypost/api')
const EASYBOX_API_KEY_TEST = process.env.EASYBOX_API_KEY;
const api = new Easypost(EASYBOX_API_KEY_TEST)

// router.get('/:productId', isLoggedIn, (req, res) => {
//     res.render('shipment/shipment', {productId: req.params.productId} )
// })



// router.post("/:productId", isLoggedIn, (req, res) => {
//     db.product
//       .update(
//         {
//           available: false,
//         },
//         {
//           where: { id: req.params.productId },
//         }
//       )
//       .then((updatedAvailability) => {
//         res.redirect('/shipmentSuccess');
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   });

const address = new api.Address({
    street1: '23 Perthshire Road',
    city: 'Boston',
    state: 'MA',
    zip: '02135',
    country: 'US',
    phone: '978-325-7575'
})
console.log(address)