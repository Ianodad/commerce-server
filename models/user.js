const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
// Password encrptioin
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User Schema 
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
		minlength: 2
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		minlength: 2,
		maxlength: 255
	},
	email: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 255,
		unique: true
			},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 1024,
		unique: true
	},
	isCustomer : Boolean, 
	isAdmin: Boolean
});

// Setting up schema with mongoose
const User = mongoose.model('User', userSchema);

// Generate json web token
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({
			_id: this._id,
			isAdmin: this.isAdmin
		},
		config.get('jwtPrivateKey')
	);
	return token;
};

// Validating data from the http call
const validateUser = (user) => {
	const schema = {
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().min(5).max(255).required()
	};
	return Joi.validate(user, schema);
}

// encrypting the password with salts
const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

// decrypting the password to be verified 
const decryptPassword = async (password, userPassword) => {
	return await bcrypt.compare(password, userPassword)

}

// validating user input password
const validateLogin = (user) => {
	const schema = {
		email: Joi.string().required().email(),
		password: Joi.string().min(5).max(255).required()
	};
	return Joi.validate(user, schema);

}

exports.userSchema = userSchema;
exports.User = User;
exports.validateLogin = validateLogin;
exports.validate = validateUser;
exports.hash = hashPassword;
exports.decrypt = decryptPassword;

