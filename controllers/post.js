// Mock action
const testPost = (req, res) => {
	return res.status(200).send({
		message: "Message sent from controllers/post.js"
	}) 
}

module.exports = {
	testPost
}