class RecipeSerializer {
    static async showDetails(recipes) {
        const allowedAttributes = ["id", "recipeImageUrl", "name", "pestManagement", "wateringSchedule", "wateringAmount", "lightAmount", "harvestNotes", "plantLocation", "plantId"]
        const serializedRecipes = await Promise.all(recipes.map(async (recipe) => {
            const  serializedSingleRecipe = {}
            for (const attribute of allowedAttributes){
                serializedSingleRecipe[attribute] = recipe[attribute]
            }
            const relatedUser = await recipe.$relatedQuery("user")
            serializedSingleRecipe.user = relatedUser

            const relatedVotes = await recipe.$relatedQuery("votes")
            let voteTotal = 0
            relatedVotes.forEach((vote) =>{
                voteTotal += vote.voteValue
            })
            serializedSingleRecipe.voteValue = voteTotal
            return serializedSingleRecipe
        }))
        return serializedRecipes
    }

    static async singleShowDetails(recipe) {
        const allowedAttributes = ["id", "recipeImageUrl", "name", "pestManagement", "wateringSchedule", "wateringAmount", "lightAmount", "harvestNotes", "plantLocation", "plantId"]
        const serializedRecipe = {}
        for (const attribute of allowedAttributes) {
            serializedRecipe[attribute] = recipe[attribute]
        }
        const relatedUser = await recipe.$relatedQuery("user")
        serializedRecipe.user = relatedUser

        const relatedVotes = await recipe.$relatedQuery("votes")
        let voteTotal = 0
        relatedVotes.forEach((vote)=> {
            voteTotal +=vote.voteValue
        })
        serializedRecipe.voteValue = voteTotal
        return serializedRecipe
    }
}

export default RecipeSerializer