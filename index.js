const connection = require("./database/connection");
const express = require("express");
const cors = require('cors');

// Load routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const followRoutes = require("./routes/follow");

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

// Use routes
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", followRoutes);

// Test route
app.get("/testroute", (req, res) => {
	return res.status(200).json({
		"id": 1,
		"message": "API working swiftly"
	})
});

// Listen to HTTP requests
app.listen(port, () => {
	console.log(`Server running at ${port}`)
})