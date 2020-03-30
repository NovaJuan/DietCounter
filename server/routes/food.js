import express from 'express';
import {
	getFoods,
	createFood,
	updateFood,
	deleteFood
} from '../controllers/food';
import { protect } from '../middlewares/authMiddlewares';

const router = express.Router();

router.use(protect); // Protect below routes

router
	.route('/')
	.get(getFoods)
	.post(createFood);

router
	.route('/:id')
	.put(updateFood)
	.delete(deleteFood);

module.exports = router;
