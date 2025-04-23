const mongoose = require("mongoose");
require('dotenv').config()

const connection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_CONNECTION_STRING + "/social_network", {});
		console.log("Connected to DB")
	} catch (error) {
		console.log(error);
		throw new Error("Unable to connect to database");
	}
}

module.exports = connection
