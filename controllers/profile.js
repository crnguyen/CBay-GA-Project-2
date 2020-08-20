const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");


router.get("/", (req, res) => {
    const userId = req.user.id;
    console.log(userId)
    db.user.findByPk(userId, {
        include: [db.product, db.claimed]
    })
    .then(user => {
        db.product.findAll({
            where: { id: user.claimed.productId }
        })
        .then(products => {
            console.log(products[0].productType)
            res.render('profile/profile', {user, products})
        })
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
        productWeight: req.body.productWeight,
        userId: req.user.id
    })
    .then(product => {
        res.redirect('/profile')
    })
})

module.exports = router;
