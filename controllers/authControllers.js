const User = require("../models/User.js");
const Dhash = require("bcryptjs");
const passport = require("passport");
const asyncHandler = require("express-async-handler");

const getlogin = asyncHandler((req, res) => {
  res.render("login", {
    title: "Login",
    user: req.user,
    error: "",
  });
});

const login = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", {
        title: "login",
        user: req.user,
        error: info.message,
      });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/user/profile");
    });
  })(req, res, next);
});

const getRegister = asyncHandler((req, res) => {
  res.render("register", {
    title: "Register",
    user: req.user,
    error: "",
  });
});

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.render("register", {
        title: "Register",
        user: req.user,
        error: "User already exists",
      });
    } else {
      const hashPassword = await Dhash.hash(password, 10);
      const newUser = new User({ username, email, password: hashPassword });
      const userdata = await newUser.save();

      res.redirect("/auth/login");
    }
  } catch (error) {
    res.render("register", {
      title: "Register",
      user: req.user,
      error: error.message,
    });
  }
});

const logout = asyncHandler((req, res, next) => {
  res.clearCookie("connect.sid");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
});

module.exports = {
  getlogin,
  login,
  getRegister,
  register,
  logout,
};

