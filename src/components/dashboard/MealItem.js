import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	deleteMeal,
	updateMeal,
	setCurrent,
	openModal
} from '../../state/actions/meals';

const MealItem = ({ meal, deleteMeal, setCurrent, openModal }) => {
	return (
		<li className='list-group-item'>
			<p className='m-0' style={{ fontSize: '15px', width: '80%' }}>
				<span className='mb-0'>
					<strong>{meal.food.name}</strong>
				</span>
				<span style={{ marginLeft: '10px', fontSize: '12px' }}>
					{(meal.servingQty * meal.food.servingSize).toFixed(1)}{' '}
					{meal.food.servingName}
				</span>
				<span
					className='text-success'
					style={{ marginLeft: '10px', fontSize: '12px' }}>
					<strong>{meal.calories} Cals</strong>
				</span>
			</p>
			<p className='mb-0' style={{ width: '50%' }}>
				<span className='text-success'>P : {meal.proteins}</span>
				<span className='text-danger mx-3'>C : {meal.carbs}</span>
				<span className='text-warning'>F : {meal.fats}</span>
			</p>
			<div className='float-right d-inline' style={{ marginTop: '-35px' }}>
				<button
					className='btn btn-danger btn-sm'
					onClick={e => deleteMeal(meal._id)}>
					<i className='material-icons' style={{ fontSize: '18px' }}>
						delete
					</i>
				</button>
				<button
					className='btn btn-primary btn-sm ml-1'
					onClick={e => {
						setCurrent(meal);
						openModal();
					}}>
					<i className='material-icons' style={{ fontSize: '18px' }}>
						edit
					</i>
				</button>
			</div>
		</li>
	);
};

MealItem.propTypes = {
	meal: PropTypes.object.isRequired
};

export default connect(null, { deleteMeal, updateMeal, setCurrent, openModal })(
	MealItem
);
