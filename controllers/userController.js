const asyncHandler = require("express-async-handler");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @dec Register user
// @route Get /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are requried");
  }
  const userTaken = await User.findOne({ email });
  if (userTaken) {
    res.status(400);
    throw new Error("Email already exists");
  }

  // hashed passowrd
  const hashedPassword = await bcript.hash(password, 10);
  console.log(hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log("user created:", user);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data is not valid");
  }

  res.json({ message: "register the user" });
});

// @dec Login user
// @route Get /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are requried");
  }
  const user = await User.findOne({ email });
  if (user && (await bcript.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "40m" }
      );
    res.status(200).json({ accessToken, username: user.username });
  } else {
    res.status(401);
    throw new Error("email or passowrd not valid");
  }
});

// @dec Current user
// @route Get /api/users/current
// @access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
