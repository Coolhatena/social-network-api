const User = require("../models/user");

// Mock action
const testUser = (req, res) => {
	return res.status(200).send({
		message: "Message sent from controllers/user.js"
	}) 
}

// Register
const register = (req, res) => {
	const params = req.body;

	if (!params.name || !params.nick || !params.email || !params.password) {
		console.log("FAILED VALIDATION")
		return res.status(400).json({
			status: "error",
			message: "Incomplete data"
		})
	}

	const userCached = new User(params); // Potential registered user
	try {
		// Validate that email or nickname is not already registered
		const duplicatedUser = User.find({
			$or: [
				{ email: userCached.email.toLowerCase()},
				{ nick: userCached.nick.toLowerCase()}
			]
		}).exec()

		if (duplicatedUser && duplicatedUser.length >= 1){
			return res.status(400).json({
				status: "error",
				message: "This user already",
			})
		}



		return res.status(200).json({
			status: "success",
			message: "Action - Register user",
			userCached
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