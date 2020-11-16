const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = config.logger;

module.exports = (req, res, next) => {
	const authorizationToken = req.headers.jwt;

	if (!authorizationToken) {
		console.log('Validate token failed: no token available');

		return res.status(401).json({
			message: 'no token available',
		});
	}

	jwt.verify(authorizationToken, 'secret', (err, payload) => {
		if (err) {
			console.log('Validate token failed: authorization failed');
			return res.status(401).json({
				message: 'auth failed',
			});
		}

		console.log(payload);
		if (payload) {
			console.log('payload werkt');
		}

		if (payload && payload.Id) {
			console.log('token is valid', payload);

			req.Id = payload.Id;
			console.log(req.Id);
			next();
		} else {
			logger.warn('Validate token failed: userId is missing');

			return res.status(401).json({
				message: 'UserId is not available',
			});
		}
	});
};
