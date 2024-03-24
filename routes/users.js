const knex = require("knex")(require("../knexfile"));
const express = require("express");
const router = express.Router();   //init the router object
module.exports = router;

/**
 * Adding new user to "users" table
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
        res.status(201).json(createdUser);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'User is already exists' });
        } else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
});


