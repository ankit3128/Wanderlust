

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const listingController = require("../controller/listings.js");
// multer require 
const multer =require("multer");
const{storage}=require("../cloudconfig.js")
const upload =multer({storage})

// -------------------------
// ✅ INDEX & CREATE
// -------------------------
router
  .route("/")
  .get(wrapAsync(listingController.index)) // Show all listings
  .post(isLoggedIn,upload.single('listing[image]'),  validatelisting,wrapAsync(listingController.create)); // Create new listing
// .post( upload.single('listing[image]'),(req,res)=>{
//   // console.log(req.file);
//   res.send(req.file)


// -------------------------
// ✅ NEW FORM
// -------------------------
router.get("/new", isLoggedIn, listingController.newForm);

// -------------------------
// ✅ EDIT, UPDATE & DELETE
// -------------------------
router
  .route("/:id")
  .get(wrapAsync(listingController.showDetails)) // Show details for one listing
  .put(isOwner, upload.single('listing[image]'),
    validatelisting, 
    wrapAsync(listingController.UpdatedPage)) // Update a listing
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.delete)); // Delete a listing

// -------------------------
// ✅ EDIT FORM
// -------------------------
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEdit));

module.exports = router;
 