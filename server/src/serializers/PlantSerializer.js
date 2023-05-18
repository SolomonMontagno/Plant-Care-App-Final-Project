import RecipeSerializer from "./RecipeSerializer.js";

class PlantSerializer {
    static async getSummary(plant) {
        const allowedAttributes = ["id", "name", "family", "type", "heirloom", "annual", "season", "plantImageUrl"]

        const serializedPlant = {};
        for (const attribute of allowedAttributes) {
            serializedPlant[attribute] = plant[attribute]
        }
        const recipes = await plant.$relatedQuery("recipes")
        const serializedRecipes = await RecipeSerializer.showDetails(recipes)


        serializedPlant.recipes = serializedRecipes
        return serializedPlant
    }
}

export default PlantSerializer