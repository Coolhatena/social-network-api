const User = require("../models/user");
const bcrypt = require('bcrypt');

// Mock action
const testUser = (req, res) => {
	return res.status(200).send({
		message: "Message sent from controllers/user.js"
	}) 
}

// Register
const register = async (req, res) => {
	const params = req.body;

	if (!params.name || !params.nick || !params.email || !params.password) {
		console.log("FAILED VALIDATION")
		return res.status(400).json({
			status: "error",
			message: "Incomplete data"
		})
	}

	try {
		// Validate that email or nickname is not already registered
		const duplicatedUser = await User.find({
			$or: [
				{ email: params.email.toLowerCase()},
				{ nick: params.nick.toLowerCase()}
			]
		}).exec()
		
		if (duplicatedUser && duplicatedUser.length >= 1){
			return res.status(400).json({
				status: "error",
				message: "This user already",
			})
		}
		
		const pwdHash = await bcrypt.hash(params.password, 10);
		params.password = pwdHash;
		
		const potentialUser = new User(params);
		return res.status(200).json({
			status: "success",
			message: "Action - Register user",
			potentialUser
		})
	} catch (err) {
		return res.status(500).json({
			status: "error",
			message: "Internal server error",
		})
	}
}

module.exports = {
	testUser,
	register
}