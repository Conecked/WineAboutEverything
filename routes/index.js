const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { 
    console.log("req user", req.user);
    next();
  }
  res.redirect('/');
}

// API Routes 
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


router.use('/user', isAuthenticated, function(req, res){
  console.log("working?", req.user)
  res.send({ user: req.user });
});

 


module.exports = router;

