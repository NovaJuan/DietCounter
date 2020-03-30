import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MealItem from './MealItem';
import MealModal from './Modal/MealModal';

import { getMeals, openModal } from '../../state/actions/meals';

const Meals = ({ meals, loading, getMeals, openModal }) => {
	useEffect(() => {
		getMeals();
		// eslint-disable-next-line
	}, []);

	let breakfasts = [];
	let launch = [];
	let dinner = [];
	let snacks = [];
	if (!loading && meals !== null) {
		meals.forEach(meal => {
			switch (meal.type) {
				case 'Breakfast':
					breakfasts.push(meal);
					break;
				case 'Launch':
					launch.push(meal);
					break;
				case 'Dinner':
					dinner.push(meal);
					break;

				default:
					snacks.push(meal);
					break;
			}
		});
	}

	return (
		<div className='card card-body'>
			<MealModal />
			<h4>
				Today's meals{' '}
				<button className='btn btn-success btn-sm' onClick={openModal}>
					Add Meal
				</button>
			</h4>
			<ul className='list-group mt-4'>
				<li className='list-group-item list-group-item-success'>
					<h5 className='mb-0 d-inline align-middle'>Breakfast</h5>
				</li>
				{breakfasts.map(meal => (
					<MealItem meal={meal} key={meal._id} />
				))}
			</ul>
			<ul className='list-group mt-4'>
				<li className='list-group-item list-group-item-danger'>
					<h5 className='mb-0 d-inline align-middle'>Launch</h5>
				</li>
				{launch.map(meal => (
					<MealItem meal={meal} key={meal._id} />
				))}
			</ul>
			<ul className='list-group mt-4'>
				<li className='list-group-item list-group-item-warning'>
					<h5 className='mb-0 d-inline align-middle'>Dinner</h5>
				</li>
				{dinner.map(meal => (
					<MealItem meal={meal} key={meal._id} />
				))}
			</ul>
			<ul className='list-group mt-4'>
				<li className='list-group-item list-group-item-primary'>
					<h5 className='mb-0 d-inline align-middle'>Snack</h5>
				</li>
				{snacks.map(meal => (
					<MealItem meal={meal} key={meal._id} />
				))}
			</ul>
		</div>
	);
};

const mapStateToProps = state => ({
	meals: state.meals.meals,
	loading: state.meals.loading,
	isModalOpen: state.meals.isModalOpen
});

export default connect(mapStateToProps, { getMeals, openModal })(Meals);
