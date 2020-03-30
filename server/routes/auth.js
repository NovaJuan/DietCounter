import express from 'express';
import {
	registerUser,
	loginUser,
	updateDetails,
	getInfo,
	logoutUser
} from '../controllers/auth';
import { protect } from '../middlewares/authMiddlewares';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

router.use(protect); // Protect below routes

router
	.route('/')
	.get(getInfo)
	.put(updateDetails);
router.get('/logout', logoutUser);

module.exports = router;
