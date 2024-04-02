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
        res.status(201).json({ message: "Meal Plan saved successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to Save Meal plan" + error });
    }
});

/**
 * Added to get meal plans stored for userId in meal_plans table
 */
router.get("/viewMealPlan", async (req, res) => {
    try {
        const mealPlans = await knex("meal_plans").
            select('meal_plans.meal_plan_id as meal_plan_id',
                'sunday_meal_plan as sunday_meal_plan',
                'monday_meal_plan as monday_meal_plan',
                'tuesday_meal_plan as tuesday_meal_plan',
                'wednesday_meal_plan as wednesday_meal_plan',
                'thursday_meal_plan as thursday_meal_plan',
                'friday_meal_plan  as friday_meal_plan',
                'saturday_meal_plan as saturday_meal_plan',
                'ingredient_list as ingredient_list').
            where({ 'meal_plans.user_id': Number(req.query.userId) });

        if (!(mealPlans.length === 0)) {
            res.status(201).json(mealPlans);
        } else {
            return res.status(404).json({ message: 'No meal plan present for you,\n Create one using CreateMealPlan.' });
        }
    } catch (error) {
        res.status(500).send({ message: `Error in Signing in user." ${error}` });
    }
});

/**
 * Added to delete requested meal plan by user using unique meal_plan_id from meal_plans table
 */
router.delete("/deleteMealPlan", async (req, res) => {
    const mealPlanId = req.query.mealPlanId;
    try {
        const rowsDeleted = await knex("meal_plans")
            .where({ meal_plan_id: mealPlanId })
            .delete();

        if (rowsDeleted === 0) {
            //Response returns 404 if meal_plan_id is not found
            return res
                .status(404)
                .json({ message: `Meal Plan Id ${mealPlanId} is not found` });
        }
        //Response returns 204 if successfully deleted
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: `Error in deleting  meal Plan: ${error}` });
    }
});