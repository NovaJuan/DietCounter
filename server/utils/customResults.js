export default (model, populate) => async (req, res, next) => {
	let reqQuery = { ...req.query };

	// List of to remove field
	let exclude = ['page', 'limit', 'select'];

	// Remove those fields
	exclude.forEach(value => delete reqQuery[value]);

	// Create query string
	let queryStr = JSON.stringify(reqQuery);

	//create operators (gt,gte,lt...)
	queryStr = queryStr.replace(
		/\b(gt|gte|lt|lte|in|regex|options)\b/g,
		match => `$${match}`
	);

	// Start query
	let query = model.find(JSON.parse(queryStr));

	// If populate exists
	if (populate) {
		query = query.populate(populate);
	}

	//select fields
	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	//sort
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('-createdAt');
	}

	//Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 10;
	const skip = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await model.countDocuments(JSON.parse(queryStr));

	const pagination = {
		currentPage: page,
		maxPages: Math.ceil(total / limit),
		limit
	};

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit
		};
	}

	if (skip > 0) {
		pagination.prev = {
			page: page - 1,
			limit
		};
	}

	query = query.skip(skip).limit(limit);

	// Get results
	let result = await query;

	res.status(200).json({
		success: true,
		count: total,
		pagination,
		data: result
	});
};
