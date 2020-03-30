import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	addMeal,
	closeModal,
	clearCurrent,
	updateMeal
} from '../../../state/actions/meals';
import axios from 'axios';

const MealModalForm = ({
	addMeal,
	current,
	closeModal,
	clearCurrent,
	updateMeal
}) => {
	const [foods, setFoods] = useState(null);
	const [search, setSearch] = useState('');
	const [foodSelected, setFoodSelected] = useState(null);
	const [servingQty, setServingQty] = useState(1);
	const [type, setType] = useState('Breakfast');
	const [error, setError] = useState(null);

	useEffect(() => {
		if (current !== null) {
			setFoodSelected(current.food);
			setServingQty(current.servingQty);
			setType(current.type);
		}
		// eslint-disable-next-line
	}, []);

	const searchFoods = async e => {
		setSearch(e.target.value);
		if (e.target.value !== '') {
			try {
				const { data } = await axios.get(
					`/api/v1/food?name[regex]=${e.target.value}&name[options]=i`
				);
				setFoods(data.data);
			} catch (err) {
				setFoods(null);
			}
		} else {
			setFoods(null);
		}
	};

	const selectFood = food => {
		setFoodSelected(food);
		setFoods(null);
		setSearch('');
	};

	const onSubmit = e => {
		e.preventDefault();

		if (foodSelected === null) {
			return setError('No food selected');
		}

		if (servingQty <= 0) {
			return setError('Serving Quantity must be more than 0.');
		}

		if (error) {
			setTimeout(() => {
				setError(null);
			}, 3000);
		}

		const newMeal = {
			type,
			foodid: foodSelected._id,
			servingQty
		};

		if (current === null) {
			addMeal(newMeal);
		} else {
			newMeal._id = current._id;
			delete newMeal.foodid;
			updateMeal(newMeal);
		}

		closeModal();

		clearCurrent();

		setFoodSelected(null);
		setFoods(null);
		setSearch('');
		setServingQty(1);
		setType('Breakfast');
	};

	return (
		<form onSubmit={onSubmit}>
			<div className='form-group'>
				<input
					type='search'
					name='food'
					className='form-control'
					placeholder='Search food...'
					onChange={searchFoods}
					value={search}
					autoComplete='off'
				/>
				{foods === null ? null : (
					<ul
						className='list-group mt-1'
						style={{ maxHeight: '150px', overflowY: 'scroll' }}>
						{foods &&
							foods.map(food => (
								<li
									className='list-group-item list-group-item-action'
									key={food._id}
									onClick={e => selectFood(food)}>
									{food.name}{' '}
									<span className='text-primary'>
										{food.calories} cals per {food.servingSize}{' '}
										{food.servingName}
									</span>
								</li>
							))}
					</ul>
				)}

				{error && <p className='text-danger text-center'>{error}</p>}

				{foodSelected && (
					<Fragment>
						<div className='alert alert-primary mt-1' role='alert'>
							Selected: <strong>{foodSelected.name}</strong>{' '}
							{foodSelected.calories} cals per {foodSelected.servingSize}{' '}
							{foodSelected.servingName}
						</div>

						<div className='form-group'>
							<label htmlFor='servingQty'>
								Serving Quantity{' '}
								<span>
									{(servingQty * foodSelected.servingSize).toFixed(1)}{' '}
									{foodSelected.servingName} (
									{servingQty * foodSelected.calories} calories)
								</span>
							</label>
							<input
								type='number'
								id='servingQty'
								value={servingQty}
								onChange={e => setServingQty(e.target.value)}
								className='form-control'
							/>
						</div>
						<div className='form-group'>
							<select
								className='custom-select'
								value={type}
								onChange={e => setType(e.target.value)}>
								<option value='Breakfast'>Breakfast</option>
								<option value='Launch'>Launch</option>
								<option value='Dinner'>Dinner</option>
								<option value='Other'>Snack</option>
							</select>
						</div>
						<button type='submit' className='btn btn-success'>
							Add Meal
						</button>
					</Fragment>
				)}
			</div>
		</form>
	);
};

const mapStateToProps = state => ({
	current: state.meals.current
});

export default connect(mapStateToProps, {
	addMeal,
	closeModal,
	clearCurrent,
	updateMeal
})(MealModalForm);
