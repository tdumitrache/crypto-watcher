const express = require('express');

const {
  registerUser,
  loginUser,
  getMyProfile,
  getMyAssets,
  addNewTransaction,
  deleteAsset,
} = require('../controllers/users.controller');

const { protectMiddleware } = require('../middleware/auth.middleware');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', protectMiddleware, getMyProfile);
userRouter.get('/assets', protectMiddleware, getMyAssets);
userRouter.post('/assets', protectMiddleware, addNewTransaction);
userRouter.delete('/assets', protectMiddleware, deleteAsset);

module.exports = userRouter;
