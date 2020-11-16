const express = require('express');
const app = express();
const config = require('./config/config');
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, password'
	);
	next();
});

app.all('*', (req, res, next) => {
	console.log(
		'Hostname: ' + req.connection.remoteAddress + ' route: ' + req.url
	);
	next();
});

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(bodyParser.json());

const userRoutes = require('./src/controllers/user_routes');
const authentication = require('./src/controllers/authentication');

app.use('/api/login', authentication);
app.use('/api/user', userRoutes);

app.use('*', (req, res, next) => {
	const error = new Error('Route not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			Message: error.message,
		},
	});
});

module.exports = app;
