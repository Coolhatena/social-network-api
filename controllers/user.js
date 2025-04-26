// Mock action
const testUser = (req, res) => {
	return res.status(200).send({
		message: "Message sent from controllers/user.js"
	}) 
}

// Register
const register = (req, res) => {
	return res.status(200).json({
		message: "Action - Register user"
	})
}

module.exports = {
	testUser
}