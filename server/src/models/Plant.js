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
}

module.exports = Plant;