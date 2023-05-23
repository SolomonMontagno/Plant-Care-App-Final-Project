import express from "express"
import { Recipe, Plant } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import objection from "objection"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"
import uploadImage from "../../../services/uploadImage.js"

const { ValidationError } = objection

const plantRecipeRouter = new express.Router({mergeParams: true})

plantRecipeRouter.post("/", uploadImage.single("recipeImageUrl"), async (req, res) =>{
    try {
        const { body } = req
        const recipeImageUrl = req.file ? req.file.location : null
        const bodyWithImageUrl = {...body, recipeImageUrl: recipeImageUrl}
        const cleanedInput = cleanUserInput(bodyWithImageUrl)
        const userId = req.user.id 
        const { plantId } = req.params 
        cleanedInput.userId = userId
    

        const recipe = await Recipe.query().insertAndFetch(cleanedInput)
        const serializedRecipe = await RecipeSerializer.serializedRecipe(recipe)
        res.status(201).json({recipe: serializedRecipe})
    } catch (error) {
        if (error instanceof ValidationError){
            res.status(422).json({errors: error.data})
        } else {
            console.log(error.message)
            res.status(500).json({errors: error.message})
        }
    }
})

export default plantRecipeRouter
