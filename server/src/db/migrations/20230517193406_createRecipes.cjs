/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("recipes", (table) => {
        table.bigIncrements("id")
        table.bigInteger("userId")
            .unsigned()
            .references("users.id")
            .index()
            .notNullable()
        table.bigInteger("plantId")
            .unsigned()
            .references("plants.id")
            .index()
            .notNullable()
        table.string("recipeImageUrl")
        table.string("name").notNullable()
        table.string("pestManagement")
        table.string("wateringSchedule").notNullable()
        table.string("wateringAmount").notNullable()
        table.string("lightAmount").notNullable()
        table.string("harvestNotes")
        table.string("plantLocation").notNullable()


    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("recipes")
}
