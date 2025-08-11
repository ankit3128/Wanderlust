
const Listing =require("../models/listing")



// -------------------------
// ✅ INDEX: Show all listings
// -------------------------

module.exports.index =async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  };


  // -------------------------
// ✅ NEW: Render new listing form
// -------------------------

  module.exports.newForm=(req, res) => {

  res.render("listings/new.ejs");
}

// -------------------------
// ✅ EDIT: Render edit form
// -------------------------

module.exports.renderEdit=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
     if(!listing){
      req.flash("error","listing you requested for does not exist!")
      res.redirect("/listings");
    }
let originalImageUrl =listing.image.url;
// originalImageUrl =originalImageUrl.replace("/upload","/upload/w_20")
originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_300,h_300,c_fill");


    res.render("listings/edit.ejs", { listing, originalImageUrl});
  }

  // -------------------------
// ✅ UPDATE: Update a listing
// -------------------------

module.exports.UpdatedPage=async (req, res) => {
    let { id } = req.params;
     let listing = await Listing.findByIdAndUpdate(id, { ...req.body });
  if( typeof req.file!=="undefined"){

     let url =req.file.path;
    let filename =req.file.filename;
 listing.image={url,filename}
 await listing.save();}
     req.flash("success","listing updated!")
    res.redirect("/listings");
  }

  // -------------------------
// ✅ DELETE: Delete a listing
// -------------------------

module.exports.delete =async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
     req.flash("success","listing deleted!")
    res.redirect("/listings");
  }

  // -------------------------
// ✅ SHOW: Show details for one listing
// -------------------------

module.exports.showDetails=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
      req.flash("error","listing you requested for does not exist!")
      res.redirect("/listings");
    }
     console.log(listing)
    res.render("listings/show.ejs", { listing });
  }

  // -------------------------
// ✅ CREATE: Create new listing
// -------------------------

module.exports.create=async (req, res, next) => {
    if (isNaN(req.body.price) || req.body.price < 0) {
      throw new Error("Invalid price");
    }
    let url =req.file.path;
    let filename =req.file.filename;
    // console.log(url,"..",filename)
    const newListing = new Listing(req.body);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","new listing created")
    res.redirect("/listings");
  }