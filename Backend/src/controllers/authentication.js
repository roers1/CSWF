const express = require('express');
const assert = require('assert');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
	console.log('in method');

	const user = User.findOne({
		email: req.body.email,
	}).then((user) => {
		if (user === null) {
			return res.status(401).json({
				message: 'Login failed',
			});
		} else {
			console.log(req.body.password, user.password);
			console.log(user);
			bcrypt.compare(req.body.password, user.password, (err, result) => {
				console.log(err);
				console.log(result);

				if (err) {
					return res.status(400).json({
						message: 'Invalid username or password',
					});
				}

				if (result) {
					console.log(result);
					const token = jwt.sign(
						{
							Id: user._id.toString(),
						},
						'secret',
						{
							expiresIn: '1h',
						}
					);

					user.password = undefined;
					return res.status(200).json({
						message: 'Login succesfull',
						token: token,
						user: user,
					});
				}

				return res.status(400).json({
					message: 'invalid username or passwordsdfsdf',
				});
			});
		}
	});
});

module.exports = router;
