class RecipeSerializer {
    static async showDetails(recipes) {
        const allowedAttributes = ["id", "recipeImageUrl", "name", "pestManagement", "wateringSchedule", "wateringAmount", "lightAmount", "harvestNotes", "plantLocation"]
        const serializedRecipes = await Promise.all(recipes.map(async (recipe) => {
            const  serializedSingleRecipe = {}
            for (const attribute of allowedAttributes){
                serializedSingleRecipe[attribute] = recipe[attribute]
            }
            const relatedUser = await recipe.$relatedQuery("user")
            serializedSingleRecipe.user = relatedUser

            
            return serializedSingleRecipe
        }))
        return serializedRecipes
    }

    static async singleShowDetails(recipe) {
        const allowedAttributes = ["id", "recipeImageUrl", "name", "pestManagement", "wateringSchedule", "wateringAmount", "lightAmount", "harvestNotes", "plantLocation"]
        const serializedRecipe = {}
        for (const attribute of allowedAttributes) {
            serializedRecipe[attribute] = recipe[attribute]
        }
        const relatedUser = await recipe.$relatedQuery("user")
        serializedRecipe.user = relatedUser

        
        return serializedRecipe
    }
}

export default RecipeSerializer