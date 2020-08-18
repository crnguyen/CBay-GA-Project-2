const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const product = require("../models/product");


router.get('/', (req, res) => {
    db.product.findAll({
        include: [db.user],
        where: { id: req.body.id }
    })
    .then((response) => {
        res.render('profile', { product:product })
    })
    .catch(error => {
        console.log("Error", error)
    })
})


// router.post('/profile', (req, res) => {
//     db.product.create({
        
//     })
// })

module.exports = router;