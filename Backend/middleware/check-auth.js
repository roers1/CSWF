const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = config.logger;

module.exports = (req, res, next) => {
	let authorizationToken = req.headers.jwt;

	if (!authorizationToken) {
		console.log('Validate token failed: no token available');

		return res.status(400).json({
			message: 'no token available',
		});
	}
	console.log(authorizationToken);

	jwt.verify(authorizationToken, 'secret', (err, payload) => {
		if (err) {
			return res.status(400).json({
				message: 'auth failed',
			});
		}

		if (payload && payload.Id) {
			console.log('token is valid', payload);

			req.Id = payload.Id;
			console.log(payload.Id);
			console.log(req.Id);
			next();
		} else {
			return res.status(400).json({
				message: 'UserId is not available',
			});
		}
	});
};
