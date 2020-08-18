const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../config/ppConfig");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  db.user
    .findOrCreate({
      where: { email: req.body.email, userName: req.body.userName },
      defaults: {
        password: req.body.password,
        state: req.body.state,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    })
    .then(([user, created]) => {
      if (created) {
        console.log(`${user.userName} was created`);
        // Flash Message
        passport.authenticate("local", {
          successRedirect: "/",
          successFlash: "Account created and logging in...",
        })(req, res);
      } else {
        console.log("Email or Username already exists");
        // Flash
        req.flash(
          "error",
          "Email or Username already exists, please try again."
        );
        res.redirect("/auth/signup");
      }
    })
    .catch((err) => {
      console.log("Error:", err);
      req.flash(
        "errror",
        `Error, too bad you gotta be a dev for it to help you... ${err}`
      );
      res.redirect("/auth/signup");
    });
});

//FLASH message
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/auth/login",
    successFlash: "Welcome back!",
    failureFlash: "Either email or password incorrect, please try again",
  })
);

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "Thank you, come again... Apu");
  res.redirect("/");
});

module.exports = router;
