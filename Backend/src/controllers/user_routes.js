const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const checkAuth = require('../../middleware/check-auth');
const logger = config.logger;

router.post('/', async function (req, res) {
	await bcrypt.hash(req.body.password, 10, async function (err, hash) {
		console.log(hash);
		if (err) {
			return res.json(500).json({
				error: err,
			});
		} else {
			const user = new User(req.body);
			user.Password = hash;

			await user.save()
				.catch((err) => {
					console.log(err);
					res.status(400).json({
						'message': {
							'succes': 'false',
							'status': 400,
							'message': err.message
						}
					})
				});

			res.status(200).send({
				succes: 'true',
				status: 200,
				message: 'user succesfully registered:',
			})
		}
	});
});

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'get methode on route api/user',
	});
});

module.exports = router;
