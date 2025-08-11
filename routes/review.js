
const express = require("express");
const router = express.Router({ mergeParams: true }); // ✅ To access :id in parent route
const wrapAsync = require("../utils/wrapAsync.js");


const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const{validateReview, isLoggedIn, isReviewAuthor }=require("../middleware.js");
const reviewController  = require("../controller/reviews.js");

// -------------------------
// ✅ Middleware: Validate Review
// -------------------------

// -------------------------
// ✅ CREATE: Add a new review
// -------------------------
router.post(
  "/", isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// -------------------------
// ✅ DELETE: Delete a review
// -------------------------
router.delete(
  "/:reviewId", isLoggedIn,isReviewAuthor,
  wrapAsync(reviewController.destroyReview))
;

module.exports = router;
