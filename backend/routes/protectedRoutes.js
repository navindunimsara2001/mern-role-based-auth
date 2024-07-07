import express from "express";
import { 
    registerUser, 
    authUser, 
    getUserProfile } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.get('/admin', protect, roleMiddleware(['admin']), (req, res) => {
    res.json({ message: 'Admin content' });
});

export default router;
