const Listing =require("../models/listing")
const Review =require("../models/review")

// -------------------------
// ✅ CREATE: Add a new review
// -------------------------

module.exports.createReview=async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }

    const newReview = new Review(req.body.review);
     newReview.author=req.user._id;
     console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New review created!");
    res.redirect(`/listings/${listing._id}`);
  }

  // -------------------------
// ✅ DELETE: Delete a review
// -------------------------

module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
  }