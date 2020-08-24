# CBAY
Project 2 for General Assembly required me to make a full stack application, using an API, and the ORM sequelize to manage multiple tables in the same database.

## Where to Find
You can find CBAY here, for now it is merely running on the test API, so as to prevent actual shipments from being processed.
[CBAY](https://samehcbay.herokuapp.com/)

### This app is not fully functioning outside of the test development yet.

This one was a blast to make, I used express, sequelize, and ejs to render and create a full stack application. The hardest part was finding the appropriate data from my multiple tables, and figuring out the relationships which were sometimes very complex. This also used passport for authentication, EasyPost API, sessions, connect-flash, and bcrypt.

The ejs had multiple conditions, and required significant JS to access all of the data properly.

## EJS

```html
<div class="profile-items">
  <div class="add">
    <h4 style="text-align: center;">Parts You've Listed</h4>
    <% user.products.forEach(p => {%>
    <div class="row">
      <div class="col s12">
        <div class="card blue darken-3" style="border-radius: 10px;">
          <div class="card-content white-text">
            <span class="card-title"><%= p.productName %></span>
            <div class="product">
              <p><%= p.productDesc %></p>
              <p><%= user.userName %></p>
              <br />
              <% if(p.available) { %>
              <form action="/profile?_method=DELETE" method="POST">
                <input type="hidden" value="<%= p.id %>" name="deleteProduct" />
                <button
                  type="submit"
                  class="btn-floating btn-large waves-effect waves-light red"
                >
                  <i class="material-icons">delete</i>>
                </button>
              </form>
              <br />
              <p style="color: rgb(165, 250, 7);">
                Still available: <%= p.available %>
              </p>
              <% } else { %>
              <p style="color: rgb(116, 146, 153);">
                Still available: <%= p.available %>
              </p>
              <% } %>
            </div>
          </div>
          <div class="card-action">
            <% if(user.shipments) { %>
            <a href="<%= user.shipments.label %>"
              >Click here to view and print your label</a
            >
            <br />
            <hr />
            <a href="<%= user.shipments.trackingEmbed %> "
              >Track your shipment here</a
            >
            <% } %>
            <p><%= p.productWeight %> lbs.</p>
            <h5><%= p.productType %></h5>
          </div>
          <form action="/profile" method="POST"></form>
        </div>
      </div>
    </div>

    <% }) %>
  </div>
  <div class="claim">
    <h4 style="text-align: center;">Parts you've claimed</h4>
    <% if(user.claimeds) { %> <% user.claimeds.forEach(p => { %>
    <div class="row">
      <div class="col s12">
        <div class="card teal darken-3" style="border-radius: 10px;">
          <div class="card-content white-text">
            <span class="card-title"><%= p.product.productName %></span>
            <h2><%= p.product.productType %></h2>
          </div>
          <div class="card-action">
            <a href="shipment/<%= p.product.id %>">Go To Shipping?</a>
          </div>
        </div>
      </div>
    </div>

    <% }) %> <% } else { %>
    <p>You have no claims currently</p>
    <% } %>
  </div>
</div>
```

For example, this is what I had to do on the profile page to render different items and whether they were available or not.

## JS

The javascript was fairly straight forward, manipulating the databases to show what I wanted was not as straightforward though, the api call for the shipping was slightly complex as well, but once it was figured out, the amount of data I could access was incredible.

```js
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
```

The api had multiple built in functions that were a huge help, also had everything from rates, to id's for addresses that were created through the node package calls.

## CSS

For CSS I used Materialize for everything, I did use some rainbow text, and applied just a little bit of CSS myself, but otherwise I left it largely up to Materialize. I did do some inline styling as well, I know, shame on me haha.

```css
.profile-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.rainbow {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, #f22),
    color-stop(0.15, #f2f),
    color-stop(0.45, #2ff),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  background-image: gradient(
    linear,
    left top,
    right top,
    color-stop(0, #f22),
    color-stop(0.15, #f2f),
    color-stop(0.45, #2ff),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

.rainbow2 {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, #f22),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  background-image: gradient(
    linear,
    left top,
    right top,
    color-stop(0, #f22),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22)
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
```

## Author
- Sameh Kinawy

This project is built with:

```js
@easypost/api
connect-flash
easypost
ejs
express
express-ejs-layouts
express-session
method-override
passport
passport-local
pg
sequelize
sequelize-cli
```

All of these are the node packages, Materialize was also used, with light HTML and light CSS.

## Thank You's

Thanks to Adam Honore for fixing my signposts when I got lost, also thanks to all the other GA TA's and instructors who were a massive help!

### Thanks for looking at CBAY, and if you have spare computers or parts, consider listing them on here when the application is fully completed!!