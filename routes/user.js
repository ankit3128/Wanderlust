const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController =require("../controller/users.js")

// ===== SIGNUP ROUTES =====
// router.get("/signup", (req, res) => {
//   res.render("users/signup.ejs");
// });

// router.post(
//   "/signup",
//   wrapAsync(async (req, res) => {
//     try {
//       let { username, email, password } = req.body;
//       const newUser = new User({ email, username });
//       const registeredUser = await User.register(newUser, password);
//       console.log(registeredUser);
//       req.login(registeredUser,(err) => {
//          if(err) {
//       return next(err);
//     }
//      req.flash("success", "welcome to wanderlust");
//       res.redirect("/listings");
//        });
     
//     } catch (e) {
//       req.flash("error", e.message);
//       res.redirect("/signup");
//     }
//   })
// );

// // ===== LOGIN ROUTES =====
// router.get("/login", (req, res) => {
//   res.render("users/login.ejs");
// });

// router.post(
//   "/login",saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     req.flash("success", "Welcome back to Wanderlust!");
//     let redirectUrl =res.locals.redirectUrl||'/listings';
//     res.redirect(redirectUrl);}
//   );
  

// // ===== LOGOUT ROUTE =====
// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     req.flash("success", "you are logged out!");
//     res.redirect("/listings");
//   });
// });

// module.exports = router;

// ===== SIGNUP ROUTES =====
// router.get("/signup", userController.signupPage);

// router.post(
//   "/signup",
//   wrapAsync(userController.sign)
// );

// // ===== LOGIN ROUTES =====
// router.get("/login", userController.loginPage);

// router.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   userController.login
// );

// // ===== LOGOUT ROUTE =====
// router.get("/logout", userController.logout);

// module.exports = router;


// ===== SIGNUP ROUTES =====
router
  .route("/signup")
  .get(userController.signupPage)
  .post(wrapAsync(userController.sign));

// ===== LOGIN ROUTES =====
router
  .route("/login")
  .get(userController.loginPage)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// ===== LOGOUT ROUTE =====
router.get("/logout", userController.logout);

module.exports = router;