const asyncHandler = require('express-async-handler'); // This will trigger the express custom error handler
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users.model');

// @route POST /users/register
// @desc  Registers the user
// @access PUBLIC

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('You must provide credentials');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User');
  }
});

// @route POST /users/login
// @desc  Logins the user
// @access PUBLIC

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('You must provide credentials');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('You must register first');
  }

  if (await bcrypt.compare(password, user.password)) {
    res.status(200).json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user credentials');
  }
});

// @route GET /users/profile
// @desc  Gets my profile data
// @access PRIVATE

const getMyProfile = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.user;

  res.status(200).json({
    _id,
    name,
    email,
  });
});

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: '1d',
  });

  return token;
};

module.exports = {
  registerUser,
  loginUser,
  getMyProfile,
};
