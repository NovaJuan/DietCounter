import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';

import MealModalForm from './MealModalForm';

import { closeModal, clearCurrent } from '../../../state/actions/meals';

const MealModal = ({ open, closeModal, current, clearCurrent }) => {
	const onClose = () => {
		clearCurrent();
		closeModal();
	};
	return (
		<Modal isOpen={open}>
			<ModalHeader>
				{current !== null ? 'Update Meal' : 'Add Meal'}
				<a
					href='#!'
					onClick={onClose}
					style={{ position: 'absolute', right: 15, top: 18 }}>
					<i
						className='material-icons text-danger'
						style={{ fontSize: '18px' }}>
						close
					</i>
				</a>
			</ModalHeader>
			<ModalBody>
				<MealModalForm />
			</ModalBody>
		</Modal>
	);
};

const mapStateToProps = state => ({
	open: state.meals.isModalOpen,
	current: state.meals.current
});

export default connect(mapStateToProps, { closeModal, clearCurrent })(
	MealModal
);
