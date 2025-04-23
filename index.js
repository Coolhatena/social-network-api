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
