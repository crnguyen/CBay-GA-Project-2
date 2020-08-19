const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");


router.get("/", (req, res) => {
    console.log(req.user)
    db.product.findAll({
        include: [db.user],
        where: { userId: req.user.id }
    })
    .then(product => {
        res.render('profile/profile', {product: product})

    })
    .catch(error => {
        console.log("error", error)
    })
});

router.post('/', (req, res) => {
    db.product.create({
        productName: req.body.productName,
        productDesc: req.body.productDesc,
        productType: req.body.productType,
        available: true,
        userId: req.user.id
    })
    .then(product => {
        res.redirect('/profile')
    })
})

module.exports = router;
