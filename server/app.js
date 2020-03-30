import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';
import errorHandler from './middlewares/errorHandler';
import path from 'path';

const app = express();

// Middlewares
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100 // limit each IP to 100 requests per windowMs
	})
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(cors());

// API Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/food', require('./routes/food'));
app.use('/api/v1/meal', require('./routes/meal'));

// Error handler
app.use(errorHandler);

// Static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Client app files
app.use(express.static(path.join(__dirname, '../build')));

// Index app file
app.get('*', (req, res) =>
	res.status(200).sendFile(path.join(__dirname, '../build/index.html'))
);

export default app;
