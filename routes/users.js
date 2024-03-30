const knex = require("knex")(require("../knexfile"));
const express = require("express");
const router = express.Router();   //init the router object
module.exports = router;

// JWT token
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

/**
 * Custom Middleware to verify JWT token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function verifyToken(req, res, next) {
    //Get the 2nd element in the array after splitting the string "Bearer token"
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }
    // Verify JWT token
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("invalid jwt token.");
            return res.status(403).json({ error: "Invalid JWT token.Token verification failed" });
        }
        // Attached the decoded user data from token to req.user
        req.user = decoded;        
        next();
    });
}

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
        res.status(201).json("New user created successfully!");
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
        const email = req.query.userData.email;
        const password = req.query.userData.password;
        const user = await knex("users").
            where({
                email: email,
                password: password
            });

        if (!user[0]) {
            return res.status(401).json({ error: 'User is not Autheticated.' });
        }

        // Generate JWT token, after Users successful authentication
        const token = jwt.sign(
            {
                email: user[0].email,
                id: user[0].id
            },
            JWT_SECRET_KEY,
            {
                expiresIn: "2h",
            }
        );
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).send("Error in Signing in user." + error);      
    }
});

/**
 * Added to get UserProfile data for given token
 */
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await knex("users").
            where({
                email: String(req.user.email),
                id: Number(req.user.id)
            });

        if (!user[0]) {
            return res.status(401).json({ error: 'User is not Authorized.' });
        }     
        res.status(201).json(user[0]);

    } catch (error) {
        res.status(500).send("Error in Signing in user." + error);
    }
});

