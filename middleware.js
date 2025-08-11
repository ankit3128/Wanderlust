const Listing = require("./models/listing");
const { listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review");

module.exports.isLoggedIn =(req,res,next) =>{
    // console.log(req);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  } 
   next();
}

module.exports.saveRedirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner= async(req,res,next)=>{
    let {id} =req.params;
    let listing =await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of this property")
        return res.redirect(`/listings/${id}`);
    }
     next();
}

module.exports. validatelisting = async (req, res, next) => {
  let { err } = listingSchema.validate({ listing: req.body });
  let result = listingSchema.validate({ listing: req.body });
  console.log(result);

  if (result.error) {
    throw new ExpressError(400, result.error);
  }

  if (err) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, err);
  } else {
    next();
  }
};

module.exports. validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
