const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth-user');
const checkAuthAdmin = require('../middleware/check-auth-admin');

//GET ALL
router.get('/', checkAuthAdmin, UserController.users_get_all);

// signin user
router.post('/login', UserController.users_signin);


// GET USER
router.get('/:userId', UserController.users_get_user);

// SIGNUP USER
router.post("/signup", UserController.users_signup_user);

// DELETE USER
router.delete("/:userId", UserController.users_delete_user);

// PATCH USER
router.patch("/:userId", UserController.users_patch_user);

module.exports = router;