const express = require("express");
const router = express.Router();
const db = require("./models");
const isLoggedIn = require("./middleware/isLoggedIn");
const Easypost = require('@easypost/api')
const api = new Easypost('EZTK9fe1b4d29f144c7f8dbdab3a7a58cfd4Q02fNc9cOAdtj0aQsGIWrQ')
const address = new api.Address({
    street1: '23 Perthshire Road',
    city: 'Boston',
    state: 'MA',
    zip: '02135',
    country: 'US',
    phone: '978-325-7575'
})
address.save().then(console.log)