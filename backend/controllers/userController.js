//this should have all related logic

//allows us to use async await without the need for try catch blocks
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public

//To authenticate/Login a user
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
    // res.status(401);
    // throw new Error('Something went wrong');
    // res.status(200).json({ message: 'Auth user'}); 
});


// @desc    Register a new user
// route    POST /api/users
// @access  Public

//To register a new user
const registerUser = asyncHandler(async (req, res) => {
    console.log(123,req.body); //to access request.body, bodyparser middleware needs to be added
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email: email});

    if(userExists) {
        res.status(400); //status 400 is client error
        throw new Error('User already exists');
    }

    const user = await User.create({
        name: name,
        email: email,
        password: password
    });

    if(user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

    // res.status(200).json({ message: 'Register user'});
});

// @desc    Log out user
// route    POST /api/users/logout
// @access  Public

//To register a new user
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'User logged out'});
});


// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private (meaning that a valid jwt will be required)

//To register a new user
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    };
    res.status(200).json(user);
    // res.status(200).json({ message: 'User profile'});
});


// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private (meaning that a valid jwt will be required)

//To register a new user
const updateUserProfile = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Update user profile'});
    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name; //if new name not present in the body, then keep what we have as is
        user.email = req.body.email || user.email;
        
        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save(); //save the user with the new data
        
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}; 