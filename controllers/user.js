const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt')

// Mock action
const testUser = (req, res) => {
	return res.status(200).send({
		message: "Message sent from controllers/user.js",
		user: req.user
	});
}

// Register
const register = async (req, res) => {
	const params = req.body;
	if (!params.name || !params.nick || !params.email || !params.password) {
		console.log("FAILED VALIDATION")
		return res.status(400).json({
			status: "error",
			message: "Incomplete data"
		});
	}

	try {
		// Validate that email or nickname is not already registered
		const duplicatedUser = await User.find({
			$or: [
				{ email: params.email.toLowerCase()},
				{ nick: params.nick.toLowerCase()}
			]
		}).exec();
		
		if (duplicatedUser && duplicatedUser.length >= 1){
			return res.status(400).json({
				status: "error",
				message: "This user already exists",
			});
		}
		
		const pwdHash = await bcrypt.hash(params.password, 10);
		params.password = pwdHash;
		
		const potentialUser = new User(params);
		const userSaved = potentialUser.save();
		if (!userSaved) {
			return res.status(500).json({
				status: "error",
				message: "Internal server error",
			});
		}

		return res.status(200).json({
			status: "success",
			message: "User registered successfully",
			userSaved
		});
	} catch (err) {
		return res.status(500).json({
			status: "error",
			message: "Internal server error",
		});
	}
}

const login = async (req, res) => {
	const params = req.body;
	if (!params.email || !params.password) {
		console.log("FAILED VALIDATION")
		return res.status(400).json({
			status: "error",
			message: "Incomplete data"
		});
	}

	try {
		const user = await User.findOne({email: params.email}).exec();
		if (!user){
			return res.status(400).json({
				status: "error",
				message: "User does not exists",
			});
		}

		// Check if user password is correct
		const pwd = bcrypt.compareSync(params.password, user.password);
		if (!pwd) {
			return res.status(400).json({
				status: "error",
				message: "Invalid login credentials",
			});	
		}

		const token = jwt.createToken(user);
		
		return res.status(200).send({
			status: "success",
			message: "Action - User Login",
			user: {
				id: user._id,
				name: user.name,
				nick: user.nick
			},
			token
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			status: "error",
			message: "Internal server error",
		});
	}
}

const getProfile = async (req, res) => {
	const id = req.params.id;
	const userProfile = await User.findById(id)
									.select({ password: false, role: false })
									.exec();
	if (!userProfile) {
		return res.status(404).send({
			status: "error",
			message: "The user you are trying get does not exist or there is a problem with the profile"
		});
	}

	// TODO: Return following info
	return res.status(200).send({
		status: "success",
		user: userProfile
	});
}

module.exports = {
	testUser,
	getProfile,
	register,
	login,
}