

if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session")
const MongoStore =require('connect-mongo')
const flash = require("connect-flash");
const passport =require("passport");
const LocalStrategy =require("passport-local");
const User =require("./models/user.js");


// -------------------------
// ✅ Require routers
// -------------------------
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user =require("./routes/user.js");

// -------------------------
// ✅ Connect to MongoDB
// -------------------------

// const Mongo_url="mongodb://127.0.0.1:27017/wanderlust"

const dbUrl =process.env.ATLASDB_URL;



main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

// -------------------------
// ✅ App setup
// -------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // form store the data inn url encoded form 
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// for cookies and alerts by usiing flash 



// mongo session
const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
})

store.on("error",()=>{
  console.log("error in mongo session store",err);
})


const sessionOptions={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true, // for security for 
  },
};






app.use(session(sessionOptions));
 app.use(flash());

// for passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -------------------------
// ✅ Test root route
// -------------------------
// app.get("/", (req, res) => {
//   res.send("hi i am root ankit ");
// });

// -------------------------
// ✅ Use routes
// -------------------------

//  middle ware for flash  
app.use((req,res,next)=>{
res.locals.success= req.flash("success");
res.locals.error= req.flash("error");
// console.log(res.locals.success);
res.locals.currUser =req.user;
next();
})

///// user model demo /////
// app.get("/demouser",async(req,res)=>{
//   let fakeUser =new User({
//     email:"student@gmail.com",
//     username:"ankit singh"
//   })
//   let registeredUser=await User.register(fakeUser,"helloworld");
//   res.send(registeredUser)
// })



app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/",user);

// -------------------------
// ✅ 404 catch-all
// -------------------------
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// -------------------------
// ✅ Error handler middleware
// -------------------------
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.render("error.ejs", { message });
});

// -------------------------
// ✅ Start server
// -------------------------
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
