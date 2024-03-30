//Load required modules
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const userRouter = require("./routes/users");
const mealsRouter = require("./routes/meals");

//Using express.json() middleware to accept JSON payloads in POST requests
app.use(express.json());

//Using below middleware to allow users to access static files(images)
app.use(express.static("public"));

//Avoid CORS errors: allow clients from different domains to access server
app.use(cors());

//setting router for all "users" 
app.use("/users", userRouter)

//setting router for all "meals" 
app.use("/meals", mealsRouter)

//Read .env variables from process.env object  and Start the server
const { PORT } = process.env || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

