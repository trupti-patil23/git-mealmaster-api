const knex = require("knex")(require("../knexfile"));
const express = require("express");
const router = express.Router();   //init the router object
module.exports = router;

// JWT token
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

/**
 * Adding new user to "users" table,
 * once user created successfully:Create JWT token and send in response
 * @param {A} req  
 * @param {*} res 
 */
router.post("/register", async (req, res) => {
    try {
        // Insert the new user into the database table "users"
        const result = await knex("users").insert(req.body);
        const newUserId = result[0];
        //Fetch newly added user,if you get that means successful insertion
        const createdUser = await knex("users").where({ id: newUserId });
        // Generate JWT token
        const token = jwt.sign(
            {               
                email: createdUser.email,
            },
            JWT_SECRET_KEY,
            {
                expiresIn: "2h",
            }
        );      
        res.status(201).json({ token });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'User is already exists' });
        } else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
});

/**
 * From Login screen, verify if user in present in "users" table or not, 
 */
router.get("/login", async (req, res) => {
    try {   
        //Get the 2nd element in the array after splitting the string "Bearer token"
        const token = req.headers.authorization.split(" ")[1]; 
        const email = req.query.userData.email;
        const password = req.query.userData.password;

        console.log(token);

        const user = await knex("users").
            where({
                email: email,
                password: password
            });

        if (!user[0]) {
            return res.status(401).json({ error: 'Invalid email or Password' });
        }        
        console.log(user[0]);
        // Verify JWT token
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("invalid jwt token.");
               return res.status(401).json({ error: 'Invalid JWT token' });
            }
            if (decoded.id !== user.id) {
               return res.status(409).json({ error: 'JWT token does not match user' });
                console.log("user not authenticated.");
            }            
            res.status(201).json(user[0]);
        } );
    } catch (error) {
        res.status(500).send("Error in Signing in user." + error);
        console.log(error);
    }
});


