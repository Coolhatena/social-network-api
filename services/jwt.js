const jwt = require("jwt-simple");
const moment = require("moment");
const user = require('../models/user');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const createToken = () => {
	const payload = {
		id: user._id,
		name: user.name,
		surname: user.surname,
		nick: user.nick,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(7, 'days').unix()
	};

	return jwt.encode(payload, secret);
}

module.exports = {
	createToken
}