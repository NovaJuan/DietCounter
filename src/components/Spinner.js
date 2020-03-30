import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
	return (
		<div>
			<img
				src={spinner}
				alt='Loading'
				style={{ margin: '20px auto', width: '200px' }}
			/>
		</div>
	);
};

export default Spinner;
