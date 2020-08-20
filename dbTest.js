const express = require("express");
const app = express()
const db = require("./models");
const isLoggedIn = require("./middleware/isLoggedIn");
const Easypost = require('@easypost/api')
const api = new Easypost('EZTK9fe1b4d29f144c7f8dbdab3a7a58cfd4Q02fNc9cOAdtj0aQsGIWrQ')
app.get('/', async (req,res) => {
    const fromAddress = await new api.Address({
        street1: '23 Perthshire Road',
        city: 'Boston',
        state: 'MA',
        zip: '02135',
        country: 'US'
    })
    fromAddress.save()

    const toAddress = await new api.Address({
        street1: '2016 Larry Avenue SW',
        city: 'Cullman',
        state: 'AL',
        zip: '35055',
        country: 'US',
    })
    toAddress.save()

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

app.listen(3000)