const { Model } = require("objection")

class Plant extends Model {
    static get tableName(){
        return "plants"

    }
    static get jsonSchema(){
        return{
            type: "object",
            required: ["name", "family", "type", "plantImageUrl"],
            properties: {
                name: { type: "string" },
                family: { type: "string"},
                type: { type: "string"},
                heirloom: {type: ["boolean", "string"]},
                annual: { type: ["string", "boolean"]},
                season: { type: ["string"] },
                plantImageUrl: { type: "string" }
            }
        }
    }
    static get relationMappings(){
        const { Recipe, User } = require("./index.js")
        return {
            recipes: {
                relation: Model.HasManyRelation,
                modelClass: Recipe,
                join: {
                    from: "plants.id",
                    to: "recipes.plantId"
                }
            },
            users: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: "plants.id",
                    through: {
                        from: "recipes.plantId",
                        to: "recipes.userId"
                    },
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Plant;