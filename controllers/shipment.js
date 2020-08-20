require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");
const Easypost = require("@easypost/api");
const EASYPOST_API_KEY_TEST = process.env.EASYPOST_API_KEY_TEST;
const api = new Easypost(EASYPOST_API_KEY_TEST);

router.get('/:id', (req, res) => {
    res.render('shipment/shipment')
})

router.get('/:id/success', async (req, res) => {
    const toUserAddress = await req.user.dataValues;
    console.log(toUserAddress)

    const toAddress = await new api.Address({
        street1: toUserAddress.streetAddress,
        city: toUserAddress.city,
        state: toUserAddress.state,
        zip: toUserAddress.zipCode,
        country: toUserAddress.country,
    })
    toAddress.save()

    const fromAddress = await new api.Address({
        street1: '23 Perthshire Road',
        city: 'Boston',
        state: 'MA',
        zip: '02135',
        country: 'US'
    })
    fromAddress.save()


    const parcel = await new api.Parcel({
        weight: 5.6
    })
    parcel.save()

    const shipment = await new api.Shipment({
        to_address: toAddress,
        from_address: fromAddress,
        parcel: parcel
    })
    shipment.save()

    api.Shipment.retrieve("shp_3d794fd5a6bc4fbd9545e4ddfddb74c8").then(s => {
        s.buy(s.lowestRate(), 0.00).then(console.log).catch(error => {console.log(error)})
    })
})







module.exports = router;