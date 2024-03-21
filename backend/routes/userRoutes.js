 //inside userRoute link to the controller function
import express from 'express';
import {
    authUser, 
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
 } from '../controllers/userController.js';
import { protect

} from '../middleware/authMiddleware.js';
const router = express.Router();

//By doing so, all the routes below are connected to functions in the controller
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile); //adding the auth middleware here

export default router;