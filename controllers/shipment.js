require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");
const Easypost = require("@easypost/api");
const EASYPOST_API_KEY_TEST = process.env.EASYPOST_API_KEY_TEST;
const api = new Easypost(EASYPOST_API_KEY_TEST);

// router.get('/:productId', isLoggedIn, (req, res) => {
//     res.render('shipment/shipment', {productId: req.params.productId} )
// })







module.exports = router;