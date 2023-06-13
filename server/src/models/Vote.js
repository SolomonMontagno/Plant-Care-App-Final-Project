const Model = require("./Model")

class Vote extends Model {
    static get tableName() {
        return "votes"
    }
    static get jsonSchema(){
        return {
            type: "object",
            required: ["voteValue"],
            properties: {
                votes: {types: ["string", "integer"]}
            }
        }
    }
    static get relationMappings(){
        const {Recipe, User} = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "votes.userId",
                    to: "users.id"
                }
            },
            recipe: {
                relation: Model.BelongsToOneRelation,
                modelClass: Recipe,
                join: {
                    from: "votes.recipeId",
                    to: "recipes.id"
                }
            }
        }
    }
}


module.exports = Vote 