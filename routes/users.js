const express = require('express');
const { validateUserUpdate, validateId, validateAvatarUpdate } = require('../middlewares/requestValidation');
const {
  getAllUsers, getUser, updateUser, updateUserAvatar,
} = require('../controllers/users.js');

const userRouter = express.Router();
/**
 * Users route
 */
userRouter.get('/', getAllUsers);

/**
 * get user with id route
 */
userRouter.get('/:_id', validateId, getUser);
/**
 * update user
 */
userRouter.patch('/me', validateUserUpdate, updateUser);
/**
 * update avatar
 */
userRouter.patch('/me/avatar', validateAvatarUpdate, updateUserAvatar);

module.exports = userRouter;
