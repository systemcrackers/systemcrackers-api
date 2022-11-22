const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const dontenv = require('dotenv').config();
const db = require('./configs/connection.config');

// Importing routes
const authRoutes = require('./routes/auth.route');
const childRoutes = require('./routes/child.route');
const userRoutes = require('./routes/user.route');

// Initializing an express app
const app = express();

// Server Port
const PORT = process.env.PORT;

// Formatting incoming data and allowing cross origin requests
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging incoming requests
app.use(morgan('dev'));

// APIs
app.use('/api/auth', authRoutes);
app.use('/api/child', childRoutes);
app.use('/api/user', userRoutes);

// Test API
app.get('/api', (req, res) => {
	res.status(200).json({
    	name: `${process.env.API_NAME}`,
    	apiVersion: JSON.parse(fs.readFileSync('./package.json').toString()).version
  	});
});

// Listening on the port
app.listen(PORT, () => {
	console.log(`Server running on ${process.env.API_URL}`);
});