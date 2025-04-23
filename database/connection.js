const mongoose = require("mongoose");

const connection = async () => {
	try {
		// TODO: Get mongo connection string from .env
		await mongoose.connect("/social_network", {});
		console.log("Connected to DB")
	} catch (error) {
		console.log(error);
		throw new Error("Unable to connect to database");
	}
}

module.exports = connection
