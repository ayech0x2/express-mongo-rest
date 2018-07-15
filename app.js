import express from "express";
import productRoutes from "./routes/products";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
const app = express();
import { config } from "./config/main";
import User from "./models/user";
var jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(passport.initialize());

mongoose.connect(
  "mongodb://localhost:27017/express",
  { useNewUrlParser: true }
);
require("./config/passport")(passport);

let apiRoutes = express.Router();
apiRoutes.post("/register", function(req, res) {
  console.log(req.body.email, req.body.password);
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: "Please enter email and password." });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({
          success: false,
          message: "That email address already exists."
        });
      }
      res.json({ success: true, message: "Successfully created new user." });
    });
  }
});

apiRoutes.post("/authenticate", function(req, res) {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({
          success: false,
          message: "Authentication failed. User not found."
        });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            const token = jwt.sign(user.toJSON(), config.secret, {
              expiresIn: 604800 // 1 week
            });
            res.json({ success: true, token: "JWT " + token });
          } else {
            res.send({
              success: false,
              message: "Authentication failed. Passwords did not match."
            });
          }
        });
      }
    }
  );
});

// Protect dashboard route with JWT
apiRoutes.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    res.send("It worked! User id is: " + req.user._id + ".");
  }
);

// Set url for API group routes
app.use("/api", apiRoutes);

app.use(productRoutes);
app.use("/", (req, res) => {
  res.send("we will put the homepage later!");
});
export default app;
