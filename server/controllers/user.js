import asyncCatcher from '../middlewares/asyncCatcher';

//@desc     Get all users
//@route    GET /api/v1/user
//@access   Private/admin
exports.getUsers = asyncCatcher(async (req, res, next) => {});

//@desc     Create user
//@route    POST /api/v1/user
//@access   Private/admin
exports.createUser = asyncCatcher(async (req, res, next) => {});

//@desc     Update user
//@route    PUT /api/v1/user/:id
//@access   Private/admin
exports.updateUser = asyncCatcher(async (req, res, next) => {});

//@desc     Delete user
//@route    DELETE /api/v1/user/:id
//@access   Private/admin
exports.deleteUser = asyncCatcher(async (req, res, next) => {});
