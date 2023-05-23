/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("recipies,")
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {}
