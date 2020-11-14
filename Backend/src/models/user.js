const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		validate: {
			validator: (name) => name.length > 1,
			message: 'FirstName must be longer than 1 characters.',
		},
		required: [true, 'FirstName is required.'],
	},
	lastName: {
		type: String,
		validate: {
			validator: (LastName) => LastName.length > 1,
			message: 'LastName must be longer than 1 characters.',
		},
		required: [true, 'LastName is required.'],
	},
	streetAddress: {
		type: String,
		required: [true, 'StreetAddress is required.'],
	},
	postalCode: {
		type: String,
		required: [true, 'PostalCode is required.'],
	},
	city: {
		type: String,
		required: [true, 'City is required.'],
	},
	dateOfBirth: {
		type: Date,
		required: [true, 'DateOfBirth is required.'],
	},
	phoneNumber: {
		type: Number,
		required: [true, 'PhoneNumber is required.'],
		validate: {
			validator: function (v) {
				return /(^(316|06|6)([0-9]{8}))$/.test(v);
			},

			message: (props) => `${props.value} is not a valid phonenumber format!`,
		},
	},
	email: {
		type: String,
		required: [true, 'EmailAddress is required.'],
		validate: {
			validator: function (v) {
				return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					v
				);
			},

			message: (props) => `${props.value} is not a valid email format!`,
		},
	},
	password: {
		type: String,
		required: [true, 'Password is required.'],
	},
	employee: {
		type: Boolean,
		default: false,
	},
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('user', UserSchema);

module.exports = User;
