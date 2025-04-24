const connection = require("./database/connection");
const express = require("express");
const cors = require('cors');

// DB connection
connection();

// Create node server
const app = express();
const port = 3900;

// Configure CORS
app.use(cors());

// Transform received data to JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Test route
app.get("/testroute", (req, res) => {
	return res.status(200).json({
		"id": 1,
		"message": "API working swiftly"
	})
});