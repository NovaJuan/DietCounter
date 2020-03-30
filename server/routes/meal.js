import express from 'express';
import {
	addMeal,
	getUserMeals,
	updateMeal,
	deleteMeal,
	getAllMeals,
	getConsumedMeals
} from '../controllers/meal';
import { protect, authorized } from '../middlewares/authMiddlewares';

const router = express.Router();

router.use(protect); // Protect below routes

router.get('/', authorized('admin'), getAllMeals);
router.get('/user', getUserMeals);
router.get('/consumed', getConsumedMeals);
router.post('/:foodid', addMeal);
router
	.route('/:id')
	.put(updateMeal)
	.delete(deleteMeal);

module.exports = router;
