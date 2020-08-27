const express = require('express');
const {
  getAllUsers, getUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users.js');

const userRouter = express.Router();
/**
 * Users route
 */
userRouter.get('/', getAllUsers);

/**
 * get user with id route
 */
userRouter.get('/:_id', getUser);
/**
 * create user
 */
userRouter.post('/', createUser);
/**
 * update user
 */
userRouter.patch('/me', updateUser);
/**
 * update avatar
 */
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
