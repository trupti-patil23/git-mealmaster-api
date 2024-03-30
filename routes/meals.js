const knex = require("knex")(
    require("../knexfile")// Load configuration from knexfile.js   
);
const express = require("express");
const router = express.Router();   //init the router object
module.exports = router;

/**
 * Added to save meal Plan to "meal_plans" table
 * @param {A} req  
 * @param {*} res 
 */
router.post("/saveMealPlan", async (req, res) => {
    try { 
        // Check if the meal plan already exists
        const existingMealPlan = await knex("meal_plans").
            where("user_id", req.body.userId).
            andWhereJsonObject("sunday_meal_plan", req.body.sunday).
            andWhereJsonObject("monday_meal_plan", req.body.monday).
            andWhereJsonObject("tuesday_meal_plan", req.body.tuesday).
            andWhereJsonObject("wednesday_meal_plan", req.body.wednesday).
            andWhereJsonObject("thursday_meal_plan", req.body.thrusday).
            andWhereJsonObject("friday_meal_plan", req.body.friday).
            andWhereJsonObject("saturday_meal_plan", req.body.saturday).
            andWhereJsonObject("ingredient_list", req.body.ingredients).
            first();

        if (existingMealPlan) {          
            return res.status(409).json({ message: "Same Meal plan already exists.You can edit the plan." });
        }

        const result = await knex('meal_plans').insert({
            user_id: req.body.userId,
            sunday_meal_plan: req.body.sunday,
            monday_meal_plan: req.body.monday,
            tuesday_meal_plan: req.body.tuesday,
            wednesday_meal_plan: req.body.wednesday,
            thursday_meal_plan: req.body.thrusday,
            friday_meal_plan: req.body.friday,
            saturday_meal_plan: req.body.saturday,
            ingredient_list: req.body.ingredients
        });

        const mealPlanId = result[0];
        //Fetch newly added meal plan,check successful insertion
        const createdUser = await knex("meal_plans").where({ meal_plan_id: mealPlanId });
        res.status(201).json({message: "Meal Plan saved successfully!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to Save Meal plan" + error });
    }
});