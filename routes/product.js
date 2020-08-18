const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");




db.product.create({
    where: {
        productName: 'Nvidia Geforce 1080 TI',
        productDesc: '2 year old 1080 TI GPU'
    }
})