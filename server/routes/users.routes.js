const express = require('express');

const {
  registerUser,
  loginUser,
  getMyProfile,
} = require('../controllers/users.controller');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', getMyProfile);

module.exports = userRouter;
