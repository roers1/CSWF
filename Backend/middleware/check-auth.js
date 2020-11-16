const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = config.logger;

module.exports = (req, res, next) => {
	let authorizationToken = req.headers.jwt;

	if (!authorizationToken) {
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
			req.Id = payload.Id;

			next();
		} else {
			return res.status(400).json({
				message: 'UserId is not available',
			});
		}
	});
};
