const jwt = require('jwt-simple');
const moment = require('moment');
const libjwt = require('../services/jwt');

const secret = libjwt.secret;

// Auth middleware
exports.auth = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).send({
			status: "error",
			message: "Authorization header missing in request",
		});
	}

	let token = req.headers.authorization.replace(/['"]+/, '');
	try {
		let payload = jwt.decode(token, secret);
		if (payload.exp <= moment().unix()) {
			return res.status(401).send({
				status: "error",
				message: 'Expired token',
			});
		}
		req.user = payload;
	} catch (error) {
		return res.status(404).send({
			status: "error",
			message: "Invalid token",
		});
	}

	next();
}