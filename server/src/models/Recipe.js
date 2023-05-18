const { Model } = require("objection")

class Recipe extends Model {
    static get tableName(){
        return "recipes"
    }
    static get jsonSchema(){
        return {
            type: "object",
            required: ["name", "wateringSchedule", "wateringAmount", "lightAmount", "plantLocation"],
            properties: {
                recipeImageUrl: { type: "string"},
                name: {type: "string"},
                pestManagement: {type: "string"},
                wateringSchedule: {type: "string"},
                wateringAmount: {type: "string"},
                lightAmount: {type: "string"},
                harvestNotes: {type: "string"},
                plantLocation: {type: "string"}
            }
        }
    }
    static get relationMappings(){
        const {Plant, User} = require("./index.js")
        return{
            plant: {
                relation: Model.BelongsToOneRelation,
                modelClass: Plant,
                join: {
                    from: "recipes.plantId",
                    to: "plants.id"
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "recipes.userId",
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Recipe