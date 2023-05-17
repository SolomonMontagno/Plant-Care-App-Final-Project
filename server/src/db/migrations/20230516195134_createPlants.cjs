/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("plants", (table) => {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.string("family").notNullable()
        table.string("type").notNullable()
        table.boolean("heirloom")
        table.boolean("annual")
        table.string("season")
        table.string("plantImageUrl").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("plants")
}
