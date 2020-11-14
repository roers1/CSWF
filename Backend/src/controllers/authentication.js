const express = require('express');
const assert = require('assert');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const logger = config.logger;

router.post('/', (req, res, next) => {
	logger.info('Handling POST LOGIN request to /api/auth');

	assert.ok(typeof req.body.email === 'string', 'email is not a string!');

	var user = User.findOne({
		email: req.body.email,
	});

	if (user === null) {
		return res.status(401).json({
			message: 'Login failed',
		});
	} else {
		bcrypt.compare(req.body.Password, user.Password, (err, result) => {
			if (err) {
				return res.status(401).json({
					message: 'Invalid username or password',
				});
			}

			if (result) {
				const token = jwt.sign(
					{
						Id: user._id.toString(),
						EmailAddress: user.email,
					},
					'secret',
					{
						expiresIn: '1h',
					}
				);
				return res.status(200).json({
					message: 'Login succesfull',
					token: token,
				});
			}

			return res.status(401).json({
				message: 'invalid username or password',
			});
		});
	}
});

module.exports = router;
