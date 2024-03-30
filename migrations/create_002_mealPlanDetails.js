/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('meal_plans', function(table) {
        table.increments('meal_plan_id').primary(); // meal_plan_id as primary key
        table.integer('user_id').unsigned().references('id').inTable('users'); // user_id references users table
        table.json('sunday_meal_plan');
        table.json('monday_meal_plan');
        table.json('tuesday_meal_plan');
        table.json('wednesday_meal_plan');
        table.json('thursday_meal_plan');
        table.json('friday_meal_plan');
        table.json('saturday_meal_plan');
        table.json('ingredient_list');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('meal_plans');
};