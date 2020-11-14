const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const checkAuth = require('../../middleware/check-auth');
const logger = config.logger;

router.post('/', (req, res, next) => {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		console.log(hash);
		if (err) {
			return res.json(500).json({
				error: err,
			});
		} else {
			const user = new User(req.body);
			user.Password = hash;

			user
				.save()
				.then((result) => {
					res.status(200).json({
						result,
					});
				})
				.catch((err) => {
					console.log(err);
					res.status(500).json({
						error: err,
					});
				});
		}
	});
});

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'JE MOEDER',
	});
});

module.exports = router;
