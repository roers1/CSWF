const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const checkAuth = require('../../middleware/check-auth');
const logger = config.logger;

router.post('/register', async function (req, res) {
	bcrypt.hash(req.body.password, 10, async function (err, hash) {
		try {
			if (err) {
				throw new Error('request failed');
			} else {
				const user = new User(req.body);
				user.password = hash;

				await user.save().catch((err) => {
					throw err;
				});

				res.status(200).send({
					succes: 'true',
					status: 200,
					message: 'user succesfully registered:',
					user: user,
				});
			}
		} catch (err) {
			res.status(400).json({
				succes: 'false',
				status: 400,
				message: err.message,
			});
		}
	});
});

router.put('/', checkAuth, async function (req, res) {
	console.log(req.Id);
	User.findById(req.Id).then((user) => {
		console.log(req.body);
	});
});

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'get methode on route api/user',
	});
});

module.exports = router;
