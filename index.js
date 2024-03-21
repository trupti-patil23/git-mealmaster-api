//Load required modules
const express = require("express");
require("dotenv").config(); 
const cors = require("cors");
const app = express();

//Using express.json() middleware to accept JSON payloads in POST requests
app.use(express.json());

//Using below middleware to allow users to access static files(images)
app.use(express.static("public"));

app.use(cors()); 

//Read .env variables from process.env object  and Start the server
const{PORT} = process.env || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

